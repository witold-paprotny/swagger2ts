import OpenAI from 'openai'

const requestConfig = {
  model: 'gpt-4o',
  temperature: 0, // higher the temperature, the more random (and usually creative) the output
  max_tokens: 4096,
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
    content: `You will be provided with a json schemas. Your task is to turn it into Type Script interfaces. Additional requirements:
- add keyword 'export'
- sort attributes alphabetically
- turn enums into separate types and use this within interfaces`
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
