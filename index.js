/**
 * widespread-tools — thin helpers for wiring the Widespread MCP server into
 * agent frameworks (LangChain, Vercel AI SDK, OpenAI Agents, etc.).
 * Non-custodial: keys stay client-side; the bridge only verifies signatures.
 */

export const MCP_URL = "https://widespread-bridge.widespread.workers.dev/mcp";
export const OPENAPI_URL = "https://widespread-bridge.widespread.workers.dev/openapi.json";

/** MCP client config — pass to any MCP-aware framework client. */
export const mcpConfig = {
  remote: { type: "streamable-http", url: MCP_URL },
  local: { command: "uvx", args: ["widespread-mcp"] },
};

/** Tool names exposed on the remote endpoint. */
export const TOOLS = [
  "feed_search", "feed_get", "feed_stats", "runners_list",
  "wide_markets", "wide_bounties",
  "wide_agent_challenge", "wide_agent_register",
  "wide_claim", "wide_ship_prepare", "wide_ship_submit", "wide_status",
];

/** JSON-RPC call helper for the remote endpoint. */
export async function rpc(method, params = {}, { url = MCP_URL } = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  const text = await res.text();
  const m = text.match(/^data: (.*)$/m);
  return JSON.parse(m ? m[1] : text);
}
