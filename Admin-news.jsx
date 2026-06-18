import React, { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useNews, useAddNews, useUpdateNews, useDeleteNews } from "@/hooks/useData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus } from "lucide-react";

const EMPTY = { id: '', title: '', content: '', event_date: '', category: 'news' };

export default function AdminNews() {
  const { data: news, isLoading } = useNews();
  const addNews = useAddNews();
  const updateNews = useUpdateNews();
  const deleteNews = useDeleteNews();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<typeof EMPTY>(EMPTY);
  const [isNew, setIsNew] = useState(false);

  const openAdd = () => { setEditing(EMPTY); setIsNew(true); setOpen(true); };
  const openEdit = (item: any) => { setEditing(item); setIsNew(false); setOpen(true); };

  const handleSave = async () => {
    if (!editing.title || !editing.event_date || !editing.category) {
      toast({ title: "Required fields missing", variant: "destructive" });
      return;
    }
    try {
      if (isNew) {
        await addNews.mutateAsync({ title: editing.title, content: editing.content, event_date: editing.event_date, category: editing.category });
        toast({ title: "Added", description: "News entry created." });
      } else {
        await updateNews.mutateAsync({ id: editing.id, title: editing.title, content: editing.content, event_date: editing.event_date, category: editing.category });
        toast({ title: "Updated", description: "News entry updated." });
      }
      setOpen(false);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNews.mutateAsync(id);
      toast({ title: "Deleted", description: "Entry removed." });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const isPending = addNews.isPending || updateNews.isPending;

  return (
    <AdminLayout title="Manage News & Events">
      <div className="flex justify-between items-center mb-6">
        <p className="text-muted-foreground">Manage news and event announcements shown on the website.</p>
        <Button onClick={openAdd} data-testid="button-add-news"><Plus size={16} className="mr-2" />Add Entry</Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Loading...</TableCell></TableRow>
            ) : !news || news.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No entries yet.</TableCell></TableRow>
            ) : news.map((item: any) => (
              <TableRow key={item.id} data-testid={`row-news-${item.id}`}>
                <TableCell className="whitespace-nowrap">{item.event_date ? new Date(item.event_date).toLocaleDateString('en-IN') : '—'}</TableCell>
                <TableCell>
                  <span className={`capitalize text-xs font-bold px-2 py-1 rounded-md ${item.category === 'event' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>{item.category}</span>
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <Button variant="ghost" size="sm" className="mr-1" onClick={() => openEdit(item)} data-testid={`button-edit-news-${item.id}`}><Pencil size={14} /></Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)} data-testid={`button-delete-news-${item.id}`}><Trash2 size={14} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{isNew ? 'Add News / Event' : 'Edit Entry'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium mb-1">Title <span className="text-destructive">*</span></label>
              <Input value={editing.title} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} data-testid="input-news-title" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date <span className="text-destructive">*</span></label>
                <Input type="date" value={editing.event_date} onChange={e => setEditing(p => ({ ...p, event_date: e.target.value }))} data-testid="input-news-date" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category <span className="text-destructive">*</span></label>
                <Select value={editing.category} onValueChange={v => setEditing(p => ({ ...p, category: v }))}>
                  <SelectTrigger data-testid="select-news-category"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <Textarea rows={4} value={editing.content} onChange={e => setEditing(p => ({ ...p, content: e.target.value }))} className="resize-none" data-testid="textarea-news-content" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={isPending} data-testid="button-save-news">{isPending ? 'Saving...' : 'Save'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
