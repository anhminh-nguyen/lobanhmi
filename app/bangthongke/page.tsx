'use client';

import { useState } from "react"
import { InputGroup } from "../page"
import DanhsachFormat from "@/components/danhsachformat";




const BangThongKe = () => {
    const [ngay, setNgay] = useState("1");
    const [thang, setThang] = useState("1");
    const [nam, setNam] = useState("2026");
    const [data, setData] = useState(null);
    
    async function handlerRequest(ngay:string, thang:string, nam:string){
        const query = new URLSearchParams({
            ngay:ngay,
            thang:thang,
            nam:nam
        }).toString();

    const response = await fetch(`/api/search?${query}`);

    setData(await response.json());

    }


    
  return (
    <>
    
    <div className="flex flex-col items-center m-8 mt-20 ">
        <div className="flex justify-evenly text-black gap-5 max-md:gap-1 text-3xl">
            <div className="flex justify-between gap-1 items-center" >
                <label className="text-3xl max-md:text-sm font-medium font-serif">Ngày: </label>
                <input value={ngay} onChange={(e)=> setNgay(e.target.value)} autoComplete="false" className="w-14 max-md:w-[36px] rounded-md border border-gray-300 p-2 max-md:text-sm text-3xl text-red-500 font-bold" type='text'></input>
            </div>

            <div className="flex justify-between gap-1 items-center" >
                <label className="text-3xl max-md:text-sm font-medium font-serif">Tháng: </label>
                <input value={thang} onChange={(e)=> setThang(e.target.value)} autoComplete="false" className="max-md:w-[36px] w-14 rounded-md border border-gray-300 p-2 max-md:text-sm text-3xl text-red-500 font-bold" type='text'></input>
            </div>

            <div className="flex justify-between gap-1 items-center" >
                <label className="text-3xl max-md:text-sm font-medium font-serif">Năm: </label>
                <input value={nam} onChange={(e)=> setNam(e.target.value)} autoComplete="false" className="max-md:w-[51px] w-24 rounded-md border border-gray-300 p-2 max-md:text-sm text-3xl text-red-500 font-bold" type='text'></input>
            </div>
        </div>

         <button className="mt-2.5 w-[150px] border-2 rounded-2xl border-green-600 text-green-600 font-extrabold hover:text-amber-50 hover:bg-green-600 md:w-xl" onClick={()=>handlerRequest(ngay, thang, nam)} >Search</button>

         <div className="w-full h-[1px] bg-gray-400 mt-4 mx-28"></div>
    </div>

    <DanhsachFormat data={data} />
</>


  )
}
export default BangThongKe