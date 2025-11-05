/* eslint-disable @typescript-eslint/no-explicit-any */
// components/medicine-cabinet.tsx
"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMedicines } from "@/hooks/useMedicines";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus, Trash2, Edit } from "lucide-react";
import { format } from "date-fns";
import { Medicine } from "@/types";
import MedicineForm from "@/components/medicine-form";

export default function MedicineCabinet() {
  const { user } = useAuth();
  const { medicines, loading, save, remove } = useMedicines(user?.id);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Medicine | null>(null);

  const handleOpen = (med?: Medicine) => {
    setEditing(med || null);
    setOpen(true);
  };

  if (loading) return <Loader2 className="animate-spin mx-auto mt-20" />;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Medicine Cabinet</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpen()}>
              <Plus className="mr-2" /> Add Medicine
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit" : "Add"} Medicine</DialogTitle>
            </DialogHeader>
            <MedicineForm
              initialData={editing || undefined}
              onSave={async (data) => {
                await save(data);
                setOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {medicines.map((med) => (
          <Card key={med.id}>
            <CardHeader>
              <CardTitle className="flex justify-between">
                {med.name}
                <div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleOpen(med)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => remove(med.id!)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p>
                <strong>Dosage:</strong> {med.dosage}
              </p>
              <p>
                <strong>Form:</strong> {med.form}
              </p>
              <p>
                <strong>Times:</strong> {med.frequency?.times.join(", ")}
              </p>
              <p>
                <strong>Days:</strong>{" "}
                {med.frequency?.days.map((d) => d.slice(0, 3)).join(", ")}
              </p>
              {med.start_date && (
                <p>
                  <strong>From:</strong>{" "}
                  {format(new Date(med.start_date), "MMM d, yyyy")}
                </p>
              )}
              {med.refill_reminder_days ? (
                <p>
                  <strong>Refill in {med.refill_reminder_days} days</strong>
                </p>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
