"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MapPin, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import AuthModal from "@/components/auth-modal"

interface Artisan {
  id: string
  name: string
  email: string
  location: string
  state: string
  artForm: string
  qualifications: string[]
  licenseNumber: string
  licenseExpiry: string
  bio: string
  image: string
  rating: number
  reviews: number
  specialization: string[]
  isAvailable: boolean
  priceRange: { min: number; max: number }
  socialMedia: {
    instagram?: string
    facebook?: string
    whatsapp?: string
    twitter?: string
    youtube?: string
  }
}

const mockArtisans: Artisan[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    location: "Jaipur, Rajasthan",
    state: "Rajasthan",
    artForm: "Pottery & Ceramics",
    qualifications: ["Diploma in Ceramic Arts", "10+ years experience"],
    licenseNumber: "RAJ-POT-2024-001",
    licenseExpiry: "2026-12-31",
    bio: "Master potter specializing in traditional Jaipur blue pottery with modern designs.",
    image: "/indian-potter-working-with-clay.jpg",
    rating: 4.8,
    reviews: 156,
    specialization: ["Blue Pottery", "Wheel Throwing", "Hand Painting"],
    isAvailable: true,
    priceRange: { min: 500, max: 5000 },
    socialMedia: {
      instagram: "rajesh_pottery",
      facebook: "rajesh.pottery",
      whatsapp: "+919876543210",
    },
  },
  {
    id: "2",
    name: "Priya Sharma",
    email: "priya@example.com",
    location: "Varanasi, Uttar Pradesh",
    state: "Uttar Pradesh",
    artForm: "Silk Weaving",
    qualifications: ["Master Weaver", "15+ years experience"],
    licenseNumber: "UP-SILK-2024-002",
    licenseExpiry: "2027-06-30",
    bio: "Expert silk weaver creating traditional Banarasi sarees with contemporary patterns.",
    image: "/indian-silk-weaver-at-loom.jpg",
    rating: 4.9,
    reviews: 203,
    specialization: ["Banarasi Sarees", "Silk Weaving", "Gold Zari Work"],
    isAvailable: true,
    priceRange: { min: 2000, max: 15000 },
    socialMedia: {
      instagram: "priya_silks",
      youtube: "priya_weaving",
    },
  },
  {
    id: "3",
    name: "Amit Patel",
    email: "amit@example.com",
    location: "Ahmedabad, Gujarat",
    state: "Gujarat",
    artForm: "Jewelry Making",
    qualifications: ["Certified Jeweler", "12+ years experience"],
    licenseNumber: "GUJ-JEW-2024-003",
    licenseExpiry: "2025-12-31",
    bio: "Skilled jeweler crafting exquisite gold and silver ornaments with traditional designs.",
    image: "/indian-jeweler-crafting-jewelry.jpg",
    rating: 4.7,
    reviews: 128,
    specialization: ["Gold Jewelry", "Silver Filigree", "Stone Setting"],
    isAvailable: true,
    priceRange: { min: 1000, max: 10000 },
    socialMedia: {
      instagram: "amit_jewelry",
      facebook: "amit.patel.jewelry",
    },
  },
  {
    id: "4",
    name: "Lakshmi Devi",
    email: "lakshmi@example.com",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    artForm: "Basket Weaving",
    qualifications: ["Traditional Weaver", "8+ years experience"],
    licenseNumber: "KAR-BAS-2024-004",
    licenseExpiry: "2026-03-15",
    bio: "Eco-friendly basket weaver using sustainable materials and traditional techniques.",
    image: "/indian-basket-weaver-traditional.jpg",
    rating: 4.6,
    reviews: 94,
    specialization: ["Bamboo Baskets", "Jute Weaving", "Eco-Crafts"],
    isAvailable: true,
    priceRange: { min: 300, max: 3000 },
    socialMedia: {
      instagram: "lakshmi_baskets",
    },
  },
  {
    id: "5",
    name: "Vikram Singh",
    email: "vikram@example.com",
    location: "Agra, Uttar Pradesh",
    state: "Uttar Pradesh",
    artForm: "Marble Inlay",
    qualifications: ["Master Craftsman", "20+ years experience"],
    licenseNumber: "UP-MAR-2024-005",
    licenseExpiry: "2028-09-30",
    bio: "Expert in traditional marble inlay work with semi-precious stones.",
    image: "/marble-inlay-craftsman.jpg",
    rating: 4.9,
    reviews: 187,
    specialization: ["Marble Inlay", "Semi-precious Stones", "Decorative Items"],
    isAvailable: true,
    priceRange: { min: 2000, max: 20000 },
    socialMedia: {
      instagram: "vikram_marble",
      youtube: "vikram_inlay",
    },
  },
]

const availabilityOptions = ["All", "Available", "Unavailable"]

export default function ArtisansPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("All")
  const [availabilityFilter, setAvailabilityFilter] = useState("All")
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const states = ["All", ...new Set(mockArtisans.map((a) => a.state))]

  const filteredArtisans = mockArtisans.filter((artisan) => {
    const matchesSearch =
      artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.artForm.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesState = selectedState === "All" || artisan.state === selectedState
    const matchesAvailability =
      availabilityFilter === "All" ||
      (availabilityFilter === "Available" && artisan.isAvailable) ||
      (availabilityFilter === "Unavailable" && !artisan.isAvailable)
    return matchesSearch && matchesState && matchesAvailability
  })

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setShowAuth(true)
  }

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
    setShowAuth(false)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar onAuthClick={handleAuthClick} isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Meet Our Artisans</h1>
          <p className="text-lg text-muted-foreground">Discover talented craftspeople and their authentic creations</p>
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
                    placeholder="Search artisans..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* State Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">State</label>
                <div className="space-y-2">
                  {states.map((state) => (
                    <button
                      key={state}
                      onClick={() => setSelectedState(state)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedState === state
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Availability</label>
                <div className="space-y-2">
                  {availabilityOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setAvailabilityFilter(option)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        availabilityFilter === option
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Artisans Grid */}
          <div className="lg:col-span-3">
            {filteredArtisans.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No artisans found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Showing {filteredArtisans.length} artisans</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {filteredArtisans.map((artisan) => (
                    <Link key={artisan.id} href={`/artisans/${artisan.id}`}>
                      <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all hover:border-primary/50 h-full">
                        {/* Image */}
                        <div className="relative h-48 bg-muted overflow-hidden">
                          <img
                            src={artisan.image || "/placeholder.svg"}
                            alt={artisan.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          {!artisan.isAvailable && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                              <span className="text-white font-semibold">Unavailable</span>
                            </div>
                          )}
                          <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2">
                            <Star className="h-5 w-5 fill-accent text-accent" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-3">
                          <div>
                            <p className="text-xs text-accent font-medium mb-1">{artisan.artForm}</p>
                            <h3 className="font-semibold text-foreground text-lg">{artisan.name}</h3>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-2">{artisan.bio}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <span className="text-xs">⭐</span>
                              <span className="text-xs font-medium text-foreground">{artisan.rating}</span>
                              <span className="text-xs text-muted-foreground">({artisan.reviews})</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {artisan.location}
                          </div>

                          <div className="pt-2 border-t border-border">
                            <p className="text-xs text-muted-foreground mb-2">Specialization:</p>
                            <div className="flex flex-wrap gap-1">
                              {artisan.specialization.slice(0, 2).map((spec) => (
                                <span key={spec} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                  {spec}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
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
    </main>
  )
}
