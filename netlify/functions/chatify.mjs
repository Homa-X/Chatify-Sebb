export async function handler(event) {
  const upstream = "https://chatify-api.up.railway.app";
  const subpath = event.path.replace("/.netlify/functions/chatify", "");
  const targetUrl = upstream + subpath + (event.rawQuery ? `?${event.rawQuery}` : "");

  const csrfRes = await fetch(upstream + "/csrf", { method: "PATCH" });
  const setCookie = csrfRes.headers.get("set-cookie") || "";
  let csrfToken = "";
  try {
    const j = await csrfRes.clone().json();
    csrfToken = j?.csrfToken || "";
  } catch {
    csrfToken = csrfRes.headers.get("x-csrf-token") || "";
  }

  const auth = event.headers?.authorization || "";
  const hasBody = !["GET", "HEAD"].includes(event.httpMethod);
  const forwardInit = {
    method: event.httpMethod,
    headers: {
      "content-type": event.headers["content-type"] || "application/json",
      ...(auth ? { authorization: auth } : {}),
      ...(csrfToken ? { "x-csrf-token": csrfToken } : {}),
      ...(setCookie ? { cookie: setCookie } : {}),
    },
    body: hasBody ? event.body : undefined,
  };

  const resp = await fetch(targetUrl, forwardInit);
  const contentType = resp.headers.get("content-type") || "application/json";
  const bodyText = await resp.text();
  return {
    statusCode: resp.status,
    headers: { "content-type": contentType },
    body: bodyText,
  };
}
