import { Request, Response } from 'express';
import { getCategoriesService } from '../services/categoryService';
import { handleError } from '../utils/errorhandler';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const prisma = req.prisma;

    let categories = await getCategoriesService(prisma);
    console.log(categories);
    res.status(200).json({ categories });
    return;
  } catch (err) {
    handleError(err, res, { errorMessage: 'Failed to fetch categories' });
  }
};
