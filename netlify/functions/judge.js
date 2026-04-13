export default async (request) => {
  try {
    const key = Netlify.env.get("ANTHROPIC_API_KEY");
    const keyInfo = key 
      ? `length=${key.length}, prefix=${key.slice(0,15)}, suffix=${key.slice(-4)}`
      : "MISSING";
    
    const body = await request.json();
    const apiResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(body)
    });
    const text = await apiResponse.text();
    return new Response(
      JSON.stringify({ keyInfo, status: apiResponse.status, anthropicResponse: text }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "function crashed", message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
