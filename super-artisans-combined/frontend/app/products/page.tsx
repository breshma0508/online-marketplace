"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Heart, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import AuthModal from "@/components/auth-modal"
import Footer from "@/components/footer"

interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  artisanName: string
  artisanId: string
  description: string
  inStock: boolean
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Traditional Blue Pottery Vase",
    category: "Pottery",
    price: 2500,
    originalPrice: 3000,
    rating: 4.8,
    reviews: 45,
    image: "/blue-pottery-vase-traditional.jpg",
    artisanName: "Rajesh Kumar",
    artisanId: "1",
    description: "Handcrafted blue pottery vase with traditional Jaipur designs",
    inStock: true,
  },
  {
    id: "2",
    name: "Banarasi Silk Saree",
    category: "Sarees",
    price: 8500,
    originalPrice: 10000,
    rating: 4.9,
    reviews: 78,
    image: "/banarasi-silk-saree-traditional.jpg",
    artisanName: "Priya Sharma",
    artisanId: "2",
    description: "Exquisite Banarasi silk saree with gold zari work",
    inStock: true,
  },
  {
    id: "3",
    name: "Gold Filigree Earrings",
    category: "Jewelry",
    price: 4200,
    originalPrice: 5000,
    rating: 4.7,
    reviews: 32,
    image: "/gold-filigree-earrings.jpg",
    artisanName: "Amit Patel",
    artisanId: "3",
    description: "Delicate gold filigree earrings with traditional craftsmanship",
    inStock: true,
  },
  {
    id: "4",
    name: "Handwoven Bamboo Basket",
    category: "Baskets",
    price: 1200,
    originalPrice: 1500,
    rating: 4.6,
    reviews: 28,
    image: "/handwoven-bamboo-basket.jpg",
    artisanName: "Lakshmi Devi",
    artisanId: "4",
    description: "Eco-friendly handwoven basket with natural bamboo",
    inStock: true,
  },
  {
    id: "5",
    name: "Ceramic Dinner Set",
    category: "Pottery",
    price: 3500,
    originalPrice: 4200,
    rating: 4.5,
    reviews: 19,
    image: "/ceramic-dinner-set.jpg",
    artisanName: "Rajesh Kumar",
    artisanId: "1",
    description: "Beautiful ceramic dinner set with hand-painted designs",
    inStock: true,
  },
  {
    id: "6",
    name: "Silk Dupatta",
    category: "Sarees",
    price: 2800,
    originalPrice: 3500,
    rating: 4.7,
    reviews: 41,
    image: "/silk-dupatta-traditional.jpg",
    artisanName: "Priya Sharma",
    artisanId: "2",
    description: "Traditional silk dupatta with intricate embroidery",
    inStock: true,
  },
  {
    id: "7",
    name: "Silver Oxidized Necklace",
    category: "Jewelry",
    price: 3200,
    originalPrice: 4000,
    rating: 4.8,
    reviews: 55,
    image: "/silver-oxidized-necklace.jpg",
    artisanName: "Amit Patel",
    artisanId: "3",
    description: "Elegant silver oxidized necklace with traditional motifs",
    inStock: true,
  },
  {
    id: "8",
    name: "Decorative Woven Basket",
    category: "Baskets",
    price: 1800,
    originalPrice: 2200,
    rating: 4.4,
    reviews: 22,
    image: "/decorative-woven-basket.jpg",
    artisanName: "Lakshmi Devi",
    artisanId: "4",
    description: "Decorative basket perfect for home storage and display",
    inStock: false,
  },
  {
    id: "9",
    name: "Hand-painted Terracotta Pot",
    category: "Pottery",
    price: 1500,
    originalPrice: 1800,
    rating: 4.6,
    reviews: 34,
    image: "/hand-painted-terracotta-pot.jpg",
    artisanName: "Rajesh Kumar",
    artisanId: "1",
    description: "Rustic hand-painted terracotta pot with traditional patterns",
    inStock: true,
  },
  {
    id: "10",
    name: "Embroidered Saree",
    category: "Sarees",
    price: 6500,
    originalPrice: 8000,
    rating: 4.9,
    reviews: 67,
    image: "/embroidered-saree-traditional.jpg",
    artisanName: "Priya Sharma",
    artisanId: "2",
    description: "Beautifully embroidered saree with traditional motifs",
    inStock: true,
  },
  {
    id: "11",
    name: "Kundan Bracelet",
    category: "Jewelry",
    price: 5500,
    originalPrice: 6500,
    rating: 4.7,
    reviews: 43,
    image: "/kundan-bracelet.jpg",
    artisanName: "Amit Patel",
    artisanId: "3",
    description: "Exquisite kundan bracelet with semi-precious stones",
    inStock: true,
  },
  {
    id: "12",
    name: "Storage Basket Set",
    category: "Baskets",
    price: 2500,
    originalPrice: 3200,
    rating: 4.5,
    reviews: 31,
    image: "/storage-basket-set.jpg",
    artisanName: "Lakshmi Devi",
    artisanId: "4",
    description: "Set of three handwoven storage baskets in different sizes",
    inStock: true,
  },
  {
    id: "13",
    name: "Marble Inlay Decorative Box",
    category: "Marble Inlay",
    price: 4500,
    originalPrice: 5500,
    rating: 4.9,
    reviews: 52,
    image: "/marble-inlay-box.jpg",
    artisanName: "Vikram Singh",
    artisanId: "5",
    description: "Exquisite marble inlay work with semi-precious stones",
    inStock: true,
  },
  {
    id: "14",
    name: "Coir Fiber Door Mat",
    category: "Coir Crafts",
    price: 800,
    originalPrice: 1000,
    rating: 4.4,
    reviews: 18,
    image: "/coir-door-mat.jpg",
    artisanName: "Meera Nair",
    artisanId: "6",
    description: "Eco-friendly coir fiber door mat with natural texture",
    inStock: true,
  },
  {
    id: "15",
    name: "Bidri Ware Decorative Plate",
    category: "Bidri Ware",
    price: 3800,
    originalPrice: 4500,
    rating: 4.8,
    reviews: 41,
    image: "/bidri-ware-plate.jpg",
    artisanName: "Hassan Khan",
    artisanId: "7",
    description: "Traditional bidri ware with intricate brass inlay",
    inStock: true,
  },
  {
    id: "16",
    name: "Block Printed Cotton Fabric",
    category: "Block Printing",
    price: 1200,
    originalPrice: 1500,
    rating: 4.6,
    reviews: 35,
    image: "/block-printed-fabric.jpg",
    artisanName: "Fatima Begum",
    artisanId: "8",
    description: "Hand block printed cotton fabric with traditional patterns",
    inStock: true,
  },
  {
    id: "17",
    name: "Kutch Embroidered Cushion Cover",
    category: "Embroidery",
    price: 2200,
    originalPrice: 2800,
    rating: 4.7,
    reviews: 29,
    image: "/kutch-embroidered-cushion.jpg",
    artisanName: "Savitri Devi",
    artisanId: "9",
    description: "Vibrant Kutch embroidery on premium cotton",
    inStock: true,
  },
  {
    id: "18",
    name: "Chikankari Embroidered Kurta",
    category: "Chikankari",
    price: 3500,
    originalPrice: 4200,
    rating: 4.8,
    reviews: 56,
    image: "/chikankari-kurta.jpg",
    artisanName: "Zainab Khan",
    artisanId: "10",
    description: "Delicate chikankari embroidery on fine cotton",
    inStock: true,
  },
  {
    id: "19",
    name: "Kashmiri Papier-Mâché Box",
    category: "Papier-Mâché",
    price: 2800,
    originalPrice: 3500,
    rating: 4.7,
    reviews: 38,
    image: "/kashmiri-papier-mache-box.jpg",
    artisanName: "Ghulam Nabi",
    artisanId: "11",
    description: "Hand-painted Kashmiri papier-mâché with gold leaf",
    inStock: true,
  },
  {
    id: "20",
    name: "Tanjore Painting - Ganesha",
    category: "Tanjore Painting",
    price: 5500,
    originalPrice: 6500,
    rating: 4.9,
    reviews: 48,
    image: "/tanjore-painting-ganesha.jpg",
    artisanName: "Ramakrishnan",
    artisanId: "12",
    description: "Traditional Tanjore painting with 22k gold foil",
    inStock: true,
  },
  {
    id: "21",
    name: "Miniature Painting - Mughal Art",
    category: "Miniature Painting",
    price: 4200,
    originalPrice: 5000,
    rating: 4.8,
    reviews: 33,
    image: "/miniature-painting-mughal.jpg",
    artisanName: "Arun Kumar",
    artisanId: "13",
    description: "Intricate miniature painting on paper with natural colors",
    inStock: true,
  },
  {
    id: "22",
    name: "Lacquer Ware Decorative Vase",
    category: "Lacquer Ware",
    price: 3200,
    originalPrice: 4000,
    rating: 4.6,
    reviews: 27,
    image: "/lacquer-ware-vase.jpg",
    artisanName: "Thein Maung",
    artisanId: "14",
    description: "Traditional lacquer ware with hand-painted designs",
    inStock: true,
  },
  {
    id: "23",
    name: "Blue Pottery Dinner Plates Set",
    category: "Pottery",
    price: 4200,
    originalPrice: 5000,
    rating: 4.7,
    reviews: 44,
    image: "/blue-pottery-plates.jpg",
    artisanName: "Rajesh Kumar",
    artisanId: "1",
    description: "Set of 6 blue pottery dinner plates with traditional designs",
    inStock: true,
  },
  {
    id: "24",
    name: "Kanchipuram Silk Saree",
    category: "Sarees",
    price: 9500,
    originalPrice: 11000,
    rating: 4.9,
    reviews: 62,
    image: "/kanchipuram-silk-saree.jpg",
    artisanName: "Priya Sharma",
    artisanId: "2",
    description: "Premium Kanchipuram silk saree with temple motifs",
    inStock: true,
  },
  {
    id: "25",
    name: "Pearl Jhumka Earrings",
    category: "Jewelry",
    price: 2800,
    originalPrice: 3500,
    rating: 4.7,
    reviews: 39,
    image: "/pearl-jhumka-earrings.jpg",
    artisanName: "Amit Patel",
    artisanId: "3",
    description: "Traditional pearl jhumka with intricate gold work",
    inStock: true,
  },
  {
    id: "26",
    name: "Woven Jute Basket with Handle",
    category: "Baskets",
    price: 1500,
    originalPrice: 1900,
    rating: 4.5,
    reviews: 24,
    image: "/jute-basket-handle.jpg",
    artisanName: "Lakshmi Devi",
    artisanId: "4",
    description: "Sturdy jute basket with comfortable handle",
    inStock: true,
  },
  {
    id: "27",
    name: "Terracotta Oil Lamp Set",
    category: "Pottery",
    price: 1800,
    originalPrice: 2200,
    rating: 4.6,
    reviews: 31,
    image: "/terracotta-oil-lamp.jpg",
    artisanName: "Rajesh Kumar",
    artisanId: "1",
    description: "Traditional terracotta oil lamps for festivals",
    inStock: true,
  },
  {
    id: "28",
    name: "Patola Silk Saree",
    category: "Sarees",
    price: 12000,
    originalPrice: 14000,
    rating: 4.9,
    reviews: 71,
    image: "/patola-silk-saree.jpg",
    artisanName: "Priya Sharma",
    artisanId: "2",
    description: "Rare double ikat Patola silk saree from Gujarat",
    inStock: false,
  },
  {
    id: "29",
    name: "Antique Silver Anklet",
    category: "Jewelry",
    price: 3800,
    originalPrice: 4500,
    rating: 4.8,
    reviews: 47,
    image: "/silver-anklet.jpg",
    artisanName: "Amit Patel",
    artisanId: "3",
    description: "Handcrafted silver anklet with traditional bells",
    inStock: true,
  },
  {
    id: "30",
    name: "Seagrass Storage Basket",
    category: "Baskets",
    price: 2200,
    originalPrice: 2800,
    rating: 4.6,
    reviews: 26,
    image: "/seagrass-basket.jpg",
    artisanName: "Lakshmi Devi",
    artisanId: "4",
    description: "Natural seagrass basket for stylish storage",
    inStock: true,
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState("featured")
  const [wishlist, setWishlist] = useState<string[]>([])
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const categories = ["All", "Pottery", "Sarees", "Jewelry", "Baskets"]

  const filteredProducts = mockProducts
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating
      return 0
    })

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Handcrafted Products</h1>
          <p className="text-lg text-muted-foreground">Discover authentic handicrafts directly from Indian artisans</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl border border-border p-6 space-y-6 sticky top-24 h-fit">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Category</label>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Reset Filters */}
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                  setPriceRange([0, 10000])
                  setSortBy("featured")
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all hover:border-primary/50"
                    >
                      {/* Image */}
                      <div className="relative h-48 bg-muted overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white font-semibold">Out of Stock</span>
                          </div>
                        )}
                        {product.originalPrice && (
                          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-semibold">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                          </div>
                        )}
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-3 left-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              wishlist.includes(product.id) ? "fill-accent text-accent" : "text-foreground"
                            }`}
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-3">
                        <div>
                          <p className="text-xs text-accent font-medium mb-1">{product.category}</p>
                          <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>
                        </div>

                        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <span className="text-xs">⭐</span>
                            <span className="text-xs font-medium text-foreground">{product.rating}</span>
                            <span className="text-xs text-muted-foreground">({product.reviews})</span>
                          </div>
                          <Link
                            href={`/artisans/${product.artisanId}`}
                            className="text-xs text-primary hover:underline"
                          >
                            {product.artisanName}
                          </Link>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div>
                            <p className="text-lg font-bold text-foreground">₹{product.price}</p>
                            {product.originalPrice && (
                              <p className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</p>
                            )}
                          </div>
                          <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
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
