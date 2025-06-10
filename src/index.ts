#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

async function main() {
  const server = new McpServer({
    name: "mcp-echo-server",
    description: "A simple MCP server that echoes back messages",
    version: "1.0.0",
    capabilities: {
      tools: {},
    },
  });

  // Register the echo tool
  server.tool(
    "echo",
    "Echoes back the provided message",
    {
      message: z.string().describe("The message to echo back"),
    },
    async ({ message }) => {
      return {
        content: [
          {
            type: "text",
            text: `Echo: ${message}`,
          },
        ],
      };
    }
  );

  // Use stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error("MCP Echo Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});