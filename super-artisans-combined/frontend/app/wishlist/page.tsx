"use client"

import { useState } from "react"
import Link from "next/link"
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import AuthModal from "@/components/auth-modal"
import Footer from "@/components/footer"

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  artisanName: string
  artisanId: string
  category: string
  rating: number
}

const mockWishlist: WishlistItem[] = [
  {
    id: "1",
    name: "Traditional Blue Pottery Vase",
    price: 2500,
    image: "/blue-pottery-vase-traditional.jpg",
    artisanName: "Rajesh Kumar",
    artisanId: "1",
    category: "Pottery",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Banarasi Silk Saree",
    price: 8500,
    image: "/banarasi-silk-saree-traditional.jpg",
    artisanName: "Priya Sharma",
    artisanId: "2",
    category: "Sarees",
    rating: 4.9,
  },
  {
    id: "7",
    name: "Silver Oxidized Necklace",
    price: 3200,
    image: "/silver-oxidized-necklace.jpg",
    artisanName: "Amit Patel",
    artisanId: "3",
    category: "Jewelry",
    rating: 4.8,
  },
  {
    id: "11",
    name: "Kundan Bracelet",
    price: 5500,
    image: "/kundan-bracelet.jpg",
    artisanName: "Amit Patel",
    artisanId: "3",
    category: "Jewelry",
    rating: 4.7,
  },
  {
    id: "20",
    name: "Tanjore Painting - Ganesha",
    price: 5500,
    image: "/tanjore-painting-ganesha.jpg",
    artisanName: "Ramakrishnan",
    artisanId: "12",
    category: "Tanjore Painting",
    rating: 4.9,
  },
]

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(mockWishlist)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const removeFromWishlist = (id: string) => {
    setWishlist(wishlist.filter((item) => item.id !== id))
  }

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setShowAuth(true)
  }

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
    setShowAuth(false)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar onAuthClick={handleAuthClick} isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">My Wishlist</h1>
          <p className="text-lg text-muted-foreground">Your saved items and favorite artisans</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">Your wishlist is empty</p>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">{wishlist.length} items in your wishlist</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-accent font-medium mb-1">{item.category}</p>
                      <h3 className="font-semibold text-foreground line-clamp-2">{item.name}</h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-xs">⭐</span>
                        <span className="text-xs font-medium text-foreground">{item.rating}</span>
                      </div>
                      <Link href={`/artisans/${item.artisanId}`} className="text-xs text-primary hover:underline">
                        {item.artisanName}
                      </Link>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <p className="text-lg font-bold text-foreground">₹{item.price}</p>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-primary/5 rounded-xl border border-primary/20 p-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Ready to checkout?</h2>
              <Link href="/cart">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  Go to Cart
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>

      {showAuth && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuth(false)}
          onSwitchMode={(mode) => setAuthMode(mode)}
          onSuccess={handleAuthSuccess}
        />
      )}

      <Footer />
    </main>
  )
}
