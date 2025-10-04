use anchor_lang::prelude::*;
use crate::state::Identity;
use crate::errors::ErrorCode;

pub fn handler(
    ctx: Context<UpdateMetadata>,
    new_metadata: String,
) -> Result<()> {
    require!(new_metadata.len() <= 200, ErrorCode::MetadataTooLong);
    
    let identity = &mut ctx.accounts.identity;
    
    require!(!identity.revoked, ErrorCode::IdentityRevoked);
    require!(identity.owner == ctx.accounts.owner.key(), ErrorCode::Unauthorized);

    identity.metadata = new_metadata.clone();

    emit!(MetadataUpdated {
        owner: identity.owner,
        platform: identity.platform.clone(),
        new_metadata,
        updated_at: Clock::get()?.unix_timestamp,
    });

    Ok(())
}

#[derive(Accounts)]
pub struct UpdateMetadata<'info> {
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
pub struct MetadataUpdated {
    pub owner: Pubkey,
    pub platform: crate::state::Platform,
    pub new_metadata: String,
    pub updated_at: i64,
}
