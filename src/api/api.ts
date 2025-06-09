import axios from 'axios';
import type { Todo, TodoResponse } from '../type/type';
import { useQuery } from '@tanstack/react-query';

async function getTodos(): Promise<Todo[]> {
    try {
        const result = await axios.get<TodoResponse>('http://localhost:5000/api/tasks');
        console.log(result);
        return result.data.data;
    } catch (error: any) {
        console.log('에러남:', error.message);
        return [];
    }
}

export const useTodoList = () => {
    return useQuery({
        queryKey: ['todos'],
        queryFn: getTodos,
    });
};
