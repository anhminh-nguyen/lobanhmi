interface DanhsachItem {
  _id: string;
  today: number;
  month: number;
  year: number;
  totalPrice: number;
}

interface DanhsachData {
  danhsach: DanhsachItem[];
  total: number;
}

interface DanhsachFormatProps {
  data?: DanhsachData | null;
}

const DanhsachFormat = ({ data }: DanhsachFormatProps) => {
  // Kiểm tra nếu không có dữ liệu
  if (!data || !data.danhsach || data.danhsach.length === 0) {
    return <div className="p-4 text-center ">Không có dữ liệu tìm kiếm.</div>;
  }

  const { danhsach, total } = data;

  return (
    <div className="p-4 min-w-3xl mx-auto">
      {/* Danh sách các mục */}
      <div className=" flex flex-col">
        {danhsach.map((item: DanhsachItem) => (
          <div key={item._id} className="w-full flex justify-between items-center">
            {/* Format ngày tháng năm: nn/mm/yyyy */}
            <span className="font-medium">
              {String(item.today).padStart(2, '0')}/
              {String(item.month).padStart(2, '0')}/
              {item.year}
            </span>
            
            {/* Dấu chấm ngăn cách */}
            <span className="flex-1 border-b border-dashed border-gray-400 mx-2 mb-1"></span>
            
            <span className="font-bold">{item.totalPrice.toLocaleString()} VNĐ</span>
          </div>
        ))}
      </div>

      {/* Đường line ngăn cách */}
      <div className="w-full h-[2px] bg-gray-800 my-4"></div>

      {/* Tổng tiền */}
      <div className="flex justify-between text-xl font-bold">
        <span>Total:</span>
        <span>{total.toLocaleString()} VNĐ</span>
      </div>
    </div>
  );
};

export default DanhsachFormat;