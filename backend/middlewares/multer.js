import multer from "multer";

//create the storage
const storage = multer.memoryStorage();

export const singleUpload = multer({storage}).single("file")