# README

## Introduction

Script to get JSON Schemas from a given URL and save file (`schemas.js`) with them to a local directory. Based on the Schemas connects to OpenAPI and gets TS Types (`types.d.ts`).

## Setup

1. Create `.env` file in the root directory and add the following environment variables:

```env
SWAGGER_URL=<SWAGGER SWAGGER_URL>/v3/api-docs
OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
ROOT_FILES_PATH=/src/swagger
```

2. Link the Script to global packages - from this package directory:

```bash
npm link
```

## Run the script

### Only script

In your project directory, run:

```bash
npx swagger2types
```

### Script and code formatting

Run all the commands:

```bash
npx schema2types
npx prettier --write src/swagger/schemas.js
npx prettier --write src/swagger/types.d.td
```

### Script with code formatting with `npm`

- add to `package.json`:

```json
"scripts": {
  "schema2types": "npx schema2types && npx prettier --write src/swagger/schemas.js && npx prettier --write src/swagger/types.d.ts"
}
```

- run:

```bash
npm run schema2types
```
