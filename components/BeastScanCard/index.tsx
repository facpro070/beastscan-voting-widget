import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, Edit2, GripHorizontal } from "lucide-react";
import Image from "next/image";
import { CardData } from "@/lib/interfaces";

interface IProps {
    card: CardData;
    onEdit: (card: CardData) => void;
    onVote: (id: string, delta: number) => void;
}

const BeastScanCard = React.forwardRef<HTMLDivElement, IProps>(({ card, onEdit, onVote, ...props }, ref) => {

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            className={`border rounded-xl p-4 shadow-lg bg-white transition-all duration-200 relative cursor-grab active:cursor-grabbing`}
        >
            <div
                className="relative overflow-hidden rounded-lg mb-3 h-48 bg-gray-100"
            >
                {card.image ? (
                    <Image
                        src={card.image}
                        alt={card.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                        }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        No Image Available
                    </div>
                )}
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">{card.title}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{card.description}</p>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            onVote(card.id, 1);
                        }}
                        className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-full"
                    >
                        <ThumbsUp className="w-5 h-5" />
                    </Button>
                    <span className="font-bold text-lg min-w-[2rem] text-center">{card.votes}</span>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            onVote(card.id, -1);
                        }}
                        className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-full"
                    >
                        <ThumbsDown className="w-5 h-5" />
                    </Button>
                </div>
                <Button
                    variant="ghost"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(card);
                    }}
                    className="text-gray-600 hover:text-gray-900"
                >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Edit
                </Button>
            </div>
            <a
                href={card.button.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
            >
                {card.button.label}
            </a>
            <div className="flex items-center justify-center mt-2 text-gray-400" {...props}>
                <GripHorizontal className="w-5 h-5" />
            </div>
        </motion.div>
    );
})

export default BeastScanCard;
