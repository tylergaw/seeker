# Seeker

Find your next thing at [hide-and-go-seeker.vercel.app](https://hide-and-go-seeker.vercel.app/).

## Create your own

You can host your own version of this site on Vercel. Note that you will need a valid [Pexels API](https://www.pexels.com/api/) key.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftylergaw%2Fseeker&env=PEXELS_API_KEY&envDescription=Pexels%20API%20key&envLink=https%3A%2F%2Fwww.pexels.com%2Fapi%2F)

## Technology overview

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
- Hosted on Vercel
- npm preferred (we ignore all other lock files)

## Local development

**Install dependencies**

```bash
npm i
```

**Run development server**

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

## Deployment

Hosted on Vercel. All code merged into `main` is deployed to production.

All pull requests automatically have a preview deploy created.

## Code formatting

This project uses Git hooks via husky and lint-staged to format any changed files with Prettier. We follow the [recommended setup](https://prettier.io/docs/en/install#git-hooks).

If you ever need to manually format all code with prettier, run:

```bash
npm run prettier
```
