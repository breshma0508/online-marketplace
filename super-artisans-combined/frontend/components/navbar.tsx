"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Heart, ShoppingCart, Users, Package, Map, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProfileDropdown from "./profile-dropdown"
import BhaLogo from "./bha-logo"

interface NavbarProps {
  onAuthClick: (mode: "login" | "signup") => void
  isLoggedIn: boolean
  onLogout: () => void
  userType?: "customer" | "artisan"
  userName?: string
}

export default function Navbar({
  onAuthClick,
  isLoggedIn,
  onLogout,
  userType = "customer",
  userName = "User",
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: "Artisans", href: "/artisans", icon: Users },
    { label: "Products", href: "/products", icon: Package },
    { label: "Map", href: "/map", icon: Map },
    { label: "Schemes", href: "/schemes", icon: Award },
    { label: "Wishlist", href: "/wishlist", icon: Heart },
    { label: "Cart", href: "/cart", icon: ShoppingCart },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <BhaLogo />
            <span className="font-bold text-lg text-foreground hidden sm:inline">Bharat KalaSans</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm font-medium"
                >
                  <IconComponent className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <ProfileDropdown userType={userType} userName={userName} onLogout={onLogout} />
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => onAuthClick("login")}>
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => onAuthClick("signup")}
                >
                  Sign Up
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-2">
            {navLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
