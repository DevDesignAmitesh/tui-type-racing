import { sendWsMessageFromClient, WsDataFromServer } from "@repo/common/common";
import { WS_URL } from "./utils.js";

const ws = new WebSocket(WS_URL);

ws.onopen = () => {
  sendWsMessageFromClient({ ws, dataToSend: { type:"get_data" }})
}

ws.onmessage = (event) => {
  const parsedData = JSON.parse(event.data) as WsDataFromServer

  if (parsedData.type === "get_data") {
    console.log(parsedData.payload);
  }
}