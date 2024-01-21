export default function MatchInfo() {

    return (
        <div className="w-11/12 my-4 sm:w-[400px] bg-white p-5 shadow-md rounded-md">
            <h1 className="text-xl font-bold mb-3">이율 정보</h1>
            <div className="text-gray-900 font-light">
                <p className="my-1">정부 지원 이자 : <bold className="font-semibold">1%</bold></p>
                <p className="my-1">은행 이자 : <bold className="font-bold">5%</bold></p>
                <p className="my-1"><bold className="font-semibold">2022년</bold> 매칭 지원금 : 원금과 이자를 합한 원리금의 <bold className="font-semibold">33%</bold></p>
                <p className="my-1"><bold className="font-semibold">2023년</bold> 매칭 지원금 : 원금과 이자를 합한 원리금의 <bold className="font-semibold">71%</bold></p>
                <p className="my-1"><bold className="font-semibold">2024년</bold> 매칭 지원금 : 원금과 이자를 합한 원리금의 <bold className="font-semibold">100%</bold></p>
                <p className="my-1"><bold className="font-semibold">2025년</bold> 매칭 지원금 : 원금과 이자를 합한 원리금의 <bold className="font-semibold">125%</bold></p>
            </div>
        </div>
    )
}