import he from 'he';
import { Response, Request, NextFunction } from 'express';

export const decodeObject = (obj: any): any => {
  if (typeof obj === 'string') {
    return he.decode(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(decodeObject);
  }

  if (typeof obj === 'object' && obj !== null) {
    const decoded: any = {};

    for (const key of Object.keys(obj)) {
      decoded[key] = decodeObject(obj[key]);
    }
    return decoded;
  }

  return obj;
};

export const unescapeJsonMiddleWare = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const oldJson = res.json;

  res.json = function (data: any) {
    const decodedData = decodeObject(data);
    return oldJson.call(this, decodedData);
  };

  next();
};
