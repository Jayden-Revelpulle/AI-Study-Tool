import mongoose, { Schema, Document } from 'mongoose';

interface ICourse extends Document {
    name: string;
    resources: Array<{
        name: string;
        path: string;
        uploadDate: Date;
        fileSize: number;
    }>;
}

const CourseSchema = new Schema<ICourse>({
    name: {
        type: String, 
        required: [true, 'must provide name'],
        trim: true
    },

    resources: {
        type: [{
            name: {
                type: String,
                required: true
            },
            path: {
                type: String,
                required: true
            },
            uploadDate: {
                type: Date,
                default: Date.now
            },
            fileSize: {
                type: Number,
                required: true
            }
        }],
        default: []
    }
});

export default mongoose.model<ICourse>('Course', CourseSchema)