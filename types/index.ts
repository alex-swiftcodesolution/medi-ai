export type EmergencyContact = { name?: string; phone?: string };

export type Profile = {
  full_name?: string;
  avatar_url?: string;
  dob?: string;
  blood_type?: string;
  allergies?: string[];
  chronic_conditions?: string[];
  emergency_contact?: EmergencyContact;
};

export type MedicalWallet = {
  id?: string;
  personal?: {
    full_name?: string;
    dob?: string;
    blood_type?: string;
    allergies?: string[];
    organ_donor?: boolean;
    id_card_url?: string;
  };
  insurance?: {
    provider?: string;
    policy_number?: string;
    card_front_url?: string;
    card_back_url?: string;
  };
  doctors?: Array<{
    name?: string;
    specialty?: string;
    phone?: string;
    last_visit?: string;
    notes?: string;
  }>;
  contacts?: Array<{
    name?: string;
    relationship?: string;
    phone?: string;
    is_ice?: boolean;
  }>;
  pharmacies?: Array<{
    name?: string;
    address?: string;
    phone?: string;
    loyalty_number?: string;
  }>;
};

export type Medicine = {
  id?: string;
  name: string;
  dosage?: string;
  form?: "pill" | "capsule" | "liquid" | "injection" | "patch" | "cream";
  frequency?: {
    times: string[]; // "08:00"
    days: ("mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun")[];
  };
  start_date?: string;
  end_date?: string;
  refill_reminder_days?: number;
  notes?: string;
};
