import React from 'react';
import { Box, Text } from 'ink';
import { Button } from '../components/button.js';
import { useWebContext } from '../context/ws.js';

export function WaitingAreaScreen() {

  const { room, currentUser } = useWebContext();

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
        waiting area (wait for admin to start the game) 
      </Text>
      
			<Text dimColor italic color={'whiteBright'}>
				use TAB for Buttons
			</Text>


			{room?.users.map((usr, idx) => (
        <Box
          key={usr.id}
          width={'20%'}
          // height={4}
          paddingX={1}
          display='flex'
          alignItems='center'
          // justifyContent='center'
          gap={1}
          borderStyle={'single'}
          borderColor={'cyan'}
			  >
          <Text>{idx + 1}.</Text>

          <Text>{currentUser?.id === usr.id ? "You" : usr.name}</Text>
      </Box>
      ))}

      <Button label='start room' action={() => {}} />

      <Box 
        width={"100%"} 
        borderColor={'grey'} 
        borderLeft={false} 
        borderRight={false} 
        borderBottom={false} 
        borderStyle={'single'} 
      />
      
      <Button label='leave room' action={() => {}} />
      <Button label='cancel room' action={() => {}} />
		</Box>
	);
}
