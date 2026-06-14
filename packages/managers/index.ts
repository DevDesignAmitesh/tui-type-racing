import { type Room } from "@repo/common/common";

class RoomManager {
  private static instance: RoomManager
  // room_code, full_room_type
  private rooms: Map<number, Room> = new Map();

  static getInstance(): RoomManager {
    if (!RoomManager.instance) RoomManager.instance = new RoomManager(); 
    return RoomManager.instance
  }

  create(room: Room) {
    this.rooms.set(room.code, room)
  }

  get(code: number) {
    return this.rooms.get(code);
  }
  

  delete(code: number) {
    this.rooms.delete(code);
  }
  
}

export const roomManager = RoomManager.getInstance();