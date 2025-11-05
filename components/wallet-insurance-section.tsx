/* eslint-disable @typescript-eslint/no-explicit-any */
// components/wallet-insurance-section.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MedicalWallet } from "@/types";

export default function InsuranceSection({
  wallet,
  setWallet,
}: {
  wallet: MedicalWallet;
  setWallet: (w: any) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Insurance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Label>Provider</Label>
          <Input
            value={wallet.insurance?.provider ?? ""}
            onChange={(e) =>
              setWallet((w: { insurance: any }) => ({
                ...w,
                insurance: { ...w.insurance, provider: e.target.value },
              }))
            }
          />
        </div>
        <div>
          <Label>Policy #</Label>
          <Input
            value={wallet.insurance?.policy_number ?? ""}
            onChange={(e) =>
              setWallet((w: { insurance: any }) => ({
                ...w,
                insurance: { ...w.insurance, policy_number: e.target.value },
              }))
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
