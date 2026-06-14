import React, { useCallback, useState } from 'react';
import { MESSAGE_TYPE, sendWsMessageFromClient, type Screen } from "@repo/common/common";
import { EntryScreen } from './screens/entry.js';
import { CreateRoomScreen } from "./screens/create-room.js";
import { WaitingAreaScreen } from './screens/waiting-area.js';
import { Text } from 'ink';
import { GameRoomScreen } from './screens/game-room.js';
import { useWebContext } from './context/ws.js';


export default function App() {
	const { ws, screen, setCurrentUser } = useWebContext();

	const handleRoomJoin = useCallback((user_name: string, room_code: number) => {
		if (!ws || !user_name || !room_code) return;
		
		const user_id = crypto.randomUUID();
		
		setCurrentUser({
			id: user_id,
			name: user_name,
			progress: 0,
			isAdmin: false
		})
		
		sendWsMessageFromClient({
			ws,
			dataToSend: {
				type: "room_join",
				payload: { room_code, user_name, user_id }
			}
		})
	}, [ws])

	const handleRoomCreation = useCallback((admin_name: string, room_name: string) => {
		if (!ws || !admin_name || !room_name) return;
		
		const admin_id = crypto.randomUUID();
		
		setCurrentUser({
			id: admin_id,
			name: admin_name,
			progress: 0,
			isAdmin: true
		})

		sendWsMessageFromClient({
			ws,
			dataToSend: {
				type: "room_create",
				payload: { admin_name, room_name, admin_id }
			}
		})

		// TODO: send request to the server (ws) for creating room
		// setScreen("waiting_area")
	}, [ws])

	if (screen === "auth") {
		return <EntryScreen handleRoomJoin={handleRoomJoin} />
	} else if (screen === "create_room") {
		return <CreateRoomScreen handleRoomCreation={handleRoomCreation} />
	} else if (screen === "waiting_area") {
		return <WaitingAreaScreen />
	} else if (screen === "running_game") {
		return <GameRoomScreen />
	}

	return <Text>Invalid Screen Type</Text>
}
