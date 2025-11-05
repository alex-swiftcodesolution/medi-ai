/* eslint-disable @typescript-eslint/no-explicit-any */
// components/profile-editor.tsx
"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export default function ProfileEditor() {
  const { user } = useAuth();
  const { profile, setProfile, loading, save } = useProfile(user?.id);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user?.id) return;
    setSaving(true);
    try {
      await save(profile);
      alert("Profile saved!");
    } catch (err: any) {
      alert("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Edit Profile</h1>

      <div className="space-y-4">
        <div>
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            value={profile.full_name ?? ""}
            onChange={(e) =>
              setProfile((p) => ({ ...p, full_name: e.target.value }))
            }
            placeholder="John Doe"
          />
        </div>

        <div>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            value={profile.dob ?? ""}
            onChange={(e) => setProfile((p) => ({ ...p, dob: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="blood_type">Blood Type</Label>
          <Input
            id="blood_type"
            value={profile.blood_type ?? ""}
            onChange={(e) =>
              setProfile((p) => ({ ...p, blood_type: e.target.value }))
            }
            placeholder="A+"
          />
        </div>

        <div>
          <Label htmlFor="allergies">Allergies (comma separated)</Label>
          <Textarea
            id="allergies"
            value={(profile.allergies ?? []).join(", ")}
            onChange={(e) =>
              setProfile((p) => ({
                ...p,
                allergies: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              }))
            }
            placeholder="Penicillin, Peanuts"
            rows={2}
          />
        </div>

        <div>
          <Label htmlFor="conditions">
            Chronic Conditions (comma separated)
          </Label>
          <Textarea
            id="conditions"
            value={(profile.chronic_conditions ?? []).join(", ")}
            onChange={(e) =>
              setProfile((p) => ({
                ...p,
                chronic_conditions: e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              }))
            }
            placeholder="Diabetes, Hypertension"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="emergency_name">Emergency Contact Name</Label>
            <Input
              id="emergency_name"
              value={profile.emergency_contact?.name ?? ""}
              onChange={(e) =>
                setProfile((p) => ({
                  ...p,
                  emergency_contact: {
                    ...(p.emergency_contact ?? {}),
                    name: e.target.value,
                  },
                }))
              }
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <Label htmlFor="emergency_phone">Emergency Contact Phone</Label>
            <Input
              id="emergency_phone"
              value={profile.emergency_contact?.phone ?? ""}
              onChange={(e) =>
                setProfile((p) => ({
                  ...p,
                  emergency_contact: {
                    ...(p.emergency_contact ?? {}),
                    phone: e.target.value,
                  },
                }))
              }
              placeholder="+1 555-123-4567"
            />
          </div>
        </div>
      </div>

      <Button
        onClick={handleSave}
        disabled={saving}
        className="w-full"
        size="lg"
      >
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Profile"
        )}
      </Button>
    </div>
  );
}
