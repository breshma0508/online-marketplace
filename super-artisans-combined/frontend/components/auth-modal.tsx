"use client"

import type React from "react"

import { useState } from "react"
import { X, Mail, Lock, User, MapPin, Award, FileText, Briefcase, Phone, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AuthModalProps {
  mode: "login" | "signup"
  onClose: () => void
  onSwitchMode: (mode: "login" | "signup") => void
  onSuccess?: () => void
}

export default function AuthModal({ mode, onClose, onSwitchMode, onSuccess }: AuthModalProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const [role, setRole] = useState<"customer" | "artisan" | null>(null)

  const [artForm, setArtForm] = useState("")
  const [address, setAddress] = useState("")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [experience, setExperience] = useState("")
  const [aadharId, setAadharId] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [mobileVerified, setMobileVerified] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")

  const handleSendOtp = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!mobileNumber || mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number")
      return
    }
    setLoading(true)
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true)
      setLoading(false)
      alert("OTP sent to your mobile number")
    }, 1000)
  }

  const handleVerifyOtp = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!otp || otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP")
      return
    }
    setLoading(true)
    // Simulate OTP verification
    setTimeout(() => {
      setMobileVerified(true)
      setLoading(false)
      alert("Mobile number verified successfully!")
    }, 1000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "signup" && role === "artisan") {
      if (!aadharId || aadharId.length !== 12) {
        alert("Please enter a valid 12-digit Aadhar ID")
        return
      }
      if (!mobileVerified) {
        alert("Please verify your mobile number")
        return
      }
    }

    setLoading(true)
    // Simulate auth
    setTimeout(() => {
      setLoading(false)
      if (onSuccess) {
        onSuccess()
      }
      onClose()
    }, 1000)
  }

  if (mode === "signup" && role === null) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative w-full max-w-md bg-background rounded-xl shadow-lg p-8">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="h-5 w-5" />
          </button>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">Join Bharat KalaSans</h2>
            <p className="text-muted-foreground">Choose your role to get started</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setRole("customer")}
              className="w-full p-6 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
            >
              <div className="flex items-start gap-4">
                <User className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">I'm a Customer</h3>
                  <p className="text-sm text-muted-foreground">Browse and buy authentic handicrafts</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setRole("artisan")}
              className="w-full p-6 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
            >
              <div className="flex items-start gap-4">
                <Briefcase className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">I'm an Artisan</h3>
                  <p className="text-sm text-muted-foreground">Showcase and sell your creations</p>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Already have an account?{" "}
              <button onClick={() => onSwitchMode("login")} className="text-primary hover:underline font-medium">
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md bg-background rounded-xl shadow-lg p-8 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors">
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {mode === "login" ? "Welcome Back" : `Join as ${role === "artisan" ? "Artisan" : "Customer"}`}
          </h2>
          <p className="text-muted-foreground">
            {mode === "login" ? "Sign in to your account" : `Create your ${role} account`}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {mode === "signup" && role === "artisan" && (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Art Form</label>
                <div className="relative">
                  <Award className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="e.g., Pottery, Weaving, Jewelry"
                    value={artForm}
                    onChange={(e) => setArtForm(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Years of Experience</label>
                <Input
                  type="number"
                  placeholder="e.g., 10"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Your workshop address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">License/Certificate Number</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="License or certificate number"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Aadhar ID</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="12-digit Aadhar ID"
                    value={aadharId}
                    onChange={(e) => setAadharId(e.target.value.replace(/\D/g, "").slice(0, 12))}
                    className="pl-10"
                    maxLength={12}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Enter your 12-digit Aadhar number</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mobile Number</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="pl-10"
                      maxLength={10}
                      disabled={mobileVerified}
                      required
                    />
                  </div>
                  {!mobileVerified && (
                    <Button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading || !mobileNumber || mobileNumber.length !== 10}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {otpSent ? "Resend" : "Send OTP"}
                    </Button>
                  )}
                  {mobileVerified && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-green-700 font-medium">Verified</span>
                    </div>
                  )}
                </div>
              </div>

              {otpSent && !mobileVerified && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Enter OTP</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      maxLength={6}
                      required
                    />
                    <Button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={loading || otp.length !== 6}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Verify
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={loading || (mode === "signup" && role === "artisan" && !mobileVerified)}
          >
            {loading ? "Loading..." : mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        {/* Switch Mode */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground text-sm">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                if (mode === "signup") {
                  setRole(null)
                }
                onSwitchMode(mode === "login" ? "signup" : "login")
              }}
              className="text-primary hover:underline font-medium"
            >
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        {mode === "signup" && role !== null && (
          <button
            onClick={() => setRole(null)}
            className="mt-4 w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to role selection
          </button>
        )}
      </div>
    </div>
  )
}
