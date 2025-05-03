# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Getting Started

### Yarn Installation

Make sure you have [Node.js](https://nodejs.org/en/download/) installed. Then, install Yarn globally using npm:

```bash
$ npm install --global yarn
```

or

```bash
$ npm install yarn@latest (in this case, you will have to use `npx yarn` instead of `yarn`))
```

> If you chose to install Yarn locally using npm, you can skip the next step. Add `npx` before the commands in the next steps.

Install Corepack, an intermediary tool that will let you configure your package manager version on a per-project basis:

```bash
npm install -g corepack
```

```bash
yarn set version stable
yarn install
```

### Installation

(similar to npm install)

```bash
$ yarn
```

### Local Development

```bash
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```bash
$ USE_SSH=true yarn deploy
```

Not using SSH:

```bash
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
