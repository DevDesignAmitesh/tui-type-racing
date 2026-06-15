export const WS_URL = 
  process.env["NODE_ENV"] === "production" 
    ? "wss://tui-typer-be.amitesh.work"
    : "ws://localhost:8080" 
