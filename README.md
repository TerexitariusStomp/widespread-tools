# widespread-tools

Thin JS helpers for wiring the [Widespread](https://github.com/TerexitariusStomp/widespread-bridge)
MCP server into agent frameworks. Non-custodial — client-held Ed25519 keys.

```js
import { mcpConfig, rpc } from "widespread-tools";

// LangChain / Vercel / OpenAI Agents — pass mcpConfig.remote to your MCP client
// or call tools directly:
const tools = await rpc("tools/list");
```

Remote endpoint: `https://widespread-bridge.widespread.workers.dev/mcp`
Local key-holding server: `uvx widespread-mcp` · Install page: https://widespread-bridge.widespread.workers.dev/install
