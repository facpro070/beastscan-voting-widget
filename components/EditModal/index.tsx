import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Image, Link2, Type, FileText, Save, X } from "lucide-react";

export const EditModal = ({ editing, setEditing, handleSave }: any) => {
    return (
        <Dialog open={!!editing} onOpenChange={() => setEditing(null)}>
            <DialogContent className="max-w-lg w-full">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900">Edit Idea</DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="flex items-center gap-2">
                            <Type className="w-4 h-4" />
                            Title
                        </Label>
                        <Input
                            id="title"
                            placeholder="Enter idea title"
                            value={editing.title}
                            onChange={(e) =>
                                setEditing({ ...editing, title: e.target.value })
                            }
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Describe your idea"
                            value={editing.description}
                            onChange={(e) =>
                                setEditing({ ...editing, description: e.target.value })
                            }
                            className="min-h-[100px] resize-y"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image" className="flex items-center gap-2">
                            <Image className="w-4 h-4" />
                            Image URL
                        </Label>
                        <Input
                            id="image"
                            placeholder="https://example.com/image.jpg"
                            value={editing.image}
                            onChange={(e) =>
                                setEditing({ ...editing, image: e.target.value })
                            }
                        />
                        {editing.image && (
                            <div className="mt-2 rounded-lg overflow-hidden border">
                                <img 
                                    src={editing.image} 
                                    alt="Preview" 
                                    className="w-full h-32 object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Invalid+Image';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="buttonLabel" className="flex items-center gap-2">
                            <Type className="w-4 h-4" />
                            Button Label
                        </Label>
                        <Input
                            id="buttonLabel"
                            placeholder="Enter button text"
                            value={editing.button.label}
                            onChange={(e) =>
                                setEditing({ ...editing, button: { ...editing.button, label: e.target.value } })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="buttonUrl" className="flex items-center gap-2">
                            <Link2 className="w-4 h-4" />
                            Button URL
                        </Label>
                        <Input
                            id="buttonUrl"
                            placeholder="https://example.com"
                            value={editing.button.url}
                            onChange={(e) =>
                                setEditing({ ...editing, button: { ...editing.button, url: e.target.value } })
                            }
                        />
                    </div>
                </div>

                <DialogFooter className="flex gap-2 justify-end">
                    <Button 
                        variant="outline" 
                        onClick={() => setEditing(null)}
                        className="flex items-center gap-2"
                    >
                        <X className="w-4 h-4" />
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


