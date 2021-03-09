# Trainocate Ecommerce Web

Component for web frontend of Trainocate Ecommerce app.

## Requirements

* `nodejs 12.14.x`
* `yarn`

## Development Setup

1. Install dependencies:

```
yarn install
```

2. Copy `.env` to `.env.dist` and change values accordingly

3. Build and run local development version:

```
./node_modules/.bin/webpack serve --mode development
```

4. Point browser to `http://localhost:8080`

## Deploying to Production

1. Build the app

```
yarn build
```

2. Deploy to S3

```
yarn deploy
```
