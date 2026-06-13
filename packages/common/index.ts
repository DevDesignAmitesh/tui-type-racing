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
