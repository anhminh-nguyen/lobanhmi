import Ngay from "@/database/ngaySchema";
import { connectDb } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchparams = request.nextUrl.searchParams;
    const filter: any = {};

    const ngay = searchparams.get('ngay');
    const thang = searchparams.get('thang');
    const nam = searchparams.get('nam');

    if (ngay) filter.today = ngay;
    if (thang) filter.month = thang;
    if (nam) filter.year = nam;

    // Đảm bảo kết nối database thành công
    await connectDb();

    // Lấy dữ liệu
    const resultArr = await Ngay.find(filter);

    // Tính tổng
    const sumPrice = resultArr.reduce((acc, data) => acc + (Number(data.totalPrice) || 0), 0);

    // Trả về dữ liệu
    return NextResponse.json({ danhsach: resultArr, total: sumPrice });

  } catch (error) {
    console.error("Lỗi API GET:", error);
    // Trả về JSON lỗi để trình duyệt không bị "Unexpected end of JSON"
    return NextResponse.json({ error: "Lỗi Server" }, { status: 500 });
  }
}