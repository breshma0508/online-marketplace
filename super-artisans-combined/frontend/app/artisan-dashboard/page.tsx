"use client"

import { useState } from "react"
import { ArrowLeft, TrendingUp, Package, MapPin, Phone, Mail, Edit2, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"

interface Product {
  id: string
  name: string
  price: number
  quantity: number
  sold: number
  totalRevenue: number
  date: string
  image?: string
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Traditional Blue Pottery Vase",
    price: 2500,
    quantity: 15,
    sold: 5,
    totalRevenue: 12500,
    date: "2024-10-20",
  },
  {
    id: "2",
    name: "Ceramic Dinner Set",
    price: 3500,
    quantity: 8,
    sold: 3,
    totalRevenue: 10500,
    date: "2024-10-18",
  },
  {
    id: "3",
    name: "Hand-painted Terracotta Pot",
    price: 1500,
    quantity: 20,
    sold: 8,
    totalRevenue: 12000,
    date: "2024-10-15",
  },
  {
    id: "4",
    name: "Decorative Wall Hanging",
    price: 2000,
    quantity: 12,
    sold: 4,
    totalRevenue: 8000,
    date: "2024-10-10",
  },
  {
    id: "5",
    name: "Handmade Ceramic Lamp",
    price: 3200,
    quantity: 6,
    sold: 2,
    totalRevenue: 6400,
    date: "2024-10-05",
  },
]

export default function ArtisanDashboardPage() {
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [userName] = useState("Rajesh Kumar")

  const totalRevenue = mockProducts.reduce((sum, product) => sum + product.totalRevenue, 0)
  const totalSold = mockProducts.reduce((sum, product) => sum + product.sold, 0)
  const totalProducts = mockProducts.length

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        isLoggedIn={isLoggedIn}
        userName={userName}
        userType="artisan"
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
          <h1 className="text-3xl font-bold text-foreground">Artisan Dashboard</h1>
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
                <p className="text-sm text-muted-foreground">Artisan</p>
              </div>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">rajesh.kumar@email.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Jaipur, Rajasthan</span>
                </div>
              </div>

              <Button className="w-full gap-2 mb-3">
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Add New Product
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card rounded-xl border border-border p-6">
                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-primary">₹{totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Items Sold
                </p>
                <p className="text-2xl font-bold text-foreground">{totalSold}</p>
              </div>
              <div className="bg-card rounded-xl border border-border p-6">
                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Products
                </p>
                <p className="text-2xl font-bold text-foreground">{totalProducts}</p>
              </div>
            </div>

            {/* Products Section */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                My Products
              </h3>

              <div className="space-y-3">
                {mockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-card rounded-xl border border-border p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">Product ID: #{product.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="font-bold text-primary">₹{product.price}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">In Stock</p>
                        <p className="font-medium text-foreground">{product.quantity}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Sold</p>
                        <p className="font-medium text-foreground">{product.sold}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-medium text-primary">₹{product.totalRevenue}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Date Added</p>
                        <p className="font-medium text-foreground">{product.date}</p>
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
