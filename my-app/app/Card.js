'use client'

import { useState } from "react";
import Details from "./Details";

export default function Card() {
    const [res, setRes] = useState('0');
    const [details, setDetails] = useState([]);
    const [inputs, setInputs] = useState({
        start_date: '2023-03-10',
        end_date: '2024-11-12',
        month_deposit: '400000',
    });
    const { start_date, end_date, month_deposit } = inputs;
    
    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const calculate = () => {
        setDetails([]);
        const [start_year, end_year] = [parseInt(start_date.slice(0, 4)), parseInt(end_date.slice(0, 4))];
        const match = [0.33, 0.71, 1.0, 1.25, 0];
        let principal = 0;
        let tmp = 0;
        let acc = 0;
        let tmp_details = [];

        for (let year = start_year; year <= end_year; year++) {
            tmp = 0;
            if (year === start_year) {
                principal = (13 - parseInt(start_date.slice(5, 7))) * month_deposit;
            } else if (year === end_year) {
                principal = parseInt(end_date.slice(5, 7)) * month_deposit;
            } else {
                principal = 12 * month_deposit;
            }
            
            tmp_details = [...tmp_details, {
                year: year,
                principal: principal,
                goverment_inter: principal * 0.01,
                bank_inter: principal * 0.05,
                match_saving: principal * match[year <= 2021 ? 4 : year <= 2025 ? year-2022 : 3],
            }];

            tmp += principal;
            tmp += tmp_details[tmp_details.length-1].goverment_inter;
            tmp += tmp_details[tmp_details.length-1].bank_inter;
            tmp += tmp_details[tmp_details.length-1].match_saving;
            acc += tmp;
        }
        setDetails(tmp_details);
        setRes(acc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    }

    return (
        <div className="w-11/12 my-4 sm:w-[400px] bg-white p-5 shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-7">군적금 계산기</h1>
            <div className="text-gray-700">
                <div className="my-3">
                    <p className="">첫 적금 납입 일자</p>
                    <input className="w-full rounded-md bg-gray-100 border border-gray-100 py-2 px-2 outline-none focus:bg-gray-200 font-light text-black" name="start_date" type="date" value={start_date} onChange={onChange} />
                </div>
                <div className="my-3">
                    <p>전역/소집해제 일자</p>
                    <input className="w-full rounded-md bg-gray-100 border border-gray-100 py-2 px-2 outline-none focus:bg-gray-200 font-light text-black" name="end_date" type="date" value={end_date} onChange={onChange} />
                </div>
                <div className="my-3">
                    <p>월 적금 납입액</p>
                    <input className="w-full rounded-md bg-gray-100 border border-gray-100 py-2 px-2 outline-none focus:bg-gray-200 font-light text-black" name="month_deposit" placeholder="0" value={month_deposit} onChange={onChange} />
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
