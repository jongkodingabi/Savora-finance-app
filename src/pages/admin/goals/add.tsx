import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Head from "next/head";
import {
  Target,
  TrendingUp,
  Tag,
  FileText,
  Smile,
  DollarSign,
  Save,
} from "lucide-react";
import Sidebar from "../../../components/ui/Sidebar";
import Header from "../../../components/ui/Header";
import { Toaster } from "react-hot-toast";

export default function CreateFormGoal() {
  const { data: session } = useSession();
  const { push } = useRouter();
  const [form, setForm] = useState({
    title: "",
    type: "",
    emoji: "🎯",
    amount: "",
    description: "",
    priority: "normal", // Default priority
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!session?.user?.id) {
      toast.error("You must be logged in to create a goal.");
      return;
    }

    const response = await fetch("/api/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, user_id: session.user.id }),
    });

    if (response.ok) {
      push("/admin/goals");
      toast.success("Goal created successfully!");
      await fetch("/api/update-status", {
        method: "POST", // supaya lebih aman (tidak bisa diakses sembarang)
      });
      setForm({
        title: "",
        type: "",
        emoji: "🎯",
        amount: "",
        description: "",
        priority: "normal", // Reset to default priority
      });
    } else {
      const errorData = await response.json();
      toast.error(`Error creating goal: ${errorData.error}`);
    }
  };

  return (
    <>
      <Head>
        <title>Create Goal - Dashboard</title>
        <meta name="description" content="Create a new financial goal" />
        <link rel="icon" href="/favicon.ico" />
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
          <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="max-w-2xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Create New Goal
                </h1>
                <p className="text-gray-400">
                  Set your financial target and start your journey to success
                </p>
              </div>

              {/* Form Card */}
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
                <div className="px-8 py-6 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        Goal Details
                      </h2>
                      <p className="text-gray-400 text-sm">
                        Fill in the information below
                      </p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                  {/* Title Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                      <Tag className="w-4 h-4" />
                      Goal Title
                    </label>
                    <input
                      name="title"
                      placeholder="Enter your goal title (e.g., New Laptop Fund)"
                      required
                      value={form.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600"
                    />
                  </div>

                  {/* Type and Emoji Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <FileText className="w-4 h-4" />
                        Category
                      </label>
                      <input
                        name="type"
                        placeholder="e.g., Electronics, Travel, Education"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <Smile className="w-4 h-4" />
                        Emoji
                      </label>
                      <input
                        name="emoji"
                        placeholder="🎯 💻 ✈️ 🎓"
                        maxLength={2}
                        value={form.emoji}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600 text-center text-2xl"
                      />
                    </div>
                  </div>

                  {/* Priority Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                      <TrendingUp className="w-4 h-4" />
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={form.priority}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600"
                    >
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  {/* Amount Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                      <DollarSign className="w-4 h-4" />
                      Target Amount
                    </label>
                    <div className="relative">
                      <input
                        name="amount"
                        type="number"
                        placeholder="1000000"
                        required
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
                        Target: Rp{" "}
                        {Number.parseInt(form.amount).toLocaleString("id-ID")}
                      </p>
                    )}
                  </div>

                  {/* Description Field */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                      <FileText className="w-4 h-4" />
                      Description (Optional)
                    </label>
                    <textarea
                      name="description"
                      placeholder="Describe your goal, why it's important to you, or any additional details..."
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-600 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-3 group"
                    >
                      <Save className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      Create Goal
                    </button>
                  </div>
                </form>
              </div>

              {/* Additional Info Card */}
              <div className="mt-6 bg-gradient-to-r from-teal-700/20 to-cyan-700/20 rounded-xl border border-blue-800/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">
                      Tips for Setting Goals
                    </h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Make your goals specific and measurable</li>
                      <li>• Set realistic timeframes for achievement</li>
                      <li>• Break large goals into smaller milestones</li>
                      <li>• Track your progress regularly</li>
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
