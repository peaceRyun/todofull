import { FaCheckCircle } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { formatMonthDayYear, type FormattedDate } from '../utils/dateFormatter';
import { useAddTodo, useDeleteTodo, useTodoList } from '../api/api';

const wrap = 'h-screen bg-[linear-gradient(to_right,#11998e,#38ef7d)] relative';

const ItemWrap =
    'w-full h-16 px-5 py-2 transition-all duration-200 hover:border-l-4 hover:bg-gray-200 flex items-center justify-between';

const HomePage = () => {
    const { data, isLoading } = useTodoList();
    const addTodoMutation = useAddTodo();
    const deleteTodoMutation = useDeleteTodo();

    const [textValue, setTextValue] = useState<string>('');
    const [checkValue, setCheckValue] = useState<{ [id: string]: boolean }>({});

    const todayDateFull: FormattedDate = formatMonthDayYear();
    const { year, monthName, day } = todayDateFull;

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setTextValue(e.target.value);
    };
    const handleTextSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (textValue.trim()) {
            addTodoMutation.mutate({ task: textValue });
            setTextValue('');
        }
    };

    const handleCheckChange = (id: string): void => {
        setCheckValue((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleDelete = (id: string): void => {
        deleteTodoMutation.mutate(id);
    };

    if (isLoading) return <p>로딩 중...</p>;
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
                        {data?.map((todo) => (
                            <li key={todo._id} className={`${ItemWrap}`}>
                                <div id='check' className='block w-8 h-full'>
                                    <label htmlFor={`ticked-${todo._id}`} className='cursor-pointer'>
                                        <FaCheckCircle
                                            className={`w-full h-full text-gray-300 hover:text-green-400 ${
                                                checkValue[todo._id] ? 'text-green-400' : ''
                                            }`}
                                        />
                                    </label>
                                    <input
                                        type='checkbox'
                                        id={`ticked-${todo._id}`}
                                        checked={!!checkValue[todo._id]}
                                        onChange={() => handleCheckChange(todo._id)}
                                        className='sr-only'
                                    />
                                </div>
                                <div className={`item w-full m-2.5 ${checkValue[todo._id] ? 'line-through' : ''}`}>
                                    {todo.task}
                                </div>
                                <button
                                    id='delete'
                                    className='block w-8 h-full'
                                    onClick={() => {
                                        handleDelete(todo._id);
                                    }}
                                >
                                    <MdDelete className='w-full h-full text-gray-300 hover:text-orange-400' />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default HomePage;
