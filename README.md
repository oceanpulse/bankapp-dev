This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`]
app).
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

# IMPORTANT: I have deliberately left all environment variables in the codebase for the purpose of this test, it is strictly for education purpose.

This is a development project, using third party sanbox APIs. To get the most out of this project, you need follow these steps.

#1 Sign up with an email and password. There is form validation so make sure your password is 8 characters long. Use a address and location from New York.

#2 Once you are signed up, you will be redirected to the dashboard. Try adding a new bank account by clicking on "connect bank", chose chase bank savings.

#3 Once you have added a bank account, try transfering funds from your checking account to your savings account. Go to "My Banks" and copy the shareable ID of savings account (the long string of characters and numbers).

#4 Go to "Transfer Funds" and fill out the transfer funds form. paste the shareable ID of the savings account in the "To" field. Enter an amount and click on "Transfer Funds". Make sure the amount looks something like this (5.00 or 10.00 or 50.00)

#5 You will be redirected to the dashboard. You should see the transfer in the "Transactions" section.

6# Note -  transfers will only take affect after two days as this was to replicate a real world banking in the USA.
