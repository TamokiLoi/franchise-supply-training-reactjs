import { useEffect, useState, useCallback } from "react";

import type { CustomerAuthProfile } from "@/models";

import { Button } from "@/components";
import Search from "@/components/ui/search";
import Pagination from "@/components/ui/pagination";

import defAvatar from "@/assets/defAvatar.jpg";
import { RotateCcw, UserPlus, UserRoundX } from "lucide-react";

import CustomerAddModel from "./CustomerAddModel";
import { createCustomerUseCase } from "./usecases/CreateCustomer.usecase";
import { deleteCustomerUseCase } from "./usecases/DeleteCustomer.usecase";
import { searchCustomerUseCase } from "./usecases/SearchCustomer.usecase";
import { restoreCustomerUseCase } from "./usecases/restoreCustomer.usecase";
import { showSuccess } from "@/utils";

export default function CustomerPage() {
  const pageSize = 10;

  const [customers, setCustomers] = useState<CustomerAuthProfile[]>([]);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [showAddModel, setShowAddModel] = useState(false);

  // fetch customers
  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);

      const res = await searchCustomerUseCase(keyword, page, pageSize);

      if (!res || !res.success) return;

      setCustomers(res.data ?? []);
      setTotalPage(res.pageInfo?.totalPages ?? 1);
    } catch (error) {
      console.error("Fetch customers failed:", error);
    } finally {
      setLoading(false);
    }
  }, [keyword, page]);

  // debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchCustomers();
    }, 400);

    return () => clearTimeout(timeout);
  }, [keyword]);

  // page change
  useEffect(() => {
    fetchCustomers();
  }, [page]);

  // handlers
  const handleCloseAddModal = () => {
    setShowAddModel(false);
  };

  const handleSaveCustomer = async (customer: CustomerAuthProfile) => {
    try {
      await createCustomerUseCase(customer);
      fetchCustomers();
      setShowAddModel(false);
    } catch (err: any) {
      const fieldErrors: Record<string, string> = {};

      if (err?.errors?.length) {
        for (const e of err.errors) {
          if (e.field) {
            fieldErrors[e.field] = e.message;
          }
        }
      }

      if (Object.keys(fieldErrors).length === 0 && err?.message) {
        fieldErrors["general"] = err.message;
      }

      throw { fieldErrors };
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (!confirmDelete) return;

    try {
      await deleteCustomerUseCase(id);
      showSuccess("Deleted ");
      fetchCustomers();
    } catch (error) {
      console.error("Delete customer failed:", error);
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await restoreCustomerUseCase(id);
      fetchCustomers();
    } catch (error) {
      console.error("Restore customer failed:", error);
    }
  };

  const thStyle = "px-6 py-3 text-left text-sm font-semibold text-gray-600";
  const tdStyle = "px-6 py-4";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Customer Management</h1>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Search keyword={keyword} setKeyword={setKeyword} />

        <Button onClick={() => setShowAddModel(true)}>
          <UserPlus /> Add
        </Button>
      </div>

      <div className="overflow-hidden bg-white shadow rounded-lg border">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading customers...</div>
        ) : customers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No customers found</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className={thStyle}>Customer</th>
                <th className={thStyle}>Email</th>
                <th className={thStyle}>Phone</th>
                <th className={thStyle}>Address</th>
                <th className={thStyle}></th>
              </tr>
            </thead>

            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b hover:bg-gray-50 transition">
                  <td className={tdStyle}>
                    <div className="flex items-center gap-3">
                      <img
                        src={c.avatar_url || defAvatar}
                        alt={c.name}
                        className="w-9 h-9 rounded-full object-cover bg-gray-200"
                      />
                      <p className="font-medium text-gray-800">{c.name}</p>
                    </div>
                  </td>

                  <td className={tdStyle}>{c.email}</td>
                  <td className={tdStyle}>{c.phone}</td>
                  <td className={tdStyle}>{c.address || "None"}</td>

                  <td className="px-6 py-4 text-right">
                    {!c.is_deleted ? (
                      <Button
                        variant="destructive"
                        size={"icon-lg"}
                        className="flex items-center gap-1 hover:bg-red-400"
                        onClick={() => handleDelete(c.id)}
                      >
                        <UserRoundX size={16} />
                      </Button>
                    ) : (
                      <Button
                        variant={"outline"}
                        size={"icon-lg"}
                        className="flex items-center gap-1 text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() => handleRestore(c.id)}
                      >
                        <RotateCcw size={16} />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination page={page} totalPages={totalPage} setPage={setPage} />

      <CustomerAddModel open={showAddModel} onClose={handleCloseAddModal} onSave={handleSaveCustomer} />
    </div>
  );
}
