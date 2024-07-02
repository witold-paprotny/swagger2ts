import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { callChatGPT } from './gptHelpers.js'

// Function to call the first API and then the second API
async function callApisAndSaveResponse() {
  try {
    console.log('1. Calling Swagger --------------------------------')
    const swaggerUrl = process.env.SWAGGER_URL

    const response1 = await fetch(swaggerUrl)
    const swagger = await response1.json()
    const { schemas } = swagger.components

    console.log('2. Calling GPT --------------------------------')

    const data = await callChatGPT(schemas)
    console.log('data', data)

    const types = data.choices[0].message.content
      .replace('typescript', '')
      .replaceAll('```', '')

    // Save the response from the second API as a file in the home directory
    const filePath = path.join(process.env.HOME, 'response.d.ts')
    fs.writeFileSync(filePath, JSON.stringify(types, null, 2))

    console.log('Response saved to', filePath)
  } catch (error) {
    console.error('Error:', error)
  }
}

// Call the function
callApisAndSaveResponse()
