import { useState, type ReactNode } from "react";
import type { CustomerAuthProfile } from "@/models";
import { Button } from "@/components";
import { House, Mail, Phone, UserRoundPen } from "lucide-react";
import { customerCreateSchema } from "./schema/CustomerCreate.schema";
import defAvatar from "@/assets/defAvatar.jpg";
import { showSuccess } from "@/utils";
import { createCustomerUseCase } from "./usecases/CreateCustomer.usecase";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (customer: CustomerAuthProfile) => Promise<void>;
};

type CustomerField = {
  key: keyof CustomerAuthProfile;
  label: string;
  icon: ReactNode;
  placeholder: string;
};

const iconStyle = "w-4 h-4";

const fields: CustomerField[] = [
  {
    key: "name",
    label: "Name",
    placeholder: "Enter customer name",
    icon: <UserRoundPen className={iconStyle} />,
  },
  {
    key: "email",
    label: "Email",
    placeholder: "Enter email",
    icon: <Mail className={iconStyle} />,
  },
  {
    key: "phone",
    label: "Phone",
    placeholder: "Enter phone number",
    icon: <Phone className={iconStyle} />,
  },
  {
    key: "address",
    label: "Address",
    placeholder: "Enter address",
    icon: <House className={iconStyle} />,
  },
];

export default function CustomerAddModel({ open, onClose }: Props) {
  const [form, setForm] = useState<Partial<CustomerAuthProfile>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (key: keyof CustomerAuthProfile, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateForm = () => {
    const result = customerCreateSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      // 👉 GỌI API Ở ĐÂY
      await createCustomerUseCase(form);

      showSuccess("Add successfully");
      onClose();
    } catch (err: any) {
      if (err?.fieldErrors) {
        setErrors(err.fieldErrors);
      } else {
        setErrors((prev) => ({
          ...prev,
          general: err?.message || "Something went wrong",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Add New Customer</h2>
        </div>
        <div className="border-t border-gray-200 my-6"></div>
        {/* Avatar */}
        <div className="flex items-center gap-5 mb-8">
          <img src={defAvatar} className="w-24 h-24 rounded-full object-cover border" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          {fields.map((field) => (
            <div key={field.key} className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                {field.icon}
                {field.label}
              </label>

              <input
                value={(form[field.key] as string) ?? ""}
                placeholder={field.placeholder}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className={`border rounded-lg px-3 py-2 outline-none focus:ring-2
                ${errors[field.key] ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"}`}
              />

              {errors[field.key] && <p className="text-red-500 text-xs mt-1">{errors[field.key]}</p>}
            </div>
          ))}
        </div>
        {/* show error response from API */}
        {errors["general"] && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {errors["general"]}
          </div>
        )}
        <div className="border-t border-gray-200 my-6 "></div>
        <div className="flex justify-end gap-3 mt-8">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Add Customer"}
          </Button>
        </div>
      </div>
    </div>
  );
}
