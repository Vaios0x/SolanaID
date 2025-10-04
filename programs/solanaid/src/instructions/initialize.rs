use anchor_lang::prelude::*;
use crate::state::Config;

pub fn handler(
    ctx: Context<InitializeConfig>,
    notary_pubkeys: Vec<Pubkey>,
) -> Result<()> {
    require!(notary_pubkeys.len() == 3, crate::errors::ErrorCode::InvalidNotaryCount);
    
    let config = &mut ctx.accounts.config;
    config.authority = ctx.accounts.authority.key();
    config.notary_pubkeys = notary_pubkeys;
    config.total_identities = 0;
    config.total_verifications = 0;
    config.validity_period = 365 * 24 * 60 * 60; // 1 year
    config.bump = ctx.bumps.config;

    emit!(ConfigInitialized {
        authority: config.authority,
        notary_count: 3,
    });

    Ok(())
}

#[derive(Accounts)]
pub struct InitializeConfig<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Config::INIT_SPACE,
        seeds = [b"config"],
        bump
    )]
    pub config: Account<'info, Config>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[event]
pub struct ConfigInitialized {
    pub authority: Pubkey,
    pub notary_count: u8,
}
