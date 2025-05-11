// VotingWidget.tsx
"use client";

import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { useVotingStore } from "@/lib/hooks";
import { CardData } from "@/lib/interfaces";
import BeastScanCard from "../BeastScanCard";
import { EditModal } from "../EditModal";
import { Loader2 } from "lucide-react";


const SortableItem = ({ item, children }: { item: CardData, children: React.ReactNode }) => {
  const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging
  } = useSortable({ id: item.id.toString() });

  const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
  };

  return (
      <div ref={setNodeRef} style={style} {...attributes}>
          {React.cloneElement(children as React.ReactElement, { ...listeners })}
      </div>
  );
};

const VotingWidget: React.FC = () => {
  const { cards, fetchCards, vote, updateCard, reorderCards } =
    useVotingStore();

    const [localItems, setLocalItems] = useState<CardData[]>([...cards]);
  const [editing, setEditing] = useState<CardData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  );

  useEffect(() => {
    const saved = localStorage.getItem("cards");
    if (saved) {
      useVotingStore.setState({ cards: JSON.parse(saved) });
    } else {
      setIsLoading(true);
      fetchCards().finally(() => setIsLoading(false));
    }
  }, [fetchCards]);

  useEffect(() => {
    const stored = localStorage.getItem("cards");
    if (stored) {
      const storedItems: CardData[] = JSON.parse(stored);

      // Rebuild the list: respect order from localStorage and fill in any new items
      const ordered: CardData[] = [];

      // Add stored ones in order
      storedItems.forEach(storedItem => {
        const match = cards.find(i => i.id === storedItem.id);
        if (match) ordered.push({ ...match });
      });

      // Add any new ones not in localStorage
      const newOnes = cards.filter(i => !storedItems.find(si => si.id === i.id));
      const fullList = [...ordered, ...newOnes];

      setLocalItems(fullList);
      localStorage.setItem("cards", JSON.stringify(fullList));
    } else {
      setLocalItems(cards);
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [cards]);

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
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localItems.map((c) => c.id)}
          strategy={rectSortingStrategy}
        >
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {localItems.map((card) => (
                  <SortableItem
                    key={card.id}
                    item={card}
                  >
                    <BeastScanCard
                      card={card}
                      onEdit={setEditing}
                      onVote={vote}
                  />
                </SortableItem>
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
