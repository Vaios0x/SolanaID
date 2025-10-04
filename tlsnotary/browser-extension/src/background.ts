import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { Program, AnchorProvider, Wallet } from '@coral-xyz/anchor';
import { TLSNProver } from './utils/tlsnotary';

interface VerificationSession {
  sessionId: string;
  platform: string;
  status: 'pending' | 'proving' | 'notarizing' | 'complete' | 'error';
  proof?: Uint8Array;
  signature?: string;
}

class BackgroundService {
  private sessions: Map<string, VerificationSession> = new Map();
  private notaryServers: string[];
  private connection: Connection;

  constructor() {
    this.notaryServers = [
      'http://localhost:7047',
      'http://localhost:7048',
      'http://localhost:7049',
    ];
    this.connection = new Connection('https://api.devnet.solana.com', 'confirmed');
    this.setupMessageListeners();
  }

  private setupMessageListeners() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender).then(sendResponse);
      return true; // Keep channel open for async response
    });
  }

  private async handleMessage(message: any, sender: chrome.runtime.MessageSender) {
    console.log('Background received message:', message);

    switch (message.type) {
      case 'START_VERIFICATION':
        return await this.startVerification(message.platform, message.walletAddress);
      
      case 'GENERATE_PROOF':
        return await this.generateProof(message.sessionId, message.transcriptData);
      
      case 'SUBMIT_TO_SOLANA':
        return await this.submitToSolana(
          message.sessionId,
          message.platform,
          message.walletKeypair
        );
      
      case 'GET_SESSION_STATUS':
        return this.getSessionStatus(message.sessionId);
      
      default:
        return { error: 'Unknown message type' };
    }
  }

  private async startVerification(platform: string, walletAddress: string) {
    const sessionId = this.generateSessionId();
    
    const session: VerificationSession = {
      sessionId,
      platform,
      status: 'pending',
    };

    this.sessions.set(sessionId, session);

    // Notify content script to start intercepting
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'START_INTERCEPT',
          sessionId,
          platform,
        });
      }
    });

    return { sessionId, status: 'started' };
  }

  private async generateProof(sessionId: string, transcriptData: Uint8Array) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return { error: 'Session not found' };
    }

    session.status = 'proving';

    try {
      // Initialize TLSNotary prover
      const prover = new TLSNProver({
        notaryUrl: this.selectNotaryServer(),
      });

      // Generate zkTLS proof
      const proof = await prover.generateProof(transcriptData);

      session.proof = proof.data;
      session.status = 'notarizing';

      // Send to notary for signing
      const notaryResponse = await this.sendToNotary(sessionId, proof.data);
      
      session.signature = notaryResponse.signature;
      session.status = 'complete';

      return {
        success: true,
        proof: Array.from(proof.data),
        signature: notaryResponse.signature,
      };
    } catch (error: any) {
      session.status = 'error';
      return { error: error.message };
    }
  }

  private async sendToNotary(sessionId: string, proofData: Uint8Array) {
    const notaryUrl = this.selectNotaryServer();
    
    const response = await fetch(`${notaryUrl}/notarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        transcript_data: Array.from(proofData),
      }),
    });

    if (!response.ok) {
      throw new Error('Notary signing failed');
    }

    return await response.json();
  }

  private async submitToSolana(
    sessionId: string,
    platform: string,
    walletKeypairJson: string
  ) {
    const session = this.sessions.get(sessionId);
    if (!session || !session.proof || !session.signature) {
      return { error: 'Proof not ready' };
    }

    try {
      // Reconstruct wallet keypair
      const walletKeypair = Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(walletKeypairJson))
      );

      const wallet = new Wallet(walletKeypair);
      const provider = new AnchorProvider(this.connection, wallet, {
        commitment: 'confirmed',
      });

      // Load program (IDL would be bundled)
      const programId = new PublicKey(process.env.SOLANAID_PROGRAM_ID!);
      // const program = new Program(IDL, programId, provider);

      // Calculate proof hash and username hash
      const proofHash = await this.sha256(session.proof);
      const usernameHash = await this.sha256(
        new TextEncoder().encode('username_placeholder')
      );

      // Call register_identity instruction
      // Simplified for brevity - full implementation needed
      
      return {
        success: true,
        signature: 'transaction_signature_placeholder',
      };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  private getSessionStatus(sessionId: string) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return { error: 'Session not found' };
    }
    return { status: session.status };
  }

  private selectNotaryServer(): string {
    // Simple round-robin selection
    const index = Math.floor(Math.random() * this.notaryServers.length);
    return this.notaryServers[index];
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async sha256(data: Uint8Array): Promise<Uint8Array> {
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return new Uint8Array(hashBuffer);
  }
}

// Initialize background service
const backgroundService = new BackgroundService();

console.log('SolanaID Background Service initialized');
