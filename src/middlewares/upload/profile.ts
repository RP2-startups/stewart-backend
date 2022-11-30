// import multer from "multer";
// import { Request} from "express";
// const {fileTypeFromBuffer} =  await import('file-type');

// export class Profile {
//     private static readonly ValidFileExtensions = ["png", "jpg", "jpeg", "webp"];
//   private static readonly URL = "./tmp";

//   private get storage(): multer.StorageEngine {
//     return multer.memoryStorage();
//   }
//   private fileFilter(
//     req: Request,
//     file: Express.Multer.File,
//     cb: multer.FileFilterCallback
//   ) {
//     fileTypeFromBuffer(file.buffer).then(fileTypeProps => {
//         const isExtValid = Profile.ValidFileExtensions.includes(fileTypeProps.ext);
//         cb(null, isExtValid);
//     });
//   }
//   get getConfig(): multer.Options {
//     return {
//       storage: this.storage,
//       fileFilter: this.fileFilter,
//     };
//   }
// }
