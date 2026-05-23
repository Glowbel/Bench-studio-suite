# Bench Terminal

A browser-based GitHub file editor for surgical iteration on `Glowbel/Bench-studio-suite`.

Two pieces:
- **`worker.js`** — Cloudflare Worker. Holds secrets. Proxies GitHub API calls.
- **`index.html`** — Static UI. Deployed to Cloudflare Pages. Never sees the GitHub PAT.

---

## Setup

### 1. Create a GitHub Personal Access Token

1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Name it `bench-terminal`
4. Set expiration as desired
5. Check the `repo` scope (full control of private repositories)
6. Click **Generate token** — copy it immediately, it won't be shown again

---

### 2. Install Wrangler (Cloudflare CLI)

```
npm install -g wrangler
wrangler login
```

---

### 3. Create the Cloudflare Worker

In the Cloudflare dashboard:

1. Go to **Workers & Pages → Create → Worker**
2. Name it `bench-terminal`
3. Skip the default code — you'll deploy `worker.js` via CLI

Or via CLI:

```
wrangler deploy worker.js --name bench-terminal --compatibility-date 2024-01-01
```

---

### 4. Set Worker secrets

Run each of these and paste the value when prompted:

```
wrangler secret put GITHUB_TOKEN --name bench-terminal
```
Paste your GitHub PAT from step 1.

```
wrangler secret put SESSION_PASSWORD --name bench-terminal
```
Choose a strong password. This is what you'll type into the terminal UI each session.

```
wrangler secret put PAGES_ORIGIN --name bench-terminal
```
Paste your Cloudflare Pages domain once you know it (step 6), e.g. `https://bench-terminal.pages.dev`.
You can skip this for initial testing — it defaults to allowing all origins.

---

### 5. Deploy the Worker and note its URL

```
wrangler deploy worker.js --name bench-terminal --compatibility-date 2024-01-01
```

After deploy, Wrangler prints the Worker URL. It looks like:
```
https://bench-terminal.YOUR-ACCOUNT.workers.dev
```

Copy this URL.

---

### 6. Paste the Worker URL into index.html

Open `index.html` in a text editor. Near the top of the `<script>` block, find:

```javascript
var WORKER_URL = "WORKER_URL_HERE";
```

Replace `WORKER_URL_HERE` with the URL from step 5, including `https://`. Example:

```javascript
var WORKER_URL = "https://bench-terminal.abc123.workers.dev";
```

Save the file.

---

### 7. Deploy index.html to Cloudflare Pages

Option A — Cloudflare dashboard:
1. Go to **Workers & Pages → Create → Pages → Upload assets**
2. Name the project `bench-terminal`
3. Upload `index.html`
4. Click **Deploy**

Option B — Wrangler CLI (requires a `wrangler.toml` pointing at the directory):
```
wrangler pages deploy . --project-name bench-terminal
```

After deploy, your Pages URL will be something like `https://bench-terminal.pages.dev`.

---

### 8. Lock down CORS (recommended)

Once you know your Pages URL, run:

```
wrangler secret put PAGES_ORIGIN --name bench-terminal
```

Paste your Pages URL, e.g. `https://bench-terminal.pages.dev`.
This restricts the Worker to only accept requests from that origin.

---

## Usage

1. Open your Cloudflare Pages URL in a browser
2. Type the `SESSION_PASSWORD` you set in step 4
3. Click **connect** — the file tree loads
4. Click any file to open it in the editor
5. Edit, then click **review & commit** in the bottom bar
6. Review the diff, edit the commit message, click **confirm commit**

The commit goes directly to `main` of `Glowbel/Bench-studio-suite`.

---

## Rotating credentials

**Rotate the password:**
```
wrangler secret put SESSION_PASSWORD --name bench-terminal
```
Type the new password. Takes effect immediately — old sessions (browser tabs) will get 401 on next action.

**Rotate the GitHub PAT:**
1. In GitHub, generate a new token with `repo` scope
2. Run: `wrangler secret put GITHUB_TOKEN --name bench-terminal`
3. Paste the new token
4. Revoke the old token in GitHub once confirmed working

---

## Architecture note

The GitHub PAT lives only in Cloudflare Worker secrets — never in the browser, never in `index.html`.
The `SESSION_PASSWORD` lives in memory only (not localStorage, not cookies) — it's re-entered each browser session.
