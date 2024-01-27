'use client'

import { useState } from "react";
import Details from "./Details";

export default function Card() {
    const [res, setRes] = useState('0');
    const [details, setDetails] = useState([]);
    const [inputs, setInputs] = useState({
        startDate: '',
        endDate: '',
        monthDeposit: '',
    });

    const { startDate, endDate, monthDeposit } = inputs;
    
    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const editDeposit = (money) => {
        setInputs({
            ...inputs,
            monthDeposit: monthDeposit ? monthDeposit + money : money,
        });
    };

    const calculate = () => {
        setDetails([]);

        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const month = Math.floor((endDateObj - startDateObj) / (1000*60*60*24*30)) + 1;
        const totalInter = monthDeposit * 0.05 / 12 * (month * (month + 1))/2;
        const principal = monthDeposit * month;
        const PAI = totalInter + principal;

        const match = [0.33, 0.71, 1.0, 1.25, 0];
        let matchRates = 1;
        let tmp_details = [];

        for (let year = startDateObj.getFullYear(); year <= endDateObj.getFullYear(); year++) {
            let PAIRate = 0;

            if (startDateObj.getFullYear() == endDateObj.getFullYear()) {
                PAIRate = 1;
            } else if (year === startDateObj.getFullYear()) {
                PAIRate = (12 - startDateObj.getMonth()) / month;
            } else if (year === endDateObj.getFullYear()) {
                PAIRate = (endDateObj.getMonth() + 1) / month;
            } else {
                PAIRate = 12 / month;
            }
            matchRates += PAIRate * match[year >= 2022 ? (year <= 2025 ? year-2022 : 3) : 4];

            tmp_details = [...tmp_details, {
                year: year,
                principal: Math.round(principal * PAIRate),
                goverment_inter: Math.round(totalInter * PAIRate / 6),
                bank_inter: Math.round(totalInter * PAIRate * 5 / 6),
                match_saving: Math.round(PAI * PAIRate * match[year >= 2022 ? (year <= 2025 ? year-2022 : 3) : 4]),
            }];
        }

        const receivedSaving = Math.round(PAI * matchRates);
        setRes(receivedSaving.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
        setDetails(tmp_details);
    }

    return (
        <div className="w-11/12 my-4 sm:w-[400px] bg-white p-5 shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-7">군적금 계산기</h1>
            <div className="text-gray-700">
                <div className="my-3">
                    <p className="">첫 적금 납입 일자</p>
                    <input className="w-full rounded-md bg-gray-100 border border-gray-100 py-2 px-2 outline-none focus:bg-gray-200 font-light text-black" name="startDate" type="date" value={startDate} onChange={onChange} />
                </div>
                <div className="my-3">
                    <p>전역/소집해제 일자</p>
                    <input className="w-full rounded-md bg-gray-100 border border-gray-100 py-2 px-2 outline-none focus:bg-gray-200 font-light text-black" name="endDate" type="date" value={endDate} onChange={onChange} />
                </div>
                <div className="my-3">
                    <p>월 적금 납입액</p>
                    <input className="w-full rounded-md bg-gray-100 border border-gray-100 py-2 px-2 outline-none focus:bg-gray-200 font-light text-black" name="monthDeposit" type="number" placeholder="0" value={monthDeposit} onChange={onChange} />
                    <div className="flex justify-between mt-2">
                        <button className="text-sm font-light p-2 mr-1 rounded-md bg-gray-200" onClick={() => { editDeposit(50000); }}>+5만원</button>
                        <button className="text-sm font-light p-2 mx-1 rounded-md bg-gray-200" onClick={() => { editDeposit(100000); }}>+10만원</button>
                        <button className="text-sm font-light p-2 mx-1 rounded-md bg-gray-200" onClick={() => { editDeposit(-50000); }}>-5만원</button>
                        <button className="text-sm font-light p-2 ml-1 rounded-md bg-gray-200" onClick={() => { editDeposit(-100000); }}>-10만원</button>
                    </div>
                </div>
                <button className="w-full rounded-md bg-black text-white py-2 my-3 hover:opacity-80 active:opacity-100" onClick={calculate}>계산하기</button>
                <div className="flex my-4">
                    <p className="text-lg">총 금액 : <span className="text-2xl font-bold text-black mx-2">{res}</span>원</p>
                </div>
                {(res !== '0') && (
                    <Details details={details}/>
                )}
            </div>
        </div>
    )
}
