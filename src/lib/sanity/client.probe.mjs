// Tiny probe run in an isolated child process by client.test.ts.
// Prints only booleans -- never prints token/projectId/dataset values.
import { isSanityConfigured, client, serverClient } from './client.ts';

process.stdout.write(JSON.stringify({
  isSanityConfigured,
  clientIsNull: client === null,
  serverClientIsNull: serverClient === null,
}));
