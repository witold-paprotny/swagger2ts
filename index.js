#!/usr/bin/env node
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { callChatGPT } from './gptHelpers.js'

const schemasHeader = `// Schemas from Swagger (api-docs/components/schemas) goes in here.
// Do not modify schemas in here. Do that in another files.
// Overwrite the schemas with _.merge if you need to modify them.
// Example src/components/Users/Form/schema.js

export const schemas = {`

// Function to call the first API and then the second API
async function callApisAndSaveResponse() {
  try {
    const rootFolder = path.join(process.cwd(), process.env.ROOT_FILES_PATH)
    console.log('1. Calling Swagger --------------------------------')
    const swaggerUrl = process.env.SWAGGER_URL
    console.log('- Swagger url', swaggerUrl)
    const response1 = await fetch(swaggerUrl)
    const swagger = await response1.json()
    const { schemas } = swagger.components
    console.log('- I have Schemas!')
    // Save the response from the first API as a file
    const fileSchemasPath = path.join(rootFolder, 'schemas.js')
    const schemasWithHeader = JSON.stringify(schemas, null, 2).replace(
      '{',
      schemasHeader
    )

    fs.writeFileSync(fileSchemasPath, schemasWithHeader)
    console.log('- schemas saved to', fileSchemasPath)

    console.log('2. Calling GPT --------------------------------')

    const data = await callChatGPT(schemas)
    console.log('data', data)

    let types = data.choices[0].message.content
      .replace('typescript', '')
      .replaceAll('```', '')
      .trim()

    // Save the response from the second API as a file.
    const filePath = path.join(rootFolder, 'types.d.ts')
    fs.writeFileSync(filePath, types)

    console.log('Response saved to', filePath)
  } catch (error) {
    console.error('Error:', error)
  }
}
// const pathLocal = path.resolve(process.cwd(), '.env')

// Emulate the __dirname and __filename variables in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pathLocal = path.resolve(__dirname, '.env')
// Load environment variables from the .env file
dotenv.config({ path: pathLocal })

// Call the function
callApisAndSaveResponse()
