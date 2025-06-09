import { FaCheckCircle } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { formatMonthDayYear, type FormattedDate } from '../utils/dateFormatter';

const wrap = 'h-screen bg-[linear-gradient(to_right,#11998e,#38ef7d)] relative';

const ItemWrap =
    'w-full h-16 px-5 py-2 transition-all duration-200 hover:border-l-4 hover:bg-gray-200 flex items-center justify-between';

function HomePage() {
    const [textValue, setTextValue] = useState<string>('');
    const [checkValue, setCheckValue] = useState<boolean>(false);

    const todayDateFull: FormattedDate = formatMonthDayYear();
    const { year, monthName, day } = todayDateFull;

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setTextValue(e.target.value);
    };
    const handleTextSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        alert(`${textValue}`);
    };

    const handleCheckChange = (): void => {
        setCheckValue(!checkValue);
    };

    return (
        <>
            <div className={`${wrap}`}>
                <h1 className='p-50 font-bold text-white text-shadow-2xs'>ToDoList</h1>
                <div className='rounded-2xl w-[450px] h-[500px] shadow-2xl bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <form onSubmit={handleTextSubmit}>
                        <div className='titleWrap flex justify-between items-center pt-8 px-8'>
                            <div className='flex items-center text-gray-400 text-right'>
                                <div className='text-5xl font-semibold'>{day}</div>
                                <div className='pl-3'>
                                    <div className='font-bold uppercase'>{monthName}</div>
                                    <div>{year}</div>
                                </div>
                            </div>
                            <button
                                type='submit'
                                id='add'
                                className='w-16 h-16 p-0 transition-all duration-150 hover:text-yellow-500'
                            >
                                <IoIosAddCircle className='w-full h-full ' />
                            </button>
                        </div>
                        <div className='inputWrap px-8 py-2'>
                            <input
                                type='text'
                                id='inputValue'
                                value={textValue}
                                onChange={handleTextChange}
                                className='w-full border-b-2 text-xl focus:outline-none transition-all duration-300 focus:border-b-green-300 py-2'
                                placeholder='할일을 입력하세요'
                            />
                        </div>
                    </form>
                    <ul className='listWrap pt-2 h-[320px] overflow-auto'>
                        <li className={`${ItemWrap}`}>
                            <div id='check' className='block w-8 h-full'>
                                <label htmlFor='ticked' className='cursor-pointer'>
                                    <FaCheckCircle
                                        className={`w-full h-full text-gray-300 hover:text-green-400 ${
                                            checkValue ? 'text-green-400' : ''
                                        }`}
                                    />
                                </label>
                                <input
                                    type='checkbox'
                                    id='ticked'
                                    checked={checkValue}
                                    onChange={handleCheckChange}
                                    className='sr-only'
                                />
                            </div>
                            <div className={`item w-full m-2.5 ${checkValue ? 'line-through' : ''}`}>할일 1</div>
                            <button id='delete' className='block w-8 h-full'>
                                <MdDelete className='w-full h-full text-gray-300 hover:text-orange-400' />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default HomePage;
