import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  try {
    console.log("=== Chat API Route Called ===")

    // Check if OpenAI API key exists
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error("Missing OPENAI_API_KEY environment variable")
      return Response.json(
        {
          error: "OpenAI API key not configured",
          details: "Please add OPENAI_API_KEY to your .env.local file",
        },
        { status: 500 },
      )
    }

    const { messages } = await req.json()
    console.log("Received messages count:", messages?.length)

    if (!messages || !Array.isArray(messages)) {
      console.error("Invalid messages format:", messages)
      return Response.json({ error: "Invalid messages format" }, { status: 400 })
    }

    console.log("Creating OpenAI stream with model: gpt-4o-mini")

    // This returns immediately without awaiting - non-blocking!
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: "You are a helpful Web3 and DeFi assistant. Keep responses concise and helpful.",
      messages,
      maxTokens: 500,
      temperature: 0.7,
    })

    console.log("Stream created successfully, returning response...")

    // toDataStreamResponse() returns a Response object immediately
    // The actual streaming happens asynchronously
    return result.toDataStreamResponse()
  } catch (error: any) {
    console.error("=== Chat API Error ===")
    console.error("Error type:", error.constructor.name)
    console.error("Error message:", error.message)

    // Return error response immediately
    const errorResponse = {
      error: "Chat API failed",
      details: error.message,
      type: error.constructor.name,
    }

    if (error.message?.includes("401")) {
      errorResponse.details = "Invalid OpenAI API key. Please check your key in the OpenAI dashboard."
    } else if (error.message?.includes("429")) {
      errorResponse.details = "OpenAI API quota exceeded. Check your billing and usage."
    } else if (error.message?.includes("403")) {
      errorResponse.details = "Access forbidden. Your API key may not have access to this model."
    }

    return Response.json(errorResponse, { status: 500 })
  }
}
