import { WebSocket as ServerWs } from "ws";

export type Screen = "auth" | "create_room" | "waiting_area" | "running_game"
export type EntryScreenInput = "name" | "room_code"
export type CreateRoomScreenInput = "name" | "room_name"

export type ExtendedWs = ServerWs & { userId: string };

export type User = {
  id: string;
  name: string;
  progress: number;
  position?: number
  ws: ServerWs
}

export type CurrentUser = Omit<User, "ws"> & {
  isAdmin: boolean
}; 

export type Room = {
  id: string;
  name: string;
  status: "completed" | "waiting" | "ongoing";
  code: number;
  adminId: string;
  users: User[]
}

export type PositionMetaData = {
  room_code: number;
  user_id: string
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
      admin_id: string
    }
  } | 
  {
    type: "room_join",
    payload: {
      room_code: number, 
      user_name: string
      user_id: string
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
      user_id: string,
      progress: number
    }
  }
  |
  {
    type: "room_cancel_or_leave",
    payload: {
      room_code: number, 
      user_id: string,
    }
  }
  |
  {
    type: "room_ends",
    payload: {
      room_code: number, 
      user_id: string,
    }
  }
  |
  {
    type: "get_data",
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
  |
  {
    type: "room_cancelled",
  }
  |
  {
    type: "someone_left",
    payload: {
      room: Room,
      user_id: string
      user_name: string
    }
  }
  |
  {
    type: "room_ends",
    payload: {
      room: Room,
      pos: number,
      user_id: string
    }
  }
  |
  {
    type: "get_data",
    payload: {
      totalRooms: number,
      totalUsers: number
    }
  }

export const sendWsMessageFromServer = ({ ws, dataToSend }: { ws: ServerWs, dataToSend: WsDataFromServer }) => {
  ws.send(JSON.stringify(dataToSend))
}

