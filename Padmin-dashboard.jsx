import React from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { FileText, Image as ImageIcon, MessageSquare, Users, Building, Trophy } from "lucide-react";

export default function AdminDashboard() {
  const cards = [
    { title: "Manage News", icon: FileText, href: "/admin/news", color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Manage Gallery", icon: ImageIcon, href: "/admin/gallery", color: "text-purple-500", bg: "bg-purple-500/10" },
    { title: "Edit Messages", icon: MessageSquare, href: "/admin/messages", color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Manage Faculty", icon: Users, href: "/admin/teachers", color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Manage Facilities", icon: Building, href: "/admin/facilities", color: "text-red-500", bg: "bg-red-500/10" },
    { title: "Manage Toppers", icon: Trophy, href: "/admin/toppers", color: "text-yellow-600", bg: "bg-yellow-500/10" },
  ];

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full border-border">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className={`p-3 rounded-lg ${card.bg} ${card.color}`}>
                    <Icon size={24} />
                  </div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Click to view and edit entries.</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </AdminLayout>
  );
}
