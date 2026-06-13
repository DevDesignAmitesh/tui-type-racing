import React, {useEffect, useRef, useState} from 'react';
import {Box, Text, useInput} from 'ink';
import { useWebContext } from '../context/ws.js';

export function GameRoomScreen() {
	const [sentence, setSentence] = useState<string>(
		`The electric guitar echoed softly through the quiet fog-covered valley I just realized the secret to inner peace is simply avoiding pigeons on a windy day`,
	);
	const [counter, setCounter] = useState(0);
	const [query, setQuery] = useState<string>('');
	const [typedChars, setTypedChars] = useState<number>(0);
	const [users, setUsers] = useState<{
		name: string;
		id: string;
		position: number;
	}[]>([
		{
			id: crypto.randomUUID(),
			name: "one",
			position: 10,
		},
		{
			id: crypto.randomUUID(),
			name: "two",
			position: 15,
		},
		{
			id: crypto.randomUUID(),
			name: "three",
			position: 20,
		}
	]);

	const { ws, room } = useWebContext();
	
	function handleCheck(val: string) {
		let to_check_from = sentence.split(' ');
		setTypedChars(p => p + 1);

		if (val === to_check_from[0] + ' ') {
			to_check_from.shift();
			setSentence(to_check_from.join(' '));
			setCounter(p => p + 1);
			setQuery('');
			setSentence(
				p =>
					p +
					'How many words your brain processes while reading text calculated by dividing the total words in the text by the minutes it took you to read it',
			);
		}
	}

	useEffect(() => {
		handleCheck(query);
	}, [query]);

	useEffect(() => {
    if (!ws) return;
    if (!room) return;
    if (room.users.length <= 1) return;

    setInterval(() => {
      ws.send(JSON.stringify({ 
				type: "progress", 
				payload: { data: DEFINE } 
			}));
    }, 100)
  }, [ws]);

	useInput((input, key) => {
		if (progress === MIN) return;

		if (key.return) {
			return;
		} else if (key.ctrl && input === 'w') {
			setQuery('');
		} else if (key.delete) {
			setQuery(p => p.slice(0, -1));
		} else {
			setQuery(p => p + input);
		}
	});	

	const MIN = 30;
	const progress = Math.min(counter, 30);

	const startTime = useRef(Date.now());
	const elapsedMinutes = (Date.now() - startTime.current) / 1000 / 60;

	const wpm = elapsedMinutes > 0 ? Math.round(counter / elapsedMinutes) : 0;

	const accuracy =
		typedChars === 0 ? 100 : Math.round((counter / typedChars) * 100);

	return (
		<Box flexDirection="column" alignItems="center" width="100%">
			{/* Header */}
			<Box
				width="80%"
				borderStyle="round"
				borderColor="greenBright"
				paddingX={1}
			>
				<Text bold color="yellowBright">
					TYPING RACE
				</Text>

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

				{users.map((usr) => (
						<Text key={usr.id}>
						{usr.name} {'─'.repeat(usr.position)}
						🏃
						{'─'.repeat(MIN - usr.position)}
						🏁
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
