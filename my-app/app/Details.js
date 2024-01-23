export default function Details({ details }) {
    const drawComma = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return (
        <div className="text-gray-700">
            {
                details.map((item, i) => (
                    <div className="my-5" key={i}>
                        <p className="font-semibold text-lg text-black">{item.year}</p>
                        <p>원금 : {drawComma(item.principal)}원</p>
                        <p>정부 지원 이자 : {drawComma(item.goverment_inter)}원</p>
                        <p>은행 이자 : {drawComma(item.bank_inter)}원</p>
                        <p>매칭 지원금 : {drawComma(item.match_saving)}원</p>
                    </div>
                ))
            }
            <div className="flex justify-between">
                <p></p>
                <p className="text-xs text-gray-500">실제 수령액과 차이가 있을 수 있습니다.</p>
            </div>
        </div>
    )
}