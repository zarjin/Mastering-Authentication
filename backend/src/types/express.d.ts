import { IPayload } from "./types";

declare global {
  namespace Express {
    interface Request {
      user?: IPayload;
    }
  }
}

export {};
