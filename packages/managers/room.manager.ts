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

  removeUser(user_id: string) {
    for (let [_code, room] of this.rooms.entries()) {
      if (room.users.map((usr) => usr.id).includes(user_id)) {
        const idx = room.users.map((usr) => usr.id).findIndex(id => id === user_id)
        const user = room.users.find((usr) => usr.id === user_id);
        if (idx == -1) return null;
        console.log("deleting user at", idx);
        room.users.splice(idx, 1)
        return { room, user }
      }
    }
  }

  getRoomCount() {
    return this.rooms.size;
  }

  getUserCount() {
    let count = 0;

    for (const room of this.rooms.values()) {
      count += room.users.length;
    }

    return count;
  }
}

export const roomManager = RoomManager.getInstance();