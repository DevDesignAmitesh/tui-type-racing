import { type PositionMetaData } from "@repo/common/common";

class PositionManager {
  private static instance: PositionManager
  private positions: Map<PositionMetaData, number> = new Map();

  // room_code, last_updated_postions
  private position: Map<number, number> = new Map();

  static getInstance(): PositionManager {
    if (!PositionManager.instance) PositionManager.instance = new PositionManager(); 
    return PositionManager.instance
  }

  create(data: PositionMetaData, position: number) {
    this.positions.set(data, position);
    this.position.set(data.room_code, position);
  }

  get(data: PositionMetaData) {
    return this.positions.get(data);
  }

  delete(data: PositionMetaData) {
    this.positions.delete(data);
  }  

  getLastUpdatedPositon(room_code: number) {
    return this.position.get(room_code);
  }
}

export const positionManager = PositionManager.getInstance();