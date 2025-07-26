import mongoose from 'mongoose'
import { GridFsStorage } from 'multer-gridfs-storage';
import { MongoClient } from 'mongodb';

if(!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined')
}

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: 'images',
        };
    },
});

export default storage;