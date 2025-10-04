use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Config {
    pub authority: Pubkey,
    #[max_len(3)]
    pub notary_pubkeys: Vec<Pubkey>,
    pub total_identities: u64,
    pub total_verifications: u64,
    pub validity_period: i64, // seconds
    pub bump: u8,
}
