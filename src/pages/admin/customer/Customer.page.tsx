import { useEffect, useState, useCallback } from "react";
import { searchCustomers } from "./services/Customer03.service";
import { createCustomer } from "./services/Customer02.service";

import type { CustomerAuthProfile } from "@/models";
import type { SearchCustomerBody } from "./models/api.models";

import { Button } from "@/components";
import Search from "@/components/ui/search";
import Pagination from "@/components/ui/pagination";

import defAvatar from "@/assets/defAvatar.jpg";
import { Pencil, UserRoundX } from "lucide-react";

import CustomerAddModel from "./CustomerAddModel";
import CustomerEditModel from "./CustomerEditModel";
import { updateCustomer } from "./services/Customer04.service";

export default function CustomerPage() {
  const pageSize = 10;

  const [customers, setCustomers] = useState<CustomerAuthProfile[]>([]);
  const [loading, setLoading] = useState(false);
  // search
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAuthProfile | null>(null);
  // add
  const [showAddModel, setShowAddModel] = useState(false);

  const fetchCustomers = useCallback(async () => {
    try {
      setLoading(true);

      const payload: SearchCustomerBody = {
        searchCondition: {
          keyword,
        },
        pageInfo: {
          pageNum: page,
          pageSize,
        },
      };

      const res = await searchCustomers(payload);

      if (!res || !res.success) return;

      setCustomers(res.data ?? []);
      setTotalPage(res.pageInfo?.totalPages ?? 1);
    } catch (error) {
      console.error("Fetch customers failed:", error);
    } finally {
      setLoading(false);
    }
  }, [keyword, page]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      fetchCustomers();
    }, 400);

    return () => clearTimeout(timeout);
  }, [keyword]);

  useEffect(() => {
    fetchCustomers();
  }, [page]);

  const thStyle = "px-6 py-3 text-left text-sm font-semibold text-gray-600";
  const tdStyle = "px-6 py-4";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Customer Management</h1>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Search keyword={keyword} setKeyword={setKeyword} />

        <Button onClick={() => setShowAddModel(true)}>Add</Button>
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => {
                        setSelectedCustomer(c);
                        setShowEditModal(true);
                      }}
                    >
                      <Pencil size={16} />
                      Edit
                    </Button>

                    <Button variant="destructive" size="sm">
                      <UserRoundX size={16} />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination page={page} totalPages={totalPage} setPage={setPage} />

      {showEditModal && (
        <CustomerEditModel
          open={showEditModal}
          customer={selectedCustomer}
          onClose={() => setShowEditModal(false)}
          onSave={async (customer) => {
            try {
              if (!customer?.id) return;

              await updateCustomer(customer);

              setShowEditModal(false);
              fetchCustomers();
            } catch (error) {
              console.error("Update customer failed:", error);
            }
          }}
        />
      )}

      <CustomerAddModel
        open={showAddModel}
        onClose={() => {
          setShowAddModel(false);
        }}
        onSave={async (customer) => {
          const formData = new FormData();

          formData.append("name", customer.name ?? "");
          formData.append("email", customer.email ?? "");
          formData.append("phone", customer.phone ?? "");
          formData.append("address", customer.address ?? "");
          formData.append("password", "12345678");

          if (customer.avatar_file) {
            formData.append("avatar", customer.avatar_file);
          }

          try {
            await createCustomer(formData);
            fetchCustomers();
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
        }}
      />
    </div>
  );
}
