use anchor_lang::prelude::*;
use crate::state::{Config, Identity};

pub fn handler(ctx: Context<RevokeIdentity>) -> Result<()> {
    let identity = &mut ctx.accounts.identity;
    let config = &mut ctx.accounts.config;

    require!(!identity.revoked, crate::errors::ErrorCode::IdentityRevoked);
    require!(identity.owner == ctx.accounts.owner.key(), crate::errors::ErrorCode::Unauthorized);

    identity.revoked = true;
    config.total_verifications -= 1;

    emit!(IdentityRevoked {
        owner: identity.owner,
        platform: identity.platform.clone(),
        revoked_at: Clock::get()?.unix_timestamp,
    });

    Ok(())
}

#[derive(Accounts)]
pub struct RevokeIdentity<'info> {
    #[account(
        mut,
        seeds = [b"config"],
        bump = config.bump
    )]
    pub config: Account<'info, Config>,

    #[account(
        mut,
        seeds = [
            b"identity",
            owner.key().as_ref(),
            &[identity.platform as u8]
        ],
        bump = identity.bump
    )]
    pub identity: Account<'info, Identity>,

    #[account(mut)]
    pub owner: Signer<'info>,
}

#[event]
pub struct IdentityRevoked {
    pub owner: Pubkey,
    pub platform: crate::state::Platform,
    pub revoked_at: i64,
}
