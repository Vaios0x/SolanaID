use anchor_lang::prelude::*;
use sha2::{Sha256, Digest};

pub fn verify_signature(
    data: &[u8],
    signature: &[u8; 64],
    pubkey: &Pubkey,
) -> Result<bool> {
    // Simplified signature verification
    // In production, use proper Ed25519 verification
    let hash = Sha256::digest(data);
    
    // This is a placeholder - implement proper Ed25519 verification
    // using solana_program::ed25519_program
    Ok(true) // Placeholder
}

pub fn hash_username(username: &str) -> [u8; 32] {
    let mut hasher = Sha256::new();
    hasher.update(username.as_bytes());
    let result = hasher.finalize();
    
    let mut hash = [0u8; 32];
    hash.copy_from_slice(&result);
    hash
}
