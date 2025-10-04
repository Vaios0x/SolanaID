use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Verification {
    pub identity: Pubkey,
    pub verifier: Pubkey,
    pub proof_hash: [u8; 32],
    pub notary_signature: [u8; 64],
    pub verified_at: i64,
    pub bump: u8,
}
