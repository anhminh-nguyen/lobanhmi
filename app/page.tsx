/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { luuTongNgay } from "@/lib/luuTongNgay";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";

interface KhacItem {
  id: number;
  name: string;
  nho: number;
  trung: number;
  lon: number;
  sign: string;
  sum: number;
}

interface KhacItemChieu {
  id: number;
  name: string;
  nho: number;
  trung: number;
  lon: number;
  sign: string;
  sum: number;
}

export default function Home() {
  // Morning State
  const [isEditing, setisEditing] = useState(false);
  const [nho, setNho] = useState<number>(0);          // giá bình thường
  const [trung, setTrung] = useState<number>(0);
  const [lon, setLon] = useState<number>(0);
  const [moiNho, setMoiNho] = useState<number>(0);      // giá mối
  const [moiTrung, setMoiTrung] = useState<number>(0);
  const [moiLon, setMoiLon] = useState<number>(0);
  const [boNho, setBoNho] = useState<number>(0);          // giá bỏ 
  const [boTrung, setBoTrung] = useState<number>(0);
  const [boLon, setBoLon] = useState<number>(0);
  const [quaChieuNho, setQuaChieuNho] = useState<number>(0);        // giá qua chiều 
  const [quaChieuTrung, setQuaChieuTrung] = useState<number>(0);
  const [quaChieuLon, setQuaChieuLon] = useState<number>(0);
  const [soKhac, setSoKhac] = useState<number>(0);                  
  const [khacItems, setKhacItems] = useState<KhacItem[]>([]);
  const [chiTieuCount, setChiTieuCount] = useState<number>(0);
  const [chiTieuItems, setChiTieuItems] = useState<number[]>([]);
  const [tongThucTeSang, setTongThucTeSang] = useState<number>(0);
  const [newTongketAll, setnewTongketAll] = useState<number>(0);

  // Afternoon State
  const [buoiChieuNho, setBuoiChieuNho] = useState<number>(0);        // giá buổi chiều 
  const [buoiChieuTrung, setBuoiChieuTrung] = useState<number>(0);
  const [buoiChieuLon, setBuoiChieuLon] = useState<number>(0);
  const [chiTieuChieuCount, setChiTieuChieuCount] = useState<number>(0); // chi tiêu 
  const [chiTieuChieuItems, setChiTieuChieuItems] = useState<number[]>([]);
  const [soKhacChieu, setSoKhacChieu] = useState<number>(0);
  const [khacItemsChieu, setKhacItemsChieu] = useState<KhacItemChieu[]>([]);
  const [tongThucTeChieu, setTongThucTeChieu] = useState<number>(0);
  const [ngay, setNgay] = useState("1");
  const [thang, setThang] = useState("1");
  const [nam, setNam] = useState("2026");

  // constant price
  const [nhoPrice, setNhoprice] = useState(3);
  const [trungPrice, setTrungprice] = useState(4);
  const [lonPrice, setLonprice] = useState(8);
  const [chuyenkhoan, setChuyenkhoan] = useState(0)
  const [chuyenkhoansang, setChuyenkhoansang] = useState(0)



  // Computed Values - Morning
  const computeNho = nho * nhoPrice;
  const computeTrung = trung * trungPrice;
  const computeLon = lon * lonPrice;
  const sumBanhRa = computeNho + computeTrung + computeLon; // tính bánh sáng bth 

  const computeMoiNho = moiNho * nhoPrice;
  const computeMoiTrung = moiTrung * trungPrice;
  const computeMoiLon = moiLon * lonPrice;
  const sumMoi = computeMoiNho + computeMoiTrung + computeMoiLon; // tính sum mối 

  const moiMinusResult = sumBanhRa - sumMoi;  

  const boTotal = boNho * nhoPrice + boTrung * trungPrice + boLon * lonPrice;
  const afterBo = moiMinusResult - boTotal;

   const sumChiTieu = chiTieuItems.reduce((acc, val) => acc + val, 0);
   const afterChitieu = afterBo - sumChiTieu


  const quaChieuTotal = quaChieuNho * nhoPrice + quaChieuTrung * trungPrice + quaChieuLon * lonPrice;
  const afterQuaChieu = afterChitieu - quaChieuTotal;

  const khacTotal = khacItems.reduce((acc, item) => acc + item.sum, 0);
  const afterKhac = afterQuaChieu + khacTotal;

  
  // const afterSang = afterKhac - sumChiTieu;

  const ketResult = tongThucTeSang + chuyenkhoansang - afterKhac;

  // Computed Values - Afternoon
  const computeBuoiChieuNho = buoiChieuNho * nhoPrice;
  const computeBuoiChieuTrung = buoiChieuTrung * trungPrice;
  const computeBuoiChieuLon = buoiChieuLon * lonPrice;
  const sumBanhRaAfternoon =
    computeBuoiChieuNho + computeBuoiChieuTrung + computeBuoiChieuLon;

  const afterAddQuaChieu =
    quaChieuTotal > 0 ? sumBanhRaAfternoon + quaChieuTotal : sumBanhRaAfternoon;

  const sumChiTieuChieu = chiTieuChieuItems.reduce((acc, val) => acc + val, 0);
  const afterChiTieuChieu = afterAddQuaChieu - sumChiTieuChieu;

  const khacTotalChieu = khacItemsChieu.reduce(
    (acc, item) => acc + item.sum,
    0,
  );
  const afterKhacChieu = afterChiTieuChieu + khacTotalChieu;

  const chieuResultValue = tongThucTeChieu + 200 + chuyenkhoan - afterKhacChieu;

  const tongKetAll = tongThucTeSang + (tongThucTeChieu + 200) + chuyenkhoan;

  const computeKhacSum = (item: {
    nho: number;
    trung: number;
    lon: number;
    sign: string;
  }) =>
    (item.nho * nhoPrice + item.trung * trungPrice + item.lon * lonPrice) *
    (item.sign === "-" ? -1 : 1);

  const updateKhacItems = (count: number) => {
    setKhacItems((prevItems) => {
      const normalizedCount = Math.max(0, count);
      const newItems = Array.from({ length: normalizedCount }, (_, i) => {
        const existingItem = prevItems[i];
        return (
          existingItem || {
            id: i,
            name: "",
            nho: 0,
            trung: 0,
            lon: 0,
            sign: "+",
            sum: 0,
          }
        );
      });
      return newItems.map((item) => ({
        ...item,
        sum: computeKhacSum(item),
      }));
    });
  };

  const updateKhacItemsChieu = (count: number) => {
    setKhacItemsChieu((prevItems) => {
      const normalizedCount = Math.max(0, count);
      const newItems = Array.from({ length: normalizedCount }, (_, i) => {
        const existingItem = prevItems[i];
        return (
          existingItem || {
            id: i,
            name: "",
            nho: 0,
            trung: 0,
            lon: 0,
            sign: "+",
            sum: 0,
          }
        );
      });
      return newItems.map((item) => ({
        ...item,
        sum: computeKhacSum(item),
      }));
    });
  }; 

  const updateChiTieuItems = (count: number) => {
    setChiTieuItems((prevItems) => {
      const normalizedCount = Math.max(0, count);
      return Array.from({ length: normalizedCount }, (_, i) => prevItems[i] || 0);
    });
  };

  const updateChiTieuChieuItems = (count: number) => {
    setChiTieuChieuItems((prevItems) => {
      const normalizedCount = Math.max(0, count);
      return Array.from({ length: normalizedCount }, (_, i) => prevItems[i] || 0);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-800">
      <header className="mb-8 border-b-2 border-black pb-6 text-center">
        <h1 className="text-4xl font-extrabold text-red-600">Morning</h1>
      </header>

      {/* DONE */}
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Giá bánh */} 
        <Card title="Nhập giá bánh ( nếu đổi )">
          <div className="space-y-3.5">
              <InputGroup
              label="Giá bánh Nhỏ"
              value={nhoPrice}
              onChange={(e) => setNhoprice(Number(e.target.value))}
            />
            <InputGroup
              label="Giá bánh Trung"
              value={trungPrice}
              onChange={(e) => setTrungprice(Number(e.target.value))}
            />
            <InputGroup
              label="Giá bánh Lớn"
              value={lonPrice}
              onChange={(e) => setLonprice(Number(e.target.value))}
            />
          </div>          
        </Card>
        
        {/* DONE */}
        <Card title="Bánh Ra">
          <div className="flex flex-col space-y-2">
            <InputGroup
              label="Nhỏ"
              value={nho}
              onChange={(e) => setNho(Number(e.target.value))}
            />
            <InputGroup
              label="Trung"
              value={trung}
              onChange={(e) => setTrung(Number(e.target.value))}
            />
            <InputGroup
              label="Lớn"
              value={lon}
              onChange={(e) => setLon(Number(e.target.value))}
            />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p>Nhỏ: {computeNho}</p>
            <p>Trung: {computeTrung}</p>
            <p>Lớn: {computeLon}</p>
            <p className="font-bold text-xl text-green-700">Tổng Bánh Ra: {sumBanhRa}</p>
          </div>
        </Card>

        {/* DONE */}
        {/* Mối Section */}
        <Card title="Mối">
          <div className="flex flex-col space-y-2">
            <InputGroup
              label="Nhỏ"
              value={moiNho}
              onChange={(e) => setMoiNho(Number(e.target.value))}
            />
            <InputGroup
              label="Trung"
              value={moiTrung}
              onChange={(e) => setMoiTrung(Number(e.target.value))}
            />
            <InputGroup
              label="Lớn"
              value={moiLon}
              onChange={(e) => setMoiLon(Number(e.target.value))}
            />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p>Nhỏ: {computeMoiNho}</p>
            <p>Trung: {computeMoiTrung}</p>
            <p>Lớn: {computeMoiLon}</p>
            <p className="font-bold text-lg text-green-700">Tổng Mối: {sumMoi}</p>
            <p className="font-bold text-xl text-green-700">
              Sau khi trừ Mối: {moiMinusResult}
            </p>
          </div>
        </Card>

        {/* DONE */}
        {/* Bỏ Section */}
        <Card title="Bỏ">
          <div className="flex flex-col space-y-2">
            <InputGroup
              label="Nhỏ"
              value={boNho}
              onChange={(e) => setBoNho(Number(e.target.value))}
            />
            <InputGroup
              label="Trung"
              value={boTrung}
              onChange={(e) => setBoTrung(Number(e.target.value))}
            />
            <InputGroup
              label="Lớn"
              value={boLon}
              onChange={(e) => setBoLon(Number(e.target.value))}
            />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
              <p>Nhỏ: {boNho*nhoPrice}</p>
              <p>Trung: {boTrung*trungPrice}</p>
              <p>Lớn: {boLon*lonPrice}</p>
              <p className="font-bold text-lg text-green-700">Tổng Bỏ: {boTotal}</p>
              <p className="font-bold text-xl text-green-700">
              Sau khi trừ Bỏ: {afterBo}
            </p>
          </div>
        </Card>

        {/* DONE */}
        {/* Chi Tiêu Section - Morning */}
        <Card title="Chi Tiêu (Sáng)">
          <InputGroup
            label="How many"
            value={chiTieuCount}
            onChange={(e) => {
              setChiTieuCount(Number(e.target.value));
              updateChiTieuItems(Number(e.target.value))
            }}
            type="number"
          />
          <div className="mt-4 space-y-2">
            {
            
            chiTieuItems.map((item, index) => (
              <input
                key={index}
                type="number"
                className="block w-full rounded-md border border-gray-300 p-2 text-sm"
                value={item}
                onChange={(e) =>
                  setChiTieuItems((prev) =>
                    prev.map((val, i) =>
                      i === index ? Number(e.target.value) : val,
                    ),
                  )
                }
              />
            ))}
          </div>
          <p className="mt-4 text-lg font-bold text-green-700">Tổng Chi Tiêu: {sumChiTieu}</p>
          <p className="mt-2 font-bold text-xl text-green-700">
            Sau khi trừ Chi Tiêu: {afterChitieu}
          </p>
        </Card>


        {/* DONE */}
        {/* Qua Chiều Section */}
        <Card title="Qua Chiều">
          <div className="flex flex-col space-y-2">
            <InputGroup
              label="Nhỏ"
              value={quaChieuNho}
              onChange={(e) => setQuaChieuNho(Number(e.target.value))}
            />
            <InputGroup
              label="Trung"
              value={quaChieuTrung}
              onChange={(e) => setQuaChieuTrung(Number(e.target.value))}
            />
            <InputGroup
              label="Lớn"
              value={quaChieuLon}
              onChange={(e) => setQuaChieuLon(Number(e.target.value))}
            />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
           
              <p>Nhỏ: { quaChieuNho * nhoPrice}</p>
              <p>Trung: {quaChieuTrung * trungPrice}</p>
              <p>Lớn: {quaChieuLon * lonPrice}</p>
              <p className="font-bold text-lg text-green-700">Tổng Qua Chiều: {quaChieuTotal}</p>
               <p className="font-bold text-xl text-green-700">
              Sau khi trừ Qua Chiều: {afterQuaChieu}
            </p>
          </div>
        </Card>

        {/* DONE */}
        {/* Khác Section - Morning */}
        <Card title="Khác (Sáng)">
          <InputGroup
            label="How many"
            value={soKhac}
            onChange={(e) => {
              setSoKhac(Number(e.target.value));
              updateKhacItems(Number(e.target.value))}
            }
            type="number"
          />
          <div className="mt-4 space-y-4">
            {khacItems.map((item, index) => (
              <div
                key={item.id}
                className="rounded-md bg-gray-100 p-3 shadow-sm"
              >
                <p className="font-semibold">Khác #{index + 1}</p>
                <input
                  type="text"
                  placeholder="Tên"
                  className="mt-2 block w-full rounded-md border border-gray-300 p-2 text-sm"
                  value={item.name}
                  onChange={(e) =>
                    setKhacItems((prev) =>
                      prev.map((khac) =>
                        khac.id === item.id
                          ? { ...khac, name: e.target.value }
                          : khac,
                      ),
                    )
                  }
                />
                <div className="mt-2 flex items-center space-x-2">
                  <label className="w-16 text-sm font-medium">Nhỏ:</label>
                  <input
                    type="number"
                    className="w-20 rounded-md border border-gray-300 p-2 text-sm"
                    value={item.nho}
                    onChange={(e) =>
                      setKhacItems((prev) =>
                        prev.map((khac) =>
                          khac.id === item.id
                            ? { ...khac, nho: Number(e.target.value),sum: computeKhacSum({...item,nho:Number(e.target.value)}) }
                            : khac,
                        )
                      )
                    }
                  />
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <label className="w-16 text-sm font-medium">Trung:</label>
                  <input
                    type="number"
                    className="w-20 rounded-md border border-gray-300 p-2 text-sm"
                    value={item.trung}
                    onChange={(e) =>
                      setKhacItems((prev) =>
                        prev.map((khac) =>
                          khac.id === item.id
                            ? { ...khac, trung: Number(e.target.value),sum: computeKhacSum({...item,trung:Number(e.target.value)}) }
                            : khac,
                        ),
                      )
                    }
                  />
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <label className="w-16 text-sm font-medium">Lớn:</label>
                  <input
                    type="number"
                    className="w-20 rounded-md border border-gray-300 p-2 text-sm"
                    value={item.lon}
                    onChange={(e) =>
                      setKhacItems((prev) =>
                        prev.map((khac) =>
                          khac.id === item.id
                            ? { ...khac, lon: Number(e.target.value), sum: computeKhacSum({...item,lon:Number(e.target.value)}) }
                            : khac,
                        ),
                      )
                    }
                  />
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <label className="w-24 text-sm font-medium">
                    Trừ hay cộng:
                  </label>
                  <select
                    className="w-20 rounded-md border border-gray-300 p-2 text-sm"
                    value={item.sign}
                    onChange={(e) =>
                      setKhacItems((prev) =>
                        prev.map((khac) =>
                          khac.id === item.id
                            ? { ...khac, sign: e.target.value, sum: computeKhacSum({...item,sign:String(e.target.value)}) }
                            : khac,
                        ),
                      )
                    }
                  >
                    <option value="+">+</option>
                    <option value="-">-</option>
                  </select>
                </div>
                <p className="mt-2 text-sm">
                  Tổng mục này: <b className="font-bold text-green-700">{item.sum}</b>
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-red-600">
            Tổng KHÁC (Sáng): <b className="font-bold">{khacTotal}</b>
          </p>
          <p className="mt-2 font-bold text-xl text-green-700">
            Sau khi tính Khác: {afterKhac}
          </p>
        </Card>

        
        {/* DONE */}
        {/* Final Morning Section */}
        <Card title="Tổng Buổi Sáng">
          <div className="space-y-2">
              <p className="text-lg font-bold ">
            Tổng buổi sáng:{" "}
            <span className="text-green-700">{afterKhac}</span>
          </p>
          <InputGroup
            label="Tổng buổi sáng Thực Tế"
            value={tongThucTeSang}
            onChange={(e) => setTongThucTeSang(Number(e.target.value))}
            type="number"
          />
          <InputGroup
              label="Chuyển khoản"
              value={chuyenkhoansang}
              onChange={(e) => setChuyenkhoansang(Number(e.target.value))}
            />
          </div>
          
          <h3
            className={`mt-4 text-2xl font-bold ${ketResult < 0 ? "text-red-500" : "text-green-500"}`}
          >
            {ketResult < 0
              ? `Thiếu ${ketResult * -1}`
              : ketResult > 0
                ? `Dư ${ketResult}`
                : "Great, enough"}
          </h3>
        </Card>
      </div>


      <div className="my-12 border-t-2 border-dashed border-blue-600 pt-12">
        <h1 className="text-4xl font-extrabold text-blue-600 text-center mb-8">
          Afternoon
        </h1>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

        {/* DONE */}
        {/* Bánh Ra Section - Afternoon */}
        <Card title="Bánh Ra (Chiều)">
          <div className="flex flex-col space-y-2">
            <InputGroup
              label="Nhỏ"
              value={buoiChieuNho}
              onChange={(e) => setBuoiChieuNho(Number(e.target.value))}
            />
            <InputGroup
              label="Trung"
              value={buoiChieuTrung}
              onChange={(e) => setBuoiChieuTrung(Number(e.target.value))}
            />
            <InputGroup
              label="Lớn"
              value={buoiChieuLon}
              onChange={(e) => setBuoiChieuLon(Number(e.target.value))}
            />
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p>Nhỏ: {computeBuoiChieuNho}</p>
            <p>Trung: {computeBuoiChieuTrung}</p>
            <p>Lớn: {computeBuoiChieuLon}</p>
            <p className="font-bold text-lg text-green-700">
              Tổng Bánh Ra: {sumBanhRaAfternoon}
            </p>
            {quaChieuTotal > 0 && (
              <p className="mt-2 font-bold text-orange-600">
                {`Thêm Qua Chiều: ${quaChieuTotal} => Tổng: ${afterAddQuaChieu}`}
              </p>
            )}
          </div>
        </Card>
        
        {/* DONE */}
        {/* Chi Tiêu Section - Afternoon */}
        <Card title="Chi Tiêu (Chiều)">
          <InputGroup
            label="How many"
            value={chiTieuChieuCount}
            onChange={(e) => {
              setChiTieuChieuCount(Number(e.target.value));
              updateChiTieuChieuItems(Number(e.target.value))
            }}
            type="number"
          />
          <div className="mt-4 space-y-2">
            {chiTieuChieuItems.map((item, index) => (
              <input
                key={index}
                type="number"
                className="block w-full rounded-md border border-gray-300 p-2 text-sm"
                value={item}
                onChange={(e) =>
                  setChiTieuChieuItems((prev) =>
                    prev.map((val, i) =>
                      i === index ? Number(e.target.value) : val,
                    ),
                  )
                }
              />
            ))}
          </div>
          <p className="mt-4 text-lg font-bold text-green-700">
            Tổng Chi Tiêu (Chiều): {sumChiTieuChieu}
          </p>
          <p className="mt-2 font-bold text-xl text-green-700">
            Sau khi trừ Chi Tiêu: {afterChiTieuChieu}
          </p>
        </Card>

        {/* Khác Section - Afternoon */}
        <Card title="Khác (Chiều)">
          <InputGroup
            label="How many"
            value={soKhacChieu}
            onChange={(e) => 
              {setSoKhacChieu(Number(e.target.value));
                updateKhacItemsChieu(Number(e.target.value))

              }}
            type="number"
          />
          <div className="mt-4 space-y-4">
            {khacItemsChieu.map((item, index) => (
              <div
                key={item.id}
                className="rounded-md bg-gray-100 p-3 shadow-sm"
              >
                <p className="font-semibold">Khác #{index + 1}</p>
                <input
                  type="text"
                  placeholder="Tên"
                  className="mt-2 block w-full rounded-md border border-gray-300 p-2 text-sm"
                  value={item.name}
                  onChange={(e) =>
                    setKhacItemsChieu((prev) =>
                      prev.map((khac) =>
                        khac.id === item.id
                          ? { ...khac, name: e.target.value,}
                          : khac,
                      ),
                    )
                  }
                />
                <div className="mt-2 flex items-center space-x-2">
                  <label className="w-16 text-sm font-medium">Nhỏ:</label>
                  <input
                    type="number"
                    className="w-20 rounded-md border border-gray-300 p-2 text-sm"
                    value={item.nho}
                    onChange={(e) =>
                      setKhacItemsChieu((prev) =>
                        prev.map((khac) =>
                          khac.id === item.id
                            ? { ...khac, nho: Number(e.target.value), sum:computeKhacSum({...item,nho:Number(e.target.value)}) }
                            : khac,
                        ),
                      )
                    }
                  />
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <label className="w-16 text-sm font-medium">Trung:</label>
                  <input
                    type="number"
                    className="w-20 rounded-md border border-gray-300 p-2 text-sm"
                    value={item.trung}
                    onChange={(e) =>
                      setKhacItemsChieu((prev) =>
                        prev.map((khac) =>
                          khac.id === item.id
                            ? { ...khac, trung: Number(e.target.value),sum:computeKhacSum({...item,trung:Number(e.target.value)})  }
                            : khac,
                        ),
                      )
                    }
                  />
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <label className="w-16 text-sm font-medium">Lớn:</label>
                  <input
                    type="number"
                    className="w-20 rounded-md border border-gray-300 p-2 text-sm"
                    value={item.lon}
                    onChange={(e) =>
                      setKhacItemsChieu((prev) =>
                        prev.map((khac) =>
                          khac.id === item.id
                            ? { ...khac, lon: Number(e.target.value),sum:computeKhacSum({...item,lon:Number(e.target.value)})  }
                            : khac,
                        ),
                      )
                    }
                  />
                </div>
                <div className="mt-2 flex items-center space-x-2">
                  <label className="w-24 text-sm font-medium">
                    Trừ hay cộng:
                  </label>
                  <select
                    className="w-20 rounded-md border border-gray-300 p-2 text-sm"
                    value={item.sign}
                    onChange={(e) =>
                      setKhacItemsChieu((prev) =>
                        prev.map((khac) =>
                          khac.id === item.id
                            ? { ...khac, sign: e.target.value,sum:computeKhacSum({...item,sign:String(e.target.value)})  }
                            : khac,
                        ),
                      )
                    }
                  >
                    <option value="+">+</option>
                    <option value="-">-</option>
                  </select>
                </div>
                <p className="mt-2 text-sm">
                  Tổng mục này: <b className="font-bold">{item.sum}</b>
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-red-600">
            Tổng KHÁC (Chiều): <b className="font-bold">{khacTotalChieu}</b>
          </p>
          <p className="mt-2 font-bold text-xl text-green-700">
            Sau khi tính Khác: {afterKhacChieu}
          </p>
        </Card>

        {/* Final Afternoon Section */}
        <Card title="Tổng Buổi Chiều">
          <div className="flex items-center space-x-2">
            <div className="space-y-2">
                <InputGroup
              label="Tiền Chuyển Khoản"
              value={chuyenkhoan}
              onChange={(e) => setChuyenkhoan(Number(e.target.value))}
            />

            <p className="font-bold text-lg text-green-700">Tổng thực tế chiều:</p>
            <input
              type="number"
              className="h-8 w-32 rounded-md border border-gray-300 p-2 text-lg"
              value={tongThucTeChieu}
              onChange={(e) => setTongThucTeChieu(Number(e.target.value))}
            />

            </div>
            
            
            
          </div>
          <p className="text-lg font-bold text-green-700 mt-2">+200</p>
          <p className="text-lg font-bold mt-2 text-green-700 ">+ Chuyển khoản: {chuyenkhoan}</p>
          <h3
            className={`mt-4 text-2xl font-bold ${chieuResultValue < 0 ? "text-red-500" : "text-green-500"}`}
          >
            {chieuResultValue < 0
              ? `Thiếu ${chieuResultValue * -1}`
              : chieuResultValue > 0
                ? `Dư ${chieuResultValue}`
                : "Great, enough"}
          </h3>
          <h1 className="mt-6 text-3xl font-extrabold text-red-600">
            {"=>"} {tongKetAll}
          </h1>
        </Card>

        <Card title="Lưu Tổng Ngày">
          <div className="flex flex-col">
            <div  className="flex flex-col gap-1.5" >
              <InputGroup  label="Ngày" value={ngay} onChange={(e) => setNgay(e.target.value) } />
              <InputGroup label="Tháng" value={thang} onChange={(e) => setThang(e.target.value) } />
              <InputGroup label="Năm" value={nam} onChange={(e) => setNam(e.target.value) } />
            </div>
            
            <p className="font-bold">
              Tổng tiền sẽ LƯU ngày hôm nay là:{" "}
              <span className="text-red-600 text-xl">{tongKetAll}</span> ?
            </p>
            <div className="flex justify-evenly">
              <button
                className="border-2 border-green-500 p-2 rounded-2xl hover:bg-green-500 hover:text-white"
                onClick={async () => {
                  await luuTongNgay(tongKetAll,ngay,thang,nam);
                  alert ('Đã lưu Thành công')
                }}
              >
                Yes
              </button>
              <button
                className="border-2 border-red-500 p-2 rounded-2xl hover:bg-red-500 hover:text-white"
                onClick={() => setisEditing(true)}
              >
                No, muốn thay đổi
              </button>
            </div>
            {isEditing && (
              <>
                <h3 className="font-bold">Tổng muốn thay đổi: </h3>
                <input
                  className="border-1 w-full px-1 rounded-b-sm"
                  value={newTongketAll}
                  type="text"
                  onChange={(e) => setnewTongketAll(Number(e.target.value))}
                ></input>
                <button
                  className="mx-auto  mt-1.5 border-2 border-green-500 p-2 rounded-2xl hover:bg-green-500 hover:text-white"
                  onClick={async() =>{ await luuTongNgay(newTongketAll,ngay,thang,nam);
                    alert ('Đã lưu Thành công');
                  }}
                >Xác nhận</button>
              </>
            )}
          </div>
        </Card>

        <Card title="Bảng Thống kê">
          <div className="flex flex-col items-center h-full" >
            <h2 className="font-semibold">Nhấn để xem chi tiết tổng Ngày, Tháng, Năm </h2>
            <Link href="/bangthongke" className="mt-4 text-2xl font-bold border-2 backdrop-blur-2xl rounded-2xl p-2 hover:bg-blue-500 hover:text-white" > Click here! </Link>

          </div>
           

        </Card>

      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => (
  <div className="rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg">
    <h2 className="mb-4 border-b border-gray-200 pb-3 text-2xl font-semibold text-red-500">
      {title}
    </h2>
    {children}
  </div>
);

interface InputGroupProps {
  label: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const InputGroup = ({
  label,
  value,
  onChange,
  type = "text",
}: InputGroupProps) => (
  <div className={`flex items-center space-x-2`}>
    <label className="w-24 text-sm font-medium">
      <b>{label}:</b>
    </label>
    <input
      type={type}
      className="w-32 rounded-md border border-gray-300 p-2 text-sm"
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  </div>
);
