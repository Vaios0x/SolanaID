use anchor_lang::prelude::*;
use crate::state::{Config, Identity, Platform};
use crate::errors::ErrorCode;

pub fn handler(
    ctx: Context<RegisterIdentity>,
    platform: u8,
    proof_hash: [u8; 32],
    username_hash: [u8; 32],
    metadata: String,
) -> Result<()> {
    require!(metadata.len() <= 200, ErrorCode::MetadataTooLong);
    
    let platform_enum = Platform::from_u8(platform)?;
    let config = &mut ctx.accounts.config;
    let identity = &mut ctx.accounts.identity;
    let clock = Clock::get()?;

    identity.owner = ctx.accounts.owner.key();
    identity.platform = platform_enum.clone();
    identity.proof_hash = proof_hash;
    identity.username_hash = username_hash;
    identity.metadata = metadata;
    identity.verified_at = clock.unix_timestamp;
    identity.expires_at = clock.unix_timestamp + config.validity_period;
    identity.revoked = false;
    identity.verification_count = 1;
    identity.bump = ctx.bumps.identity;

    config.total_identities += 1;
    config.total_verifications += 1;

    emit!(IdentityRegistered {
        owner: identity.owner,
        platform: platform_enum,
        proof_hash,
        verified_at: identity.verified_at,
    });

    Ok(())
}

#[derive(Accounts)]
#[instruction(platform: u8)]
pub struct RegisterIdentity<'info> {
    #[account(
        mut,
        seeds = [b"config"],
        bump = config.bump
    )]
    pub config: Account<'info, Config>,

    #[account(
        init,
        payer = owner,
        space = 8 + Identity::INIT_SPACE,
        seeds = [
            b"identity",
            owner.key().as_ref(),
            &[platform]
        ],
        bump
    )]
    pub identity: Account<'info, Identity>,

    #[account(mut)]
    pub owner: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[event]
pub struct IdentityRegistered {
    pub owner: Pubkey,
    pub platform: Platform,
    pub proof_hash: [u8; 32],
    pub verified_at: i64,
}
