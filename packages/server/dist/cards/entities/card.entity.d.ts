import { Board } from '../../boards/entities';
import { User } from '../../users/entities';
export declare class Card {
    id: string;
    user: User;
    board: Board;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    labels: string[];
    lastUpdate: number;
    updateLastUpdate(): void;
}
