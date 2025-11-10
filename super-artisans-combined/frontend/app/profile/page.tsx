"use client"

import { useState } from "react"
import { ArrowLeft, ShoppingBag, MapPin, Phone, Mail, Edit2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"

interface Order {
  id: string
  productName: string
  price: number
  date: string
  status: "pending" | "shipped" | "delivered"
  quantity: number
}

const mockOrders: Order[] = [
  {
    id: "1",
    productName: "Banarasi Silk Saree",
    price: 8500,
    date: "2024-10-20",
    status: "delivered",
    quantity: 1,
  },
  {
    id: "2",
    productName: "Gold Filigree Earrings",
    price: 4200,
    date: "2024-10-18",
    status: "shipped",
    quantity: 1,
  },
  {
    id: "3",
    productName: "Blue Pottery Vase",
    price: 2500,
    date: "2024-10-15",
    status: "pending",
    quantity: 2,
  },
  {
    id: "4",
    productName: "Handwoven Cotton Dupatta",
    price: 1800,
    date: "2024-10-10",
    status: "delivered",
    quantity: 1,
  },
  {
    id: "5",
    productName: "Terracotta Lamp",
    price: 3200,
    date: "2024-10-05",
    status: "delivered",
    quantity: 1,
  },
]

export default function CustomerProfilePage() {
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [userName] = useState("John Doe")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-50 text-green-700 border border-green-200"
      case "shipped":
        return "bg-blue-50 text-blue-700 border border-blue-200"
      case "pending":
        return "bg-yellow-50 text-yellow-700 border border-yellow-200"
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200"
    }
  }

  const totalSpent = mockOrders.reduce((sum, order) => sum + order.price, 0)
  const deliveredOrders = mockOrders.filter((order) => order.status === "delivered").length

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={userName}
        userType="customer"
        onAuthClick={() => {
          setShowAuth(true)
          setAuthMode("signin")
        }}
        onLogout={() => setIsLoggedIn(false)}
      />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 sticky top-20">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl mb-4">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-foreground">{userName}</h2>
                <p className="text-sm text-muted-foreground">Customer</p>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">john.doe@email.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">New Delhi, India</span>
                </div>
              </div>

              <Button className="w-full gap-2 mb-3">
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Change Password
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card rounded-xl border border-border p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Spent</p>
                <p className="text-2xl font-bold text-foreground">₹{totalSpent.toLocaleString()}</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <p className="text-sm text-muted-foreground mb-2">Orders Delivered</p>
                <p className="text-2xl font-bold text-foreground">{deliveredOrders}</p>
              </div>
            </div>

            {/* Orders Section */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Order History
              </h3>

              <div className="space-y-3">
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-card rounded-xl border border-border p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{order.productName}</h4>
                        <p className="text-sm text-muted-foreground">Order ID: #{order.id}</p>
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${getStatusColor(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex gap-6">
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-medium text-foreground">{order.date}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Quantity</p>
                          <p className="font-medium text-foreground">{order.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Amount</p>
                        <p className="text-lg font-bold text-primary">₹{order.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
