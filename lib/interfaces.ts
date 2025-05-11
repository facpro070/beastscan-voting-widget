export interface CardData {
    id: string;
    title: string;
    description: string;
    image: string;
    button: {
        label: string;
        url: string;
    };
    votes: number;
}

export interface VotingStore {
    cards: CardData[];
    original: CardData[];
    fetchCards: () => Promise<void>;
    updateCard: (card: CardData) => void;
    resetCards: () => void;
    vote: (id: string, delta: number) => void;
    reorderCards: (oldIndex: number, newIndex: number) => void;
}