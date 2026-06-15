import { CurrentUser, Screen, WsDataFromServer, type Room } from "@repo/common/common";
import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { WS_URL } from "../utils.js";

type WebSocketContext = {
  ws: WebSocket | null;
  room: Room | null;
  roomRef: React.MutableRefObject<Room | null>
  screen: Screen
  setScreen: (val: Screen) => void;
  currentUser: CurrentUser | null;
  currentUserRef: React.MutableRefObject<CurrentUser | null>
  setCurrentUser: (val: CurrentUser) => void;
}

const WebSocketContext = createContext<WebSocketContext | null>(null);

export const WebSocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [room, setRoom] = useState<Room | null>(null)
  const [screen, setScreen] = useState<Screen>("auth")
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const currentUserRef = useRef<CurrentUser | null>(null);
  const roomRef = useRef<Room | null>(null);

  useEffect(() => {
    currentUserRef.current = currentUser
  }, [currentUser])

  useEffect(() => {
    roomRef.current = room
  }, [room])
  
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

      if (parsedData.type === "room_cancelled") {
        setScreen("auth");
        setRoom(null);
      }

      if (parsedData.type === "someone_left") {
        // TODO: add toast notifyy (user_name left the room)
        const { room } = parsedData.payload;
        setRoom(room);
      }

      if (parsedData.type === "room_start") {
        const { room } = parsedData.payload;
        setRoom(room);
        setScreen("running_game")
      }

      if (parsedData.type === "room_broad_cast") {
        const { room } = parsedData.payload;
        setRoom(room);
      }

      if (parsedData.type === "room_ends") {
        const { pos } = parsedData.payload;

        setCurrentUser({
          ...currentUserRef.current!,
          position: pos,
        })
      }
		}
	}, []);


  const value = useMemo(
    () => ({
      ws,
      roomRef,
      screen,
      setScreen,
      currentUserRef,
      currentUser,
      setCurrentUser,
      room,
    }),
    [ws, room, screen, currentUser]
  );
  
  return (
    <WebSocketContext.Provider value={value} >
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("websocket context not found");

  return context;
}