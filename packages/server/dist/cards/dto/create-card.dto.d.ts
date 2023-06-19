export declare class CreateCardDto {
    title: string;
    status: 'pending' | 'in-progress' | 'completed';
    boardId: string;
    description?: string;
    labels?: string[];
}
