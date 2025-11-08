require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    // Log all relevant environment variables
    console.log('Environment variables check:');
    console.log('PORT:', process.env.PORT);
    console.log('MONGO_URI:', process.env.MONGO_URI ? 'Found' : 'Missing');
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Found' : 'Missing');

    // Test MongoDB connection
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log('✅ MongoDB connection successful!');
    console.log(`Connected to: ${conn.connection.host}`);
    await mongoose.connection.close();
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

testConnection();