import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useGallery, useAddGallery, useDeleteGallery } from "@/hooks/useData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Plus, Trash2 } from "lucide-react";

const EMPTY = { title: '', image_url: '' };

export default function AdminGallery() {
  const { data: gallery, isLoading } = useGallery();
  const addGallery = useAddGallery();
  const deleteGallery = useDeleteGallery();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const handleSave = async () => {
    if (!form.title || !form.image_url) {
      toast({ title: "Both title and image URL are required.", variant: "destructive" });
      return;
    }
    try {
      await addGallery.mutateAsync(form);
      toast({ title: "Added", description: "Photo added to gallery." });
      setForm(EMPTY);
      setOpen(false);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGallery.mutateAsync(id);
      toast({ title: "Deleted", description: "Photo removed from gallery." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  return (
    <AdminLayout title="Manage Gallery">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Add and remove school gallery photos.</p>
        <Button onClick={() => setOpen(true)} data-testid="button-add-gallery"><Plus size={16} className="mr-2" />Add Photo</Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Preview</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Image URL</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
            ) : !gallery || gallery.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No photos yet.</TableCell></TableRow>
            ) : gallery.map((item: any) => (
              <TableRow key={item.id} data-testid={`row-gallery-${item.id}`}>
                <TableCell>
                  <div className="w-16 h-12 relative overflow-hidden rounded bg-muted">
                    {item.image_url?.startsWith('http') ? (
                      <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <ImagePlaceholder filename={item.image_url} className="w-full h-full text-[8px]" text="Img" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="text-muted-foreground font-mono text-xs max-w-xs truncate">{item.image_url}</TableCell>
                <TableCell className="text-right">
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)} data-testid={`button-delete-gallery-${item.id}`}><Trash2 size={14} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Gallery Photo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium mb-1">Title <span className="text-destructive">*</span></label>
              <Input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Annual Sports Day" data-testid="input-gallery-title" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL <span className="text-destructive">*</span></label>
              <Input value={form.image_url} onChange={e => setForm(p => ({ ...p, image_url: e.target.value }))} placeholder="https://... or filename.jpg" data-testid="input-gallery-url" />
              <p className="text-xs text-muted-foreground mt-1">Paste a public image URL from your Supabase Storage or any hosted image link.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={addGallery.isPending} data-testid="button-save-gallery">{addGallery.isPending ? 'Adding...' : 'Add Photo'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
