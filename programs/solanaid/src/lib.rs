use anchor_lang::prelude::*;

declare_id!("SoLXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

pub mod state;
pub mod instructions;
pub mod errors;
pub mod utils;

use instructions::*;

#[program]
pub mod solanaid {
    use super::*;

    /// Initialize protocol configuration
    pub fn initialize_config(
        ctx: Context<InitializeConfig>,
        notary_pubkeys: Vec<Pubkey>,
    ) -> Result<()> {
        instructions::initialize::handler(ctx, notary_pubkeys)
    }

    /// Register new identity with zkProof
    pub fn register_identity(
        ctx: Context<RegisterIdentity>,
        platform: u8,
        proof_hash: [u8; 32],
        username_hash: [u8; 32],
        metadata: String,
    ) -> Result<()> {
        instructions::register_identity::handler(
            ctx,
            platform,
            proof_hash,
            username_hash,
            metadata,
        )
    }

    /// Verify zkTLS proof on-chain
    pub fn verify_proof(
        ctx: Context<VerifyProof>,
        proof_data: Vec<u8>,
        signature: [u8; 64],
        notary_index: u8,
    ) -> Result<()> {
        instructions::verify_proof::handler(ctx, proof_data, signature, notary_index)
    }

    /// Revoke identity
    pub fn revoke_identity(
        ctx: Context<RevokeIdentity>,
    ) -> Result<()> {
        instructions::revoke_identity::handler(ctx)
    }

    /// Update identity metadata
    pub fn update_metadata(
        ctx: Context<UpdateMetadata>,
        new_metadata: String,
    ) -> Result<()> {
        instructions::update_metadata::handler(ctx, new_metadata)
    }
}
