'use client'

import { useState } from "react";

export default function Card() {
    const [res, setRes] = useState(0);
    const [inputs, setInputs] = useState({
        start_date: '',
        end_date: '',
        month_deposit: '',
    });
    const { start_date, end_date, month_deposit } = inputs;
    
    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const calculate = (e) => {
        setRes(res+100);
    }

    return (
        <div className="w-11/12 my-4 sm:w-[400px] bg-white p-5 shadow-md rounded-md">
            <h1 className="text-3xl font-bold">군적금 계산기</h1>
            <div className="text-gray-700">
                <div className="my-3">
                    <p className="">첫 적금 납입 일자</p>
                    <input className="w-full rounded-md bg-gray-100 border border-gray-100 py-1 px-2 outline-none focus:bg-gray-200 font-light text-black" name="start_date" type="date" value={start_date} onChange={onChange} />
                </div>
                <div className="my-3">
                    <p>전역/소집해제 일자</p>
                    <input className="w-full rounded-md bg-gray-100 border border-gray-100 py-1 px-2 outline-none focus:bg-gray-200 font-light text-black" name="end_date" type="date" value={end_date} onChange={onChange} />
                </div>
                <div className="my-3">
                    <p>월 적금 납입액</p>
                    <input className="w-full rounded-md bg-gray-100 border border-gray-100 py-1 px-2 outline-none focus:bg-gray-200 font-light text-black" name="month_deposit" placeholder="0" value={month_deposit} onChange={onChange} />
                </div>
            </div>
            <button className="w-full rounded-md bg-black text-white py-2 my-3 hover:opacity-80 active:opacity-100" onClick={calculate}>계산하기</button>
            <div>
                <p>예상 수령액: {res}</p>
            </div>
        </div>
    )
  }
  