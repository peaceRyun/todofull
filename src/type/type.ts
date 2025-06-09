export type Todo = {
    _id: string;
    task: string;
    isComplete: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type TodoResponse = {
    status: string;
    data: Todo[];
};
