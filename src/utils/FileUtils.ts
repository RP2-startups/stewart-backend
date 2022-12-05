import fs from "fs";
import path from "path";

class FileUtils {
  deleteImages(archives: Array<string>) {
    archives.forEach((element) => {
      console.log(element)
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
  saveImages(archives: Array<{file:Express.Multer.File,filePath:string}>) {
    archives.forEach((element) => {
      fs.writeFileSync(element.filePath, element.file.buffer);
      console.log(`saved file ${element.filePath}`);
    });
  }
}
export const fileUtils = new FileUtils();
