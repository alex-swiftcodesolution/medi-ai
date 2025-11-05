/* eslint-disable @typescript-eslint/no-explicit-any */
// components/wallet-doctors-section.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { MedicalWallet } from "@/types";

export default function DoctorsSection({
  wallet,
  setWallet,
}: {
  wallet: MedicalWallet;
  setWallet: (w: any) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Doctors{" "}
          <Button
            size="icon"
            variant="ghost"
            onClick={() =>
              setWallet((w: { doctors: any }) => ({
                ...w,
                doctors: [...(w.doctors ?? []), {}],
              }))
            }
          >
            <Plus />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {(wallet.doctors ?? []).map((doc: any, i: number) => (
          <div key={i} className="border p-3 rounded space-y-2">
            <Input
              placeholder="Name"
              value={doc.name ?? ""}
              onChange={(e) =>
                setWallet((w: { doctors: any[] }) => ({
                  ...w,
                  doctors: w.doctors?.map((d: any, idx: number) =>
                    idx === i ? { ...d, name: e.target.value } : d
                  ),
                }))
              }
            />
            <Input
              placeholder="Specialty"
              value={doc.specialty ?? ""}
              onChange={(e) =>
                setWallet((w: { doctors: any[] }) => ({
                  ...w,
                  doctors: w.doctors?.map((d: any, idx: number) =>
                    idx === i ? { ...d, specialty: e.target.value } : d
                  ),
                }))
              }
            />
            <Input
              placeholder="Phone"
              value={doc.phone ?? ""}
              onChange={(e) =>
                setWallet((w: { doctors: any[] }) => ({
                  ...w,
                  doctors: w.doctors?.map((d: any, idx: number) =>
                    idx === i ? { ...d, phone: e.target.value } : d
                  ),
                }))
              }
            />
            <Button
              size="icon"
              variant="destructive"
              onClick={() =>
                setWallet((w: { doctors: any[] }) => ({
                  ...w,
                  doctors: w.doctors?.filter(
                    (_: any, idx: number) => idx !== i
                  ),
                }))
              }
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
