# Seeker

> [!NOTE]
> This was an interview process take home, not a real thing.

Find your next thing at [hide-and-go-seeker.vercel.app](https://hide-and-go-seeker.vercel.app/).

## Technology overview

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
- Pexels API https://www.pexels.com/api/
- Hosted on Vercel
- npm preferred (we ignore all other lock files)

## Local development

**Get and set a Pexels API key**

Create a new Pexels application and get an API key at https://www.pexels.com/api/. Make a copy of `.env.example` named `.env.local`. Set the value of `PEXELS_API_KEY` to your API key.

```
PEXELS_API_KEY=1234567890
```

**Install dependencies**

```bash
npm i
```

**Run development server**

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

**To build a production bundle**

```bash
npm run build
```

**To run a production build locally**

```bash
npm start
```

## Deployment

Hosted on Vercel. All code merged into `main` is deployed to production.

All pull requests automatically have a preview deploy created. Check the PR for the URL.

## Code formatting

This project uses Git hooks via husky and lint-staged to format any changed files with Prettier. We follow the [recommended setup](https://prettier.io/docs/en/install#git-hooks).

If you ever need to manually format all code with prettier, run:

```bash
npm run prettier
```
