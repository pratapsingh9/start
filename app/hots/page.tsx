'use client';

import { useState } from 'react';
import { PlusCircle, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface GalleryItem {
  id: number;
  imageUrl: string;
  link: string;
  title: string;
}

export default function ModernGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newLink, setNewLink] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const addItem = () => {
    if (newImageUrl && newLink && newTitle) {
      setItems((prevItems) => [
        ...prevItems,
        { id: Date.now(), imageUrl: newImageUrl, link: newLink, title: newTitle },
      ]);
      resetInputs();
    }
  };

  const resetInputs = () => {
    setNewImageUrl('');
    setNewLink('');
    setNewTitle('');
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />

      <main className="flex-1 p-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mb-6 bg-blue-600 hover:bg-blue-700 flex items-center">
              <PlusCircle className="mr-2 h-5 w-5" />
              Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Add New Gallery Item</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <InputField value={newImageUrl} onChange={setNewImageUrl} placeholder="Image URL" />
              <InputField value={newLink} onChange={setNewLink} placeholder="Link URL" />
              <InputField value={newTitle} onChange={setNewTitle} placeholder="Title" />
              <Button onClick={addItem} className="bg-blue-600 hover:bg-blue-700">Add Item</Button>
            </div>
          </DialogContent>
        </Dialog>

        <GalleryGrid items={items} removeItem={removeItem} selectItem={setSelectedItem} />

        <ItemDetailsDialog selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </main>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="p-6 border-b border-gray-800">
      <h1 className="text-3xl font-bold text-center">Modern Gallery</h1>
    </header>
  );
}

function Footer() {
  return (
    <footer className="p-6 border-t border-gray-800 mt-auto">
      <p className="text-center text-gray-500">© 2023 Modern Gallery. All rights reserved.</p>
    </footer>
  );
}

function InputField({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-gray-700 text-white border-gray-600"
    />
  );
}

function GalleryGrid({ items, removeItem, selectItem }: { items: GalleryItem[]; removeItem: (id: number) => void; selectItem: (item: GalleryItem | null) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <div key={item.id} className="relative group">
          <div onClick={() => selectItem(item)} className="cursor-pointer">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
              <span className="text-white text-lg font-semibold">View Details</span>
            </div>
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => removeItem(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function ItemDetailsDialog({ selectedItem, setSelectedItem }: { selectedItem: GalleryItem | null; setSelectedItem: (item: GalleryItem | null) => void }) {
  return (
    <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
      <DialogContent className="bg-black text-white max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>{selectedItem?.title}</DialogTitle>
        </DialogHeader>
        {selectedItem && (
          <div className="mt-4 rounded-lg">
            <img
              src={selectedItem.imageUrl}
              alt={selectedItem.title}
              className="w-full h-auto max-h-[70vh] object-contain"
            />
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-400">Click the button to visit the link</p>
              <a
                href={selectedItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
              >
                Visit Link
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
