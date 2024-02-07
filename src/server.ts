import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URL as string
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export { connectToDatabase, mongoose };