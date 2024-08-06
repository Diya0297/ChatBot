import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI()
const systemPrompt = "You are a highly skilled project manager and software development expert. Your role is to assist startups in efficiently managing and solving their backlog of tasks. Provide clear, concise, and actionable advice to help them prioritize and complete their tasks effectively."

export async function POST(req) {
    const data = await req.json()
    const completion = await openai.chat.completions.create({
        messages: [
            {"role": "system", "content": systemPrompt}, ...data],
      model: "gpt-4o-mini",
    });
    console.log(data)
    console.log(completion.choices[0].message.content);
    return NextResponse.json({message: completion.choices[0].message.content},
        {status: 200}
    )
    try {
        const response = await openai.chatCompletion({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: 'Hello!' }],
        });
      } catch (error) {
        if (error.code === 'insufficient_quota') {
          console.error('API quota exceeded. Please try again later or check your OpenAI billing details.');
          // Handle the error gracefully in your application
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
}