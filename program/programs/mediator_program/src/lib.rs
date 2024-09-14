use anchor_lang::prelude::*;

declare_id!("5uouqLx1UjfdpepWpy9HuvkxxmbWBuS3iwSQBZbnGv5N");
pub mod state;
pub use state::*;

pub mod contexts;
pub use contexts::*;
#[program]
pub mod mediator_program {
    use super::*;

    pub fn make(ctx: Context<Make>, seed: u64, receive: u64, deposit: u64) -> Result<()> {
        ctx.accounts.deposit(deposit)?;
        ctx.accounts.save_escrow(seed, receive, deposit, &ctx.bumps)
    }

    pub fn take(ctx: Context<Take>) -> Result<()> {
        ctx.accounts.deposit()?;
        ctx.accounts.withdraw_and_close_vault()
    }

    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        ctx.accounts.refund_and_close_vault()
    }
}
