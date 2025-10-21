import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string;
}

declare global {
  namespace Express {
    export interface Request {
      user_id: string;
    }
  }
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: "Token ausente." });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;

    // ✅ injeta o ID do usuário no request
    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ error: "Token inválido." });
  }
}
