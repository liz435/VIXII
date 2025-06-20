// Test endpoint to verify API routes are working
export async function GET() {
  return new Response(
    JSON.stringify({
      message: "API routes are working",
      timestamp: new Date().toISOString(),
      env: {
        hasOpenAIKey: !!process.env.OPENAI_API_KEY,
        nodeEnv: process.env.NODE_ENV,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  )
}
