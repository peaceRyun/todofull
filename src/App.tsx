import { IoIosAddCircle } from 'react-icons/io';

const wrap = 'h-screen bg-[linear-gradient(to_right,#11998e,#38ef7d)] relative';

const ItemWrap = 'w-full h-16 bg-gray-300';

function App() {
    return (
        <>
            <div className={`${wrap}`}>
                <h1 className='p-50 font-bold text-white text-shadow-2xs'>할일 추가</h1>
                <div className='rounded-2xl w-[450px] h-[500px] shadow-2xl bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className='titleWrap flex justify-between items-center pt-8 px-8'>
                        <div>date</div>
                        <button className='w-20 h-20 p-0 transition-all duration-150 hover:text-yellow-500'>
                            <IoIosAddCircle className='w-full h-full ' />
                        </button>
                    </div>
                    <div className='inputWrap px-8 py-2'>
                        <input
                            type='text'
                            value=''
                            className='w-full border-b-2 text-xl'
                            placeholder='할일을 입력하세요'
                        />
                    </div>
                    <ul className='listWrap pt-5'>
                        <li className={`${ItemWrap}`}>할일 1</li>
                        <li className={`${ItemWrap}`}>할일 2</li>
                        <li className={`${ItemWrap}`}>할일 3</li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default App;
