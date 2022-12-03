import fs from "fs";
import path from "path";

class FileUtils {
  deleteImages(archives: Array<string>) {
    archives.forEach((element) => {
      if(fs.existsSync(element))
        fs.unlinkSync(element);
      console.log(`deleted file ${element}`);
    });
  }
  getDefaultFileNameAndPath(fileOriginalName : string) : string{
    return `./files/imgs/${fileOriginalName}-${Date.now()}${path.extname(
        fileOriginalName
      )}`;
  }
  saveImages(archives: Array<Express.Multer.File>) {
    archives.forEach((element) => {
      const fileFullName = this.getDefaultFileNameAndPath(element.originalname);
      fs.writeFileSync(fileFullName, element.buffer);
      console.log(`saved file ${fileFullName}`);
    });
  }
}
export const fileUtils = new FileUtils();
