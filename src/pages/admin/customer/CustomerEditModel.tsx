import { useEffect, useState, type ReactNode } from "react";
import type { CustomerAuthProfile } from "@/models";
import { Button } from "@/components";
import { House, Mail, Pen, Phone, Trash2, UserRoundPen } from "lucide-react";
import defAvatar from "@/assets/defAvatar.jpg";
import { useRef } from "react";
import { showSuccess } from "@/utils";

type Props = {
  open: boolean;
  customer: CustomerAuthProfile | null;
  onClose: () => void;
  onSave?: (customer: CustomerAuthProfile) => void;
};

type CustomerField = {
  key: keyof CustomerAuthProfile;
  label: string;
  icon: ReactNode;
};

const iconStyle = "w-5 h-5";
const fields: CustomerField[] = [
  { key: "name", label: "Name", icon: <UserRoundPen className={iconStyle} /> },
  { key: "email", label: "Email", icon: <Mail className={iconStyle} /> },
  { key: "phone", label: "Phone", icon: <Phone className={iconStyle} /> },
  { key: "address", label: "Address", icon: <House className={iconStyle} /> },
];

export default function CustomerEditModel({ open, customer, onClose, onSave }: Props) {
  const [form, setForm] = useState<CustomerAuthProfile | null>(customer);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [delWarning, setDelWarning] = useState(false);
  useEffect(() => {
    setForm(customer);
    setAvatarPreview(customer?.avatar_url || null);
  }, [customer]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);

    // reset input
    e.target.value = "";
  };
  const handleDeleteAvatar = () => {
    setAvatarPreview(null);
  };
  if (!open || !form) return null;

  const modelInput = "border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none";

  const handleChange = (key: keyof CustomerAuthProfile, value: string) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form) return;

    await onSave?.(form);

    showSuccess("Edit successful");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Edit Customer</h2>
        </div>
        <div className="border-t border-gray-200 my-6"></div>
        <div className="flex items-center gap-4 mb-6">
          <img
            src={avatarPreview || defAvatar}
            onError={(e) => (e.currentTarget.src = defAvatar)}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border shadow"
          />

          <div className="flex flex-col gap-2">
            <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Pen className="w-4 h-4 mr-1" />
              Change Avatar
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                setDelWarning(true);
              }}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete Avatar
            </Button>
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1 flex flex-row items-center gap-2">
                {field.icon} {field.label}
              </label>

              <input
                value={(form[field.key] as string) ?? ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className={modelInput}
              />
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 my-6"></div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleSave}>Save Changes</Button>
        </div>

        {delWarning && (
          <div className="fixed inset-0 z-[60px] flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl shadow-lg w-80">
              <h3 className="text-lg font-semibold mb-2">Delete Avatar</h3>

              <p className="text-sm text-gray-600 mb-4">Are you sure you want to delete this avatar?</p>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDelWarning(false)}>
                  Cancel
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeleteAvatar();
                    setDelWarning(false);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
