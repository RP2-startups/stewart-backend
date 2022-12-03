import multer from "multer";
import { Request} from "express";

class Profile {
    private static readonly ValidFileExtensions = ["image/png", "image/jpg", "image/jpeg", "image/webp"];

  private get storage(): multer.StorageEngine {
    return multer.memoryStorage();
  }
  private fileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) {
    console.log(file.mimetype);
      const isExtValid = Profile.ValidFileExtensions.includes(file.mimetype);
      cb(null, isExtValid);
      if(!isExtValid)
        return cb(new Error('Only .png, .jpg, .jpeg and .webp format allowed!'));
      
  }
  get config(): multer.Options {
    return {
      storage: this.storage,
      fileFilter: this.fileFilter,
    };
  }
}
export const profile = new Profile()
