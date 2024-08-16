use anchor_lang::prelude::*;

declare_id!("7PySDr54fh8HTupqkRsABh9Hn1wEnjb3xE8jQ2wQMo6v");
pub mod state;
pub use state::*;

pub mod contexts;
pub use contexts::*;
#[program]
pub mod mediator_program {
    use super::*;

    pub fn make(ctx: Context<Make>, seed: u64, receive: u64, deposit: u64) -> Result<()> {
        ctx.accounts.deposit(deposit)?;
        ctx.accounts.save_escrow(seed, receive, &ctx.bumps)
    }

    pub fn take(ctx: Context<Take>) -> Result<()> {
        ctx.accounts.deposit()?;
        ctx.accounts.withdraw_and_close_vault()
    }

    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        ctx.accounts.refund_and_close_vault()
    }
}
