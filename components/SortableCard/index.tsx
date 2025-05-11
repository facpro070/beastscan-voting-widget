import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";

export const SortableCard = ({ card, onEdit, onVote }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: card.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}

            className="border rounded-xl p-4 shadow bg-white"
        >
            <img
                src={card.image}
                alt={card.title}
                className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="font-semibold text-lg">{card.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{card.description}</p>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button onClick={() => onVote(card.id, 1)}>⬆️</Button>
                    <span>{card.votes}</span>
                    <Button onClick={() => onVote(card.id, -1)}>⬇️</Button>
                </div>
                <Button
                    variant="link"
                    onClick={() => onEdit(card)}
                    className="text-xs"
                >
                    Edit
                </Button>
            </div>
            <a
                href={card.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-3 text-center bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
            >
                {card.buttonLabel}
            </a>
        </div>
    );
}
