import mongoose, { Schema, Document } from 'mongoose';

interface ICourse extends Document {
    name: string
}

const CourseSchema = new Schema<ICourse>({
    name: {
        type: String, 
        required: [true, 'must provide name'],
        trim: true
    }
});

export default mongoose.model<ICourse>('Course', CourseSchema)