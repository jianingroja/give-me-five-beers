import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './dbConfig';
import app from './app';

const PORT = process.env.PORT;

// make sure to connect with DB first
(async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🍻Express your love for beer at port ${PORT}`);
    });
  } catch (error) {
    console.log('error when expressing love', error);
  }
})();
