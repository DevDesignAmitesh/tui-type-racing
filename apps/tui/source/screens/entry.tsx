import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { type Screen, type EntryScreenInput } from '@repo/common/common';
import { Button } from '../components/button.js';
import { useWebContext } from '../context/ws.js';

export function EntryScreen({
  handleRoomJoin,
}: {
  handleRoomJoin: (user_name: string, room_code: number) => void; 
}) {
	const [name, setName] = useState<string>('');
	const [roomCode, setRoomCode] = useState<number>(0);
	const [screenInput, setScreenInput] = useState<EntryScreenInput>('name');
  
	const { setScreen } = useWebContext();
	
	useInput((_input, key) => {
		if (key.downArrow) {
			setScreenInput('room_code');
		} else if (key.upArrow) {
			setScreenInput('name');
		}
	});

	return (
		<Box
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    width={'100%'}
    borderStyle={'single'}
    borderColor={'blue'}
    display="flex"
		>
      
      <Box marginBottom={2}>
        <Text dimColor bold  color={'whiteBright'}>
          TYPE RACER
        </Text>
      </Box>

      <Text dimColor italic color={'whiteBright'}>
        Use ↑ and ↓ for Input Boxes
      </Text>
      <Text dimColor italic color={'whiteBright'}>
        and TAB for Buttons
      </Text>
      
			<Box
        marginTop={2}
				width={'50%'}
				borderStyle={'doubleSingle'}
				borderColor={'cyanBright'}
			>
				<TextInput
					focus={screenInput === 'name'}
					value={name}
					onChange={setName}
					placeholder="Enter your name"
          />
			</Box>

			<Box
				width={'50%'}
				borderStyle={'doubleSingle'}
				borderColor={'cyanBright'}
			>
				<TextInput
					focus={screenInput === 'room_code'}
					value={String(roomCode)}
					onChange={(val) => setRoomCode(Number(val))}
					placeholder="Join room with code (456789)"
				/>
			</Box>

      <Button label='Join room' action={() => handleRoomJoin(name, roomCode)} />

      <Box 
        width={"100%"} 
        borderColor={'grey'} 
        borderLeft={false} 
        borderRight={false} 
        borderBottom={false} 
        borderStyle={'single'} 
      />
      
      <Button label='Create room' action={() => setScreen("create_room")} />
		</Box>
	);
}
