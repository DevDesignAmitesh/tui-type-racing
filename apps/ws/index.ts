import { WebSocketServer } from "ws";
import { generateRoomCode } from "./utils";
import { roomManager } from "@repo/managers/manager";
import { MESSAGE_TYPE, sendWsMessageFromServer, type User, type WsDataFromClient } from "@repo/common/common";

const server  = new WebSocketServer({ port: 8080 });
const MAX_MEMBERS = 4;

server.on("connection", (ws) => {
  console.log("connected")

  ws.on("error", console.error);

  ws.on("message", (data) => {
    const parsedData = JSON.parse(data.toString()) as WsDataFromClient;

    // event: room_create
    if (parsedData.type === "room_create") {
      const { room_name, admin_name, admin_id } = parsedData.payload;

      // generate room_code, admin_id, room_id
      const room_id = crypto.randomUUID();
      const room_code = generateRoomCode();

      // create room
      // push user and add as admin
      roomManager.create({
        id: room_id,
        name: room_name,
        adminId: admin_id,
        code: room_code,
        status: "waiting",
        users: [
          { 
            id: admin_id, 
            name: admin_name, 
            progress: 0, 
            ws 
          }
        ]
      })

      // return room_code, users, adminId
      const room = roomManager.get(room_code)!;      

      sendWsMessageFromServer({
        ws,
        dataToSend: { type: "room_create", payload: { room }}
      })
    }

    // event: room_join
    if (parsedData.type === "room_join") {
      const { room_code, user_name, user_id } = parsedData.payload;
      
      const existingRoom = roomManager.get(room_code);

      if (!existingRoom) return;
      if (existingRoom.users.length >= MAX_MEMBERS) return;
      if (existingRoom.status !== "waiting") return;
      
      roomManager.create({
        ...existingRoom,
        users: [
          ...existingRoom.users,
          { 
            id: user_id, 
            name: user_name, 
            progress: 0, 
            ws, 
          }
        ]
      });

      const room = roomManager.get(room_code)!;
      
      room.users.forEach((usr) => {
        sendWsMessageFromServer({
          ws: usr.ws,
          dataToSend: { type: "room_join", payload: { room }}
        })
      })
    }
    
    // event: room_start
    if (parsedData.type === "room_start") {
      const { room_code, admin_id } = parsedData.payload;

      const existingRoom = roomManager.get(room_code);
      
      if (!existingRoom) return;
      if (existingRoom.adminId !== admin_id) return;
      if (existingRoom.users.length <= 1) return;

      roomManager.create({
        ...existingRoom,
        status: "ongoing"
      });

      const room = roomManager.get(room_code)!;

      room.users.forEach((usr) => {
        sendWsMessageFromServer({
          ws: usr.ws,
          dataToSend: { type: "room_start", payload: { room }}
        })
      })
    }

    // event: room_broad_cast
    if (parsedData.type === "room_broad_cast") {
      const { room_code, user_id, progress } = parsedData.payload;

      const existingRoom = roomManager.get(room_code);
      if (!existingRoom) return;
      if (!existingRoom.users.map((usr) => usr.id).includes(user_id)) return;

      const existingUser = existingRoom.users.find((usr) => usr.id === user_id);
      if (!existingUser) return;
      
      const updatedUser: User = {
        ...existingUser,
        progress,
      }
      
      const filteredUsers = existingRoom.users.filter((usr) => usr.id !== existingUser.id);
      filteredUsers.push(updatedUser);

      roomManager.create({
        ...existingRoom,
        users: filteredUsers
      });
      
      const room = roomManager.get(room_code)!;
      
      room.users.forEach((usr) => {
        sendWsMessageFromServer({
          ws: usr.ws,
          dataToSend: { type: "room_broad_cast", payload: { room }}
        })
      });
    }

    // event: room_cancel_or_leave
    if (parsedData.type === "room_cancel_or_leave") {
      const { room_code, user_id } = parsedData.payload;

      const existingRoom = roomManager.get(room_code);
      if (!existingRoom) return;

      const existingUser = existingRoom.users.find((usr) => usr.id === user_id);
      if (!existingUser) return;

      if (existingRoom.adminId === existingUser.id) {
        existingRoom.users.forEach((usr) => {
          sendWsMessageFromServer({
            ws: usr.ws,
            dataToSend: {
              type: "room_cancelled",
            }
          })
        })

        roomManager.delete(room_code);        
      } else {
        const filteredUsers = existingRoom.users.filter((usr) => usr.id !== existingUser.id);
        
        // if only one person left delete the room
        if (filteredUsers.length <= 1) {
          roomManager.delete(room_code);

          filteredUsers.forEach((usr) => {
            sendWsMessageFromServer({
              ws: usr.ws,
              dataToSend: {
                type: "room_cancelled",
              }
            })
          });
        } else {
          roomManager.create({
            ...existingRoom,
            users: filteredUsers
          });
  
          const room = roomManager.get(room_code)!;
          
          filteredUsers.forEach((usr) => {
            sendWsMessageFromServer({
              ws: usr.ws,
              dataToSend: {
                type: "someone_left",
                payload: {
                  room,
                  user_name: existingUser.name
                }
              }
            })
          });
        }

      }
    }
  })
  
  ws.on("close", () => {
    // TODO: event: room_leave
    console.log("connection closed");
  })  
});
