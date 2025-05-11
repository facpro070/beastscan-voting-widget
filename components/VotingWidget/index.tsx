// VotingWidget.tsx
"use client";

import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useVotingStore } from "@/lib/hooks";
import { CardData } from "@/lib/interfaces";
import { SortableCard } from "../SortableCard";
import { EditModal } from "../EditModal";
import { Loader2 } from "lucide-react";
const VotingWidget: React.FC = () => {
  const { cards, fetchCards, vote, updateCard, resetCards, reorderCards } =
    useVotingStore();
  const [editing, setEditing] = useState<CardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cards");
    if (saved) {
      useVotingStore.setState({ cards: JSON.parse(saved) });
    } else {
      setIsLoading(true);
      fetchCards().finally(() => setIsLoading(false));
    }
  }, [fetchCards]);

  const handleSave = () => {
    if (editing) {
      updateCard(editing);
      setEditing(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = cards.findIndex((item) => item.id === active.id);
    const newIndex = cards.findIndex((item) => item.id === over.id);
    reorderCards(oldIndex, newIndex);
  };


  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">BeastScan Voting Ideas</h2>
      </div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cards.map((card) => (
                <SortableCard
                  key={card.id}
                  card={card}
                  onEdit={setEditing}
                  onVote={vote}
                />
              ))}
            </div>
          )}
        </SortableContext>
      </DndContext>

      {editing && (
        <EditModal editing={editing} setEditing={setEditing} handleSave={handleSave} />
      )}
    </div>
  );
};

export default VotingWidget;
