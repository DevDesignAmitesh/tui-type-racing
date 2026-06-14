import React from 'react';
import { Box, Text, useFocus, useInput } from 'ink';

export const Button = ({ label, action }: {
  label: string,
  action: () => void;
}) => {
	// Tells Ink this component can be navigated to via Tab
	const { isFocused } = useFocus(); 

	// Listens for keystrokes only when this button is actively focused
	useInput((_input, key) => {
		if (key.return && isFocused) {
			action();
		}
	});

	return (
		<Box 
			borderStyle="round" 
			borderColor={isFocused ? 'green' : 'gray'} 
			paddingX={2}
		>
			<Text color={isFocused ? 'green' : 'white'} bold={isFocused}>
				{label}
			</Text>
		</Box>
	);
};