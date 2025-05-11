// VotingWidget.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DndContext, closestCenter } from "@dnd-kit/core";
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

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <h2 className="text-2xl font-bold text-gray-900">BeastScan Voting Ideas</h2>
                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant="outline"
                            onClick={() => {
                                const sorted = [...cards].sort((a, b) => b.votes - a.votes);
                                useVotingStore.setState({ cards: sorted });
                            }}
                            className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
                        >
                            Sort by Votes
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={resetCards}
                            className="bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
                        >
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
                        {isLoading ? (
                            <div className="flex justify-center items-center min-h-[400px]">
                                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cards.map((card, index) => (
                                    <SortableCard
                                        key={index}
                                        card={card}
                                        index={index}
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
        </div>
    );
};

export default VotingWidget;
