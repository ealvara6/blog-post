import { Request, Response } from 'express';
import {
  findUser,
  getUsersService,
  updateUserService,
} from '../services/userService';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const prisma = req.prisma;
    let users = await getUsersService(prisma);
    res.status(200).json({
      users,
    });
  } catch (err) {
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: 'Failed to fetch users', details: err.message });
      return;
    }
    res.status(500).json({ error: 'An unknown error occured ' });
  }
};

export const getOneUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const id = Number(req.params.id);
    const user = await findUser(prisma, id);

    if (!user) {
      res.status(404).json({ error: 'No user found' });
      return;
    }

    res.status(200).json({ user });
  } catch (err) {
    if (err instanceof Error) {
      res
        .status(500)
        .json({ error: 'Failed to fetch user', details: err.message });
      return;
    }
    res.status(500).json({ error: 'An unknown error occured ' });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const id = Number(req.params.id);
    const updateData = req.body;
    const user = await findUser(prisma, id);

    if (!user) {
      res.status(404).json({ error: 'User does not exist' });
      return;
    }

    const updatedUser = await updateUserService(prisma, id, updateData);

    res.status(200).json({
      message: 'User successfully updated',
      updatedUser,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: 'Failed to update user',
        details: err.message,
      });
      return;
    }
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const id = Number(req.params.id);
    const user = await findUser(prisma, id);

    if (!user) {
      res.status(404).json({ error: 'User does not exist' });
      return;
    }

    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: 'User successfully deleted', deletedUser });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        error: 'Failed to delete user',
        details: err.message,
      });
      return;
    }
    res.status(500).json({ error: 'an unknown error occured' });
  }
};
