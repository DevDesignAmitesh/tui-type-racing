import React, { useCallback } from 'react';
import { Box, Text } from 'ink';
import { Button } from '../components/button.js';
import { useWebContext } from '../context/ws.js';
import { sendWsMessageFromClient } from '@repo/common/common';

export function WaitingAreaScreen() {
  const { room, currentUser, ws } = useWebContext();

  const leaveOrCancelRoom = useCallback((room_code: number, user_id: string) => {
    if (!ws) return;

    sendWsMessageFromClient({
      ws,
      dataToSend: {
        type: "room_cancel_or_leave",
        payload: {
          room_code,
          user_id
        }
      }
    })
  }, [ws])
  
  const startRoom = useCallback((room_code: number, admin_id: string) => {
    if (!ws) return;

    sendWsMessageFromClient({
      ws,
      dataToSend: {
        type: "room_start",
        payload: {
          admin_id,
          room_code
        }
      },
    })
  }, [ws])
  
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

			<Text color={'whiteBright'}>
				CODE: ({room?.code})
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

      {currentUser?.isAdmin && <Button label='start room' action={() => startRoom(room!.code, currentUser!.id)} />}

      <Box 
        width={"100%"} 
        borderColor={'grey'} 
        borderLeft={false} 
        borderRight={false} 
        borderBottom={false} 
        borderStyle={'single'} 
      />
      
      <Button 
        label={currentUser?.isAdmin ? "cancel room" : "leave room"} 
        action={() => leaveOrCancelRoom(room!.code, currentUser!.id)} 
      />
		</Box>
	);
}
