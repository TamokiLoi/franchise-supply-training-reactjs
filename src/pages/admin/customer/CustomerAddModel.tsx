import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CustomerAuthProfile } from "@/models";
import { Button, InputFormControl } from "@/components";
import defAvatar from "@/assets/defAvatar.jpg";
import { showFormatErrors, showSuccess } from "@/utils";
import { customerCreateSchema, type CustomerCreateFormValues } from "./schema/CustomerCreate.schema";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (customer: CustomerAuthProfile) => Promise<void>;
};

export default function CustomerAddModel({ open, onClose, onSave }: Props) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CustomerCreateFormValues>({
    resolver: zodResolver(customerCreateSchema),
  });

  if (!open) return null;

  const onSubmit = async (data: CustomerCreateFormValues) => {
    try {
      await onSave(data);
      showSuccess("Add successfully");
      reset();
      onClose();
    } catch (err: any) {
      const message = err?.response?.data?.message;

      if (message?.toLowerCase().includes("email")) {
        setError("email", {
          type: "server",
          message: "Email already exists",
        });
        return;
      }

      // fallback
      showFormatErrors(err, setError, "Create failed");
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <InputFormControl
              label="Name"
              register={register("name")}
              error={errors.name}
              placeholder="Enter customer name"
            />

            <InputFormControl
              label="Email"
              register={register("email")}
              error={errors.email}
              type="email"
              placeholder="Enter email"
            />

            <InputFormControl
              label="Phone"
              register={register("phone")}
              error={errors.phone}
              placeholder="Enter phone number"
            />

            <InputFormControl
              label="Address"
              register={register("address")}
              error={errors.address}
              placeholder="Enter address"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Add Customer"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
