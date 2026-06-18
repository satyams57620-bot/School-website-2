import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useTeachers, useAddTeacher, useUpdateTeacher, useDeleteTeacher } from "@/hooks/useData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Plus, Pencil, Trash2 } from "lucide-react";

const EMPTY = { id: '', name: '', subject: '', designation: '', image_name: '', sort_order: 0 };

export default function AdminTeachers() {
  const { data: teachers, isLoading } = useTeachers();
  const addTeacher = useAddTeacher();
  const updateTeacher = useUpdateTeacher();
  const deleteTeacher = useDeleteTeacher();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<typeof EMPTY>(EMPTY);
  const [isNew, setIsNew] = useState(false);

  const openAdd = () => { setEditing(EMPTY); setIsNew(true); setOpen(true); };
  const openEdit = (item: any) => { setEditing(item); setIsNew(false); setOpen(true); };

  const handleSave = async () => {
    if (!editing.name || !editing.subject || !editing.designation) {
      toast({ title: "Name, subject and designation are required.", variant: "destructive" });
      return;
    }
    try {
      if (isNew) {
        await addTeacher.mutateAsync({
          name: editing.name,
          subject: editing.subject,
          designation: editing.designation,
          image_name: editing.image_name,
          sort_order: editing.sort_order,
        });
        toast({ title: "Added", description: "Teacher added." });
      } else {
        await updateTeacher.mutateAsync({
          id: editing.id,
          name: editing.name,
          subject: editing.subject,
          designation: editing.designation,
          image_name: editing.image_name,
        });
        toast({ title: "Updated", description: "Teacher record updated." });
      }
      setOpen(false);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTeacher.mutateAsync(id);
      toast({ title: "Deleted", description: "Teacher removed." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const isPending = addTeacher.isPending || updateTeacher.isPending;

  return (
    <AdminLayout title="Manage Faculty">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Manage school teaching staff profiles.</p>
        <Button onClick={openAdd} data-testid="button-add-teacher"><Plus size={16} className="mr-2" />Add Teacher</Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px]">Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
            ) : !teachers || teachers.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No faculty records found.</TableCell></TableRow>
            ) : teachers.map((item: any) => (
              <TableRow key={item.id} data-testid={`row-teacher-${item.id}`}>
                <TableCell>
                  <div className="w-10 h-10 relative overflow-hidden rounded-full bg-muted">
                    {item.image_name?.startsWith('http') ? (
                      <img src={item.image_name} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImagePlaceholder filename={item.image_name} className="w-full h-full text-[8px]" text={item.name?.charAt(0)} />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell><span className="px-2 py-1 bg-muted rounded-md text-xs font-semibold">{item.designation}</span></TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <Button variant="ghost" size="sm" className="mr-1" onClick={() => openEdit(item)} data-testid={`button-edit-teacher-${item.id}`}><Pencil size={14} /></Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)} data-testid={`button-delete-teacher-${item.id}`}><Trash2 size={14} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isNew ? 'Add Teacher' : 'Edit Teacher'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name <span className="text-destructive">*</span></label>
              <Input value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} data-testid="input-teacher-name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject <span className="text-destructive">*</span></label>
              <Input value={editing.subject} onChange={e => setEditing(p => ({ ...p, subject: e.target.value }))} data-testid="input-teacher-subject" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Designation <span className="text-destructive">*</span></label>
              <Input value={editing.designation} onChange={e => setEditing(p => ({ ...p, designation: e.target.value }))} placeholder="e.g. Senior Teacher, PGT, TGT" data-testid="input-teacher-designation" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Photo filename / URL</label>
              <Input value={editing.image_name} onChange={e => setEditing(p => ({ ...p, image_name: e.target.value }))} placeholder="teacher_1.jpg or https://..." data-testid="input-teacher-image" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sort Order</label>
              <Input type="number" value={editing.sort_order} onChange={e => setEditing(p => ({ ...p, sort_order: Number(e.target.value) }))} data-testid="input-teacher-sort" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isPending} data-testid="button-save-teacher">{isPending ? 'Saving...' : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
