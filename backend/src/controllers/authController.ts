import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

interface LoginBody {
  email: string;
  password: string;
}

export const verifyLogin = async (req: Request, res: Response) => {
  try {
    const prisma = req.prisma;
    const { email, password }: LoginBody = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ error: 'Email is incorrect' });
      return;
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({ error: 'Password is incorrect' });
      return;
    }

    const payload = { id: user.id, email: user.email };
    const token = sign(payload, process.env.JWT_SECRET || 'jwt_secrect', {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ details: err.message });
      return;
    }
    res.status(500).json({ details: 'An unknown error occured' });
  }
};
