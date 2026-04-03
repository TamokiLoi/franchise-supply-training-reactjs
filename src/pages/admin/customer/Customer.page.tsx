import { useEffect, useState, useCallback } from "react";
import type { CustomerAuthProfile } from "@/models";

import { Button } from "@/components";
import Search from "@/components/ui/search";
import Pagination from "@/components/ui/pagination";
import NotFoundCustomers from "./partials/NotFoundCustomers";
import defAvatar from "@/assets/defAvatar.jpg";
import { RotateCcw, ShieldCheck, ShieldOff, UserPlus, UserRoundX } from "lucide-react";

import CustomerAddModel from "./CustomerAddModel";
import { createCustomerUseCase } from "./usecases/CreateCustomer.usecase";
import { deleteCustomerUseCase } from "./usecases/DeleteCustomer.usecase";
import { searchCustomerUseCase } from "./usecases/SearchCustomer.usecase";
import { restoreCustomerUseCase } from "./usecases/restoreCustomer.usecase";
import { changeStatusCustomerUseCase } from "./usecases/ChangeStatusCustomer.usecase";
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
      showSuccess("Restore success");
    } catch (error) {
      console.error("Restore failed:", error);
    }
  };

  const handleChangeStatus = async (id: string, nextStatus: boolean) => {
    const confirmMessage = nextStatus
      ? "Are you sure you want to activate this customer?"
      : "Are you sure you want to deactivate this customer?";
    if (!window.confirm(confirmMessage)) return;

    try {
      await changeStatusCustomerUseCase(id, nextStatus);
      fetchCustomers();
      showSuccess("Change status success");
    } catch (error) {
      console.error("Restore customer failed:", error);
    }
  };

  const thStyle = "px-6 py-3 text-left text-sm font-semibold text-gray-600";
  const tdStyle = "px-6 py-4";

  return (
    <div className="h-full flex flex-col p-6 gap-4">
      <h1 className="text-2xl font-semibold text-gray-800">Customer Management</h1>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Search keyword={keyword} setKeyword={setKeyword} />

        <Button onClick={() => setShowAddModel(true)}>
          <UserPlus /> Add
        </Button>
      </div>

      <div className="flex-1 max-h-screen overflow-hidden bg-white shadow rounded-lg border ">
        <div className="h-full overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading customers...</div>
          ) : customers.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <NotFoundCustomers />
            </div>
          ) : (
            // table
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b sticky top-0 z-10">
                <tr>
                  <th className={thStyle}>Customer</th>
                  <th className={thStyle}>Email</th>
                  <th className={thStyle}>Phone</th>
                  <th className={thStyle}>Address</th>
                  <th className={thStyle}>Active</th>
                  <th className={thStyle}></th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => {
                  const isActived = c.is_active ?? false;

                  return (
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

                      <td className={`${tdStyle} max-w-[200px] truncate`}>{c.email}</td>

                      <td className={tdStyle}>{c.phone}</td>

                      <td className={`${tdStyle} max-w-[200px] truncate`}>{c.address || "None"}</td>

                      {/* ACTIVE */}
                      <td className="px-6 py-4">
                        {isActived ? (
                          <Button
                            size="icon-lg"
                            className="bg-green-500 hover:bg-green-600"
                            disabled={c.is_deleted}
                            onClick={() => handleChangeStatus(c.id, false)}
                          >
                            <ShieldCheck size={16} />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon-lg"
                            className="text-amber-600 border-amber-200 hover:bg-amber-50"
                            disabled={c.is_deleted}
                            onClick={() => handleChangeStatus(c.id, true)}
                          >
                            <ShieldOff size={16} />
                          </Button>
                        )}
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-4 text-right">
                        {!c.is_deleted ? (
                          <Button variant="destructive" size="icon-lg" onClick={() => handleDelete(c.id)}>
                            <UserRoundX size={16} />
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="icon-lg"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                            onClick={() => handleRestore(c.id)}
                          >
                            <RotateCcw size={16} />
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Pagination page={page} totalPages={totalPage} setPage={setPage} />

      <CustomerAddModel open={showAddModel} onClose={handleCloseAddModal} onSave={handleSaveCustomer} />
    </div>
  );
}
