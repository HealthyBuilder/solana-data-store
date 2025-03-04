use anchor_lang::prelude::*;

declare_id!("4SLmpsdoK7cmC8BsibuL3oQNqA8uVuVxiwdcLemDsqte");

#[program]
pub mod solana_data_store {
    use super::*;

    pub fn create(ctx: Context<Create>, data: String) -> Result<()> {
        let account = &mut ctx.accounts.data_account;
        account.data = data;
        Ok(())
    }

    pub fn update(ctx: Context<Update>, new_data: String) -> Result<()> {
        let account = &mut ctx.accounts.data_account;
        account.data = new_data;
        Ok(())
    }

    pub fn delete(_ctx: Context<Delete>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = signer, space = 8 + 64)]
    pub data_account: Account<'info, DataAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub data_account: Account<'info, DataAccount>,
}

#[derive(Accounts)]
pub struct Delete<'info> {
    #[account(mut, close = signer)]
    pub data_account: Account<'info, DataAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
}

#[account]
pub struct DataAccount {
    pub data: String,
}
