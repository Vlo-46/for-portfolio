import {Storage, UploadOptions} from '@google-cloud/storage';
import {Multer} from "multer";

const storage = new Storage({
    keyFilename: '../../gcs_data.json'
});

export const uploadImageToGCS = async function uploadImageToGCS(imageFile: any): Promise<string> {
    const bucketName = 'bucket-for-portfolio';
    const fileName = `${Date.now()}-${imageFile.originalname}`;

    const options: { private: undefined; metadata: { contentType: string }; chunkSize: undefined; offset: undefined; public: undefined; predefinedAcl: undefined; isPartialUpload: undefined; origin: undefined; destination: string; userProject: undefined; uri: undefined; highWaterMark: undefined } = {
        chunkSize: undefined,
        highWaterMark: undefined,
        isPartialUpload: undefined,
        offset: undefined,
        origin: undefined,
        predefinedAcl: undefined,
        private: undefined,
        public: undefined,
        uri: undefined,
        userProject: undefined,
        destination: fileName,
        metadata: {
            contentType: imageFile.mimetype
        }
    };

    await storage.bucket(bucketName).upload(imageFile.buffer, options as UploadOptions);

    return `https://storage.googleapis.com/${bucketName}/${fileName}`;
}
