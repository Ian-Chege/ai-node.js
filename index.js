import 'dotenv/config'
import OpenAI from "openai"

const openai = new OpenAI()
const results = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
        {
            role: 'system',
            content: 'You are an AI assistant, answer any questions to the best of your ability'
        },
        {
            role: 'user',
            content: 'What is the difference between types any and unknown when it comes to using Typescript?'
        }
    ],
})

console.log(results.choices[0].message.content)