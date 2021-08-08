import jose from 'jose';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';

import UCOProvider from '../../../lib/auth/providers/UCOProvider';

const options = {
  session: {
    jwt: true,
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    encode: async ({ secret, token, maxAge }) => {
      const signingOptions: jose.JWT.SignOptions = {
        expiresIn: `${maxAge}s`,
        algorithm: 'HS512',
      };

      return jose.JWT.sign(token as never, secret, signingOptions);
    },
    decode: async ({ secret, token, maxAge }) => {
      if (!token) {
        return null;
      }

      const verificationOptions = {
        maxTokenAge: `${maxAge}s`,
        algorithms: ['RS256', 'HS256', 'RS512', 'HS512'],
      };

      return jose.JWT.verify(token, secret, verificationOptions);
    },
  },
  pages: {
    signIn: '/signIn',
  },
  callbacks: {
    session: async (session, user) => {
      const maxAge = 2592000;
      const secret = process.env.JWT_SECRET || 'changeme';
      const signingOptions: jose.JWT.SignOptions = {
        expiresIn: `${maxAge}s`,
        algorithm: 'HS512',
      };

      delete user.access_token;
      session.roles = user.roles;
      session.id = user.id;
      session.access_token = await jose.JWT.sign(user, secret, signingOptions);

      return session;
    },
    jwt: async (token, user, account, profile) => {
      if (account?.access_token) {
        token.roles = ['ROLE_USER'];
        token.access_token = account.access_token;
        token.id = account.id;
      }
      return Promise.resolve(token);
    },
  },
  providers: [
    UCOProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
} as NextAuthOptions;

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
