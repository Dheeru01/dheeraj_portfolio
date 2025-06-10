
import React, { useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';

interface GalleryItem {
  id: number;
  src: string;
  title: string;
  category: string;
}

interface GalleryTabProps {
  gallery: GalleryItem[];
  setGallery: (gallery: GalleryItem[]) => void;
}

export const GalleryTab = ({ gallery, setGallery }: GalleryTabProps) => {
  const [newItem, setNewItem] = useState({ 
    src: '', 
    title: '', 
    category: '' 
  });
  
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setNewItem({...newItem, src: imageUrl});
        toast({ title: "Success", description: "Image uploaded successfully!" });
      };
      reader.readAsDataURL(file);
    }
  };

  const addGalleryItem = () => {
    if (newItem.src && newItem.title && newItem.category) {
      const updatedGallery = [...gallery, { ...newItem, id: Date.now() }];
      setGallery(updatedGallery);
      setNewItem({ src: '', title: '', category: '' });
      toast({ title: "Success", description: "Gallery item added successfully! Don't forget to save changes." });
    }
  };

  const removeGalleryItem = (id: number) => {
    const updatedGallery = gallery.filter(item => item.id !== id);
    setGallery(updatedGallery);
    toast({ title: "Deleted", description: "Gallery item removed successfully! Don't forget to save changes." });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-black">Manage Gallery</h3>
      
      <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
        <h4 className="text-lg font-medium text-black mb-4">Add New Gallery Item</h4>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label className="text-black">Upload Image</Label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload size={16} className="text-gray-600" />
                <span className="text-sm text-gray-600">Choose Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {newItem.src && (
                <img 
                  src={newItem.src} 
                  alt="Preview" 
                  className="w-16 h-16 object-cover rounded border border-gray-300"
                />
              )}
            </div>
          </div>

          <Input
            placeholder="Image Title"
            value={newItem.title}
            onChange={(e) => setNewItem({...newItem, title: e.target.value})}
            className="bg-white text-black border-gray-300"
          />
          <Input
            placeholder="Category"
            value={newItem.category}
            onChange={(e) => setNewItem({...newItem, category: e.target.value})}
            className="bg-white text-black border-gray-300"
          />
          <Button onClick={addGalleryItem} className="bg-black hover:bg-gray-800 text-white">
            <Plus size={16} className="mr-2" />
            Add Gallery Item
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {gallery.map((item) => (
          <div key={item.id} className="bg-gray-100 p-4 rounded-lg border border-gray-300">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-black font-medium">{item.title}</h5>
              <button
                onClick={() => removeGalleryItem(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <img 
              src={item.src} 
              alt={item.title} 
              className="w-full h-32 object-cover rounded border border-gray-300 mb-2"
            />
            <p className="text-gray-600 text-sm">Category: {item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
