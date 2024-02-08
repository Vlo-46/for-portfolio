import { Storage, UploadOptions } from '@google-cloud/storage';

const storage = new Storage({
    keyFilename: '../../gcs_data.json'
});

export const uploadImageToGCS = async function uploadImageToGCS(imageFile: any): Promise<string> {
    const bucketName = 'bucket-for-portfolio';
    const fileName = `${Date.now()}-${imageFile.originalname}`;

    // const options: UploadOptions = {
    //     destination: fileName,
    //     metadata: {
    //         contentType: imageFile.mimetype
    //     }
    // };

    await storage.bucket(bucketName).upload(imageFile.buffer);

    return `https://storage.googleapis.com/${bucketName}/${fileName}`;
}
