// VotingWidget.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy} from "@dnd-kit/sortable";
import { useVotingStore } from "@/lib/hooks";
import { CardData } from "@/lib/interfaces";
import { SortableCard } from "../SortableCard";
import { EditModal } from "../EditModal";

const VotingWidget: React.FC = () => {
  const { cards, fetchCards, vote, updateCard, resetCards, reorderCards } =
    useVotingStore();
  const [editing, setEditing] = useState<CardData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("cards");
    if (saved) {
      useVotingStore.setState({ cards: JSON.parse(saved) });
    } else {
      fetchCards();
    }
  }, [fetchCards]);

  const handleSave = () => {
    if (editing) {
      updateCard(editing);
      setEditing(null);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">BeastScan Voting Ideas</h2>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              const sorted = [...cards].sort((a, b) => b.votes - a.votes);
              useVotingStore.setState({ cards: sorted });
            }}
          >
            Sort by Votes
          </Button>
          <Button variant="outline" onClick={resetCards}>
            Reset All
          </Button>
        </div>
      </div>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={(event) => {
          const { active, over } = event;
          if (active.id !== over?.id) {
            const oldIndex = cards.findIndex((c) => c.id === active.id);
            const newIndex = cards.findIndex((c) => c.id === over?.id);
            reorderCards(oldIndex, newIndex);
          }
        }}
      >
        <SortableContext
          items={cards.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, index) => (
              <SortableCard
                key={card.id}
                card={card}
                index={index}
                onEdit={setEditing}
                onVote={vote}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {editing && (
        <EditModal editing={editing} setEditing={setEditing} handleSave={handleSave}/>
      )}
    </div>
  );
};

export default VotingWidget;
