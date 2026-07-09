export const luuTongNgay = async function(tong:number, ngay:string, month:string, nam:string){
    const config = {
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({totalmoney:tong, ngay:ngay, thang:month, nam:nam})
    }

    try {
        const response = await fetch('/api/saveMoney', config);
        
        // Kiểm tra xem server có trả về lỗi (404, 500,...) không
        if (!response.ok) {
            throw new Error("Lỗi khi lưu dữ liệu!");
        }

        const data = await response.json();
        console.log("Lưu thành công:", data);
        return data;
    } catch (error) {
        console.error("Có lỗi xảy ra:", error);
        throw error; // Ném lỗi ra ngoài để component biết mà hiển thị thông báo
    }
}