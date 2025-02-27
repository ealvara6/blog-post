import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { checkIfUserExists } from '../services/userService';
import { createUserService } from '../services/authService';
import hashPassword from '../utils/hashPassword';

interface LoginBody {
  email: string;
  password: string;
}

interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
}

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const { username, email, password }: CreateUserDTO = req.body;

    const existingUser = await checkIfUserExists(req.body, prisma);
    if (existingUser) {
      const field = existingUser.username === username ? 'username' : 'email';
      res.status(409).json({
        error: `${field} is already associated with an existing account`,
      });
      return;
    }

    const hashedpassword = await hashPassword(password);

    const newUser = await createUserService(prisma, {
      username,
      email,
      password: hashedpassword,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (err) {
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: 'Failed to register user', details: err.message });
      return;
    }
    res.status(500).json({ error: 'An unknown error occured ' });
  }
};

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
