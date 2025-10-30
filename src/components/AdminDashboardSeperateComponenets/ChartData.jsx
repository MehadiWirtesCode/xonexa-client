import { Users, DollarSign, ShoppingCart, TrendingUp, TrendingDown, Package, Zap, Home, BarChart3, Settings } from "lucide-react";

export const chartData = [
  { name: "Jan", sales: 400, income: 600, profit: 300 },
  { name: "Feb", sales: 700, income: 900, profit: 550 },
  { name: "Mar", sales: 200, income: 450, profit: 150 },
  { name: "Apr", sales: 800, income: 1000, profit: 600 },
  { name: "May", sales: 500, income: 750, profit: 400 },
  { name: "Jun", sales: 700, income: 850, profit: 500 },
];

export const statCardsData = [
  {
    title: "Total Users",
    value: "2,430",
    change: "+12%",
    isPositive: true,
    Icon: Users,
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    title: "Revenue",
    value: "$8,420",
    change: "+8%",
    isPositive: true,
    Icon: DollarSign,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Total Orders",
    value: "1,120",
    change: "-1.5%",
    isPositive: false,
    Icon: ShoppingCart,
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+2.1%",
    isPositive: true,
    Icon: TrendingUp,
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
  },
];

// Sidebar Links
export const sidebarLinks = [
  { name: "Dashboard", Icon: Home },
  { name: "Analytics", Icon: BarChart3 },
  { name: "Users", Icon: Users },
  { name: "Products", Icon: Package },
  { name: "Settings", Icon: Settings },
];