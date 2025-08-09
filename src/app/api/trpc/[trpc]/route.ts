import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
// Update the import path below if the router file is located elsewhere
import { appRouter } from '../../../../server/trpc/router'; // <-- Check if this file exists


import { createContext } from '../../../../server/trpc/context'; // <-- Check if this file exists, or update the path accordingly

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };
