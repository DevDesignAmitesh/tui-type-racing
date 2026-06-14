#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
// import meow from 'meow';
import App from './app.js';
import { WebSocketContextProvider } from './context/ws.js';

// const cli = meow(
// 	`
// 	Usage
// 	  $ 01

// 	Options
// 		--name  Your name

// 	Examples
// 	  $ 01 --name=Jane
// 	  Hello, Jane
// `,
// 	{
// 		importMeta: import.meta,
// 		flags: {
// 			name: {
// 				type: 'string',
// 			},
// 		},
// 	},
// );

render((
	<WebSocketContextProvider>
		<App />
	</WebSocketContextProvider>
));
