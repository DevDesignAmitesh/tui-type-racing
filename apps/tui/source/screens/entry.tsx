import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { type Screen, type EntryScreenInput } from '@repo/common/common';
import { Button } from '../components/button.js';

export function EntryScreen({
  handleRoomJoin,
  setScreen,
}: {
  handleRoomJoin: (name: string, room_code: string) => void; 
  setScreen: (input: Screen) => void;
}) {
	const [name, setName] = useState<string>('');
	const [roomCode, setRoomCode] = useState<string>('');
	const [screenInput, setScreenInput] = useState<EntryScreenInput>('name');
  
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
					value={roomCode}
					onChange={setRoomCode}
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
