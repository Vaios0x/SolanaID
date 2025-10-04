use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Identity {
    pub owner: Pubkey,
    pub platform: Platform,
    pub proof_hash: [u8; 32],
    pub username_hash: [u8; 32],
    #[max_len(200)]
    pub metadata: String,
    pub verified_at: i64,
    pub expires_at: i64,
    pub revoked: bool,
    pub verification_count: u64,
    pub bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, InitSpace)]
pub enum Platform {
    LinkedIn,
    GitHub,
    Twitter,
    Google,
}

impl Platform {
    pub fn from_u8(value: u8) -> Result<Self> {
        match value {
            0 => Ok(Platform::LinkedIn),
            1 => Ok(Platform::GitHub),
            2 => Ok(Platform::Twitter),
            3 => Ok(Platform::Google),
            _ => Err(error!(crate::errors::ErrorCode::InvalidPlatform)),
        }
    }
}
