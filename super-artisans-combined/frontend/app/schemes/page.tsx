"use client"

import { useState } from "react"
import { ChevronDown, FileText, Users, Award, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import AuthModal from "@/components/auth-modal"
import Footer from "@/components/footer"

interface Scheme {
  id: string
  name: string
  type: "central" | "state"
  state?: string
  description: string
  benefits: string[]
  eligibility: string[]
  applicationProcess: string[]
  deadline?: string
  fundingAmount?: string
  contactInfo: string
  website?: string
}

interface TrainingSession {
  id: string
  title: string
  description: string
  craft: string
  location: string
  state: string
  startDate: string
  endDate: string
  duration: string
  instructor: string
  capacity: number
  enrolled: number
  registrationDeadline: string
  fee: string
  topics: string[]
  contactInfo: string
  website?: string
}

interface Awarenesscamp {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  state: string
  organizer: string
  topics: string[]
  speakers: string[]
  capacity: number
  registrationDeadline: string
  contactInfo: string
  website?: string
}

const trainingSessions: TrainingSession[] = [
  {
    id: "t1",
    title: "Advanced Blue Pottery Techniques",
    description: "Learn advanced techniques in blue pottery making from master craftsmen.",
    craft: "Blue Pottery",
    location: "Jaipur",
    state: "Rajasthan",
    startDate: "2024-11-15",
    endDate: "2024-12-15",
    duration: "4 weeks",
    instructor: "Rajesh Kumar (Master Artisan)",
    capacity: 20,
    enrolled: 15,
    registrationDeadline: "2024-11-10",
    fee: "₹5,000 (Subsidized)",
    topics: [
      "Clay preparation and mixing",
      "Wheel throwing techniques",
      "Blue glaze application",
      "Kiln firing and temperature control",
      "Quality finishing",
    ],
    contactInfo: "Jaipur Pottery Institute, +91-9876543210",
    website: "https://jaipurpottery.gov.in",
  },
  {
    id: "t2",
    title: "Digital Marketing for Artisans",
    description: "Learn how to market your handicrafts online and reach customers globally.",
    craft: "All Crafts",
    location: "Bangalore",
    state: "Karnataka",
    startDate: "2024-11-20",
    endDate: "2024-11-27",
    duration: "1 week",
    instructor: "Priya Sharma (Digital Marketing Expert)",
    capacity: 30,
    enrolled: 28,
    registrationDeadline: "2024-11-18",
    fee: "Free",
    topics: [
      "Social media marketing",
      "E-commerce platform setup",
      "Photography and product listing",
      "Customer engagement strategies",
      "Analytics and performance tracking",
    ],
    contactInfo: "Karnataka Artisan Board, +91-8765432109",
    website: "https://karnataka.gov.in",
  },
  {
    id: "t3",
    title: "Sustainable Weaving Practices",
    description: "Training on eco-friendly and sustainable methods in textile weaving.",
    craft: "Textile Weaving",
    location: "Varanasi",
    state: "Uttar Pradesh",
    startDate: "2024-12-01",
    endDate: "2024-12-20",
    duration: "3 weeks",
    instructor: "Vikram Singh (Sustainability Expert)",
    capacity: 25,
    enrolled: 18,
    registrationDeadline: "2024-11-25",
    fee: "₹3,000 (Subsidized)",
    topics: [
      "Organic yarn sourcing",
      "Natural dye preparation",
      "Water conservation techniques",
      "Waste management",
      "Certification for eco-friendly products",
    ],
    contactInfo: "Varanasi Weaver Association, +91-7654321098",
    website: "https://varanasiweavers.gov.in",
  },
  {
    id: "t4",
    title: "Jewelry Design and Craftsmanship",
    description: "Master the art of jewelry design and advanced craftsmanship techniques.",
    craft: "Jewelry",
    location: "Ahmedabad",
    state: "Gujarat",
    startDate: "2024-11-25",
    endDate: "2025-01-25",
    duration: "2 months",
    instructor: "Anil Patel (Master Jeweler)",
    capacity: 15,
    enrolled: 12,
    registrationDeadline: "2024-11-20",
    fee: "₹8,000 (Subsidized)",
    topics: [
      "Design sketching and CAD",
      "Metal working techniques",
      "Stone setting and polishing",
      "Quality assessment",
      "Business management for jewelers",
    ],
    contactInfo: "Gujarat Jewelry Institute, +91-6543210987",
    website: "https://gujaratjewelry.gov.in",
  },
]

const awarenessCamps: Awarenesscamp[] = [
  {
    id: "a1",
    title: "Government Schemes Awareness Camp",
    description: "Comprehensive awareness session on all available government schemes for artisans.",
    date: "2024-11-18",
    time: "10:00 AM - 1:00 PM",
    location: "District Industries Centre, Jaipur",
    state: "Rajasthan",
    organizer: "Ministry of MSME",
    topics: [
      "PMKVY scheme details",
      "SPCA benefits and eligibility",
      "State-specific schemes",
      "Application process and documentation",
      "Q&A session",
    ],
    speakers: [
      "Dr. Rajesh Verma (MSME Official)",
      "Priya Sharma (Scheme Consultant)",
      "Successful Artisan Beneficiary",
    ],
    capacity: 100,
    registrationDeadline: "2024-11-16",
    contactInfo: "DIC Jaipur, +91-9876543210",
    website: "https://dic.rajasthan.gov.in",
  },
  {
    id: "a2",
    title: "Quality Standards and Certification",
    description: "Learn about quality standards, certifications, and export requirements for handicrafts.",
    date: "2024-11-22",
    time: "2:00 PM - 5:00 PM",
    location: "Bangalore Convention Center",
    state: "Karnataka",
    organizer: "Bureau of Indian Standards (BIS)",
    topics: [
      "ISO certification process",
      "Handicraft quality standards",
      "Export documentation",
      "International market requirements",
      "Certification benefits",
    ],
    speakers: ["Amit Kumar (BIS Representative)", "Export Consultant", "International Buyer"],
    capacity: 150,
    registrationDeadline: "2024-11-20",
    contactInfo: "BIS Karnataka, +91-8765432109",
    website: "https://bis.gov.in",
  },
  {
    id: "a3",
    title: "Women Artisans Empowerment Program",
    description: "Special awareness camp focused on empowering women artisans with business skills.",
    date: "2024-11-25",
    time: "9:00 AM - 12:00 PM",
    location: "Community Hall, Varanasi",
    state: "Uttar Pradesh",
    organizer: "Women Artisan Federation",
    topics: [
      "Business planning for women",
      "Financial literacy and banking",
      "Self-help group formation",
      "Market access strategies",
      "Legal rights and protections",
    ],
    speakers: ["Neha Singh (Women Entrepreneur)", "Banking Expert", "Legal Advisor", "Successful Women Artisan"],
    capacity: 80,
    registrationDeadline: "2024-11-23",
    contactInfo: "Women Artisan Federation, +91-7654321098",
    website: "https://womenartisans.gov.in",
  },
  {
    id: "a4",
    title: "Digital Payment and E-commerce",
    description: "Learn about digital payment systems and e-commerce platforms for selling online.",
    date: "2024-11-28",
    time: "11:00 AM - 2:00 PM",
    location: "Tech Hub, Ahmedabad",
    state: "Gujarat",
    organizer: "NASSCOM & Ministry of MSME",
    topics: [
      "Digital payment methods",
      "E-commerce platform setup",
      "Online security and fraud prevention",
      "Customer service excellence",
      "Analytics and business growth",
    ],
    speakers: ["Vikram Patel (E-commerce Expert)", "Payment Gateway Representative", "Successful Online Seller"],
    capacity: 120,
    registrationDeadline: "2024-11-26",
    contactInfo: "Tech Hub Ahmedabad, +91-6543210987",
    website: "https://techhubamd.gov.in",
  },
]

const schemes: Scheme[] = [
  {
    id: "1",
    name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    type: "central",
    description:
      "A flagship scheme to promote skill development and training for artisans and craftspeople across India.",
    benefits: [
      "Free skill training and certification",
      "Placement assistance after training",
      "Monthly stipend during training period",
      "Recognition of prior learning",
    ],
    eligibility: [
      "Indian citizens aged 15-59 years",
      "Artisans and craftspeople",
      "No formal educational qualification required",
      "Willing to undergo skill training",
    ],
    applicationProcess: [
      "Visit the official PMKVY portal (pmkvyofficial.org)",
      "Register and create an account",
      "Select your preferred skill and training center",
      "Complete the application form",
      "Submit required documents",
      "Attend the training program",
    ],
    deadline: "Ongoing",
    fundingAmount: "Up to ₹8,000 per trainee",
    contactInfo: "National Skill Development Corporation (NSDC)",
    website: "https://pmkvyofficial.org",
  },
  {
    id: "2",
    name: "Scheme for Promotion of Craft and Artisans (SPCA)",
    type: "central",
    description: "Supports traditional craftspeople through financial assistance and market linkage programs.",
    benefits: [
      "Financial assistance for raw materials",
      "Market linkage and export opportunities",
      "Training in modern techniques",
      "Subsidy on equipment purchase",
      "Access to credit at reduced interest rates",
    ],
    eligibility: [
      "Registered artisans and craftspeople",
      "Minimum 5 years of experience in craft",
      "Annual income below ₹5 lakhs",
      "Engaged in traditional crafts",
    ],
    applicationProcess: [
      "Contact your nearest District Industries Centre (DIC)",
      "Collect application form and guidelines",
      "Submit application with required documents",
      "Verification by DIC officials",
      "Approval and fund disbursement",
    ],
    deadline: "Ongoing",
    fundingAmount: "Up to ₹2 lakhs per artisan",
    contactInfo: "Ministry of Micro, Small and Medium Enterprises",
    website: "https://msme.gov.in",
  },
  {
    id: "3",
    name: "Rajasthan Artisan Welfare Scheme",
    type: "state",
    state: "Rajasthan",
    description: "State-specific scheme providing comprehensive support to artisans in Rajasthan.",
    benefits: [
      "Health insurance coverage",
      "Pension scheme for senior artisans",
      "Educational scholarships for children",
      "Interest-free loans for business expansion",
      "Free training in new techniques",
    ],
    eligibility: [
      "Permanent resident of Rajasthan",
      "Registered with Rajasthan Artisan Board",
      "Minimum 3 years of craft experience",
      "Age between 18-65 years",
    ],
    applicationProcess: [
      "Register with Rajasthan Artisan Board",
      "Collect scheme application form",
      "Submit with proof of residency and craft experience",
      "Verification by local authorities",
      "Approval and benefit disbursement",
    ],
    deadline: "Ongoing",
    fundingAmount: "Varies by benefit type",
    contactInfo: "Rajasthan Artisan Board, Jaipur",
    website: "https://rajasthan.gov.in",
  },
  {
    id: "4",
    name: "Uttar Pradesh Silk Weaver Scheme",
    type: "state",
    state: "Uttar Pradesh",
    description: "Dedicated support for silk weavers and textile artisans in Uttar Pradesh.",
    benefits: [
      "Subsidy on silk yarn purchase",
      "Equipment modernization grants",
      "Export promotion assistance",
      "Quality certification support",
      "Market access through government portals",
    ],
    eligibility: [
      "Registered silk weaver in UP",
      "Minimum 2 years of weaving experience",
      "Engaged in traditional silk weaving",
      "Annual turnover below ₹10 lakhs",
    ],
    applicationProcess: [
      "Contact Uttar Pradesh Textile Department",
      "Register as a silk weaver",
      "Submit application with business details",
      "Site inspection and verification",
      "Approval and subsidy disbursement",
    ],
    deadline: "Ongoing",
    fundingAmount: "Up to ₹3 lakhs per weaver",
    contactInfo: "UP Textile Department, Lucknow",
    website: "https://uptextiles.gov.in",
  },
  {
    id: "5",
    name: "Gujarat Handicraft Development Scheme",
    type: "state",
    state: "Gujarat",
    description: "Comprehensive support for handicraft artisans in Gujarat including training and market access.",
    benefits: [
      "Free skill development training",
      "Raw material subsidy",
      "Exhibition and trade fair participation support",
      "Digital marketing assistance",
      "Quality improvement grants",
    ],
    eligibility: [
      "Resident of Gujarat",
      "Engaged in traditional handicrafts",
      "Registered with Gujarat Handicraft Board",
      "Annual income below ₹6 lakhs",
    ],
    applicationProcess: [
      "Register with Gujarat Handicraft Board",
      "Collect application form from district office",
      "Submit with required documents",
      "Verification and assessment",
      "Approval and benefit disbursement",
    ],
    deadline: "Ongoing",
    fundingAmount: "Up to ₹2.5 lakhs per artisan",
    contactInfo: "Gujarat Handicraft Board, Ahmedabad",
    website: "https://gujarathandicraft.gov.in",
  },
  {
    id: "6",
    name: "Karnataka Artisan Empowerment Program",
    type: "state",
    state: "Karnataka",
    description: "Empowerment program for traditional artisans with focus on skill enhancement and market linkage.",
    benefits: [
      "Microfinance at 0% interest",
      "Business development training",
      "Online marketplace access",
      "Insurance coverage",
      "Cooperative formation support",
    ],
    eligibility: [
      "Karnataka resident",
      "Engaged in traditional crafts",
      "Age between 18-60 years",
      "Willing to form or join artisan cooperative",
    ],
    applicationProcess: [
      "Contact Karnataka Artisan Development Board",
      "Attend orientation program",
      "Submit application with craft details",
      "Group formation and cooperative registration",
      "Loan and benefit disbursement",
    ],
    deadline: "Ongoing",
    fundingAmount: "Up to ₹5 lakhs per group",
    contactInfo: "Karnataka Artisan Development Board, Bangalore",
    website: "https://karnataka.gov.in",
  },
  {
    id: "7",
    name: "Tamil Nadu Artisan Support Scheme",
    type: "state",
    state: "Tamil Nadu",
    description:
      "Support for traditional artisans in Tamil Nadu with focus on Tanjore painting, bronze work, and textiles.",
    benefits: [
      "Raw material subsidy",
      "Export market linkage",
      "Training in modern techniques",
      "Insurance and pension benefits",
      "Cooperative society formation support",
    ],
    eligibility: [
      "Tamil Nadu resident",
      "Engaged in traditional crafts",
      "Registered with Tamil Nadu Artisan Board",
      "Minimum 2 years experience",
    ],
    applicationProcess: [
      "Contact District Industries Centre",
      "Submit application with craft details",
      "Verification and assessment",
      "Approval and benefit disbursement",
    ],
    deadline: "Ongoing",
    fundingAmount: "Up to ₹2 lakhs per artisan",
    contactInfo: "Tamil Nadu Artisan Board, Chennai",
    website: "https://tamilnadu.gov.in",
  },
  {
    id: "8",
    name: "Telangana Handicraft Promotion Scheme",
    type: "state",
    state: "Telangana",
    description: "Promotion of traditional handicrafts including Bidri ware, lacquer work, and textile arts.",
    benefits: [
      "Financial assistance for equipment",
      "Market linkage and export support",
      "Training and skill development",
      "Quality certification assistance",
      "Online marketplace access",
    ],
    eligibility: [
      "Telangana resident",
      "Engaged in traditional handicrafts",
      "Annual income below ₹5 lakhs",
      "Registered with Telangana Handicraft Board",
    ],
    applicationProcess: [
      "Register with Telangana Handicraft Board",
      "Submit application with business details",
      "Verification by officials",
      "Approval and fund disbursement",
    ],
    deadline: "Ongoing",
    fundingAmount: "Up to ₹3 lakhs per artisan",
    contactInfo: "Telangana Handicraft Board, Hyderabad",
    website: "https://telangana.gov.in",
  },
  {
    id: "9",
    name: "Madhya Pradesh Artisan Welfare Scheme",
    type: "state",
    state: "Madhya Pradesh",
    description:
      "Comprehensive support for artisans in Madhya Pradesh engaged in textile printing, pottery, and metalwork.",
    benefits: [
      "Health insurance coverage",
      "Pension scheme for senior artisans",
      "Educational scholarships for children",
      "Interest-free loans",
      "Free training programs",
    ],
    eligibility: [
      "Madhya Pradesh resident",
      "Registered artisan",
      "Minimum 3 years experience",
      "Age between 18-65 years",
    ],
    applicationProcess: [
      "Contact District Industries Centre",
      "Collect application form",
      "Submit with required documents",
      "Verification and approval",
      "Benefit disbursement",
    ],
    deadline: "Ongoing",
    fundingAmount: "Varies by benefit type",
    contactInfo: "MP Artisan Board, Indore",
    website: "https://mpindustries.gov.in",
  },
  {
    id: "10",
    name: "Kerala Coir and Handicraft Scheme",
    type: "state",
    state: "Kerala",
    description: "Support for coir artisans and handicraft workers in Kerala with focus on eco-friendly products.",
    benefits: [
      "Raw material subsidy",
      "Equipment modernization grants",
      "Export promotion assistance",
      "Cooperative formation support",
      "Training in sustainable practices",
    ],
    eligibility: [
      "Kerala resident",
      "Engaged in coir or handicraft work",
      "Registered with Kerala Artisan Board",
      "Annual income below ₹4 lakhs",
    ],
    applicationProcess: [
      "Contact District Industries Centre",
      "Submit application with craft details",
      "Verification and assessment",
      "Approval and fund disbursement",
    ],
    deadline: "Ongoing",
    fundingAmount: "Up to ₹2.5 lakhs per artisan",
    contactInfo: "Kerala Artisan Board, Kochi",
    website: "https://kerala.gov.in",
  },
  {
    id: "11",
    name: "Jammu & Kashmir Artisan Development Scheme",
    type: "state",
    state: "Jammu & Kashmir",
    description: "Support for traditional artisans in J&K including papier-mâché, carpet weaving, and shawl making.",
    benefits: [
      "Financial assistance for raw materials",
      "Equipment modernization grants",
      "Export market linkage",
      "Training in modern techniques",
      "Quality certification support",
    ],
    eligibility: [
      "J&K resident",
      "Engaged in traditional crafts",
      "Registered with J&K Artisan Board",
      "Minimum 2 years experience",
    ],
    applicationProcess: [
      "Contact District Industries Centre",
      "Submit application with craft details",
      "Verification and assessment",
      "Approval and fund disbursement",
    ],
    deadline: "Ongoing",
    fundingAmount: "Up to ₹3 lakhs per artisan",
    contactInfo: "J&K Artisan Board, Srinagar",
    website: "https://jk.gov.in",
  },
  {
    id: "12",
    name: "West Bengal Artisan Support Scheme",
    type: "state",
    state: "West Bengal",
    description: "Support for traditional artisans in West Bengal engaged in terracotta, textiles, and metalwork.",
    benefits: [
      "Raw material subsidy",
      "Training and skill development",
      "Market linkage and export support",
      "Insurance and pension benefits",
      "Cooperative society formation support",
    ],
    eligibility: [
      "West Bengal resident",
      "Engaged in traditional crafts",
      "Registered with WB Artisan Board",
      "Annual income below ₹5 lakhs",
    ],
    applicationProcess: [
      "Contact District Industries Centre",
      "Submit application with craft details",
      "Verification and assessment",
      "Approval and benefit disbursement",
    ],
    deadline: "Ongoing",
    fundingAmount: "Up to ₹2 lakhs per artisan",
    contactInfo: "West Bengal Artisan Board, Kolkata",
    website: "https://westbengal.gov.in",
  },
  {
    id: "13",
    name: "Odisha Handicraft Development Scheme",
    type: "state",
    state: "Odisha",
    description:
      "Comprehensive support for handicraft artisans in Odisha including stone carving, brass work, and textiles.",
    benefits: [
      "Financial assistance for equipment",
      "Raw material subsidy",
      "Training and skill development",
      "Export promotion assistance",
      "Quality certification support",
    ],
    eligibility: [
      "Odisha resident",
      "Engaged in traditional handicrafts",
      "Registered with Odisha Handicraft Board",
      "Annual income below ₹5 lakhs",
    ],
    applicationProcess: [
      "Contact District Industries Centre",
      "Submit application with craft details",
      "Verification and assessment",
      "Approval and fund disbursement",
    ],
    deadline: "Ongoing",
    fundingAmount: "Up to ₹2.5 lakhs per artisan",
    contactInfo: "Odisha Handicraft Board, Bhubaneswar",
    website: "https://odisha.gov.in",
  },
  {
    id: "14",
    name: "Assam Artisan Empowerment Program",
    type: "state",
    state: "Assam",
    description: "Support for traditional artisans in Assam engaged in silk weaving, bamboo crafts, and pottery.",
    benefits: [
      "Microfinance at reduced interest rates",
      "Training and skill development",
      "Market linkage and export support",
      "Cooperative formation support",
      "Insurance coverage",
    ],
    eligibility: [
      "Assam resident",
      "Engaged in traditional crafts",
      "Registered with Assam Artisan Board",
      "Age between 18-60 years",
    ],
    applicationProcess: [
      "Contact District Industries Centre",
      "Submit application with craft details",
      "Group formation and cooperative registration",
      "Approval and loan disbursement",
    ],
    deadline: "Ongoing",
    fundingAmount: "Up to ₹4 lakhs per group",
    contactInfo: "Assam Artisan Board, Guwahati",
    website: "https://assam.gov.in",
  },
]

const states = [
  "Rajasthan",
  "Uttar Pradesh",
  "Gujarat",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Madhya Pradesh",
  "Kerala",
  "Jammu & Kashmir",
  "West Bengal",
  "Odisha",
  "Assam",
]

export default function SchemesPage() {
  const [expandedScheme, setExpandedScheme] = useState<string | null>(null)
  const [expandedTraining, setExpandedTraining] = useState<string | null>(null)
  const [expandedCamp, setExpandedCamp] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<"all" | "central" | "state">("all")
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"schemes" | "training" | "camps">("schemes")
  const [showAuth, setShowAuth] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const filteredSchemes = schemes.filter((scheme) => {
    if (filterType === "central") return scheme.type === "central"
    if (filterType === "state") {
      if (selectedState) return scheme.type === "state" && scheme.state === selectedState
      return scheme.type === "state"
    }
    return true
  })

  const filteredTraining = trainingSessions.filter((session) => {
    if (selectedState) return session.state === selectedState
    return true
  })

  const filteredCamps = awarenessCamps.filter((camp) => {
    if (selectedState) return camp.state === selectedState
    return true
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Government Schemes for Artisans</h1>
          <p className="text-lg text-muted-foreground">
            Explore schemes, training sessions, and awareness camps supporting traditional craftspeople
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="flex gap-2 mb-8 border-b border-border">
          {[
            { id: "schemes", label: "Government Schemes", icon: "📋" },
            { id: "training", label: "Training Sessions", icon: "🎓" },
            { id: "camps", label: "Awareness Camps", icon: "📢" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "schemes" | "training" | "camps")}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-card rounded-xl border border-border p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Filter by State</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedState(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedState === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              All States
            </button>
            {states.map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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

        {/* Schemes Tab */}
        {activeTab === "schemes" && (
          <>
            {/* Scheme Type Filter */}
            <div className="bg-card rounded-xl border border-border p-6 mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4">Scheme Type</h2>
              <div className="flex gap-2">
                {["all", "central", "state"].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFilterType(type as "all" | "central" | "state")
                      if (type !== "state") setSelectedState(null)
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                      filterType === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {type === "all" ? "All Schemes" : `${type} Schemes`}
                  </button>
                ))}
              </div>
            </div>

            {/* Schemes List */}
            <div className="space-y-4">
              {filteredSchemes.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No schemes found for the selected filters.</p>
                </div>
              ) : (
                filteredSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all"
                  >
                    {/* Scheme Header */}
                    <button
                      onClick={() => setExpandedScheme(expandedScheme === scheme.id ? null : scheme.id)}
                      className="w-full p-6 flex items-start justify-between hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-left flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              scheme.type === "central" ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
                            }`}
                          >
                            {scheme.type === "central" ? "Central Scheme" : `${scheme.state}`}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground">{scheme.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{scheme.description}</p>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                          expandedScheme === scheme.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Expanded Content */}
                    {expandedScheme === scheme.id && (
                      <div className="border-t border-border p-6 space-y-6 bg-muted/30">
                        {/* Benefits */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            Key Benefits
                          </h4>
                          <ul className="space-y-2">
                            {scheme.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Eligibility */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            Eligibility Criteria
                          </h4>
                          <ul className="space-y-2">
                            {scheme.eligibility.map((criterion, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                                <div className="h-2 w-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                                {criterion}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Application Process */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            How to Apply
                          </h4>
                          <ol className="space-y-2">
                            {scheme.applicationProcess.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                                <span className="font-semibold text-primary flex-shrink-0">{idx + 1}.</span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Additional Info */}
                        <div className="grid gap-4 md:grid-cols-3 pt-4 border-t border-border">
                          {scheme.fundingAmount && (
                            <div className="bg-background rounded-lg p-4">
                              <p className="text-xs text-muted-foreground mb-1">Funding Amount</p>
                              <p className="font-semibold text-foreground">{scheme.fundingAmount}</p>
                            </div>
                          )}
                          {scheme.deadline && (
                            <div className="bg-background rounded-lg p-4">
                              <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Deadline
                              </p>
                              <p className="font-semibold text-foreground">{scheme.deadline}</p>
                            </div>
                          )}
                          <div className="bg-background rounded-lg p-4">
                            <p className="text-xs text-muted-foreground mb-1">Contact</p>
                            <p className="font-semibold text-foreground text-sm">{scheme.contactInfo}</p>
                          </div>
                        </div>

                        {/* Action Button */}
                        {scheme.website && (
                          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                            Visit Official Website
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === "training" && (
          <div className="space-y-4">
            {filteredTraining.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No training sessions found for the selected state.</p>
              </div>
            ) : (
              filteredTraining.map((session) => (
                <div
                  key={session.id}
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all"
                >
                  <button
                    onClick={() => setExpandedTraining(expandedTraining === session.id ? null : session.id)}
                    className="w-full p-6 flex items-start justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                          {session.craft}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {session.enrolled}/{session.capacity} Enrolled
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{session.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{session.description}</p>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                        expandedTraining === session.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedTraining === session.id && (
                    <div className="border-t border-border p-6 space-y-6 bg-muted/30">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-background rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-1">Duration</p>
                          <p className="font-semibold text-foreground">{session.duration}</p>
                        </div>
                        <div className="bg-background rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-1">Instructor</p>
                          <p className="font-semibold text-foreground">{session.instructor}</p>
                        </div>
                        <div className="bg-background rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-1">Location</p>
                          <p className="font-semibold text-foreground">{session.location}</p>
                        </div>
                        <div className="bg-background rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-1">Fee</p>
                          <p className="font-semibold text-foreground">{session.fee}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Topics Covered</h4>
                        <ul className="space-y-2">
                          {session.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-border">
                        <div className="bg-background rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-1">Dates</p>
                          <p className="font-semibold text-foreground text-sm">
                            {new Date(session.startDate).toLocaleDateString()} -{" "}
                            {new Date(session.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="bg-background rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-1">Registration Deadline</p>
                          <p className="font-semibold text-foreground text-sm">
                            {new Date(session.registrationDeadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">Contact</p>
                        <p className="font-semibold text-foreground">{session.contactInfo}</p>
                      </div>

                      {session.website && (
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Register Now
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "camps" && (
          <div className="space-y-4">
            {filteredCamps.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No awareness camps found for the selected state.</p>
              </div>
            ) : (
              filteredCamps.map((camp) => (
                <div
                  key={camp.id}
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all"
                >
                  <button
                    onClick={() => setExpandedCamp(expandedCamp === camp.id ? null : camp.id)}
                    className="w-full p-6 flex items-start justify-between hover:bg-muted/50 transition-colors"
                  >
                    <div className="text-left flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          {camp.organizer}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{camp.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{camp.description}</p>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                        expandedCamp === camp.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedCamp === camp.id && (
                    <div className="border-t border-border p-6 space-y-6 bg-muted/30">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-background rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-1">Date & Time</p>
                          <p className="font-semibold text-foreground">{new Date(camp.date).toLocaleDateString()}</p>
                          <p className="text-sm text-foreground">{camp.time}</p>
                        </div>
                        <div className="bg-background rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-1">Location</p>
                          <p className="font-semibold text-foreground">{camp.location}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Topics to be Covered</h4>
                        <ul className="space-y-2">
                          {camp.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Guest Speakers</h4>
                        <ul className="space-y-2">
                          {camp.speakers.map((speaker, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                              <Users className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                              {speaker}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2 pt-4 border-t border-border">
                        <div className="bg-background rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                          <p className="font-semibold text-foreground">{camp.capacity} Participants</p>
                        </div>
                        <div className="bg-background rounded-lg p-4">
                          <p className="text-xs text-muted-foreground mb-1">Registration Deadline</p>
                          <p className="font-semibold text-foreground text-sm">
                            {new Date(camp.registrationDeadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-4">
                        <p className="text-xs text-muted-foreground mb-1">Contact</p>
                        <p className="font-semibold text-foreground">{camp.contactInfo}</p>
                      </div>

                      {camp.website && (
                        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Register for Camp
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-primary/5 rounded-xl border border-primary/20 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-4">
            For more information about government schemes, training sessions, and awareness camps for artisans, contact
            your nearest District Industries Centre (DIC) or visit the official government websites. Many programs offer
            free training and financial assistance to help you grow your craft business.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="font-semibold text-foreground mb-2">Central Government Resources</p>
              <p className="text-sm text-muted-foreground">Ministry of Micro, Small and Medium Enterprises (MSME)</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">State Government Support</p>
              <p className="text-sm text-muted-foreground">
                Contact your state's Industries Department or Artisan Board
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Training & Awareness</p>
              <p className="text-sm text-muted-foreground">
                Check regularly for new training sessions and awareness camps in your area
              </p>
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
