"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  MapPin,
  Award,
  FileCheck,
  Heart,
  Share2,
  Instagram,
  Facebook,
  MessageCircle,
  Youtube,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import AuthModal from "@/components/auth-modal"

interface ArtisanDetail {
  id: string
  name: string
  email: string
  phone: string
  location: string
  state: string
  artForm: string
  qualifications: string[]
  licenseNumber: string
  licenseExpiry: string
  bio: string
  detailedBio: string
  image: string
  rating: number
  reviews: number
  yearsExperience: number
  images: string[]
  videos: string[]
  socialMedia: {
    instagram?: string
    facebook?: string
    whatsapp?: string
    twitter?: string
    youtube?: string
  }
}

const mockArtisanDetail: ArtisanDetail = {
  id: "1",
  name: "Rajesh Kumar",
  email: "rajesh@example.com",
  phone: "+91-9876543210",
  location: "Jaipur, Rajasthan",
  state: "Rajasthan",
  artForm: "Pottery & Ceramics",
  qualifications: ["Diploma in Ceramic Arts", "National Award Winner 2022", "10+ years experience"],
  licenseNumber: "RAJ-POT-2024-001",
  licenseExpiry: "2026-12-31",
  bio: "Master potter specializing in traditional Jaipur blue pottery with modern designs.",
  detailedBio:
    "Rajesh Kumar is a renowned master potter from Jaipur with over 10 years of experience in traditional blue pottery. He has won multiple national awards for his innovative designs that blend traditional craftsmanship with contemporary aesthetics. His work has been featured in international exhibitions and is highly sought after by collectors worldwide.",
  image: "/indian-potter-working-with-clay.jpg",
  rating: 4.8,
  reviews: 156,
  yearsExperience: 10,
  images: [
    "/blue-pottery-vase-traditional.jpg",
    "/ceramic-dinner-set.jpg",
    "/hand-painted-terracotta-pot.jpg",
    "/blue-pottery-plates.jpg",
  ],
  videos: ["https://example.com/video1", "https://example.com/video2"],
  socialMedia: {
    instagram: "rajesh_pottery",
    facebook: "rajesh.pottery",
    whatsapp: "+919876543210",
  },
}

export default function ArtisanDetailPage() {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-8 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/artisans" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Artisans
          </Link>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Section */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="h-64 bg-muted overflow-hidden">
                <img
                  src={mockArtisanDetail.image || "/placeholder.svg"}
                  alt={mockArtisanDetail.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">{mockArtisanDetail.name}</h1>
                    <p className="text-lg text-accent font-medium mb-2">{mockArtisanDetail.artForm}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {mockArtisanDetail.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        {mockArtisanDetail.yearsExperience}+ years
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className="p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                    >
                      <Heart className={`h-5 w-5 ${isWishlisted ? "fill-accent text-accent" : "text-foreground"}`} />
                    </button>
                    <button className="p-3 rounded-lg border border-border hover:bg-muted transition-colors">
                      <Share2 className="h-5 w-5 text-foreground" />
                    </button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-foreground">{mockArtisanDetail.rating}</span>
                      <span className="text-2xl">⭐</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{mockArtisanDetail.reviews} reviews</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-card rounded-xl border border-border p-8 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">About</h2>
              <p className="text-foreground leading-relaxed">{mockArtisanDetail.detailedBio}</p>
            </div>

            {/* Qualifications */}
            <div className="bg-card rounded-xl border border-border p-8 space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Qualifications & Certifications
              </h2>
              <div className="space-y-3">
                {mockArtisanDetail.qualifications.map((qual, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <FileCheck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{qual}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-border space-y-2">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">License Number:</span>{" "}
                  {mockArtisanDetail.licenseNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Expiry Date:</span> {mockArtisanDetail.licenseExpiry}
                </p>
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-card rounded-xl border border-border p-8 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Gallery</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {mockArtisanDetail.images.map((image, idx) => (
                  <div key={idx} className="h-48 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-4 sticky top-24 h-fit">
              <h3 className="text-lg font-bold text-foreground">Get in Touch</h3>

              <div className="space-y-3">
                <a
                  href={`mailto:${mockArtisanDetail.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-foreground font-medium">{mockArtisanDetail.email}</p>
                  </div>
                </a>

                <a
                  href={`tel:${mockArtisanDetail.phone}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-foreground font-medium">{mockArtisanDetail.phone}</p>
                  </div>
                </a>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">View Products</Button>
            </div>

            {/* Social Media */}
            {Object.keys(mockArtisanDetail.socialMedia).length > 0 && (
              <div className="bg-card rounded-xl border border-border p-6 space-y-4">
                <h3 className="text-lg font-bold text-foreground">Follow</h3>
                <div className="flex gap-2">
                  {mockArtisanDetail.socialMedia.instagram && (
                    <a
                      href={`https://instagram.com/${mockArtisanDetail.socialMedia.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Instagram className="h-5 w-5 text-foreground" />
                    </a>
                  )}
                  {mockArtisanDetail.socialMedia.facebook && (
                    <a
                      href={`https://facebook.com/${mockArtisanDetail.socialMedia.facebook}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Facebook className="h-5 w-5 text-foreground" />
                    </a>
                  )}
                  {mockArtisanDetail.socialMedia.youtube && (
                    <a
                      href={`https://youtube.com/${mockArtisanDetail.socialMedia.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Youtube className="h-5 w-5 text-foreground" />
                    </a>
                  )}
                  {mockArtisanDetail.socialMedia.twitter && (
                    <a
                      href={`https://twitter.com/${mockArtisanDetail.socialMedia.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                    >
                      <Twitter className="h-5 w-5 text-foreground" />
                    </a>
                  )}
                </div>
              </div>
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
