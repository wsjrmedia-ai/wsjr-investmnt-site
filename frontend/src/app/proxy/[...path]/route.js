export async function GET(req, { params }) {
  return handleProxy("GET", req, params);
}

export async function POST(req, { params }) {
  return handleProxy("POST", req, params);
}

export async function PUT(req, { params }) {
  return handleProxy("PUT", req, params);
}

export async function DELETE(req, { params }) {
  return handleProxy("DELETE", req, params);
}

async function handleProxy(method, req, params) {
  const { path } = params;
  const url = `http://40.172.159.105/api/${path.join("/")}`;

  let body;
  if (method !== "GET" && method !== "DELETE") {
    body = await req.json();
  }

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
