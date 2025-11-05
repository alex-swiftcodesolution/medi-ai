// components/medicine-form.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Medicine } from "@/types";

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

interface MedicineFormProps {
  initialData?: Medicine;
  onSave: (data: Medicine) => Promise<void>;
}

export default function MedicineForm({
  initialData,
  onSave,
}: MedicineFormProps) {
  const [form, setForm] = useState<Medicine>(
    initialData || {
      name: "",
      dosage: "",
      form: "pill",
      frequency: { times: [""], days: [] },
      start_date: "",
      end_date: "",
      refill_reminder_days: 0,
      notes: "",
    }
  );

  const handleSave = async () => {
    await onSave(form);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
      </div>
      <div>
        <Label>Dosage</Label>
        <Input
          value={form.dosage}
          onChange={(e) => setForm((f) => ({ ...f, dosage: e.target.value }))}
          placeholder="500mg"
        />
      </div>
      <div>
        <Label>Form</Label>
        <Select
          value={form.form}
          onValueChange={(v) => setForm((f) => ({ ...f, form: v }))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["pill", "capsule", "liquid", "injection", "patch", "cream"].map(
              (f) => (
                <SelectItem key={f} value={f}>
                  {f}
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Times per Day</Label>
        {form.frequency?.times.map((t, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <Input
              type="time"
              value={t}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  frequency: {
                    ...f.frequency,
                    times: f.frequency!.times.map((tt, ii) =>
                      ii === i ? e.target.value : tt
                    ),
                  },
                }))
              }
            />
            {i === form.frequency!.times.length - 1 && (
              <Button
                size="icon"
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    frequency: {
                      ...f.frequency,
                      times: [...f.frequency!.times, ""],
                    },
                  }))
                }
              >
                <Plus />
              </Button>
            )}
          </div>
        ))}
      </div>
      <div>
        <Label>Days</Label>
        <div className="flex gap-2 flex-wrap">
          {DAYS.map((d) => (
            <label key={d} className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={form.frequency?.days.includes(d)}
                onChange={(e) => {
                  const days = e.target.checked
                    ? [...form.frequency!.days, d]
                    : form.frequency!.days.filter((dd) => dd !== d);
                  setForm((f) => ({
                    ...f,
                    frequency: { ...f.frequency, days },
                  }));
                }}
              />
              <span className="capitalize">{d}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Start Date</Label>
          <Input
            type="date"
            value={form.start_date}
            onChange={(e) =>
              setForm((f) => ({ ...f, start_date: e.target.value }))
            }
          />
        </div>
        <div>
          <Label>End Date</Label>
          <Input
            type="date"
            value={form.end_date}
            onChange={(e) =>
              setForm((f) => ({ ...f, end_date: e.target.value }))
            }
          />
        </div>
      </div>
      <div>
        <Label>Refill Reminder (days before)</Label>
        <Input
          type="number"
          value={form.refill_reminder_days}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              refill_reminder_days: +e.target.value,
            }))
          }
        />
      </div>
      <div>
        <Label>Notes</Label>
        <Textarea
          value={form.notes}
          onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
        />
      </div>
      <Button onClick={handleSave} className="w-full">
        Save
      </Button>
    </div>
  );
}
