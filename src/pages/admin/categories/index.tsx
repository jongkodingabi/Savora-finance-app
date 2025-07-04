"use client";

import Head from "next/head";
import Sidebar from "../../../components/ui/Sidebar";
import Header from "../../../components/ui/Header";
import DeleteModalConfirmation from "@/components/admin/DeleteConfirmationModal";
import CreateModalOpen from "@/components/admin/CreateModalOpen";
import {
  Plus,
  Trash2,
  Tag,
  TrendingUp,
  Repeat,
  Download,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

type Category = {
  id: string;
  name: string;
  type: string;
  created_at: string;
};

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const { data: session } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");

  const incomeCount = categories.filter((c) => c.type === "income").length;
  const expenseCount = categories.filter((c) => c.type === "expense").length;
  const transferCount = categories.filter((c) => c.type === "transfer").length;

  // Filter categories based on search and status
  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || category.type === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCategories = filteredCategories.length;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Ambil kategori yang sesuai halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // Move fetchCategories outside useEffect so it can be reused
  const fetchCategories = async () => {
    if (!session?.user?.id) return;

    const response = await fetch("/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setCategories(data.data);
    } else {
      console.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [session?.user?.id]);

  // handle create category
  const handleSubmit = async (name: string, type: string) => {
    if (!session?.user?.id) {
      alert("User belum login.");
      return;
    }

    const response = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, type }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Insert error:", error);
      alert("Gagal menambahkan kategori");
    } else {
      setCreateModalOpen(false);
      fetchCategories(); // Refresh categories after adding
      toast.success("Successfully added category");
    }
  };

  //   handle delete category
  const handleDeleteCategory = async (category: Category) => {
    setCategoryToDelete(category);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    const response = await fetch("/api/categories", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: categoryToDelete.id }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error("Delete error:", result.error);
      toast.error(`Failed to delete category: ${result.error}`);
    } else {
      toast.success("Category deleted successfully");
      setCategories((prev) =>
        prev.filter((cat) => cat.id !== categoryToDelete?.id)
      );
      fetchCategories();
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  return (
    <>
      <Head>
        <title>Categories Management - Dashboard</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-950 md:flex-row">
        <Toaster position="top-right" reverseOrder={false} />

        {/* Sidebar */}
        <Sidebar />

        {/* Main column */}
        <div className="flex flex-1 flex-col">
          {/* Top bar */}
          <Header />

          {/* Main content */}
          <main className="flex-1 space-y-8 p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Statistics Cards */}
            <section className="grid gap-6 grid-cols-1 md:grid-cols-3">
              {/* Transfer Categories Card */}
              <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl hover:scale-[1.03] transition-transform duration-300 overflow-hidden">
                <div className="absolute right-4 top-4 opacity-20">
                  <Repeat className="w-16 h-16" />
                </div>
                <div className="flex flex-col gap-2 z-10 relative">
                  <span className="text-xs uppercase tracking-widest text-blue-200 font-semibold">
                    Transfer Categories
                  </span>
                  <span className="text-4xl font-extrabold">
                    {transferCount}
                  </span>
                  <span className="flex items-center gap-1 text-blue-100 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>+5 new this month</span>
                  </span>
                </div>
              </div>

              {/* Income Categories Card */}
              <div className="relative bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 rounded-2xl p-6 text-white shadow-xl hover:scale-[1.03] transition-transform duration-300 overflow-hidden">
                <div className="absolute right-4 top-4 opacity-20">
                  <Download className="w-16 h-16" />
                </div>
                <div className="flex flex-col gap-2 z-10 relative">
                  <span className="text-xs uppercase tracking-widest text-emerald-200 font-semibold">
                    Income Categories
                  </span>
                  <span className="text-4xl font-extrabold">{incomeCount}</span>
                  <span className="text-emerald-100 text-sm">
                    Updated monthly
                  </span>
                </div>
              </div>

              {/* Expense Categories Card */}
              <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-700 rounded-2xl p-6 text-white shadow-xl hover:scale-[1.03] transition-transform duration-300 overflow-hidden">
                <div className="absolute right-4 top-4 opacity-20">
                  <Upload className="w-16 h-16" />
                </div>
                <div className="flex flex-col gap-2 z-10 relative">
                  <span className="text-xs uppercase tracking-widest text-purple-200 font-semibold">
                    Expense Categories
                  </span>
                  <span className="text-4xl font-extrabold">
                    {expenseCount}
                  </span>
                  <span className="flex items-center gap-1 text-purple-100 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>Across all categories</span>
                  </span>
                </div>
              </div>
            </section>

            {/* Categories Table Section */}
            <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Categories Management
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      Manage categories and their type
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="All">All Type</option>
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                      <option value="transfer">Transfer</option>
                    </select>
                    <button
                      onClick={() => setCreateModalOpen(true)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Category
                    </button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider sm:table-cell">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Transaction
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider lg:table-cell">
                        Created
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {currentItems.map((category) => (
                      <tr
                        key={category.id}
                        className="hover:bg-gray-800/30 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center text-white font-medium">
                              <Tag className="w-5 h-5" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {category.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                            ${
                              category.type === "income"
                                ? "bg-green-900/50 text-green-300 border border-green-800"
                                : category.type === "expense"
                                ? "bg-red-900/50 text-red-300 border border-red-800"
                                : category.type === "transfer"
                                ? "bg-blue-900/50 text-blue-300 border border-blue-800"
                                : "bg-gray-800/50 text-gray-300 border border-gray-700"
                            }`}
                          >
                            {category.type}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                Beli Samyang
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 lg:table-cell">
                          {category.created_at
                            ? new Date(category.created_at).toLocaleDateString()
                            : "—"}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                handleDeleteCategory({
                                  id: category.id,
                                  name: category.name,
                                  type: category.type,
                                  created_at: category.created_at,
                                })
                              }
                              className="text-red-400 hover:text-red-300 p-1 rounded transition-colors duration-200"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-4 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-400">
                  Showing {filteredCategories.length} of {totalCategories}{" "}
                  categories
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded border border-gray-700 hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-gray-400 text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded border border-gray-700 hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <DeleteModalConfirmation
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={categoryToDelete?.name || ""}
      />
      {createModalOpen && (
        <CreateModalOpen
          // handleSubmit={handleSubmit}
          handleSubmit={handleSubmit}
          isClose={() => setCreateModalOpen(false)}
        />
      )}
    </>
  );
}
