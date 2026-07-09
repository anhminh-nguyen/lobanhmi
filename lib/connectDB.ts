import mongoose from 'mongoose';

export async function connectDb() {
  // Kiểm tra nếu đã có kết nối rồi thì không kết nối lại
  if (mongoose.connection.readyState >= 1) return;

  // Dùng thẳng biến DATABASE_URI từ .env.local
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("Kết nối MongoDB thành công!");
  return true;
  
}