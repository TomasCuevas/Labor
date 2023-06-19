import { Card } from '../../cards/entities';
import { User } from '../../users/entities';
export declare class Board {
    id: string;
    user: User;
    cards: Card[];
    name: string;
    description: string;
    background: string;
    status: 'open' | 'closed';
    lastUpdate: number;
    updateLastUpdate(): void;
}
