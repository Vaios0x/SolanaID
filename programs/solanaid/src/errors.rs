use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid platform type")]
    InvalidPlatform,
    
    #[msg("Metadata too long (max 200 characters)")]
    MetadataTooLong,
    
    #[msg("Invalid notary count (must be 3)")]
    InvalidNotaryCount,
    
    #[msg("Invalid notary index")]
    InvalidNotaryIndex,
    
    #[msg("Invalid signature")]
    InvalidSignature,
    
    #[msg("Identity already exists")]
    IdentityExists,
    
    #[msg("Identity expired")]
    IdentityExpired,
    
    #[msg("Identity revoked")]
    IdentityRevoked,
    
    #[msg("Unauthorized")]
    Unauthorized,
}
