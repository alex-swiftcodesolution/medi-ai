/* eslint-disable @typescript-eslint/no-explicit-any */
// components/wallet-personal-section.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MedicalWallet } from "@/types";

export default function PersonalSection({
  wallet,
  setWallet,
}: {
  wallet: MedicalWallet;
  setWallet: (w: any) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Label>Full Name</Label>
          <Input
            value={wallet.personal?.full_name ?? ""}
            onChange={(e) =>
              setWallet((w: { personal: any }) => ({
                ...w,
                personal: { ...w.personal, full_name: e.target.value },
              }))
            }
          />
        </div>
        <div>
          <Label>Date of Birth</Label>
          <Input
            type="date"
            value={wallet.personal?.dob ?? ""}
            onChange={(e) =>
              setWallet((w: { personal: any }) => ({
                ...w,
                personal: { ...w.personal, dob: e.target.value },
              }))
            }
          />
        </div>
        <div>
          <Label>Blood Type</Label>
          <Input
            value={wallet.personal?.blood_type ?? ""}
            onChange={(e) =>
              setWallet((w: { personal: any }) => ({
                ...w,
                personal: { ...w.personal, blood_type: e.target.value },
              }))
            }
          />
        </div>
        <div>
          <Label>Allergies (comma sep)</Label>
          <Textarea
            value={(wallet.personal?.allergies ?? []).join(", ")}
            onChange={(e) =>
              setWallet((w: { personal: any }) => ({
                ...w,
                personal: {
                  ...w.personal,
                  allergies: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                },
              }))
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={wallet.personal?.organ_donor ?? false}
            onChange={(e) =>
              setWallet((w: { personal: any }) => ({
                ...w,
                personal: { ...w.personal, organ_donor: e.target.checked },
              }))
            }
          />
          <Label>Organ Donor</Label>
        </div>
      </CardContent>
    </Card>
  );
}
