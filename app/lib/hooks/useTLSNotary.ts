'use client';

import { useState } from 'react';
import { NOTARY_SERVERS } from '@/lib/solana/constants';

// Chrome extension types
declare global {
  interface Window {
    chrome?: {
      runtime: {
        sendMessage: (message: any) => void;
      };
    };
  }
}

interface TLSNotarySession {
  sessionId: string;
  status: 'pending' | 'proving' | 'notarizing' | 'complete' | 'error';
  proof?: Uint8Array;
  signature?: string;
  error?: string;
}

export function useTLSNotary() {
  const [session, setSession] = useState<TLSNotarySession | null>(null);

  const startVerification = async (platform: string): Promise<string> => {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    setSession({
      sessionId,
      status: 'pending',
    });

    // Send message to browser extension
    if (typeof window !== 'undefined' && window.chrome?.runtime) {
      window.chrome.runtime.sendMessage({
        type: 'START_VERIFICATION',
        platform,
        sessionId,
      });
    }

    return sessionId;
  };

  const generateProof = async (transcriptData: Uint8Array): Promise<{ proof: Uint8Array; signature: string }> => {
    if (!session) throw new Error('No active session');

    setSession({ ...session, status: 'proving' });

    try {
      // Select random notary server
      const notaryUrl = NOTARY_SERVERS[Math.floor(Math.random() * NOTARY_SERVERS.length)];

      const response = await fetch(`${notaryUrl}/notarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: session.sessionId,
          transcript_data: Array.from(transcriptData),
        }),
      });

      if (!response.ok) {
        throw new Error('Notary request failed');
      }

      const data = await response.json();
      const proof = new Uint8Array(data.proof);
      const signature = data.signature;

      setSession({
        ...session,
        status: 'complete',
        proof,
        signature,
      });

      return { proof, signature };
    } catch (error: any) {
      setSession({
        ...session,
        status: 'error',
        error: error.message,
      });
      throw error;
    }
  };

  return {
    session,
    startVerification,
    generateProof,
  };
}
