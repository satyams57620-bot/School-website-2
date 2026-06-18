import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useToppers, useAddTopper, useUpdateTopper, useDeleteTopper } from "@/hooks/useData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Trophy } from "lucide-react";

const EMPTY = { id: '', name: '', percentage: '', image_url: '', year: '', rank: 1, class_level: 10 as 10 | 12 };

export default function AdminToppers() {
  const [activeClass, setActiveClass] = useState<10 | 12>(10);
  const { data: toppers, isLoading } = useToppers(activeClass);
  const addTopper = useAddTopper();
  const updateTopper = useUpdateTopper();
  const deleteTopper = useDeleteTopper();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<typeof EMPTY>(EMPTY);
  const [isNew, setIsNew] = useState(false);

  const openAdd = () => {
    setEditing({ ...EMPTY, class_level: activeClass, rank: (toppers?.length ?? 0) + 1 });
    setIsNew(true);
    setOpen(true);
  };
  const openEdit = (item: any) => { setEditing(item); setIsNew(false); setOpen(true); };

  const handleSave = async () => {
    if (!editing.name || !editing.percentage) {
      toast({ title: "Name and percentage are required.", variant: "destructive" });
      return;
    }
    try {
      if (isNew) {
        await addTopper.mutateAsync({
          name: editing.name,
          percentage: editing.percentage,
          image_url: editing.image_url,
          year: editing.year,
          rank: editing.rank,
          class_level: activeClass,
        });
      } else {
        await updateTopper.mutateAsync({
          id: editing.id,
          name: editing.name,
          percentage: editing.percentage,
          image_url: editing.image_url,
          year: editing.year,
          rank: editing.rank,
          class_level: editing.class_level,
        });
      }
      toast({ title: isNew ? "Topper added!" : "Topper updated!" });
      setOpen(false);
    } catch (e: any) {
      toast({ title: "Error: " + e.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this topper?")) return;
    try {
      await deleteTopper.mutateAsync(id);
      toast({ title: "Deleted." });
    } catch (e: any) {
      toast({ title: "Error: " + e.message, variant: "destructive" });
    }
  };

  return (
    <AdminLayout title="Manage Toppers">
      {/* Class Tabs */}
      <div className="flex gap-2 mb-6">
        {([10, 12] as const).map((cls) => (
          <button
            key={cls}
            onClick={() => setActiveClass(cls)}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${activeClass === cls ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            Class {cls} Toppers
          </button>
        ))}
        <Button onClick={openAdd} className="ml-auto" size="sm">
          <Plus size={16} className="mr-1" /> Add Topper
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {toppers && toppers.length > 0 ? toppers.map((t: any) => (
                <TableRow key={t.id}>
                  <TableCell className="font-bold text-secondary">#{t.rank}</TableCell>
                  <TableCell>
                    <img
                      src={t.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=fec00a&color=1e3a6e&bold=true`}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-border"
                      onError={(e: any) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=fec00a&color=1e3a6e&bold=true`; }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell>
                    <span className="font-bold text-primary">{t.percentage}%</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{t.year || '—'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(t)}><Pencil size={15} /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(t.id)}><Trash2 size={15} /></Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                    <Trophy size={32} className="mx-auto mb-2 opacity-30" />
                    No toppers yet. Click "Add Topper" to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isNew ? "Add Topper" : "Edit Topper"} — Class {activeClass}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div>
              <label className="text-sm font-medium mb-1 block">Student Name *</label>
              <Input placeholder="e.g. Rahul Sharma" value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Percentage *</label>
              <Input placeholder="e.g. 95.4" value={editing.percentage} onChange={e => setEditing(p => ({ ...p, percentage: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Rank / Position</label>
              <Input type="number" min={1} value={editing.rank} onChange={e => setEditing(p => ({ ...p, rank: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Year (e.g. 2024)</label>
              <Input placeholder="2024" value={editing.year} onChange={e => setEditing(p => ({ ...p, year: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Photo URL (optional)</label>
              <Input placeholder="https://..." value={editing.image_url} onChange={e => setEditing(p => ({ ...p, image_url: e.target.value }))} />
              <p className="text-xs text-muted-foreground mt-1">Leave blank to use auto-generated avatar.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={addTopper.isPending || updateTopper.isPending}>
              {isNew ? "Add" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
