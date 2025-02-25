import { Request, Response, NextFunction } from 'express';

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(404).json({ error: 'Invalid id input' });
    return;
  }
  next();
};

export const validateCommentId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.commentId);
  if (isNaN(id)) {
    res.status(404).json({ error: 'Invalid id input' });
    return;
  }
  next();
};
