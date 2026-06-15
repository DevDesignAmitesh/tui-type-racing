import React, {useEffect, useRef, useState} from 'react';
import {Box, Text, useInput} from 'ink';
import { useWebContext } from '../context/ws.js';
import { sendWsMessageFromClient } from '@repo/common/common';
import { getRandomSentence } from '../random-fn.js';

export function GameRoomScreen() {
	const [sentence, setSentence] = useState<string>(getRandomSentence());
	const [counter, setCounter] = useState(0);
	const [query, setQuery] = useState<string>('');
	const [typedChars, setTypedChars] = useState<number>(0);

	const { ws, roomRef, currentUserRef, room } = useWebContext();
	
	function handleCheck(val: string) {
		let to_check_from = sentence.split(' ');
		setTypedChars(p => p + 1);

		if (val === to_check_from[0] + ' ') {
			to_check_from.shift();
			setSentence(to_check_from.join(' '));
			setCounter(p => p + 1);
			setQuery('');
			setSentence( p => p + getRandomSentence());
		}
	}

	const MIN = 10;
	const progress = Math.min(counter, MIN);
	
	const startTime = useRef(Date.now());
	const elapsedMinutes = (Date.now() - startTime.current) / 1000 / 60;
	
	const wpm = elapsedMinutes > 0 ? Math.round(counter / elapsedMinutes) : 0;
	
	const accuracy =
		typedChars === 0 ? 100 : Math.round((counter / typedChars) * 100);

	useEffect(() => {
		handleCheck(query);
	}, [query]);

	const progressRef = useRef(progress);
	
	useEffect(() => {
		progressRef.current = progress;
	}, [progress]);
	
	useEffect(() => {
		if (!ws) return;
		
		const interval = setInterval(() => {
			if (roomRef.current.users.length <= 1) return;
			if (currentUserRef.current.position !== undefined) return;

			if (progressRef.current >= MIN) {
				sendWsMessageFromClient({
					ws,
					dataToSend: { 
						type: "room_ends", 
						payload: {
							user_id: currentUserRef.current.id,
							room_code: roomRef.current.code
						} 
					}
				});
			}
			
			sendWsMessageFromClient({
				ws,
				dataToSend: {
					type: "room_broad_cast",
					payload: {
						progress: progressRef.current,
						room_code: roomRef.current.code,
						user_id: currentUserRef.current.id,
					},
				},
			});
		}, 3 * 1000);

		return () => clearInterval(interval);
	}, [ws]);

	useInput((input, key) => {
		if (progress === MIN) return;

		if (key.ctrl && input === "c") {
			process.exit(1);
		} else if (key.return) {
			return;
		} else if (key.ctrl && input === 'w') {
			setQuery('');
		} else if (key.delete) {
			setQuery(p => p.slice(0, -1));
		} else {
			setQuery(p => p + input);
		}
	});

	return (
		<Box flexDirection="column" alignItems="center" width="100%">
			{/* Header */}
			<Box
				width="80%"
				borderStyle="round"
				borderColor="greenBright"
				paddingX={1}
			>
				{/* <Text bold color="yellowBright">
					TYPING RACE
				</Text> */}

				<Text>
					{'  '}• Words: {counter}
				</Text>
				<Text>
					{'  '}• WPM: {wpm}
				</Text>
				<Text>
					{'  '}• Accuracy: {accuracy}
				</Text>
			</Box>

			{/* Future multiplayer section */}
			<Box marginTop={1} width="80%" flexDirection="column">
				<Text bold color="cyanBright">
					Players
				</Text>

				{room.users.map((usr) => (
					<Text key={usr.id}>
						{usr.name} {'─'.repeat(usr.progress)}
						🏃
						{'─'.repeat(MIN - usr.progress)}
						🏁
						{" "} {usr.position && `Position: ${usr.position}`}
					</Text>
				))}
			</Box>

			{/* Target text */}
			<Box marginTop={2} width="80%" flexDirection="column">
				<Text bold color="cyanBright">
					Target
				</Text>

				<Box borderStyle="round" borderColor="cyanBright" paddingX={1}>
					<Text wrap="truncate-end">
						<Text color="greenBright">{sentence.split(' ')[0]}</Text>

						<Text dimColor> {sentence.split(' ').slice(1).join(' ')}</Text>
					</Text>
				</Box>
			</Box>

			{/* Input */}
			<Box marginTop={1} width="80%" flexDirection="column">
				<Text bold color="magentaBright">
					Input
				</Text>

				<Box borderStyle="round" borderColor="greenBright" paddingX={1}>
					<Text color="greenBright">{'> '}</Text>

					<Text
						dimColor={progress === MIN ? false : query === ''}
						color={progress === MIN ? 'yellowBright' : ''}
					>
						{progress === MIN
							? 'Done wait for others now'
							: query || 'Start typing...'}
					</Text>
				</Box>
			</Box>

			{/* Footer */}
			<Box marginTop={1}>
				<Text dimColor>Ctrl+W → Clear input</Text>
			</Box>
		</Box>
	);
}
