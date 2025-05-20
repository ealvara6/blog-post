import { Request, Response } from 'express';
import {
  findUser,
  findUserOnEmail,
  findUserOnUsername,
  getUsersService,
  updateUserService,
  deleteUserService,
} from '../services/userService';
import { handleError } from '../utils/errorhandler';
import hashPassword from '../utils/hashPassword';

export const getAuthUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;

    if (!req.user) {
      res.status(401).json([{ msg: 'User not authenticated ' }]);
      return;
    }

    const id = req.user?.id;

    const user = await findUser(prisma, id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json({ user });
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to get user profile',
    });
  }
};

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

export const getUser = async (req: Request, res: Response): Promise<void> => {
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

    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (req.body.email) {
      if (await findUserOnEmail(prisma, req.body.email)) {
        res.status(409).json({
          error: 'Email is already associated with an existing account',
        });
        return;
      }
    }

    if (req.body.username) {
      if ((await findUserOnUsername(prisma, req.body.username)) !== null) {
        res.status(409).json({
          error: 'Username is already associated with an existing account',
        });
        return;
      }
    }

    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }

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

    const deletedUser = await deleteUserService(prisma, id);

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
