import { type Room } from "@repo/common/common";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import React from "react";

type WebSocketContext = {
  ws: WebSocket | null;
  room: Room | null;
}


const WebSocketContext = createContext<WebSocketContext | null>(null);

export const WebSocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [room, setRoom] = useState<Room | null>(null)
  
	useEffect(() => {
		const ws = new WebSocket("ws://localhost:8080");
		setWs(ws);

		ws.onmessage = (event) => {
			const parsedData = JSON.parse(event.data);

			if (parsedData.type === "") {
				
			}
		}
	}, []);

  
  return (
    <WebSocketContext.Provider value={{ ws, room }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("websocket context not found");

  return context;
}