import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import Sidebar from "../../../components/ui/Sidebar";
import Header from "../../../components/ui/Header";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  Calendar,
  CreditCard,
  FileText,
  Save,
  ArrowLeft,
  Receipt,
  Info,
} from "lucide-react";

export default function CreateTransactionForm() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category_id: "",
    date: new Date().toISOString().slice(0, 16),
    note: "",
    payment_method: "cash",
  });

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

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const result = await res.json();
    if (!res.ok) alert("Gagal: " + result.error);
    else {
      await fetch("/api/update-status", {
        method: "POST", // supaya lebih aman (tidak bisa diakses sembarang)
      });
      toast.success("Successfully added transaction");
      push("/admin/transaction");
      setForm({
        amount: "",
        type: "",
        category_id: "",
        date: new Date().toISOString().slice(0, 16),
        note: "",
        payment_method: "cash",
      });
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "income":
        return <TrendingUp className="w-4 h-4" />;
      case "expense":
        return <TrendingDown className="w-4 h-4" />;
      case "transfer":
        return <ArrowLeftRight className="w-4 h-4" />;
      default:
        return <TrendingDown className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "income":
        return "from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700";
      case "expense":
        return "from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700";
      case "transfer":
        return "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700";
      default:
        return "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700";
    }
  };

  return (
    <>
      <Head>
        <title>Create Transaction - Dashboard</title>
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
          <main className="flex-1 space-y-8 p-4 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 min-h-screen">
            <div className="max-w-2xl mx-auto">
              {/* Main Form Card */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                        <Receipt className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          Create Transaction
                        </h2>
                        <p className="text-gray-400 text-sm">
                          Record your financial activity
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => push("/admin/transaction")}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-all duration-200 text-sm font-medium"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  {/* Amount and Type Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <DollarSign className="w-4 h-4" />
                        Amount
                      </label>
                      <div className="relative">
                        <input
                          name="amount"
                          type="number"
                          placeholder="0"
                          required
                          min={0}
                          value={form.amount}
                          onChange={handleChange}
                          className="w-full px-4 py-3 pl-12 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                          <span className="text-gray-400 font-medium">Rp</span>
                        </div>
                      </div>
                      {form.amount && (
                        <p className="text-sm text-gray-400 mt-1">
                          Amount: Rp{" "}
                          {Number.parseInt(form.amount).toLocaleString("id-ID")}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        {getTypeIcon(form.type)}
                        Transaction Type
                      </label>
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600"
                      >
                        <option value="income">💰 Income</option>
                        <option value="expense">💸 Expense</option>
                        {/* <option value="transfer">🔄 Transfer</option> */}
                      </select>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                      <FileText className="w-4 h-4" />
                      Category
                    </label>
                    <select
                      name="category_id"
                      value={form.category_id}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600"
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date and Payment Method Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <Calendar className="w-4 h-4" />
                        Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <CreditCard className="w-4 h-4" />
                        Payment Method
                      </label>
                      <select
                        name="payment_method"
                        value={form.payment_method}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600"
                      >
                        <option value="cash">💵 Cash</option>
                        <option value="bank">🏦 Bank Transfer</option>
                        <option value="ewallet">📱 E-Wallet</option>
                      </select>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                      <FileText className="w-4 h-4" />
                      Transaction Note (Optional)
                    </label>
                    <textarea
                      name="note"
                      placeholder="Add any additional details about this transaction..."
                      value={form.note}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className={`w-full bg-gradient-to-r ${getTypeColor(
                        form.type
                      )} text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-3 group`}
                    >
                      <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      Save Transaction
                    </button>
                  </div>
                </form>
              </div>

              {/* Tips Card */}
              <div className="mt-6 bg-gradient-to-r from-blue-700/20 to-cyan-700/20 rounded-xl border border-blue-800/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Info className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Transaction Tips
                    </h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>
                        • Be specific with your transaction notes for better
                        tracking
                      </li>
                      <li>
                        • Choose the correct category to organize your finances
                      </li>
                      <li>• Double-check the amount before saving</li>
                      <li>
                        • Set the correct date and time for accurate records
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
