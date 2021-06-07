import { Connection, createConnection } from 'mongoose';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';

export const DatabaseProvider = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<Connection> =>
      await createConnection(process.env.NODE_MONGODB_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
  },
];
