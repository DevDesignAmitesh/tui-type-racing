export function generateRoomCode(): number {
  return Math.floor(Math.random() * 6 * 10000)
}
