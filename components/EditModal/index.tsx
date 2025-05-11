import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";


export const EditModal = ({ editing, setEditing, handleSave }: any) => {
    return (
        <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
            <DialogContent className="max-w-lg w-full">
                <DialogTitle>Edit Idea</DialogTitle>
                <Input
                    placeholder="Title"
                    value={editing.title}
                    onChange={(e) =>
                        setEditing({ ...editing, title: e.target.value })
                    }
                    className="mb-2"
                />
                <Textarea
                    placeholder="Description"
                    value={editing.description}
                    onChange={(e) =>
                        setEditing({ ...editing, description: e.target.value })
                    }
                    className="mb-2"
                />
                <Input
                    placeholder="Image URL"
                    value={editing.image}
                    onChange={(e) =>
                        setEditing({ ...editing, image: e.target.value })
                    }
                    className="mb-2"
                />
                <Input
                    placeholder="Button Label"
                    value={editing.buttonLabel}
                    onChange={(e) =>
                        setEditing({ ...editing, buttonLabel: e.target.value })
                    }
                    className="mb-2"
                />
                <Input
                    placeholder="Button URL"
                    value={editing.buttonUrl}
                    onChange={(e) =>
                        setEditing({ ...editing, buttonUrl: e.target.value })
                    }
                    className="mb-4"
                />
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setEditing(null)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}


