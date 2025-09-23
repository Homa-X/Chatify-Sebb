const UP = "https://chatify-api.up.railway.app";

exports.handler = async function (event) {
  const sub = event.path.replace("/.netlify/functions/chatify", "");
  const url = UP + sub + (event.rawQuery ? `?${event.rawQuery}` : "");

  // 1) CSRF
  const csrfRes = await fetch(UP + "/csrf", { method: "PATCH" });
  const setCookie = csrfRes.headers.get("set-cookie") || "";
  let csrfToken = "";
  try {
    const j = await csrfRes.clone().json();
    csrfToken = j && j.csrfToken ? j.csrfToken : "";
  } catch (_) {
    csrfToken = csrfRes.headers.get("x-csrf-token") || "";
  }

  // 2) Forward
  const auth = event.headers && event.headers.authorization ? event.headers.authorization : "";
  const hasBody = !["GET", "HEAD"].includes(event.httpMethod);
  const init = {
    method: event.httpMethod,
    headers: {
      "content-type": event.headers["content-type"] || "application/json",
      ...(auth ? { authorization: auth } : {}),
      ...(csrfToken ? { "x-csrf-token": csrfToken } : {}),
      ...(setCookie ? { cookie: setCookie } : {}),
    },
    body: hasBody ? event.body : undefined,
  };

  const resp = await fetch(url, init);
  const ct = resp.headers.get("content-type") || "application/json";
  const text = await resp.text();
  return { statusCode: resp.status, headers: { "content-type": ct }, body: text };
};
