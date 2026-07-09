import Ngay from "@/database/ngaySchema";
import { connectDb } from "@/lib/connectDB";
import { NextResponse } from "next/server";


export async function POST(request:Request){

    try{
    const {totalmoney, ngay, thang, nam} = await request.json();

    
    await connectDb();

  

    const ngayObject = new Ngay({
        totalPrice: totalmoney,
        today: ngay,
        month: thang,
        year: nam
    });

    await ngayObject.save();

 
    return NextResponse.json({ success: true, message: 'Lưu thành công!' }, { status: 200 });


}catch (error) {
    console.error("Có lỗi xảy ra:", error);
    
    // 3. VẪN PHẢI RETURN khi có lỗi (đây là chỗ bạn đang thiếu khiến nó trả về 'undefined')
    return NextResponse.json({ success: false, error: 'Lỗi khi lưu dữ liệu!' }, { status: 500 });
  }


}

