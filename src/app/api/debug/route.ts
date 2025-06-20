import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function GET() {
  try {
    console.log("=== OpenAI Debug Test ===")

    // Check if API key exists
    const apiKey = process.env.OPENAI_API_KEY
    console.log("API Key exists:", !!apiKey)
    console.log(
      "API Key format:",
      apiKey ? `${apiKey.substring(0, 7)}...${apiKey.substring(apiKey.length - 4)}` : "Not found",
    )

    if (!apiKey) {
      return Response.json({
        success: false,
        error: "OPENAI_API_KEY environment variable not found",
        suggestions: [
          "Create a .env.local file in your project root",
          "Add: OPENAI_API_KEY=your_key_here",
          "Restart your development server",
        ],
      })
    }

    // Test the API key with a simple request
    console.log("Testing OpenAI API key...")

    const result = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: "Say 'Hello, API key is working!'",
      maxTokens: 20,
    })

    console.log("OpenAI API test successful:", result.text)

    return Response.json({
      success: true,
      message: "OpenAI API key is working correctly",
      testResponse: result.text,
      usage: result.usage,
    })
  } catch (error: any) {
    console.error("OpenAI API test failed:", error)

    let errorDetails = {
      success: false,
      error: error.message,
      type: error.constructor.name,
    }

    // Specific error handling for common OpenAI issues
    if (error.message?.includes("401")) {
      errorDetails = {
        ...errorDetails,
        error: "Invalid API key - 401 Unauthorized",
      }
    } else if (error.message?.includes("429")) {
      errorDetails = {
        ...errorDetails,
        error: "Rate limit exceeded - 429 Too Many Requests",
      }
    } else if (error.message?.includes("403")) {
      errorDetails = {
        ...errorDetails,
        error: "Forbidden - 403",
      }
    }

    return Response.json(errorDetails, { status: 500 })
  }
}
