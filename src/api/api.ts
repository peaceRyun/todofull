import axios from 'axios';
import type { Todo, TodoResponse } from '../type/type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const useAddTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ task, isComplete = false }: { task: string; isComplete?: boolean }) => {
            const response = await axios.post('http://localhost:5000/api/tasks', {
                task,
                isComplete,
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
        onError: (error: any) => {
            console.log('에러남:', error.message);
        },
    });
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, task, isComplete }: { id: string; task?: string; isComplete?: boolean }) => {
            const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
                task,
                isComplete,
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
        onError: (error: any) => {
            console.log('에러남:', error.message);
        },
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
        onError: (error: any) => {
            console.log('에러남:', error.message);
        },
    });
};
