"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  Trophy,
  AlertCircle,
  Star,
  Zap,
  ArrowRight,
  MoreVertical,
  Filter,
  Search,
  Sparkles,
  Activity,
} from "lucide-react";

import Sidebar from "../../../components/ui/Sidebar";
import Header from "../../../components/ui/Header";
import DeleteModalConfirmation from "@/components/admin/DeleteConfirmationModal";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

// Mock data dengan lebih banyak variasi

type Goal = {
  id: number;
  title: string;
  type: string;
  emoji: string;
  description: string;
  amount: number;
  status: string;
  percentage: number;
};

export default function ModernGoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<string>("grid"); // grid, kanban, timeline
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [wallets, setWallets] = useState<any[]>([]); // Assuming wallets is an array of objects
  const [modalDeleteGoal, setModalDeleteGoal] = useState<any>(false);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);

  const fetchWallets = async () => {
    const response = await fetch("/api/wallets");
    if (response.ok) {
      const data = await response.json();
      setWallets(data.data || []); // Assuming the API returns an object with a 'data' property
    } else {
      console.error("Failed to fetch wallets");
    }
  };

  const fetchGoals = async () => {
    const response = await fetch("/api/goals");
    if (response.ok) {
      const data = await response.json();
      setGoals(data.data || []); // Assuming the API returns an object with a 'data' property
    } else {
      console.error("Failed to fetch goals");
    }
  };

  const handleDeleteGoal = (goal: Goal) => {
    setModalDeleteGoal(true);
    setGoalToDelete(goal);
  };

  const confirmDeleteTransaction = async () => {
    if (!goalToDelete) return;

    const response = await fetch("/api/goals", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: goalToDelete.id }),
    });

    if (response.ok) {
      setGoals(goals.filter((goal) => goal.id !== goalToDelete.id));
      toast.success("Goal deleted successfully!");
      setModalDeleteGoal(false);
      setGoalToDelete(null);
    } else {
      const errorData = await response.json();
      console.error("Failed to delete goal:", errorData.error);
    }
  };

  const completedGoals = goals.filter(
    (goal) => goal.status === "completed"
  ).length;
  const onGoingGoals = goals.filter((goal) => goal.status === "ongoing").length;

  // const percentage = Math.min((wallet.amount / goal.amount) * 100, 100);

  useEffect(() => {
    // Fetch goals from API or use mock data
    fetchGoals();
    fetchWallets();
    // setGoals(mockGoals); // Use mock data for now
  }, []);

  // Calculate statistics
  const totalGoals = goals.length;

  // Calculate overall progress as an average of all goals' progress, or 0 if no goals
  const overallProgress =
    goals.length > 0
      ? goals.reduce((sum, goal) => sum + (goal.percentage || 0), 0) /
        goals.length
      : 0;

  // Calculate total wallet amount
  const totalWalletAmount =
    wallets?.reduce((sum, wallet) => sum + wallet.amount, 0) || 0;

  // Filter goals
  const filteredGoals = goals.filter((goal) => {
    const matchesSearch =
      goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || goal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getProgressPercentage = (current: any, target: any) => {
    return target > 0 ? Math.min((current / target) * 100, 100) : 0;
  };

  const getStatusBadge = (status: any) => {
    switch (status) {
      case "completed":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </div>
        );
      case "in_progress":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Activity className="w-3 h-3 mr-1" />
            In Progress
          </div>
        );
      case "paused":
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Paused
          </div>
        );
      default:
        return null;
    }
  };

  const getPriorityIcon = (priority: any) => {
    switch (priority) {
      case "high":
        return <Zap className="w-4 h-4 text-red-400" />;
      case "normal":
        return <Star className="w-4 h-4 text-yellow-400" />;
      case "low":
        return <Target className="w-4 h-4 text-green-400" />;
      default:
        return null;
    }
  };

  const openDetailModal = (goal: any) => {
    setSelectedGoal(goal);
    setIsDetailModalOpen(true);
  };

  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-sm border border-white/10">
          <Target className="w-16 h-16 text-blue-400" />
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">
        Start Your Financial Journey
      </h3>
      <p className="text-gray-400 mb-8 max-w-md text-center leading-relaxed">
        Transform your dreams into achievable goals. Set your first financial
        target and watch your progress unfold with beautiful visualizations.
      </p>
      <Link
        href="/admin/goals/add"
        className="group inline-flex items-center bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
        Create Your First Goal
        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  );

  const GoalCard = ({ goal }: { goal: any }) => {
    const isOverdue =
      new Date(goal.targetDate) < new Date() && goal.status !== "completed";

    return (
      <div className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl overflow-hidden">
        {/* Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-teal-500 to-green-600 opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Priority Indicator */}
        <div className="absolute top-4 right-4 z-10">
          {getPriorityIcon(goal.priority)}
        </div>

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{goal.emoji}</div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-200">
                  {goal.title}
                </h3>
                <p className="text-sm text-gray-400">{goal.category}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-6 line-clamp-2">
            {goal.description}
          </p>

          {/* Progress Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-300">
                Progress
              </span>
              <span className="text-sm font-bold text-white">
                {goal.percentage.toFixed(1)}%
              </span>
            </div>
            <div className="relative w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 ease-out relative`}
                style={{ width: `${goal.percentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
              <span>{goal.currentAmount.toLocaleString()}</span>
              <span>{goal.targetAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Status and Date */}
          <div className="flex items-center justify-between mb-6">
            {getStatusBadge(goal.status)}
            <div className="flex items-center text-xs text-gray-400">
              <Clock className="w-3 h-3 mr-1" />
              <span className={isOverdue ? "text-red-400" : ""}>
                {goal.status}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => openDetailModal(goal)}
              className="flex-1 bg-gray-800/50 hover:bg-gray-700/50 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </button>
            {/* <button className="p-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors duration-200">
              <Edit className="w-4 h-4" />
            </button> */}
            <button
              onClick={() =>
                handleDeleteGoal({
                  id: goal.id,
                  title: goal.title,
                  type: goal.type,
                  emoji: goal.emoji,
                  description: goal.description,
                  amount: goal.amount,
                  status: goal.status,
                  percentage: goal.percentage,
                })
              }
              className="p-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Goals - Dashboard</title>
      </Head>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col min-h-screen bg-gray-950 md:flex-row">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          {/* Top bar */}
          <Header />
          {/* Main content */}
          <main className="flex-1 space-y-8 p-4 sm:p-6 md:p-8 lg:p-10">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-sm border border-gray-800/50 p-4 sm:p-8">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-300/10 to-cyan-300/10" />
              <div className="relative">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      Financial Goals
                    </h1>
                    <p className="text-gray-300 text-base sm:text-lg">
                      Track your progress towards financial freedom
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-6xl opacity-20">🎯</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Enhanced Statistics Cards */}
            <section className="grid gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
              {/* Total Goals */}
              <div className="relative group bg-gradient-to-br from-blue-600/10 to-blue-800/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-blue-500/20 hover:border-blue-400/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 sm:p-3 bg-blue-500/20 rounded-xl">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                    </div>
                    <div className="text-blue-400 text-xs sm:text-sm font-medium">
                      +2 this month
                    </div>
                  </div>
                  <div>
                    <p className="text-blue-200 text-xs sm:text-sm font-medium mb-1">
                      Total Goals
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {totalGoals}
                    </p>
                    <div className="flex items-center text-blue-300 text-xs sm:text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Active tracking
                    </div>
                  </div>
                </div>
              </div>

              {/* Completed Goals */}
              <div className="relative group bg-gradient-to-br from-emerald-600/10 to-emerald-800/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-emerald-500/20 hover:border-emerald-400/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 sm:p-3 bg-emerald-500/20 rounded-xl">
                      <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                    </div>
                    <div className="text-emerald-400 text-xs sm:text-sm font-medium"></div>
                  </div>
                  <div>
                    <p className="text-emerald-200 text-xs sm:text-sm font-medium mb-1">
                      Completed Goals
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {completedGoals}
                    </p>
                    <div className="flex items-center text-emerald-300 text-xs sm:text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Success rate
                    </div>
                  </div>
                </div>
              </div>

              {/* In Progress */}
              <div className="relative group bg-gradient-to-br from-purple-600/10 to-purple-800/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/20 hover:border-purple-400/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 sm:p-3 bg-purple-500/20 rounded-xl">
                      <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    </div>
                    <div className="text-purple-400 text-xs sm:text-sm font-medium">
                      Active
                    </div>
                  </div>
                  <div>
                    <p className="text-purple-200 text-xs sm:text-sm font-medium mb-1">
                      In Progress
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {onGoingGoals}
                    </p>
                    <div className="flex items-center text-purple-300 text-xs sm:text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      Working on
                    </div>
                  </div>
                </div>
              </div>

              {/* Overall Progress */}
              <div className="relative group bg-gradient-to-br from-orange-600/10 to-orange-800/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-orange-500/20 hover:border-orange-400/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-orange-800 opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 sm:p-3 bg-orange-500/20 rounded-xl">
                      <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                    </div>
                    <div className="text-orange-400 text-xs sm:text-sm font-medium">
                      {overallProgress > 50 ? "On Track" : "Behind"}
                    </div>
                  </div>
                  <div>
                    <p className="text-orange-200 text-xs sm:text-sm font-medium mb-1">
                      Overall Progress
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {overallProgress.toFixed(1)}%
                    </p>
                    <div className="flex items-center text-orange-300 text-xs sm:text-sm">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {totalWalletAmount.toLocaleString()} saved
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Controls */}
            <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center space-y-2 xs:space-y-0 xs:space-x-4 w-full xs:w-auto">
                <div className="relative w-full xs:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search goals..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full xs:w-56 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div className="relative w-full xs:w-auto">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full xs:w-48 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl pl-10 pr-8 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200"
                  >
                    <option value="All">All Status</option>
                    <option value="ongoing">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <Link
                href="/admin/goals/add"
                className="group inline-flex items-center justify-center bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 px-4 sm:px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto"
              >
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                <span className="hidden xs:inline">Add New Goal</span>
                <span className="inline xs:hidden">Add</span>
              </Link>
            </section>

            {/* Goals Grid */}
            <section>
              {filteredGoals.length === 0 ? (
                <div className="grid grid-cols-1">
                  {searchQuery || statusFilter !== "All" ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-16">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
                        <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                        No Goals Found
                      </h3>
                      <p className="text-gray-400 text-center text-sm sm:text-base">
                        Try adjusting your search or filter criteria to find
                        your goals.
                      </p>
                    </div>
                  ) : (
                    <EmptyState />
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredGoals.map((goal) => (
                    <GoalCard key={goal.id} goal={goal} />
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>
      </div>

      {/* Detail Modal Trigger */}

      {/* Enhanced Goal Detail Modal */}
      {isDetailModalOpen && selectedGoal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900/95 backdrop-blur-sm rounded-2xl border border-gray-800/50 max-w-lg w-full p-8 transform transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{selectedGoal.emoji}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedGoal.title}
                  </h3>
                  <p className="text-gray-400">{selectedGoal.type}</p>
                </div>
              </div>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
              >
                <span className="text-gray-400 hover:text-white text-2xl">
                  ×
                </span>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-gray-300 leading-relaxed">
                  {selectedGoal.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/30 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">Priority</p>
                  <div className="flex items-center space-x-2">
                    {getPriorityIcon(selectedGoal.priority)}
                    <span className="text-white capitalize">
                      {selectedGoal.priority}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">Status</p>
                  {getStatusBadge(selectedGoal.status)}
                </div>
              </div>

              <div className="bg-gray-800/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-400 text-sm">Progress</p>
                  <p className="text-2xl font-bold text-white">
                    {getProgressPercentage(
                      selectedGoal.currentAmount,
                      selectedGoal.targetAmount
                    ).toFixed(1)}
                    %
                  </p>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className={`h-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all rounded-xl duration-500 ease-out relative`}
                    style={{ width: `${selectedGoal.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    Current: {selectedGoal.currentAmount.toLocaleString()}
                  </span>
                  <span className="text-gray-400">
                    Target: {selectedGoal.targetAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="w-full p-4">
                <div className="bg-gray-800/30 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">Description</p>
                  <p className="text-white font-medium">
                    {selectedGoal.description}
                  </p>
                </div>
              </div>

              {/* <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200">
                  Update Progress
                </button>
                <button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200">
                  Edit Goal
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}

      <DeleteModalConfirmation
        isOpen={modalDeleteGoal}
        onClose={() => setModalDeleteGoal(false)}
        onConfirm={confirmDeleteTransaction}
        itemName={goalToDelete ? `${goalToDelete.title}` : ""}
      />
    </>
  );
}
