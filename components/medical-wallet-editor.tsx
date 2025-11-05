/* eslint-disable @typescript-eslint/no-explicit-any */
// components/medical-wallet-editor.tsx
"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import PersonalSection from "@/components/wallet-personal-section";
import InsuranceSection from "@/components/wallet-insurance-section";
import DoctorsSection from "@/components/wallet-doctors-section";
// Add similar for Contacts and Pharmacies if defined

export default function MedicalWalletEditor() {
  const { user } = useAuth();
  const { wallet, setWallet, loading, save } = useWallet(user?.id);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await save(wallet);
      alert("Wallet saved!");
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader2 className="animate-spin mx-auto mt-20" />;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Medical Wallet</h1>

      <PersonalSection wallet={wallet} setWallet={setWallet} />
      <InsuranceSection wallet={wallet} setWallet={setWallet} />
      <DoctorsSection wallet={wallet} setWallet={setWallet} />
      {/* Add ContactsSection and PharmaciesSection similarly */}

      <Button
        onClick={handleSave}
        disabled={saving}
        className="w-full"
        size="lg"
      >
        {saving ? <Loader2 className="mr-2 animate-spin" /> : null} Save Wallet
      </Button>
    </div>
  );
}
