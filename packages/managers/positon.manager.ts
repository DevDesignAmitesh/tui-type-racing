import { type PositionMetaData } from "@repo/common/common";

class PositionManager {
  private static instance: PositionManager

  // room and user based position 
  private positions: Map<string, number> = new Map();

  // room_code, last_updated_postions
  private position: Map<number, number> = new Map();

  static getInstance(): PositionManager {
    if (!PositionManager.instance) PositionManager.instance = new PositionManager(); 
    return PositionManager.instance
  }

  getKey (data: PositionMetaData) {
    return `${data.room_code}:${data.user_id}`
  }

  create(data: PositionMetaData, position: number) {
    // setting user's position
    this.positions.set(this.getKey(data), position);

    // setting last updated position of the room
    this.position.set(data.room_code, position);
  }

  get(data: PositionMetaData) {
    console.log("this.positions", this.positions);
    return this.positions.get(this.getKey(data));
  }

  delete(data: PositionMetaData) {
    this.positions.delete(this.getKey(data));
  }  

  getLastUpdatedPositon(room_code: number) {
    return this.position.get(room_code);
  }
}

export const positionManager = PositionManager.getInstance();