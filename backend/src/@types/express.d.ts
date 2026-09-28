import { UserEntity } from "../entities/user/user-entity";

declare global {
  namespace Express {
    export interface Request {
      file?: Express.Multer.File;
      user?: UserEntity;
    }
  }
  export interface Request {
    user?: UserEntity;
    file?: Express.Multer.File;
  }
}
