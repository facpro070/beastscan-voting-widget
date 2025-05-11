import axios from "axios";
import { create } from "zustand";
import { VotingStore } from "./interfaces";
import { arrayMove } from "@dnd-kit/sortable";

export const useVotingStore = create<VotingStore>((set, get) => ({
    cards: [],
    original: [],
    fetchCards: async () => {
      const res = await axios.get("https://my.beastscan.com/test-kit");
      const cards = res.data.map((card: any) => ({
        ...card,
        votes: 0,
      }));
      set({ cards, original: cards });
      localStorage.setItem("cards", JSON.stringify(cards));
    },
    updateCard: (updated) => {
      const cards = get().cards.map((c) => (c.id === updated.id ? updated : c));
      set({ cards });
      localStorage.setItem("cards", JSON.stringify(cards));
    },
    resetCards: () => {
      const original = get().original;
      set({ cards: original });
      localStorage.setItem("cards", JSON.stringify(original));
    },
    vote: (id, delta) => {
      const cards = get().cards.map((card) =>
        card.id === id ? { ...card, votes: card.votes + delta } : card
      );
      set({ cards });
      localStorage.setItem("cards", JSON.stringify(cards));
    },
    reorderCards: (oldIndex, newIndex) => {
      const cards = arrayMove(get().cards, oldIndex, newIndex);
      set({ cards });
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }));
  