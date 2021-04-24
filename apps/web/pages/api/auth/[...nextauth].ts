import jose from 'jose';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';

import UCOProvider from '../../../lib/auth/providers/UCOProvider';

const options = {
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
      if (!token) return null;

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
