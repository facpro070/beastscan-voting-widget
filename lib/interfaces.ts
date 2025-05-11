export interface CardData {
    id: string;
    title: string;
    description: string;
    image: string;
    buttonLabel: string;
    buttonUrl: string;
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