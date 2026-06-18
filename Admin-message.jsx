import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useMessages, useUpsertMessage } from "@/hooks/useData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ROLE_LABELS: Record<string, string> = {
  founder: 'Founder',
  vp: 'Vice President',
  principal: 'Principal',
  hod: 'Head of Department',
  manager: 'Manager',
};

export default function AdminMessages() {
  const { data: messages, isLoading } = useMessages();
  const upsert = useUpsertMessage();
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (messages) setItems(messages as any[]);
  }, [messages]);

  const handleChange = (role: string, field: string, value: string) => {
    setItems(prev => prev.map(item => item.role === role ? { ...item, [field]: value } : item));
  };

  const handleSave = async (item: any) => {
    setSaving(item.role);
    try {
      await upsert.mutateAsync({ role: item.role, name: item.name, message: item.message });
      toast({ title: "Saved", description: `${ROLE_LABELS[item.role] || item.role} message updated.` });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSaving(null);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Manage Leadership Messages">
        <div className="text-muted-foreground py-8 text-center">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Manage Leadership Messages">
      <p className="text-muted-foreground mb-8">Edit the messages displayed on the Leadership Messages page.</p>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.role} className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center border-b border-border pb-4 mb-5">
              <div>
                <h3 className="font-serif font-bold text-xl text-primary">{ROLE_LABELS[item.role] || item.role}</h3>
              </div>
              <Button
                size="sm"
                onClick={() => handleSave(item)}
                disabled={saving === item.role}
                data-testid={`button-save-message-${item.role}`}
              >
                {saving === item.role ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={item.name || ''}
                  onChange={e => handleChange(item.role, 'name', e.target.value)}
                  data-testid={`input-message-name-${item.role}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <Textarea
                  rows={6}
                  value={item.message || ''}
                  onChange={e => handleChange(item.role, 'message', e.target.value)}
                  className="resize-y"
                  data-testid={`textarea-message-${item.role}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
