"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOut, ShoppingBag, Package, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProfileDropdownProps {
  userType: "customer" | "artisan"
  userName: string
  onLogout: () => void
}

interface Order {
  id: string
  productName: string
  price: number
  date: string
  status: "pending" | "shipped" | "delivered"
}

interface SoldProduct {
  id: string
  productName: string
  quantity: number
  totalSales: number
  date: string
}

// Mock data for customer orders
const mockCustomerOrders: Order[] = [
  {
    id: "1",
    productName: "Banarasi Silk Saree",
    price: 8500,
    date: "2024-10-20",
    status: "delivered",
  },
  {
    id: "2",
    productName: "Gold Filigree Earrings",
    price: 4200,
    date: "2024-10-18",
    status: "shipped",
  },
  {
    id: "3",
    productName: "Blue Pottery Vase",
    price: 2500,
    date: "2024-10-15",
    status: "pending",
  },
]

// Mock data for artisan sold products
const mockArtisanSoldProducts: SoldProduct[] = [
  {
    id: "1",
    productName: "Traditional Blue Pottery Vase",
    quantity: 5,
    totalSales: 12500,
    date: "2024-10-20",
  },
  {
    id: "2",
    productName: "Ceramic Dinner Set",
    quantity: 3,
    totalSales: 10500,
    date: "2024-10-18",
  },
  {
    id: "3",
    productName: "Hand-painted Terracotta Pot",
    quantity: 8,
    totalSales: 12000,
    date: "2024-10-15",
  },
]

export default function ProfileDropdown({ userType, userName, onLogout }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-50"
      case "shipped":
        return "text-blue-600 bg-blue-50"
      case "pending":
        return "text-yellow-600 bg-yellow-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm font-medium"
        title={userName}
      >
        <User className="h-4 w-4" />
        <span>{userName}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-background rounded-xl border border-border shadow-lg z-50 max-h-[600px] overflow-y-auto">
          {/* Header */}
          <div className="p-4 border-b border-border bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground capitalize">{userType}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {userType === "customer" ? (
              <>
                {/* Recent Purchases */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-primary" />
                    Recent Purchases
                  </h3>
                  <div className="space-y-2">
                    {mockCustomerOrders.slice(0, 3).map((order) => (
                      <div key={order.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-medium text-foreground line-clamp-1">{order.productName}</p>
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getStatusColor(
                              order.status,
                            )}`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                          <p className="text-sm font-semibold text-foreground">₹{order.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Orders */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    Current Orders
                  </h3>
                  <div className="space-y-2">
                    {mockCustomerOrders
                      .filter((order) => order.status !== "delivered")
                      .map((order) => (
                        <div key={order.id} className="p-3 bg-muted rounded-lg">
                          <div className="flex justify-between items-start mb-1">
                            <p className="text-sm font-medium text-foreground line-clamp-1">{order.productName}</p>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getStatusColor(
                                order.status,
                              )}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{order.date}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Recent Sales */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-primary" />
                    Recent Sales
                  </h3>
                  <div className="space-y-2">
                    {mockArtisanSoldProducts.slice(0, 3).map((product) => (
                      <div key={product.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-medium text-foreground line-clamp-1">{product.productName}</p>
                          <p className="text-sm font-semibold text-primary">₹{product.totalSales}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-xs text-muted-foreground">{product.date}</p>
                          <p className="text-xs text-muted-foreground">{product.quantity} sold</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Products */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    Current Products
                  </h3>
                  <div className="space-y-2">
                    {mockArtisanSoldProducts.map((product) => (
                      <div key={product.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-medium text-foreground line-clamp-1">{product.productName}</p>
                          <p className="text-xs text-muted-foreground">{product.quantity} in stock</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{product.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <Link href={userType === "customer" ? "/profile" : "/artisan-dashboard"} className="w-full block">
              <Button variant="outline" className="w-full bg-transparent gap-2">
                <Settings className="h-4 w-4" />
                View Full Profile
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full bg-transparent gap-2 text-destructive hover:text-destructive"
              onClick={() => {
                setIsOpen(false)
                onLogout()
              }}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      )}

      {/* Close dropdown when clicking outside */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
