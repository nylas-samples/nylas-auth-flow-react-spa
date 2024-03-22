# Nylas SPA Authentication Flow

This repo shows you how to setup and authenticate users using [Nylas Hosted Authentication](https://developer.nylas.com/docs/v3/auth/hosted-oauth-accesstoken/#creatte-grants-with-oauth-20-and-pkce) for mobile and web browsers. 

## Setup

### System dependencies

- Node.js v20.x

### Gather environment variables

You'll need the following values from the [Nylas Dashboard](https://dashboard-v3.nylas.com):

```text
NEXT_PUBLIC_NYLAS_CLIENT_ID = ""
NEXT_PUBLIC_NYLAS_CALLBACK_URI = ""
NEXT_PUBLIC_NYLAS_API_URI = "https://api.us.nylas.com/v3" or "https://api.eu.nylas.com/v3"
NEXT_PUBLIC_EMAIL_TO_AUTHENTICATE = 
```

Add the above values to a `.env.local` file. We are appending `NEXT_PUBLIC_` to ensure the values are available in the browser, as per [Next documentation](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#loading-environment-variables).

The `.env.local` file is added to `.gitignore`. Ensure to store these values securely.

In the Nylas Dashboard, we will need to set up hosted authentication with the `NEXT_PUBLIC_NYLAS_CALLBACK_URI` set as a possible Callback Uri. Ensure the Platform is set to `JavaScript`, not `Web`:

<img width="738" alt="Screenshot 2024-03-25 at 12 38 24 PM" src="https://github.com/nylas-samples/nylas-auth-flow-react-spa/assets/553578/74ea88f7-1a64-4950-afae-89b70b900637">

### Install dependencies

```bash
$ npm i
```

If you receive an error installing `@nylas-identity`, the repository may not be publicly available, so complete the following steps:

0) Try running `npm i nylas-identity`, if this does not work, complete the remaining steps below (1 - 5)
1) Clone `http://github.com/nylas/nylas-identity` locally into `nylas-identity`
2) cd `nylas-identity` and run `npm i` followed by `npm build`
3) Type `pwd` to determine the path where `nylas-identity is installed
4) Return to this repository (`/nylas-auth-flow-react-spa`) and install `@nylas-idenity` from local directory by typing:
```
npm i <PATH_TO_NYLAS_IDENTIY_FOLDER>
```
5) Confirm `@nylas-identity` is installed by checking the package.json:
```
 "@nylas/identity": "file:../nylas-identity",
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

```
# Terminal Output
> nylas-identity-react-spa@0.1.0 dev
> next dev

   ▲ Next.js 14.1.3
   - Local:        http://localhost:3000
   - Environments: .env

 ✓ Ready in 1140ms
```

Open the specified `Local` value with your browser to see the result. Ensure the domain specified for `Local` matches the `NEXT_PUBLIC_NYLAS_CALLBACK_URI` specified in the environment variables to ensure hosted authentication works.

Once the application is loaded by running `npm run dev`, click on `Connect` to connect an account.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Get support

If you found a bug or want to suggest a new [feature/use case/sample], please join our [Developer Forums](http://forums.nylas.com) and share.

## Learn more

Visit our [Nylas documentation](https://developer.nylas.com/) to learn more.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
