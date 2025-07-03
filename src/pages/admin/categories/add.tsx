"use client";

import Head from "next/head";
import Sidebar from "../../../components/ui/Sidebar";
import Header from "../../../components/ui/Header";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CategoriesPage() {
  const { push } = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      toast.success("Successfully added category");
      push("/admin/categories");
      setName("");
      setType("expense");
    }
  };

  return (
    <>
      <Head>
        <title>Create Category - Dashboard</title>
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
            <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Tambah Kategori Baru
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nama Kategori */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Category Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Contoh: Transportasi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Tipe Kategori */}
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Transaction Type
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                    <option value="transfer">Transfer</option>
                  </select>
                </div>

                {/* Tombol Submit */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
