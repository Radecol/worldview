export default async (request) => {
  try {
    const body = await request.json();
    const apiResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": Netlify.env.get("ANTHROPIC_API_KEY"),
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(body)
    });
    const text = await apiResponse.text();
    return new Response(text, {
      status: apiResponse.status,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "function crashed", message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
