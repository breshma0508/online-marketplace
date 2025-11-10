"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Search, Filter, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import AuthModal from "@/components/auth-modal"
import Footer from "@/components/footer"
import dynamic from "next/dynamic"

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

interface ArtisanLocation {
  id: string
  name: string
  artForm: string
  location: string
  state: string
  latitude: number
  longitude: number
  rating: number
  image: string
}

const artisanLocations: ArtisanLocation[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    artForm: "Pottery & Ceramics",
    location: "Jaipur, Rajasthan",
    state: "Rajasthan",
    latitude: 26.9124,
    longitude: 75.7873,
    rating: 4.8,
    image: "/indian-potter-rajesh-kumar.jpg",
  },
  {
    id: "2",
    name: "Priya Sharma",
    artForm: "Silk Weaving",
    location: "Varanasi, Uttar Pradesh",
    state: "Uttar Pradesh",
    latitude: 25.3209,
    longitude: 82.9789,
    rating: 4.9,
    image: "/indian-silk-weaver-at-loom.jpg",
  },
  {
    id: "3",
    name: "Amit Patel",
    artForm: "Jewelry Making",
    location: "Ahmedabad, Gujarat",
    state: "Gujarat",
    latitude: 23.0225,
    longitude: 72.5714,
    rating: 4.7,
    image: "/indian-jeweler-crafting-jewelry.jpg",
  },
  {
    id: "4",
    name: "Lakshmi Devi",
    artForm: "Basket Weaving",
    location: "Bangalore, Karnataka",
    state: "Karnataka",
    latitude: 12.9716,
    longitude: 77.5946,
    rating: 4.6,
    image: "/indian-basket-weaver-traditional.jpg",
  },
  {
    id: "5",
    name: "Vikram Singh",
    artForm: "Marble Inlay",
    location: "Agra, Uttar Pradesh",
    state: "Uttar Pradesh",
    latitude: 27.1767,
    longitude: 78.0081,
    rating: 4.9,
    image: "/marble-inlay-craftsman.jpg",
  },
  {
    id: "6",
    name: "Meera Nair",
    artForm: "Coir & Coconut Crafts",
    location: "Kochi, Kerala",
    state: "Kerala",
    latitude: 9.9312,
    longitude: 76.2673,
    rating: 4.5,
    image: "/coconut-fiber-crafts.jpg",
  },
  {
    id: "7",
    name: "Suresh Reddy",
    artForm: "Bidri Ware",
    location: "Hyderabad, Telangana",
    state: "Telangana",
    latitude: 17.385,
    longitude: 78.4867,
    rating: 4.7,
    image: "/bidri-metalware.jpg",
  },
  {
    id: "8",
    name: "Anjali Verma",
    artForm: "Textile Printing",
    location: "Indore, Madhya Pradesh",
    state: "Madhya Pradesh",
    latitude: 22.7196,
    longitude: 75.8577,
    rating: 4.6,
    image: "/textile-block-printing.jpg",
  },
  {
    id: "9",
    name: "Harish Patel",
    artForm: "Embroidery",
    location: "Kutch, Gujarat",
    state: "Gujarat",
    latitude: 23.8103,
    longitude: 69.5937,
    rating: 4.8,
    image: "/kutch-embroidery.jpg",
  },
  {
    id: "10",
    name: "Deepa Gupta",
    artForm: "Chikankari",
    location: "Lucknow, Uttar Pradesh",
    state: "Uttar Pradesh",
    latitude: 26.8467,
    longitude: 80.9462,
    rating: 4.7,
    image: "/chikankari-embroidery.jpg",
  },
  {
    id: "11",
    name: "Ramesh Nath",
    artForm: "Papier-Mâché",
    location: "Srinagar, Jammu & Kashmir",
    state: "Jammu & Kashmir",
    latitude: 34.0837,
    longitude: 74.7973,
    rating: 4.8,
    image: "/kashmiri-papier-mache.jpg",
  },
  {
    id: "12",
    name: "Savitri Devi",
    artForm: "Tanjore Painting",
    location: "Thanjavur, Tamil Nadu",
    state: "Tamil Nadu",
    latitude: 10.787,
    longitude: 79.1378,
    rating: 4.9,
    image: "/tanjore-painting.jpg",
  },
  {
    id: "13",
    name: "Gopal Sharma",
    artForm: "Miniature Painting",
    location: "Udaipur, Rajasthan",
    state: "Rajasthan",
    latitude: 24.5854,
    longitude: 73.7125,
    rating: 4.6,
    image: "/miniature-painting.jpg",
  },
  {
    id: "14",
    name: "Fatima Khan",
    artForm: "Lacquer Ware",
    location: "Hyderabad, Telangana",
    state: "Telangana",
    latitude: 17.385,
    longitude: 78.5867,
    rating: 4.5,
    image: "/lacquer-ware.jpg",
  },
]

const allIndianStates = [
  "All",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Jammu & Kashmir",
  "Ladakh",
]

function ArtisanMarker({
  artisan,
  isSelected,
  onSelect,
}: { artisan: ArtisanLocation; isSelected: boolean; onSelect: () => void }) {
  return (
    <Marker
      position={[artisan.latitude, artisan.longitude]}
      eventHandlers={{
        click: onSelect,
      }}
    >
      <Popup>
        <div className="w-48">
          <img
            src={artisan.image || "/placeholder.svg"}
            alt={artisan.name}
            className="w-full h-32 object-cover rounded mb-2"
          />
          <h3 className="font-semibold text-foreground">{artisan.name}</h3>
          <p className="text-sm text-accent mb-1">{artisan.artForm}</p>
          <p className="text-xs text-muted-foreground mb-2">{artisan.location}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary">{artisan.rating} ⭐</span>
            <Link href={`/artisans/${artisan.id}`} className="text-xs text-primary hover:underline">
              View Profile →
            </Link>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}

export default function MapPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("All")
  const [selectedArtForm, setSelectedArtForm] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedArtisan, setSelectedArtisan] = useState<ArtisanLocation | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)

  const filteredArtisans = artisanLocations.filter((artisan) => {
    const matchesSearch =
      artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.artForm.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesState = selectedState === "All" || artisan.state === selectedState
    return matchesSearch && matchesState
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
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar onAuthClick={handleAuthClick} isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />

      {/* Header */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Artisan Map</h1>
          <p className="text-lg text-muted-foreground">Discover artisans by location across India</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-card rounded-xl border border-border p-4">
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
            <div className="bg-card rounded-xl border border-border p-4">
              <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter by State
              </label>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {allIndianStates.map((state) => (
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

            {/* Artisans List */}
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-semibold text-foreground mb-4">Artisans ({filteredArtisans.length})</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredArtisans.map((artisan) => (
                  <button
                    key={artisan.id}
                    onClick={() => setSelectedArtisan(artisan)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedArtisan?.id === artisan.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-medium text-foreground text-sm">{artisan.name}</p>
                    <p className="text-xs text-accent mb-1">{artisan.artForm}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{artisan.location}</p>
                      <span className="text-xs font-medium text-primary">{artisan.rating} ⭐</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-xl border border-border overflow-hidden h-96 lg:h-full min-h-[600px] relative">
              {typeof window !== "undefined" && (
                <MapContainer
                  center={[20.5937, 78.9629]}
                  zoom={5}
                  style={{ height: "100%", width: "100%" }}
                  onLoad={() => setIsMapReady(true)}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {filteredArtisans.map((artisan) => (
                    <ArtisanMarker
                      key={artisan.id}
                      artisan={artisan}
                      isSelected={selectedArtisan?.id === artisan.id}
                      onSelect={() => setSelectedArtisan(artisan)}
                    />
                  ))}
                </MapContainer>
              )}

              {/* Selected Artisan Info Card */}
              {selectedArtisan && (
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-border max-w-sm z-50">
                  <button
                    onClick={() => setSelectedArtisan(null)}
                    className="absolute top-2 right-2 p-1 hover:bg-muted rounded"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="flex gap-4">
                    <img
                      src={selectedArtisan.image || "/placeholder.svg"}
                      alt={selectedArtisan.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{selectedArtisan.name}</h3>
                      <p className="text-sm text-accent mb-1">{selectedArtisan.artForm}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {selectedArtisan.location}
                        </p>
                        <Link
                          href={`/artisans/${selectedArtisan.id}`}
                          className="text-xs text-primary hover:underline font-medium"
                        >
                          View Profile →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
