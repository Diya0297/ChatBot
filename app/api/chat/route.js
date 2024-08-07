import { NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

// Initialize OpenAI client
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function POST(request) {
  try {
    const { messages } = await request.json()

    // Request to OpenAI API
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // You can use 'gpt-3.5-turbo' or 'gpt-4'
      messages: messages,
    })

    // Return the response from OpenAI
    return NextResponse.json(response.data.choices[0].message.content)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}

// import { NextResponse } from 'next/server'
// import OpenAI from 'openai'

// const openai = new OpenAI()
// const systemPrompt = "You are a highly skilled project manager and software development expert. Your role is to assist startups in efficiently managing and solving their backlog of tasks. Provide clear, concise, and actionable advice to help them prioritize and complete their tasks effectively."

// export async function POST(req) {
//     const data = await req.json()
//     const completion = await openai.chat.completions.create({
//         messages: [
//             {"role": "system", "content": systemPrompt}, ...data],
//       model: "gpt-4o-mini",
//     });
//     console.log(data)
//     console.log(completion.choices[0].message.content);
//     return NextResponse.json({message: completion.choices[0].message.content},
//         {status: 200}
//     )
//     try {
//         const response = await openai.chatCompletion({
//           model: 'gpt-4o-mini',
//           messages: [{ role: 'user', content: 'Hello!' }],
//         });
//       } catch (error) {
//         if (error.code === 'insufficient_quota') {
//           console.error('API quota exceeded. Please try again later or check your OpenAI billing details.');
//           // Handle the error gracefully in your application
//         } else {
//           console.error('An unexpected error occurred:', error);
//         }
//       }
// }
