import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { type CreateRoomScreenInput } from '@repo/common/common';
import { Button } from '../components/button.js';
import { useWebContext } from '../context/ws.js';

export function CreateRoomScreen({
  handleRoomCreation,
}: {
  handleRoomCreation: (admin_name: string, room_name: string) => void; 
}) {
	const [name, setName] = useState<string>('');
	const [roomName, setRoomName] = useState<string>('');
	const [screenInput, setScreenInput] = useState<CreateRoomScreenInput>('name');

	const { setScreen } = useWebContext();
  
	useInput((_input, key) => {
		if (key.downArrow) {
			setScreenInput('room_name');
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
      
      <Text dimColor italic color={'whiteBright'}>
        create room 
      </Text>
      
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
					focus={screenInput === 'room_name'}
					value={roomName}
					onChange={setRoomName}
					placeholder="Enter room name"
				/>
			</Box>

      <Button label='Start room' action={() => handleRoomCreation(name, roomName)} />

      <Box 
        width={"100%"} 
        borderColor={'grey'} 
        borderLeft={false} 
        borderRight={false} 
        borderBottom={false} 
        borderStyle={'single'} 
      />
      
      <Button label='Back' action={() => setScreen("auth")} />
		</Box>
	);
}
