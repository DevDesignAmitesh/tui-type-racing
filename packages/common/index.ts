import { WebSocket } from "ws";

export type Screen = "auth" | "create_room" | "waiting_area" | "running_game"
export type EntryScreenInput = "name" | "room_code"
export type CreateRoomScreenInput = "name" | "room_name"

export type User = {
  id: string;
  name: string;
  progress: number;
  ws: WebSocket
}

export type Room = {
  id: string;
  name: string;
  status: "completed" | "waiting" | "ongoing";
  code: number;
  adminId: string;
  users: User[]
}

export const MESSAGE_TYPE = {
  room_create: "room_create",
  room_join: "room_join",
  room_start: "room_start",
  room_broad_cast: "room_broad_cast"
}

export type WsDataFromClient = 
  {
    type: "room_create",
    payload: {
      room_name: string, 
      admin_name: string
    }
  } | 
  {
    type: "room_join",
    payload: {
      room_code: number, 
      user_name: string
    }
  }
  |
  {
    type: "room_start",
    payload: {
      room_code: number, 
      admin_id: string
    }
  }
  |
  {
    type: "room_broad_cast",
    payload: {
      room_code: number, 
      userId: string,
      progress: number
    }
  }

export const sendWsMessageFromClient = ({ ws, dataToSend }: { ws: WebSocket, dataToSend: WsDataFromClient }) => {
  ws.send(JSON.stringify(dataToSend))
}

export type WsDataFromServer = 
  {
    type: "room_create",
    payload: {
      room: Room
    }
  } | 
  {
    type: "room_join",
    payload: {
      room: Room
    }
  }
  |
  {
    type: "room_start",
    payload: {
      room: Room
    }
  }
  |
  {
    type: "room_broad_cast",
    payload: {
      room: Room
    }
  }

export const sendWsMessageFromServer = ({ ws, dataToSend }: { ws: WebSocket, dataToSend: WsDataFromServer }) => {
  ws.send(JSON.stringify(dataToSend))
}

