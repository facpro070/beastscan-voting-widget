import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, Edit2, GripHorizontal } from "lucide-react";

export const SortableCard = ({ card, onEdit, onVote }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id: card.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <motion.div
            ref={setNodeRef}
            style={style}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            className={`border rounded-xl p-4 shadow-lg bg-white transition-all duration-200 relative ${
                isDragging ? "shadow-2xl ring-2 ring-blue-500 rotate-2" : ""
            }`}
        >
            <div 
                {...attributes}
                {...listeners}
                className="absolute top-2 right-2 cursor-grab active:cursor-grabbing p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <GripHorizontal className="w-5 h-5" />
            </div>
            <div className="relative overflow-hidden rounded-lg mb-3">
                <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
                />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-800">{card.title}</h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{card.description}</p>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Button 
                        onClick={() => onVote(card.id, 1)}
                        className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-full"
                    >
                        <ThumbsUp className="w-5 h-5" />
                    </Button>
                    <span className="font-bold text-lg min-w-[2rem] text-center">{card.votes}</span>
                    <Button 
                        onClick={() => onVote(card.id, -1)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-full"
                    >
                        <ThumbsDown className="w-5 h-5" />
                    </Button>
                </div>
                <Button
                    variant="ghost"
                    onClick={() => onEdit(card)}
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
        </motion.div>
    );
}
