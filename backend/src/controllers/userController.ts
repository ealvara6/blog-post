import { Request, Response } from 'express';
import {
  findUser,
  findUserOnEmail,
  findUserOnUsername,
  getUsersService,
  updateUserService,
  deleteUserService,
  getUserPostsService,
  getUserCommentsService,
  getLikedPostsService,
  getLikedCommentsService,
  updateUserAvatarUrlService,
} from '../services/userService';
import { handleError } from '../utils/errorhandler';
import hashPassword from '../utils/hashPassword';
import { publicUrlToAbsolutePath } from '../utils/paths';
import fs from 'fs/promises';

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
    const id = Number(req.user?.id);
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

export const getUserOnUsername = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const username = req.params.username;

    const user = await findUserOnUsername(prisma, username);

    res.status(200).json({ user });
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to fetch user on username',
    });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const userId = Number(req.user?.id);
    const updateData = req.body.data;

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

    const user = await findUser(prisma, userId);

    if (!user) {
      res.status(404).json({ error: 'User does not exist' });
      return;
    }

    const updatedUser = await updateUserService(prisma, userId, updateData);

    res.status(200).json({
      message: 'User successfully updated',
      updatedUser,
    });
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to update user information',
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const userId = Number(req.user?.id);
    const user = await findUser(prisma, userId);

    if (!user) {
      res.status(404).json({ error: 'User does not exist' });
      return;
    }

    const deletedUser = await deleteUserService(prisma, userId);

    res.status(200).json({ message: 'User successfully deleted', deletedUser });
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to delete User',
    });
  }
};

export const getUserPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const userId = Number(req.user?.id);
    let posts = await getUserPostsService(prisma, userId);

    res.status(200).json({ posts });
    return;
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'failed to get user posts',
    });
  }
};

export const getUserComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const prisma = req.prisma;
    const userId = Number(req.user?.id);
    let comments = await getUserCommentsService(prisma, userId);

    res.status(200).json({ comments });
    return;
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to get user comments',
    });
  }
};

export const getLikedPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const prisma = req.prisma;
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const skip = (page - 1) * limit;

    const data = {
      page,
      limit,
      skip,
      prisma,
      userId,
    };

    const posts = await getLikedPostsService(data);

    res.status(200).json({ posts, page, hasMore: posts.length === limit });
    return;
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to get user liked posts',
    });
  }
};

export const getLikedComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const prisma = req.prisma;
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);
    const skip = (page - 1) * limit;

    const data = {
      page,
      limit,
      skip,
      prisma,
      userId,
    };

    const comments = await getLikedCommentsService(data);
    res
      .status(200)
      .json({ comments, page, hasMore: comments.length === limit });
    return;
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to get user liked comments',
    });
  }
};

export const uploadUserAvatar = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(400).json({ message: 'invalid userId' });
      return;
    }

    const prisma = req.prisma;

    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const user = await findUser(prisma, userId);

    const newUrl = `/uploads/profile-pictures/${req.file.filename}`;

    const oldUrl = user.profilePictureUrl;
    const updated = await updateUserAvatarUrlService(prisma, userId, newUrl);

    const isCustomOld = oldUrl && !oldUrl.endsWith('/default.png');
    if (isCustomOld) {
      const oldAbs = publicUrlToAbsolutePath(oldUrl);
      fs.unlink(oldAbs).catch(() => {});
    }

    res.status(200).json({ updated });
  } catch (err) {
    handleError(err, res, {
      errorMessage: 'Failed to upload new profile picture',
    });
  }
};
