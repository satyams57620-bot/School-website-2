import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useFacilities, useAddFacility, useUpdateFacility, useDeleteFacility } from "@/hooks/useData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Plus, Pencil, Trash2 } from "lucide-react";

const EMPTY = { id: '', name: '', description: '', image_name: '', sort_order: 0 };

export default function AdminFacilities() {
  const { data: facilities, isLoading } = useFacilities();
  const addFacility = useAddFacility();
  const updateFacility = useUpdateFacility();
  const deleteFacility = useDeleteFacility();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<typeof EMPTY>(EMPTY);
  const [isNew, setIsNew] = useState(false);

  const openAdd = () => { setEditing(EMPTY); setIsNew(true); setOpen(true); };
  const openEdit = (item: any) => { setEditing(item); setIsNew(false); setOpen(true); };

  const handleSave = async () => {
    if (!editing.name || !editing.description) {
      toast({ title: "Name and description are required.", variant: "destructive" });
      return;
    }
    try {
      if (isNew) {
        await addFacility.mutateAsync({ name: editing.name, description: editing.description, image_name: editing.image_name, sort_order: editing.sort_order });
        toast({ title: "Added", description: "Facility added." });
      } else {
        await updateFacility.mutateAsync({ id: editing.id, name: editing.name, description: editing.description, image_name: editing.image_name });
        toast({ title: "Updated", description: "Facility updated." });
      }
      setOpen(false);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFacility.mutateAsync(id);
      toast({ title: "Deleted", description: "Facility removed." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const isPending = addFacility.isPending || updateFacility.isPending;

  return (
    <AdminLayout title="Manage Facilities">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Manage campus facilities and their descriptions.</p>
        <Button onClick={openAdd} data-testid="button-add-facility"><Plus size={16} className="mr-2" />Add Facility</Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Facility Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
            ) : !facilities || facilities.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No facilities found.</TableCell></TableRow>
            ) : facilities.map((item: any) => (
              <TableRow key={item.id} data-testid={`row-facility-${item.id}`}>
                <TableCell>
                  <div className="w-16 h-12 relative overflow-hidden rounded bg-muted">
                    {item.image_name?.startsWith('http') ? (
                      <img src={item.image_name} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImagePlaceholder filename={item.image_name} className="w-full h-full text-[8px]" text="Img" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium whitespace-nowrap">{item.name}</TableCell>
                <TableCell className="text-muted-foreground max-w-sm truncate text-sm">{item.description}</TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <Button variant="ghost" size="sm" className="mr-1" onClick={() => openEdit(item)} data-testid={`button-edit-facility-${item.id}`}><Pencil size={14} /></Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)} data-testid={`button-delete-facility-${item.id}`}><Trash2 size={14} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isNew ? 'Add Facility' : 'Edit Facility'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium mb-1">Facility Name <span className="text-destructive">*</span></label>
              <Input value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} data-testid="input-facility-name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description <span className="text-destructive">*</span></label>
              <Textarea rows={3} value={editing.description} onChange={e => setEditing(p => ({ ...p, description: e.target.value }))} className="resize-none" data-testid="textarea-facility-description" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image filename / URL</label>
              <Input value={editing.image_name} onChange={e => setEditing(p => ({ ...p, image_name: e.target.value }))} placeholder="computer_lab.jpg or https://..." data-testid="input-facility-image" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sort Order</label>
              <Input type="number" value={editing.sort_order} onChange={e => setEditing(p => ({ ...p, sort_order: Number(e.target.value) }))} data-testid="input-facility-sort" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isPending} data-testid="button-save-facility">{isPending ? 'Saving...' : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
