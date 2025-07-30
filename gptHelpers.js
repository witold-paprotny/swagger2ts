import OpenAI from 'openai'
import { systemPrompt } from './systemPrompt'

const requestConfig = {
  model: 'gpt-4o',
  temperature: 0, // higher the temperature, the more random (and usually creative) the output
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0
}

/**
 *
 * @param {Object} schema
 * @returns
 */
const getRequestbody = schema => {
  const schemaStr = JSON.stringify(schema).replaceAll('\\"', '')

  const userMessage = {
    role: 'user',
    content: schemaStr
  }
  const systemMessage = {
    role: 'system',
    content: systemPrompt
  }

  const requestBody = {
    ...requestConfig,
    messages: [systemMessage, userMessage]
  }

  return requestBody
}

export async function callChatGPT(schemas) {
  const apiKey = process.env.OPENAI_API_KEY
  const openai = new OpenAI({ apiKey })
  const body = getRequestbody(schemas)
  const data = await openai.chat.completions.create(body)

  return data
}
