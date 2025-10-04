use anchor_lang::prelude::*;
use crate::state::Config;
use crate::errors::ErrorCode;
use crate::utils::verify_signature;

pub fn handler(
    ctx: Context<VerifyProof>,
    proof_data: Vec<u8>,
    signature: [u8; 64],
    notary_index: u8,
) -> Result<()> {
    require!(notary_index < 3, ErrorCode::InvalidNotaryIndex);
    
    let config = &ctx.accounts.config;
    let notary_pubkey = config.notary_pubkeys[notary_index as usize];

    // Verify signature from notary
    require!(
        verify_signature(&proof_data, &signature, &notary_pubkey)?,
        ErrorCode::InvalidSignature
    );

    emit!(ProofVerified {
        verifier: ctx.accounts.verifier.key(),
        notary_index,
        timestamp: Clock::get()?.unix_timestamp,
    });

    Ok(())
}

#[derive(Accounts)]
pub struct VerifyProof<'info> {
    #[account(
        seeds = [b"config"],
        bump = config.bump
    )]
    pub config: Account<'info, Config>,

    pub verifier: Signer<'info>,
}

#[event]
pub struct ProofVerified {
    pub verifier: Pubkey,
    pub notary_index: u8,
    pub timestamp: i64,
}
