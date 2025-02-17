import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
} from 'passport-jwt';
import passport, { use } from 'passport';
import { PrismaClient, User } from '@prisma/client';

interface jwt_payload {
  id: number;
  iat?: number;
  exp?: number;
}

const prisma = new PrismaClient();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'jwt_secret',
};

passport.use(
  new JwtStrategy(
    opts,
    async (jwt_payload: jwt_payload, done: VerifiedCallback) => {
      try {
        const user: User | null = await prisma.user.findUnique({
          where: { id: jwt_payload.id },
        });
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err as Error, false);
      }
    }
  )
);

export default passport;
