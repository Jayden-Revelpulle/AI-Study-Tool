import mongoose, { Schema, Document } from 'mongoose';

interface ICourse extends Document {
    name: string;
    resources: Array<{
        name: string;
        contentType: string;
        uploadDate: Date;
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
            contentType: {
                type: String,
                required: true
            },
            uploadDate: {
                type: Date,
                default: Date.now
            },
        }],
        default: []
    }
});

export default mongoose.model<ICourse>('Course', CourseSchema)