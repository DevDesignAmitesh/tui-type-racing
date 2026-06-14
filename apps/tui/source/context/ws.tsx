import { CurrentUser, Screen, WsDataFromServer, type Room } from "@repo/common/common";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import React from "react";
import { WS_URL } from "../utils.js";

type WebSocketContext = {
  ws: WebSocket | null;
  room: Room | null;
  screen: Screen
  setScreen: (val: Screen) => void;
  currentUser: CurrentUser | null;
  setCurrentUser: (val: CurrentUser) => void;
}

const WebSocketContext = createContext<WebSocketContext | null>(null);

export const WebSocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [room, setRoom] = useState<Room | null>(null)
  const [screen, setScreen] = useState<Screen>("auth")
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

	useEffect(() => {
		const ws = new WebSocket(WS_URL);
		setWs(ws);

		ws.onmessage = (event) => {
			const parsedData = JSON.parse(event.data) as WsDataFromServer;

			if (
          parsedData.type === "room_create" || 
          parsedData.type === "room_join"
        ) {
				const { room } = parsedData.payload;
        setRoom(room);
        setScreen("waiting_area")
			}
		}
	}, []);

  
  return (
    <WebSocketContext.Provider 
      value={{ 
        ws, 
        room, 
        screen, 
        setScreen,
        currentUser,
        setCurrentUser
      }}
    >
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("websocket context not found");

  return context;
}