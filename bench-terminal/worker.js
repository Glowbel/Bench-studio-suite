/* bench-terminal — Cloudflare Worker
 *
 * Secrets (set via wrangler secret put):
 *   GITHUB_TOKEN     PAT with repo scope
 *   SESSION_PASSWORD password that gates the UI
 *   PAGES_ORIGIN     (optional) your Pages domain, e.g. https://bench-terminal.pages.dev
 *                    omit to allow any origin (fine for initial setup)
 */

var REPO_OWNER  = "Glowbel";
var REPO_NAME   = "Bench-studio-suite";
var REPO_BRANCH = "main";
var ALLOWED_EXT = [".md", ".html", ".css", ".js", ".json", ".txt"];

addEventListener("fetch", function(event) {
  event.respondWith(handleRequest(event.request));
});

function hasAllowedExtension(path) {
  for (var i = 0; i < ALLOWED_EXT.length; i++) {
    var ext = ALLOWED_EXT[i];
    if (path.length >= ext.length && path.slice(path.length - ext.length) === ext) {
      return true;
    }
  }
  return false;
}

function corsHeaders() {
  var origin = (typeof PAGES_ORIGIN !== "undefined" && PAGES_ORIGIN) ? PAGES_ORIGIN : "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}

function jsonResponse(data, status, cors) {
  var headers = Object.assign({}, cors, { "Content-Type": "application/json" });
  return new Response(JSON.stringify(data), { status: status, headers: headers });
}

function ghHeaders() {
  var token = (typeof GITHUB_TOKEN !== "undefined") ? GITHUB_TOKEN : "";
  return {
    "Authorization": "Bearer " + token,
    "Accept": "application/vnd.github.v3+json",
    "User-Agent": "bench-terminal/1.0",
    "X-GitHub-Api-Version": "2022-11-28"
  };
}

function repoBase() {
  return "https://api.github.com/repos/" + REPO_OWNER + "/" + REPO_NAME;
}

async function getTree(cors) {
  var url = repoBase() + "/git/trees/" + REPO_BRANCH + "?recursive=1";
  var res = await fetch(url, { headers: ghHeaders() });
  if (res.status === 404) {
    return jsonResponse({ error: "not_found", status: 404 }, 404, cors);
  }
  if (res.status === 429) {
    return jsonResponse({ error: "rate_limit", status: 429, reset: res.headers.get("X-RateLimit-Reset") }, 429, cors);
  }
  if (!res.ok) {
    return jsonResponse({ error: "network", status: 500 }, 500, cors);
  }
  var data = await res.json();
  var files = [];
  var tree = data.tree || [];
  for (var i = 0; i < tree.length; i++) {
    if (tree[i].type === "blob" && hasAllowedExtension(tree[i].path)) {
      files.push({ path: tree[i].path, sha: tree[i].sha });
    }
  }
  return jsonResponse(files, 200, cors);
}

async function getFile(path, cors) {
  if (!path) {
    return jsonResponse({ error: "validation", status: 422, detail: "path parameter required" }, 422, cors);
  }
  var url = repoBase() + "/contents/" + path + "?ref=" + REPO_BRANCH;
  var res = await fetch(url, { headers: ghHeaders() });
  if (res.status === 404) {
    return jsonResponse({ error: "not_found", status: 404 }, 404, cors);
  }
  if (res.status === 429) {
    return jsonResponse({ error: "rate_limit", status: 429, reset: res.headers.get("X-RateLimit-Reset") }, 429, cors);
  }
  if (!res.ok) {
    return jsonResponse({ error: "network", status: 500 }, 500, cors);
  }
  var data = await res.json();
  var b64 = data.content.replace(/\n/g, "");
  var content = decodeURIComponent(escape(atob(b64)));
  return jsonResponse({ content: content, sha: data.sha }, 200, cors);
}

async function putFile(request, cors) {
  var body;
  try {
    body = await request.json();
  } catch (e) {
    return jsonResponse({ error: "validation", status: 422, detail: "invalid JSON body" }, 422, cors);
  }
  if (!body.path || body.content === undefined || body.content === null || !body.sha) {
    return jsonResponse({ error: "validation", status: 422, detail: "path, content, and sha are required" }, 422, cors);
  }
  var message = body.message || ("edit: " + body.path);
  var encoded;
  try {
    encoded = btoa(unescape(encodeURIComponent(body.content)));
  } catch (e) {
    return jsonResponse({ error: "validation", status: 422, detail: "content encoding failed" }, 422, cors);
  }
  var url = repoBase() + "/contents/" + body.path;
  var headers = Object.assign({}, ghHeaders(), { "Content-Type": "application/json" });
  var res = await fetch(url, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify({
      message: message,
      content: encoded,
      sha: body.sha,
      branch: REPO_BRANCH
    })
  });
  if (res.status === 409) {
    return jsonResponse({ error: "sha_conflict", status: 409 }, 409, cors);
  }
  if (res.status === 422) {
    var errData = await res.json();
    return jsonResponse({ error: "validation", status: 422, detail: errData.message || "" }, 422, cors);
  }
  if (res.status === 429) {
    return jsonResponse({ error: "rate_limit", status: 429, reset: res.headers.get("X-RateLimit-Reset") }, 429, cors);
  }
  if (!res.ok) {
    return jsonResponse({ error: "network", status: 500 }, 500, cors);
  }
  var result = await res.json();
  var newSha = (result.content && result.content.sha) ? result.content.sha : "";
  return jsonResponse({ newSha: newSha }, 200, cors);
}

async function handleRequest(request) {
  var url      = new URL(request.url);
  var pathname = url.pathname;
  var cors     = corsHeaders();

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: cors });
  }

  var authHeader = request.headers.get("Authorization") || "";
  var password   = (authHeader.indexOf("Bearer ") === 0) ? authHeader.slice(7) : "";
  var expected   = (typeof SESSION_PASSWORD !== "undefined") ? SESSION_PASSWORD : "";
  if (!expected || password !== expected) {
    return jsonResponse({ error: "auth", status: 401 }, 401, cors);
  }

  try {
    if (pathname === "/tree" && request.method === "GET") {
      return await getTree(cors);
    }
    if (pathname === "/file" && request.method === "GET") {
      return await getFile(url.searchParams.get("path"), cors);
    }
    if (pathname === "/file" && request.method === "PUT") {
      return await putFile(request, cors);
    }
    return jsonResponse({ error: "not_found", status: 404 }, 404, cors);
  } catch (e) {
    return jsonResponse({ error: "network", status: 500, detail: e.message }, 500, cors);
  }
}
