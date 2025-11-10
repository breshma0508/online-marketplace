"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, MapPin, Users, Package, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import AuthModal from "@/components/auth-modal"
import Footer from "@/components/footer"

export default function Home() {
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [userType, setUserType] = useState<"customer" | "artisan">("customer")
  const [userName, setUserName] = useState("John Doe")

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setShowAuth(true)
  }

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
    setShowAuth(false)
    setUserName("John Doe")
    setUserType("customer")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar
        onAuthClick={handleAuthClick}
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
        userType={userType}
        userName={userName}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 pt-20 pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold text-foreground leading-tight">
                  Bharat <span className="text-primary">KalaSans</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Connect directly with Indian artisans. Discover authentic handicrafts, support traditional art forms,
                  and celebrate cultural heritage.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">Why Choose Us</p>
                <ul className="space-y-3">
                  <li className="flex gap-3 items-start">
                    <div className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-foreground">Direct connection with artisans - no middlemen</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-foreground">Authentic, handcrafted products with stories</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-foreground">Support traditional Indian art forms</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-foreground">Fair pricing that benefits artisans</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => handleAuthClick("signup")}
                >
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => handleAuthClick("login")}>
                  Sign In
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-96 lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl" />
              <img
                src="/indian-artisan-crafting-traditional-handicrafts-po.jpg"
                alt="Indian artisans crafting"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Explore Our Platform</h2>
            <p className="text-lg text-muted-foreground">Everything you need to discover and support Indian artisans</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature Cards */}
            {[
              {
                icon: Users,
                title: "Artisan Profiles",
                description:
                  "Meet talented artisans, learn their stories, and see their credentials and certifications.",
                href: "/artisans",
              },
              {
                icon: Package,
                title: "Products",
                description: "Browse authentic handicrafts including pottery, jewelry, sarees, baskets, and more.",
                href: "/products",
              },
              {
                icon: MapPin,
                title: "Artisan Map",
                description: "Discover artisans by location and explore their work on an interactive map.",
                href: "/map",
              },
              {
                icon: Heart,
                title: "Wishlist",
                description: "Save your favorite products and artisans for later.",
                href: "/wishlist",
              },
              {
                icon: ShoppingCart,
                title: "Shopping Cart",
                description: "Secure checkout with direct support to artisans.",
                href: "/cart",
              },
              {
                icon: FileText,
                title: "Govt Schemes",
                description: "Learn about government schemes supporting artisans and traditional crafts.",
                href: "/schemes",
              },
            ].map((feature) => (
              <Link key={feature.title} href={feature.href}>
                <div className="group h-full p-8 rounded-xl border border-border bg-background hover:bg-muted/50 transition-colors cursor-pointer">
                  <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:text-accent transition-colors" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Support Indian Artisans?</h2>
          <p className="text-lg mb-8 opacity-90">Join thousands of customers celebrating traditional craftsmanship</p>
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            onClick={() => handleAuthClick("signup")}
          >
            Start Shopping Now
          </Button>
        </div>
      </section>

      {/* Auth Modal */}
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