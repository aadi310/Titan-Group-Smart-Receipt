"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronRight,
  Receipt,
  Gift,
  Watch,
  Download,
  ExternalLink,
  FileText,
  History,
  Instagram,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Star,
  User2,
  ThumbsUp,
  Share2,
  Facebook,
  Sparkles,
  MapPin,
  ShoppingBagIcon,
  Utensils,
  Receipt as ReceiptIcon,
} from "lucide-react"

interface Receipt {
  id: string
  date: string
  time: string
  associate: string
  branch: string
  items: Array<{
    id: number
    name: string
    description: string
    price: number
    quantity: number
    category?: string
    taxApplicable?: boolean
    baseAmount?: number
    tax?: number
    itemCode?: string
    gender?: string
    strapMaterial?: string
    strapColor?: string
    warranty?: string
    skuId?: string
  }>
  subtotal: number
  tax: number
  total: number
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showTerms, setShowTerms] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [expandedProducts, setExpandedProducts] = useState<number[]>([])
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: string[] }>({})
  const [currentReceiptId, setCurrentReceiptId] = useState("current")
  const [showTransactionHistory, setShowTransactionHistory] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 })
  const [showReferModal, setShowReferModal] = useState(false)
  const [showStoreLocation, setShowStoreLocation] = useState(false)
  const receiptContainerRef = useRef<HTMLDivElement>(null)
const [selectedTags, setSelectedTags] = useState<string[]>([])
const [couponToast, setCouponToast] = useState(false)
  const [itemFeedback, setItemFeedback] = useState({})
const [expandedItemFeedback, setExpandedItemFeedback] = useState([])
  const [feedback, setFeedback] = useState({
    service: 0,
    quality: 0,
    style: 0,
    pricing: 0,
    store: 0,
    comments: "",
  })
  const [profile, setProfile] = useState({
    mobile: "",
    name: "",
    email: "",
    gender: "",
  })
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedbackText, setFeedbackText] = useState("")

  const copyCoupon = (code: string) => {
  navigator.clipboard.writeText(code)

  setCouponToast(true)

  setTimeout(() => {
    setCouponToast(false)
  }, 2000)
}

  const toggleItemFeedback = (id) => {
  setExpandedItemFeedback((prev) =>
    prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
  )
}

  const setItemRating = (itemId, rating) => {
  setItemFeedback((prev) => ({
    ...prev,
    [itemId]: {
      ...prev[itemId],
      rating,
    },
  }))
}

  const toggleItemTag = (itemId, tag) => {
  setItemFeedback((prev) => {
    const currentTags = prev[itemId]?.tags || []

    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag]

    return {
      ...prev,
      [itemId]: {
        ...prev[itemId],
        tags: newTags,
      },
    }
  })
}

  const customerName = "Alexis"

  // Carousel refs and APIs
  const [promoApi, setPromoApi] = useState<CarouselApi>()
  const feedbackButtonRef = useRef<HTMLButtonElement>(null)
  const historyButtonRef = useRef<HTMLButtonElement>(null)
  const referButtonRef = useRef<HTMLButtonElement>(null)

  // Auto-play effect for promo carousel
  useEffect(() => {
    if (!promoApi) return
    const interval = setInterval(() => {
      promoApi.scrollNext()
    }, 4000)
    return () => clearInterval(interval)
  }, [promoApi])

  useEffect(() => {
  setItemFeedback({})
  setExpandedItemFeedback([])
}, [currentReceiptId])

  // Simple auto-height for WordPress iframe
  useEffect(() => {
    const postHeight = () => {
      const marker = document.getElementById("height-marker")
      if (marker && window.parent) {
        const rect = marker.getBoundingClientRect()
        const newHeight = Math.ceil(rect.top + rect.height + window.scrollY)
        window.parent.postMessage({ frameHeight: newHeight }, "*")
      }
    }

    // Run on load
    postHeight()

    // Observe changes to the DOM
    const ro = new ResizeObserver(postHeight)
    ro.observe(document.body)

    // Re-run on resize
    window.addEventListener("resize", postHeight)

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", postHeight)
    }
  }, [])

  // Update current slide when carousel changes
  useEffect(() => {
    if (!promoApi) return
    promoApi.on("select", () => {
      setCurrentSlide(promoApi.selectedScrollSnap())
    })
  }, [promoApi])

 const receipts = {
  current: {
    id: "TITINDDEL78452",
    date: "05-03-2026",
    time: "19:22:18",
    associate: "Rohan Mehta",
    branch: "Titan World - Connaught Place",
    items: [
      {
        id: 0,
        name: "Titan Celestor 2.0 Smartwatch",
        description: "Premium smartwatch with fitness tracking, AMOLED display & Bluetooth calling",
        price: 10350.0,
        quantity: 1,
        category: "Smart Watches",
        taxApplicable: true,
        baseAmount: 8771.19,
        tax: 1578.81,
        itemCode: "SW248",
        gender: "Unisex",
        strapMaterial: "Silicone & Nylon",
        strapColor: "Blue",
        warranty: "12 Months",
        skuId: "90248AP02C",
      },
      {
        id: 1,
        name: "Titan Minimals Quartz Analog Watch",
        description: "Minimal black dial analog watch with premium metallic finish",
        price: 3595.0,
        quantity: 1,
        category: "Analog Watches",
        taxApplicable: true,
        baseAmount: 3046.61,
        tax: 548.39,
        itemCode: "AQ106",
        gender: "Men",
        strapMaterial: "Metal",
        strapColor: "Black",
        warranty: "24 Months",
        skuId: "NU1806NM01",
      },
      {
        id: 2,
        name: "Titan Men's Timeless Charm",
        description: "Classic leather strap watch designed for everyday elegance",
        price: 1795.0,
        quantity: 1,
        category: "Leather Watches",
        taxApplicable: true,
        baseAmount: 1521.19,
        tax: 273.81,
        itemCode: "LC229",
        gender: "Men",
        strapMaterial: "Leather",
        strapColor: "Brown",
        warranty: "24 Months",
        skuId: "NL1729SL02",
      },
    ],
    subtotal: 13339.0,
    tax: 2401.01,
    total: 15740.0,
  },

  hist1: {
    id: "TITINDMUM49381",
    date: "20-01-2026",
    time: "14:22:18",
    associate: "Ananya Kapoor",
    branch: "Titan World - Phoenix Mall",
    items: [
      {
        id: 0,
        name: "Titan Women's Lagan Chic",
        description: "Elegant white leather strap watch with contemporary styling",
        price: 1895.0,
        quantity: 1,
        category: "Women's Watches",
        taxApplicable: true,
        baseAmount: 1605.93,
        tax: 289.07,
        itemCode: "WL656",
        gender: "Women",
        strapMaterial: "Leather",
        strapColor: "White",
        warranty: "24 Months",
        skuId: "2656WL01",
      },
      {
        id: 1,
        name: "Titan AiRA Women Smartwatch",
        description: "Smartwatch with health tracking, notifications & rose gold finish",
        price: 6750.0,
        quantity: 1,
        category: "Smart Watches",
        taxApplicable: true,
        baseAmount: 5720.34,
        tax: 1029.66,
        itemCode: "SW416",
        gender: "Women",
        strapMaterial: "Silicone",
        strapColor: "Rose Gold",
        warranty: "12 Months",
        skuId: "95416KM01K",
      },
    ],
    subtotal: 7326.27,
    tax: 1318.73,
    total: 8645.0,
  },

  hist2: {
    id: "TITINDBLR28476",
    date: "15-12-2025",
    time: "12:45:33",
    associate: "Arjun Nair",
    branch: "Titan World - Orion Mall",
    items: [
      {
        id: 0,
        name: "Sonata Poze Quartz Analog",
        description: "Rose gold stainless steel watch with minimalist dial",
        price: 1495.0,
        quantity: 1,
        category: "Sonata Collection",
        taxApplicable: true,
        baseAmount: 1266.95,
        tax: 228.05,
        itemCode: "SZ087",
        gender: "Women",
        strapMaterial: "Stainless Steel",
        strapColor: "Rose Gold",
        warranty: "12 Months",
        skuId: "SP80087WM01",
      },
      {
        id: 1,
        name: "Fastrack UFO Quartz Watch",
        description: "Bold stainless steel analog watch with futuristic styling",
        price: 2495.0,
        quantity: 1,
        category: "Fastrack Watches",
        taxApplicable: true,
        baseAmount: 2114.41,
        tax: 380.59,
        itemCode: "FT327",
        gender: "Men",
        strapMaterial: "Stainless Steel",
        strapColor: "Silver",
        warranty: "24 Months",
        skuId: "3327SM01",
      },
    ],
    subtotal: 3381.36,
    tax: 608.64,
    total: 3990.0,
  },
};

const currentReceipt = receipts[currentReceiptId]

const totalSlides = 2

const transactionHistory = [
  {
    id: "current",
    date: "05-03-2026",
    branch: "Titan World",
    amount:
      currentReceiptId === "current"
        ? receipts.current.total
        : 15740.0,
  },
  {
    id: "hist1",
    date: "20-01-2026",
    branch: "Titan World",
    amount: 8645.0,
  },
  {
    id: "hist2",
    date: "15-12-2025",
    branch: "Titan World",
    amount: 3990.0,
  },
]
  
  const toggleProductExpansion = (productId: number) => {
    setExpandedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const handleProfileUpdate = () => {
    setProfileUpdateSuccess(true)
    setTimeout(() => setProfileUpdateSuccess(false), 3000)
  }

  const getModalPositionRelativeToContainer = (buttonRef: React.RefObject<HTMLButtonElement>) => {
    if (!buttonRef.current || !receiptContainerRef.current) {
      return { top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
    }

    const button = buttonRef.current
    const container = receiptContainerRef.current

    const buttonRect = button.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    // Calculate position relative to container
    const relativeTop = buttonRect.top - containerRect.top
    const relativeLeft = buttonRect.left - containerRect.left

    // Modal dimensions (approximate)
    const modalWidth = Math.min(400, containerRect.width - 32)
    const modalHeight = 400

    // Calculate ideal top position (above button, with offset)
    let top = Math.max(16, relativeTop - modalHeight - 8)

    // If modal would go off top, place it below button
    if (top < 16) {
      top = relativeTop + buttonRect.height + 8
    }

    // If still too high, center it vertically
    if (top + modalHeight > containerRect.height) {
      top = Math.max(16, (containerRect.height - modalHeight) / 2)
    }

    // Calculate ideal left position (centered on button)
    let left = relativeLeft + buttonRect.width / 2 - modalWidth / 2

    // Keep modal within horizontal bounds
    left = Math.max(16, Math.min(left, containerRect.width - modalWidth - 16))

    return {
      position: "absolute" as const,
      top: `${top}px`,
      left: `${left}px`,
      width: `${modalWidth}px`,
      maxHeight: "85vh",
    }
  }

  const handleFeedbackModalOpen = () => {
    setShowFeedbackModal(true)
  }

  const handleTransactionHistoryOpen = () => {
    setShowTransactionHistory(true)
  }

  const handleReferModalOpen = () => {
    setShowReferModal(true)
  }

  const handleFeedbackSubmit = () => {
    setFeedbackSubmitted(true)
    setShowFeedbackModal(false)
    setTimeout(() => setFeedbackSubmitted(false), 5000)
  }

  const handleShare = () => {
    handleReferModalOpen()
  }

  const handleEmailReceipt = () => {
    window.open(`mailto:?subject=Receipt from Grill'd Melbourne&body=Receipt ID: ${currentReceipt.id}`)
  }

  const handleDownloadReceipt = () => {
    const receiptContent = `
  <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Grill'd Digital Receipt</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
font-family:'Poppins',sans-serif;
font-size:14px;
color:#111;
background:#fff;
width:800px;
margin:0 auto;
padding:24px;
}

/* Header */

.receipt-header{
display:flex;
justify-content:space-between;
align-items:flex-start;
margin-bottom:28px;
padding-bottom:16px;
border-bottom:3px solid #E1251B;
}

.company-info h1{
font-size:30px;
color:#E1251B;
font-weight:700;
margin-bottom:4px;
}

.company-info p{
font-size:12px;
color:#555;
line-height:1.4;
}

.bill-info{
text-align:right;
font-size:12px;
}

.bill-info div{
margin-bottom:4px;
}

.bill-id{
font-weight:600;
color:#E1251B;
}

/* Guest section */

.customer-section{
background:#F7F3ED;
padding:14px;
border-left:4px solid #E1251B;
border-radius:0 8px 8px 0;
margin-bottom:22px;
}

.customer-section h3{
font-size:15px;
color:#E1251B;
font-weight:600;
margin-bottom:2px;
}

.customer-section p{
font-size:12px;
color:#666;
}

/* Table */

.items-table{
width:100%;
border-collapse:collapse;
margin-bottom:24px;
}

.items-table th{
background:#E1251B;
color:white;
padding:10px 8px;
text-align:left;
font-size:11px;
text-transform:uppercase;
letter-spacing:0.5px;
}

.items-table td{
padding:12px 8px;
border-bottom:1px solid #eee;
font-size:12px;
vertical-align:top;
}

.item-name{
font-weight:600;
margin-bottom:3px;
}

.item-desc{
font-size:11px;
color:#666;
}

.item-specs{
font-size:10px;
color:#E1251B;
margin-top:4px;
font-weight:600;
}

/* Totals */

.totals-section{
display:flex;
justify-content:space-between;
margin-bottom:20px;
}

.items-count{
font-weight:600;
}

.totals-table{
text-align:right;
min-width:200px;
}

.totals-table div{
margin-bottom:6px;
font-size:13px;
}

.net-total{
font-size:18px;
font-weight:700;
color:#E1251B;
border-top:2px solid #E1251B;
padding-top:6px;
margin-top:6px;
}

/* Footer */

.footer{
text-align:center;
margin-top:30px;
padding-top:20px;
border-top:1px dashed #ccc;
font-size:12px;
color:#555;
}

.footer strong{
color:#E1251B;
}

.powered{
margin-top:10px;
font-size:10px;
color:#999;
font-weight:600;
}

@media print{
body{
-webkit-print-color-adjust:exact;
width:100%;
padding:0;
}
}

</style>
</head>

<body>

<div class="receipt-header">

<div class="company-info">
<h1>Grill'd</h1>
<p>
<strong>Grill'd Healthy Burgers</strong><br>
Level 2, 2 Russell Street<br>
Melbourne VIC 3000, Australia<br>
Phone: +61 3 9975 5975
</p>
</div>

<div class="bill-info">
<div><strong>Receipt ID:</strong> <span class="bill-id">GRILLD-FLINDERS-98347219</span></div>
<div><strong>Date:</strong> 05-03-2026 19:22</div>
<div><strong>Team Member:</strong> Liam O’Connor</div>
</div>

</div>

<div class="customer-section">
<h3>Guest: ${customerName}</h3>
<p>Thanks for enjoying healthy burgers with us!</p>
</div>

<table class="items-table">

<thead>
<tr>
<th style="width:50%">Menu Item</th>
<th style="width:10%">Qty</th>
<th style="width:15%">Size</th>
<th style="width:12%">Price</th>
<th style="width:13%">Total</th>
</tr>
</thead>

<tbody>

<tr>
<td>
<div class="item-name">Simon Says Burger</div>
<div class="item-desc">Grass-fed beef, cheese, lettuce, tomato, pickles & herb mayo</div>
<div class="item-specs">Type: Beef Burger</div>
</td>
<td>1</td>
<td>Regular</td>
<td>$14.90</td>
<td><strong>$14.90</strong></td>
</tr>

<tr>
<td>
<div class="item-name">Sweet Potato Fries</div>
<div class="item-desc">Crispy sweet potato fries served with chipotle mayo</div>
<div class="item-specs">Side</div>
</td>
<td>1</td>
<td>Regular</td>
<td>$6.90</td>
<td><strong>$6.90</strong></td>
</tr>

<tr>
<td>
<div class="item-name">Blood Orange Soda</div>
<div class="item-desc">House soda with natural blood orange flavour</div>
<div class="item-specs">Drink</div>
</td>
<td>1</td>
<td>Regular</td>
<td>$4.50</td>
<td><strong>$4.50</strong></td>
</tr>

</tbody>
</table>

<div class="totals-section">

<div class="items-count">
Items Ordered: 3
</div>

<div class="totals-table">
<div>Subtotal: <strong>$23.91</strong></div>
<div>GST (10%): <strong>$2.39</strong></div>
<div class="net-total">Total: <strong>$26.30</strong></div>
</div>

</div>

<div class="footer">

<p><strong>Thanks for choosing Grill'd!</strong></p>
<p>Follow us on Instagram @grilldburgers or visit grilld.com.au</p>

<div class="powered">
Powered by RDEP
</div>

</div>

</body>
</html>
    `

    const blob = new Blob([receiptContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "Grilld_Receipt_SK251107001.html"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleWhatsApp = () => {
    window.open("https://wa.me/+919620921294", "_blank")
  }

  const handleCall = () => {
    window.open("tel:+919620921294", "_blank")
  }

  const handleEmail = () => {
    window.open("mailto:sagar.p@proenx.com", "_blank")
  }

  const handleSocialLink = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div
        id="receipt-root"
        ref={receiptContainerRef}
        className="w-full max-w-md mx-auto bg-white shadow-lg relative overflow-hidden"
      >
        <div className="flex flex-col w-full gap-3 pb-4 px-3">

          {/* Top Section */}
<div className="bg-white rounded-2xl shadow-md border border-[#E6E1EE] mt-4 mx-3 overflow-hidden">

  {/* Header */}
  <div className="bg-[#2E1A47] px-5 pt-5 pb-6 text-white relative overflow-hidden">

    {/* Background Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#3A2159] to-[#241238] opacity-90" />

    <div className="relative z-10">

      {/* Top Row */}
      <div className="flex items-start justify-between gap-4">

        {/* Titan Logo */}
        <div className="bg-white rounded-lg px-3 py-2 shadow-sm">
          <img
            src="/images/design-mode/titan-logo.svg"
            alt="Titan"
            className="h-6 w-auto object-contain"
          />
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-xl p-2 shadow-sm flex items-center justify-center">

          <img
            src="/images/design-mode/800px-QR_code_for_mobile_English_Wikipedia.svg.png"
            alt="QR Code"
            className="h-[52px] w-[52px] object-contain"
          />

        </div>

      </div>


      {/* Greeting */}
      <div className="mt-6">

        <div className="text-2xl font-semibold tracking-wide">
          Thank You {customerName}
        </div>

        <div className="text-sm text-white/75 mt-1">
          Your Titan purchase is confirmed
        </div>

      </div>


      {/* Amount Card */}
      <div className="mt-5 bg-[#221235] rounded-2xl p-5 flex justify-between items-center border border-white/10">

        <div>

          <div className="text-xs uppercase tracking-[0.2em] text-[#C8A96B]">
            Amount Paid
          </div>

          <div className="text-4xl font-bold mt-2">
            ₹{currentReceipt.total.toLocaleString("en-IN")}
          </div>

        </div>

        <div className="h-14 w-14 rounded-full bg-[#C8A96B]/15 border border-[#C8A96B]/20 flex items-center justify-center">

          <User2 className="h-7 w-7 text-[#C8A96B]" />

        </div>

      </div>

    </div>

  </div>


  {/* Receipt Metadata */}
  <div className="p-4 bg-white">

    <div className="bg-[#F7F5FA] rounded-xl border border-[#E6E1EE] p-4 space-y-3">

      {/* Receipt ID */}
      <div className="flex justify-between items-center gap-3">

        <span className="text-xs text-[#6B6475]">
          Receipt ID
        </span>

        <span className="text-sm font-semibold tracking-wide text-right text-[#1F1B24]">
          {currentReceipt.id}
        </span>

      </div>


      {/* Date & Time */}
      <div className="flex justify-between items-center gap-3">

        <span className="text-xs text-[#6B6475]">
          Date & Time
        </span>

        <span className="text-sm font-semibold text-right text-[#1F1B24]">
          {currentReceipt.date} • {currentReceipt.time}
        </span>

      </div>


      {/* Store */}
      <div className="flex justify-between items-center gap-3">

        <span className="text-xs text-[#6B6475]">
          Store
        </span>

        <span className="text-sm font-semibold text-right text-[#1F1B24]">
          {currentReceipt.branch}
        </span>

      </div>

    </div>

  </div>

</div>
          
          {/* Purchase Details */}
<div className="bg-white rounded-2xl shadow-md border border-[#E6E1EE] mt-4 mx-3 p-4">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">

    <h3 className="text-lg font-semibold flex items-center text-[#2E1A47]">

      <Watch className="mr-2 h-5 w-5" />

      Purchase Details

    </h3>

    <span className="text-xs font-medium border border-[#2E1A47] text-[#2E1A47] px-2 py-1 rounded-full bg-[#F7F5FA]">

      {currentReceipt.items.length} items

    </span>

  </div>


  {/* Items */}
  <div className="space-y-3">

    {currentReceipt.items.map((product) => (

      <div
        key={product.id}
        className="bg-[#F7F5FA] rounded-2xl p-4 border border-[#E6E1EE]"
      >

        {/* Product Header */}
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleProductExpansion(product.id)}
        >

          <div className="flex items-center flex-1">

            <ChevronRight
              className={`h-4 w-4 mr-3 text-[#2E1A47] transition-transform duration-200 ${
                expandedProducts.includes(product.id)
                  ? "rotate-90"
                  : ""
              }`}
            />

            <div>

              <div className="font-semibold text-sm text-[#1F1B24]">
                {product.name}
              </div>

              <div className="text-xs text-[#6B6475] mt-0.5">
                {product.category}
              </div>

            </div>

          </div>


          <div className="text-right">

            <div className="text-xs text-[#6B6475]">
              Qty {product.quantity}
            </div>

            <div className="font-semibold text-sm text-[#2E1A47] mt-1">
              ₹{(product.price * product.quantity).toLocaleString("en-IN")}
            </div>

          </div>

        </div>


        {/* Expanded Product Info */}
        {expandedProducts.includes(product.id) && (

          <div className="mt-4 pt-4 border-t border-[#DDD5EA]">

            {/* Description */}
            <div className="text-xs text-[#6B6475] leading-relaxed mb-4">
              {product.description}
            </div>


            {/* Specs */}
            <div className="grid grid-cols-2 gap-y-2 text-xs text-[#4A4453]">

              <div>
                <span className="text-[#6B6475]">
                  SKU:
                </span>{" "}
                <span className="font-medium">
                  {product.skuId}
                </span>
              </div>

              <div>
                <span className="text-[#6B6475]">
                  Gender:
                </span>{" "}
                <span className="font-medium">
                  {product.gender}
                </span>
              </div>

              <div>
                <span className="text-[#6B6475]">
                  Strap:
                </span>{" "}
                <span className="font-medium">
                  {product.strapMaterial}
                </span>
              </div>

              <div>
                <span className="text-[#6B6475]">
                  Color:
                </span>{" "}
                <span className="font-medium">
                  {product.strapColor}
                </span>
              </div>

              <div>
                <span className="text-[#6B6475]">
                  Warranty:
                </span>{" "}
                <span className="font-medium">
                  {product.warranty}
                </span>
              </div>

              <div>
                <span className="text-[#6B6475]">
                  GST:
                </span>{" "}
                <span className="font-medium">
                  ₹{product.tax?.toFixed(2)}
                </span>
              </div>

            </div>

          </div>

        )}


        {/* Item Feedback Toggle */}
        <div className="mt-4">

          <button
            onClick={() => toggleItemFeedback(product.id)}
            className="text-xs text-[#2E1A47] font-semibold"
          >

            {expandedItemFeedback.includes(product.id)
              ? "Hide product feedback"
              : "Rate this product"}

          </button>

        </div>


        {/* Item Feedback Panel */}
        {expandedItemFeedback.includes(product.id) && (

          <div className="mt-3 bg-white border border-[#E6E1EE] rounded-2xl p-4">

            {/* Rating */}
            <div className="flex justify-center gap-2 mb-4">

              {[1,2,3,4,5].map((star) => (

                <button
                  key={star}
                  onClick={() => setItemRating(product.id, star)}
                >

                  <Star
                    className={`h-5 w-5 transition-colors ${
                      star <= (itemFeedback[product.id]?.rating || 0)
                        ? "fill-[#C8A96B] text-[#C8A96B]"
                        : "text-gray-300"
                    }`}
                  />

                </button>

              ))}

            </div>


            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center">

              {[
                "Design",
                "Comfort",
                "Premium Feel",
                "Value",
                "Features",
              ].map((tag) => {

                const active =
                  itemFeedback[product.id]?.tags?.includes(tag)

                return (

                  <button
                    key={tag}
                    onClick={() => toggleItemTag(product.id, tag)}
                    className={`text-[11px] px-3 py-1.5 rounded-full border transition-colors ${
                      active
                        ? "bg-[#2E1A47] text-white border-[#2E1A47]"
                        : "border-[#DDD5EA] text-[#6B6475] bg-[#F7F5FA]"
                    }`}
                  >

                    {tag}

                  </button>

                )

              })}

            </div>

          </div>

        )}

      </div>

    ))}

  </div>


  {/* Totals */}
  <div className="mt-5 pt-4 border-t border-[#E6E1EE] space-y-3 text-sm">

    <div className="flex justify-between">

      <span className="text-[#6B6475]">
        Subtotal
      </span>

      <span className="font-medium text-[#1F1B24]">
        ₹{currentReceipt.subtotal.toLocaleString("en-IN")}
      </span>

    </div>


    <div className="flex justify-between">

      <span className="text-[#6B6475]">
        GST
      </span>

      <span className="font-medium text-[#1F1B24]">
        ₹{currentReceipt.tax.toLocaleString("en-IN")}
      </span>

    </div>


    <div className="flex justify-between text-base font-semibold pt-3 border-t border-[#E6E1EE]">

      <span className="text-[#1F1B24]">
        Total Paid
      </span>

      <span className="text-[#2E1A47]">
        ₹{currentReceipt.total.toLocaleString("en-IN")}
      </span>

    </div>

  </div>


  {/* Payment */}
  <div className="mt-5">

    <div className="bg-[#F7F5FA] border border-[#E6E1EE] rounded-2xl p-4 flex items-center justify-between">

      <div className="flex items-center">

        <div className="w-10 h-10 bg-[#2E1A47] rounded-xl flex items-center justify-center mr-3">

          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >

            <rect
              x="1"
              y="4"
              width="22"
              height="16"
              rx="2"
              ry="2"
            />

            <line
              x1="1"
              y1="10"
              x2="23"
              y2="10"
            />

          </svg>

        </div>


        <div>

          <div className="text-sm font-semibold text-[#1F1B24]">
            Card Payment
          </div>

          <div className="text-xs text-[#6B6475] mt-0.5">
            Visa •••• 4532
          </div>

        </div>

      </div>


      <div className="text-sm font-semibold text-[#2E1A47]">

        ₹{currentReceipt.total.toLocaleString("en-IN")}

      </div>

    </div>

  </div>

</div>

          {/* Feedback Section */}
<div className="bg-white rounded-2xl border border-[#E6E1EE] shadow-md mx-3 mt-4 p-4">

  {feedbackSubmitted ? (

    <div className="text-center py-6 bg-[#F7F5FA] rounded-2xl border border-[#E6E1EE]">

      {/* Success Icon */}
      <div className="w-14 h-14 bg-[#2E1A47] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">

        <svg
          className="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M5 13l4 4L19 7"
          />

        </svg>

      </div>


      {/* Text */}
      <div className="text-base font-semibold text-[#1F1B24] mb-1">

        Thank you for your feedback

      </div>

      <div className="text-sm text-[#6B6475] leading-relaxed px-5">

        Your feedback helps Titan improve every shopping and ownership experience.

      </div>

    </div>

  ) : (

    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center">

          {/* Icon */}
          <div className="bg-[#2E1A47] p-2.5 rounded-xl mr-3 shadow-sm">

            <Star className="w-4 h-4 text-[#C8A96B] fill-[#C8A96B]" />

          </div>


          {/* Title */}
          <div>

            <h3 className="text-base font-semibold text-[#1F1B24]">

              Rate Your Experience

            </h3>

          </div>

        </div>


        {/* Badge */}
        <span className="text-[10px] font-semibold text-[#2E1A47] bg-[#F7F5FA] border border-[#DDD5EA] px-2.5 py-1 rounded-full">

          FEEDBACK

        </span>

      </div>


      {/* Star Rating */}
      <div className="flex justify-center gap-3 py-2">

        {[1,2,3,4,5].map((star) => (

          <button
            key={star}
            onClick={() => {
              setRating(star)
              setSelectedTags([])
            }}
            className="transition-transform active:scale-90"
          >

            <Star
              className={`h-9 w-9 transition-colors ${
                star <= rating
                  ? "fill-[#C8A96B] text-[#C8A96B]"
                  : "text-[#DDD5EA]"
              }`}
            />

          </button>

        ))}

      </div>


      {/* Dynamic Tags */}
      {rating > 0 && (

        <div className="space-y-3">

          <div className="text-[11px] font-semibold text-[#6B6475] uppercase tracking-wide">

            Tell us more about your experience

          </div>


          <div className="flex flex-wrap gap-2">

            {(rating >= 4
              ? [
                  "Premium Design",
                  "Excellent Service",
                  "Product Quality",
                  "Value for Money",
                  "Store Experience",
                  "Fast Billing",
                ]
              : [
                  "Product Availability",
                  "Service Experience",
                  "Waiting Time",
                  "Pricing",
                  "Store Assistance",
                  "Checkout Experience",
                ]
            ).map((item) => (

              <button
                key={item}
                onClick={() =>
                  setSelectedTags((prev) =>
                    prev.includes(item)
                      ? prev.filter((tag) => tag !== item)
                      : [...prev, item]
                  )
                }
                className={`text-[11px] px-3 py-1.5 rounded-full border transition-all ${
                  selectedTags.includes(item)
                    ? "bg-[#2E1A47] text-white border-[#2E1A47]"
                    : "border-[#DDD5EA] bg-[#F7F5FA] text-[#6B6475]"
                }`}
              >

                {item}

              </button>

            ))}

          </div>

        </div>

      )}


      {/* Comment */}
      <div className="space-y-1.5">

        <label className="text-[11px] font-semibold text-[#6B6475] uppercase tracking-wide">

          Additional Feedback

        </label>

        <textarea
          rows={3}
          placeholder="Share your experience with Titan"
          className="w-full p-3 text-sm border border-[#DDD5EA] rounded-2xl bg-white focus:ring-1 focus:ring-[#2E1A47] focus:border-[#2E1A47] outline-none resize-none transition"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        />

      </div>


      {/* Submit */}
      <button
        className={`w-full h-11 text-sm font-semibold rounded-2xl transition active:scale-[0.98] ${
          rating
            ? "bg-[#2E1A47] text-white hover:opacity-95"
            : "bg-[#ECE8F3] text-[#9B94A8] cursor-not-allowed"
        }`}
        onClick={handleFeedbackSubmit}
        disabled={!rating}
      >

        Submit Feedback

      </button>


      {/* Footer */}
      <p className="text-[10px] text-center text-[#6B6475] leading-relaxed px-4">

        Your feedback helps us enhance every Titan experience across stores and digital channels.

      </p>

    </div>

  )}

</div>
          
          {/* Promo Banner Carousel */}
<div className="bg-white rounded-2xl border border-[#E6E1EE] shadow-md overflow-hidden mx-3 mt-4 relative">

  <Carousel
    className="w-full"
    setApi={setPromoApi}
    opts={{
      loop: true,
    }}
  >

    <CarouselContent>

      {/* Banner 1 */}
      <CarouselItem>

        <a
          href="https://www.titan.co.in/shop/titan-sale?lang=en_IN"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >

          <div className="relative w-full aspect-[3/1] bg-[#1E102E] overflow-hidden">

            <img
              src="/images/design-mode/titan-banner-1.webp"
              alt="Titan Sale"
              className="w-full h-full object-cover"
            />

          </div>

        </a>

      </CarouselItem>


      {/* Banner 2 */}
      <CarouselItem>

        <a
          href="https://www.titan.co.in/divers-clp.html?lang=en_IN"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >

          <div className="relative w-full aspect-[3/1] bg-[#1E102E] overflow-hidden">

            <img
              src="/images/design-mode/titan-banner-2.webp"
              alt="Titan Divers Collection"
              className="w-full h-full object-cover"
            />

          </div>

        </a>

      </CarouselItem>


      {/* Banner 3 */}
      <CarouselItem>

        <a
          href="https://www.titan.co.in/shop/raga-watches-on-sale?lang=en_IN"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full"
        >

          <div className="relative w-full aspect-[3/1] bg-[#1E102E] overflow-hidden">

            <img
              src="/images/design-mode/titan-banner-3.webp"
              alt="Titan Raga Sale"
              className="w-full h-full object-cover"
            />

          </div>

        </a>

      </CarouselItem>

    </CarouselContent>


    {/* Pagination Dots */}
    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">

      {[0, 1, 2].map((index) => (

        <button
          key={index}
          onClick={() => promoApi?.scrollTo(index)}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            currentSlide === index
              ? "w-5 bg-white"
              : "w-1.5 bg-white/50"
          }`}
        />

      ))}

    </div>

  </Carousel>

</div>

          {/* Rewards Loyalty Section */}
<div className="bg-white rounded-2xl shadow-md border border-[#E6E1EE] mt-4 mx-3 overflow-hidden">

  {/* Banner */}
<div className="relative bg-[#1E102E]">

  <img
    src="/images/design-mode/Titan-sbi-1400.jpg"
    alt="Titan Encircle"
    className="w-full h-auto object-contain"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#1E102E]/90 via-[#1E102E]/30 to-transparent" />

  {/* Text Content */}
  <div className="absolute bottom-4 left-4 right-4 text-white">

    <div className="flex items-center gap-2 mb-2">

      <div className="bg-white/15 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em]">

        Titan Loyalty

      </div>

    </div>

    <div className="text-2xl font-semibold leading-tight">
      Titan Encircle
    </div>

  </div>

</div>

  <div className="p-4">

    {/* Points Overview */}
    <div className="grid grid-cols-3 gap-3 mb-4">

      <div className="bg-[#F7F5FA] rounded-2xl p-3 text-center border border-[#E6E1EE]">

        <div className="text-xl font-semibold text-[#2E1A47]">
          +780
        </div>

        <div className="text-[11px] text-[#6B6475] mt-1">
          Earned Today
        </div>

      </div>


      <div className="bg-[#F7F5FA] rounded-2xl p-3 text-center border border-[#E6E1EE]">

        <div className="text-xl font-semibold text-[#2E1A47]">
          12,450
        </div>

        <div className="text-[11px] text-[#6B6475] mt-1">
          Encircle Points
        </div>

      </div>


      <div className="bg-[#F7F5FA] rounded-2xl p-3 text-center border border-[#E6E1EE]">

        <div className="text-lg font-semibold text-[#2E1A47]">
          Gold
        </div>

        <div className="text-[11px] text-[#6B6475] mt-1">
          Current Tier
        </div>

      </div>

    </div>


    {/* Progress */}
    <div className="bg-[#F7F5FA] rounded-2xl p-4 border border-[#E6E1EE]">

      <div className="flex justify-between text-xs text-[#6B6475] mb-2">

        <span>
          Tier Progress
        </span>

        <span>
          12,450 / 15,000 pts
        </span>

      </div>


      <div className="w-full h-3 bg-[#DDD5EA] rounded-full overflow-hidden">

        <div
          className="h-full bg-gradient-to-r from-[#C8A96B] to-[#A3844E] rounded-full"
          style={{ width: "83%" }}
        />

      </div>


      <div className="text-xs text-[#6B6475] mt-3 leading-relaxed">

        Only{" "}

        <span className="font-semibold text-[#2E1A47]">
          2,550 points
        </span>

        {" "}away from unlocking Platinum privileges and exclusive partner rewards.

      </div>

    </div>


    {/* Reward Journey */}
    <div className="mt-5">

      <div className="text-sm font-semibold text-[#1F1B24] mb-3">

        Your Encircle Journey

      </div>


      <div className="flex items-center justify-between text-center text-[11px]">

        {/* Silver */}
        <div className="flex flex-col items-center">

          <div className="w-9 h-9 rounded-full bg-[#2E1A47] text-white flex items-center justify-center font-semibold">
            ✓
          </div>

          <div className="mt-2 text-[#6B6475]">
            Silver
          </div>

        </div>


        <div className="flex-1 h-[2px] bg-[#DDD5EA] mx-2" />


        {/* Gold */}
        <div className="flex flex-col items-center">

          <div className="w-9 h-9 rounded-full bg-[#C8A96B] text-white flex items-center justify-center font-semibold">
            ✓
          </div>

          <div className="mt-2 text-[#6B6475]">
            Gold
          </div>

        </div>


        <div className="flex-1 h-[2px] bg-[#DDD5EA] mx-2" />


        {/* Platinum */}
        <div className="flex flex-col items-center">

          <div className="w-9 h-9 rounded-full border-2 border-[#2E1A47] text-[#2E1A47] flex items-center justify-center font-semibold">

            ★

          </div>

          <div className="mt-2 text-[#6B6475]">
            Platinum
          </div>

        </div>

      </div>

    </div>


    {/* Benefits */}
    <div className="mt-5 bg-[#F7F5FA] rounded-2xl border border-[#E6E1EE] p-4">

      <div className="text-sm font-semibold text-[#1F1B24] mb-3">

        Member Benefits

      </div>


      <div className="space-y-2 text-xs text-[#6B6475]">

        <div className="flex items-start gap-2">

          <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] mt-1.5" />

          <span>
            Earn points across Titan, Fastrack, Helios, Tanishq & partner brands
          </span>

        </div>


        <div className="flex items-start gap-2">

          <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] mt-1.5" />

          <span>
            Unlock exclusive shopping offers and concierge experiences
          </span>

        </div>


        <div className="flex items-start gap-2">

          <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96B] mt-1.5" />

          <span>
            Refer friends and earn bonus rewards on successful referrals
          </span>

        </div>

      </div>

    </div>


    {/* CTA */}
    <div className="mt-5">

      <a
        href="https://www.titanencircle.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-[#2E1A47] text-white rounded-2xl py-3 text-sm font-medium hover:opacity-95 transition"
      >

        Explore Titan Encircle

      </a>

    </div>

  </div>

</div>
          

          {/* Join Titan Encircle Section */}
<div className="bg-white rounded-2xl border border-[#E6E1EE] shadow-md mx-3 mt-4 p-4">

  {profileUpdateSuccess ? (

    <div className="text-center py-5 bg-[#F7F5FA] rounded-2xl border border-[#E6E1EE]">

      {/* Success Icon */}
      <div className="w-14 h-14 bg-[#2E1A47] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">

        <svg
          className="w-7 h-7 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M5 13l4 4L19 7"
          />

        </svg>

      </div>


      {/* Success Text */}
      <div className="text-base font-semibold text-[#1F1B24] mb-1">

        Welcome to Titan Encircle

      </div>

      <div className="text-sm text-[#6B6475] leading-relaxed px-4">

        Reward points from this purchase have been added to your Encircle membership account.

      </div>


      {/* Badge */}
      <div className="mt-4 inline-flex items-center gap-2 bg-[#2E1A47] text-white text-xs font-medium px-3 py-1.5 rounded-full">

        <span className="w-2 h-2 rounded-full bg-[#C8A96B]" />

        +780 Encircle Points Added

      </div>

    </div>

  ) : (

    <>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">

        <div className="flex items-start">

          {/* Icon */}
          <div className="bg-[#2E1A47] p-2.5 rounded-xl mr-3 shadow-sm">

            <User2 className="h-4 w-4 text-white" />

          </div>


          {/* Text */}
          <div>

            <div className="text-base font-semibold text-[#1F1B24]">

              Join Titan Encircle

            </div>


          </div>

        </div>


        {/* Points Badge */}
        <span className="text-[10px] font-semibold bg-[#C8A96B] text-white px-2.5 py-1 rounded-full whitespace-nowrap">

          +780 pts

        </span>

      </div>



      {/* Form */}
      <div className="space-y-3">

        {/* Full Name */}
        <div className="space-y-1.5">

          <label className="text-[11px] font-semibold text-[#6B6475] uppercase tracking-wide">

            Full Name

          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={profile.name}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className="w-full h-11 px-4 text-sm border border-[#DDD5EA] rounded-xl bg-white focus:outline-none focus:border-[#2E1A47] transition-colors"
          />

        </div>


        {/* Email */}
        <div className="space-y-1.5">

          <label className="text-[11px] font-semibold text-[#6B6475] uppercase tracking-wide">

            Email Address

          </label>

          <input
            type="email"
            placeholder="name@example.com"
            value={profile.email}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            className="w-full h-11 px-4 text-sm border border-[#DDD5EA] rounded-xl bg-white focus:outline-none focus:border-[#2E1A47] transition-colors"
          />

        </div>


        {/* Mobile */}
        <div className="space-y-1.5">

          <label className="text-[11px] font-semibold text-[#6B6475] uppercase tracking-wide">

            Mobile Number

          </label>

          <input
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={profile.mobile}
            onChange={(e) =>
              setProfile((prev) => ({
                ...prev,
                mobile: e.target.value,
              }))
            }
            className="w-full h-11 px-4 text-sm border border-[#DDD5EA] rounded-xl bg-white focus:outline-none focus:border-[#2E1A47] transition-colors"
          />

        </div>

      </div>


      {/* CTA */}
      <button
        className="w-full mt-5 bg-[#2E1A47] text-white h-12 text-sm font-semibold rounded-2xl shadow-sm transition active:scale-[0.98] hover:opacity-95"
        onClick={handleProfileUpdate}
      >

        Join Titan Encircle

      </button>


      {/* Footer Text */}
      <div className="text-[10px] text-[#6B6475] text-center leading-relaxed mt-3 px-2">

        By joining Titan Encircle, you agree to receive loyalty benefits, exclusive offers and member communications.

      </div>

    </>

  )}

</div>
          
         {/* Personalized Offers Section */}
<div className="bg-white rounded-2xl border border-[#E6E1EE] shadow-md mx-3 mt-4 p-4">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">

    <div className="flex items-center">

      {/* Icon */}
      <div className="bg-[#2E1A47] p-2.5 rounded-xl mr-3 shadow-sm">

        <Sparkles className="h-4 w-4 text-[#C8A96B]" />

      </div>


      {/* Title */}
      <div>

        <h3 className="text-base font-semibold text-[#1F1B24]">

          Personalized Offers

        </h3>

        <div className="text-xs text-[#6B6475] mt-0.5">

          Just for Titan Encircle members

        </div>

      </div>

    </div>


    {/* Badge */}
    <span className="text-[10px] font-semibold text-[#2E1A47] bg-[#F7F5FA] border border-[#DDD5EA] px-2.5 py-1 rounded-full">

      EXCLUSIVE

    </span>

  </div>


  {/* Inline Toast */}
  {couponToast && (

    <div className="mb-3 text-center text-xs text-[#2E1A47] bg-[#F7F5FA] border border-[#DDD5EA] rounded-xl py-2">

      ✓ Offer code copied

    </div>

  )}


  {/* Offer Cards */}
  <div className="space-y-3">

    {/* Offer 1 */}
    <button
      onClick={() => copyCoupon("ENCIRCLE750")}
      className="w-full bg-[#F7F5FA] border border-[#E6E1EE] rounded-2xl p-4 text-left active:scale-[0.99] transition"
    >

      <div className="flex items-start justify-between gap-3">

        <div>

          <h4 className="text-sm font-semibold text-[#1F1B24]">

            ₹750 Off on Premium Watches

          </h4>

          <p className="text-[11px] text-[#6B6475] mt-1 leading-relaxed">

            Applicable on selected Titan and Edge collections above ₹9,999.

          </p>


          <div className="mt-3 inline-flex items-center bg-white border border-[#DDD5EA] rounded-lg px-2.5 py-1">

            <span className="text-[10px] text-[#6B6475] mr-1">
              Code:
            </span>

            <span className="text-[11px] font-bold tracking-wide text-[#2E1A47]">
              ENCIRCLE750
            </span>

          </div>

        </div>


        <div className="w-11 h-11 rounded-xl bg-[#2E1A47]/10 flex items-center justify-center flex-shrink-0">

          <Watch className="w-5 h-5 text-[#2E1A47]" />

        </div>

      </div>

    </button>


    {/* Offer 2 */}
    <button
      onClick={() => copyCoupon("AIRA500")}
      className="w-full bg-[#F7F5FA] border border-[#E6E1EE] rounded-2xl p-4 text-left active:scale-[0.99] transition"
    >

      <div className="flex items-start justify-between gap-3">

        <div>

          <h4 className="text-sm font-semibold text-[#1F1B24]">

            Complimentary Smartwatch Strap

          </h4>

          <p className="text-[11px] text-[#6B6475] mt-1 leading-relaxed">

            Receive an additional strap on selected Titan smartwatches.

          </p>


          <div className="mt-3 inline-flex items-center bg-white border border-[#DDD5EA] rounded-lg px-2.5 py-1">

            <span className="text-[10px] text-[#6B6475] mr-1">
              Code:
            </span>

            <span className="text-[11px] font-bold tracking-wide text-[#2E1A47]">
              AIRA500
            </span>

          </div>

        </div>


        <div className="w-11 h-11 rounded-xl bg-[#C8A96B]/15 flex items-center justify-center flex-shrink-0">

          <Gift className="w-5 h-5 text-[#C8A96B]" />

        </div>

      </div>

    </button>


    {/* Offer 3 */}
    <button
      onClick={() => copyCoupon("HELIOS15")}
      className="w-full bg-[#F7F5FA] border border-[#E6E1EE] rounded-2xl p-4 text-left active:scale-[0.99] transition"
    >

      <div className="flex items-start justify-between gap-3">

        <div>

          <h4 className="text-sm font-semibold text-[#1F1B24]">

            Extra 15% Off at Helios

          </h4>

          <p className="text-[11px] text-[#6B6475] mt-1 leading-relaxed">

            Exclusive partner benefit for Titan Encircle members.

          </p>


          <div className="mt-3 inline-flex items-center bg-white border border-[#DDD5EA] rounded-lg px-2.5 py-1">

            <span className="text-[10px] text-[#6B6475] mr-1">
              Code:
            </span>

            <span className="text-[11px] font-bold tracking-wide text-[#2E1A47]">
              HELIOS15
            </span>

          </div>

        </div>


        <div className="w-11 h-11 rounded-xl bg-[#2E1A47]/10 flex items-center justify-center flex-shrink-0">

          <Sparkles className="w-5 h-5 text-[#2E1A47]" />

        </div>

      </div>

    </button>

  </div>


  {/* CTA */}
  <a
    href="https://www.titanencircle.com/"
    target="_blank"
    rel="noopener noreferrer"
  >

    <button className="w-full mt-5 bg-[#2E1A47] text-white h-11 text-sm font-semibold rounded-2xl transition active:scale-[0.98] hover:opacity-95">

      Explore Member Benefits

    </button>

  </a>


  {/* Footer */}
  <p className="mt-3 text-[10px] text-center text-[#6B6475] leading-relaxed px-4">

    Personalized benefits may vary based on membership tier, brand and purchase history.

  </p>

</div>

          {/* Receipt Actions */}
<div className="bg-white rounded-2xl border border-[#E6E1EE] shadow-md mx-3 mt-4 p-4">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">

    <div className="flex items-center">

      <div className="bg-[#2E1A47] p-2.5 rounded-xl mr-3 shadow-sm">

        <Receipt className="h-4 w-4 text-[#C8A96B]" />

      </div>

      <div>

        <h3 className="text-sm font-semibold text-[#1F1B24]">

          Receipt Actions

        </h3>

        <div className="text-[11px] text-[#6B6475] mt-0.5">

          Access and manage your purchase receipt

        </div>

      </div>

    </div>

  </div>


  {/* Actions Grid */}
  <div className="grid grid-cols-3 gap-3">

    {/* History */}
    <button
      ref={historyButtonRef}
      onClick={handleTransactionHistoryOpen}
      className="flex flex-col items-center justify-center bg-[#F7F5FA] border border-[#E6E1EE] rounded-2xl py-4 active:scale-[0.98] transition"
    >

      <div className="w-10 h-10 rounded-xl bg-[#2E1A47]/10 flex items-center justify-center mb-2">

        <History className="h-5 w-5 text-[#2E1A47]" />

      </div>

      <span className="text-[11px] font-medium text-[#1F1B24]">

        History

      </span>

    </button>


    {/* Email */}
    <button
      onClick={handleEmailReceipt}
      className="flex flex-col items-center justify-center bg-[#F7F5FA] border border-[#E6E1EE] rounded-2xl py-4 active:scale-[0.98] transition"
    >

      <div className="w-10 h-10 rounded-xl bg-[#2E1A47]/10 flex items-center justify-center mb-2">

        <Mail className="h-5 w-5 text-[#2E1A47]" />

      </div>

      <span className="text-[11px] font-medium text-[#1F1B24]">

        Email

      </span>

    </button>


    {/* Download */}
    <button
      onClick={handleDownloadReceipt}
      className="flex flex-col items-center justify-center bg-[#F7F5FA] border border-[#E6E1EE] rounded-2xl py-4 active:scale-[0.98] transition"
    >

      <div className="w-10 h-10 rounded-xl bg-[#2E1A47]/10 flex items-center justify-center mb-2">

        <Download className="h-5 w-5 text-[#2E1A47]" />

      </div>

      <span className="text-[11px] font-medium text-[#1F1B24]">

        Download

      </span>

    </button>

  </div>

</div>



{/* Need Help Section */}
<div className="bg-white rounded-2xl border border-[#E6E1EE] shadow-md mx-3 mt-4 p-4">

  {/* Header */}
  <div className="flex items-center justify-between mb-4">

    <div className="flex items-center">

      {/* Icon */}
      <div className="bg-[#2E1A47] p-2.5 rounded-xl mr-3 shadow-sm">

        <Headphones className="h-4 w-4 text-[#C8A96B]" />

      </div>


      {/* Title */}
      <div>

        <h3 className="text-sm font-semibold text-[#1F1B24]">

          Customer Support

        </h3>

        <div className="text-[11px] text-[#6B6475] mt-0.5">

          Connect with Titan support anytime

        </div>

      </div>

    </div>


    {/* Badge */}
    <span className="text-[10px] font-semibold text-[#2E1A47] bg-[#F7F5FA] border border-[#DDD5EA] px-2 py-1 rounded-full">

      24×7 HELP

    </span>

  </div>


  {/* Support Options */}
  <div className="grid grid-cols-3 gap-3">

    {/* Chat */}
    <button
      onClick={handleWhatsApp}
      className="flex flex-col items-center justify-center bg-[#F7F5FA] border border-[#E6E1EE] rounded-2xl py-4 active:scale-[0.98] transition"
    >

      <div className="w-10 h-10 rounded-xl bg-[#2E1A47]/10 flex items-center justify-center mb-2">

        <MessageSquare className="h-5 w-5 text-[#2E1A47]" />

      </div>

      <span className="text-[11px] font-medium text-[#1F1B24]">

        Chat

      </span>

    </button>


    {/* Call */}
    <button
      onClick={handleCall}
      className="flex flex-col items-center justify-center bg-[#F7F5FA] border border-[#E6E1EE] rounded-2xl py-4 active:scale-[0.98] transition"
    >

      <div className="w-10 h-10 rounded-xl bg-[#2E1A47]/10 flex items-center justify-center mb-2">

        <Phone className="h-5 w-5 text-[#2E1A47]" />

      </div>

      <span className="text-[11px] font-medium text-[#1F1B24]">

        Call

      </span>

    </button>


    {/* Email */}
    <button
      onClick={handleEmail}
      className="flex flex-col items-center justify-center bg-[#F7F5FA] border border-[#E6E1EE] rounded-2xl py-4 active:scale-[0.98] transition"
    >

      <div className="w-10 h-10 rounded-xl bg-[#2E1A47]/10 flex items-center justify-center mb-2">

        <Mail className="h-5 w-5 text-[#2E1A47]" />

      </div>

      <span className="text-[11px] font-medium text-[#1F1B24]">

        Email

      </span>

    </button>

  </div>

</div>
          
      {/* Social Media & Store Details */}
<div className="bg-white rounded-2xl border border-[#E6E1EE] shadow-md mx-3 mt-4 p-4">

  {/* Header */}
  <div className="flex items-center mb-4">

    <div className="bg-[#2E1A47] p-2.5 rounded-xl mr-3 shadow-sm">

      <Share2 className="h-4 w-4 text-[#C8A96B]" />

    </div>

    <div>

      <h3 className="text-sm font-semibold text-[#1F1B24]">

        Stay Connected

      </h3>

      <div className="text-[11px] text-[#6B6475] mt-0.5">

        Follow Titan for latest launches and collections

      </div>

    </div>

  </div>


  {/* Social Links */}
  <div className="flex justify-center space-x-6 mb-5">

    {/* Instagram */}
    <button
      onClick={() =>
        handleSocialLink("https://www.instagram.com/titanwatchesindia/")
      }
      className="flex flex-col items-center"
    >

      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center mb-1.5 shadow-sm">

        <Instagram className="h-4 w-4 text-white" />

      </div>

      <span className="text-[11px] font-medium text-[#1F1B24]">

        Instagram

      </span>

    </button>


    {/* Facebook */}
    <button
      onClick={() =>
        handleSocialLink("https://www.facebook.com/titanwatches/")
      }
      className="flex flex-col items-center"
    >

      <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center mb-1.5 shadow-sm">

        <Facebook className="h-4 w-4 text-white" />

      </div>

      <span className="text-[11px] font-medium text-[#1F1B24]">

        Facebook

      </span>

    </button>


    {/* Website */}
    <button
      onClick={() =>
        handleSocialLink("https://www.titan.co.in/")
      }
      className="flex flex-col items-center"
    >

      <div className="w-10 h-10 rounded-full bg-[#2E1A47] flex items-center justify-center mb-1.5 shadow-sm">

        <ExternalLink className="h-4 w-4 text-white" />

      </div>

      <span className="text-[11px] font-medium text-[#1F1B24]">

        Website

      </span>

    </button>

  </div>


  {/* Store Details */}
  <div className="text-xs text-[#6B6475] text-center mb-3 bg-[#F7F5FA] border border-[#E6E1EE] p-4 rounded-2xl">

    <button
      onClick={() => setShowStoreLocation(!showStoreLocation)}
      className="w-full flex items-center justify-center mb-2 hover:text-[#2E1A47] transition-colors"
    >

      <MapPin className="h-3.5 w-3.5 mr-1.5 text-[#C8A96B]" />

      <span className="font-semibold text-[#2E1A47]">

        Titan World • MG Road Bengaluru{" "}

        {showStoreLocation ? "▲" : "▼"}

      </span>

    </button>


    {showStoreLocation && (

      <div className="space-y-1 leading-relaxed">

        <p className="font-semibold text-[#1F1B24]">

          Titan World - MG Road Bangalore

        </p>

        <p>
          Shop No. 77 & 78, Mahatma Gandhi Road
        </p>

        <p>
          Beside Deccan Herald, Haridevpur
        </p>

        <p>
          Shanthala Nagar, Shivaji Nagar
        </p>

        <p>
          Bengaluru, Karnataka 560001
        </p>

        <p className="mt-3 text-[10px]">

          Titan Company Limited

        </p>

        <p className="text-[10px]">

          CIN: L74999TN1984PLC010856

        </p>

        <p className="mt-2 text-[#2E1A47] font-semibold">

          Store Associate: {currentReceipt.associate}

        </p>

      </div>

    )}

  </div>


  {/* Terms */}
  <button
    className="w-full text-xs text-[#6B6475] hover:text-[#2E1A47] h-6 font-medium transition-colors"
    onClick={() => setShowTerms(!showTerms)}
  >

    Terms & Conditions {showTerms ? "▲" : "▼"}

  </button>


  {showTerms && (

    <div className="text-[11px] text-[#6B6475] mt-3 space-y-2 px-2 leading-relaxed">

      <p>
        • Titan Encircle membership benefits are subject to program terms and eligibility.
      </p>

      <p>
        • Personalized offers may vary based on membership tier and purchase history.
      </p>

      <p>
        • Prices displayed are inclusive of applicable GST.
      </p>

      <p>
        • Warranty coverage varies by product category and model.
      </p>

      <p>
        • For support visit titan.co.in or contact Titan Customer Care.
      </p>

    </div>

  )}


  {/* Powered by RDEP */}
  <div className="text-center mt-4 pt-4 border-t border-[#F0EDF5]">

    <div className="flex items-center justify-center space-x-1.5">

      <span className="text-xs text-[#9B94A8] font-medium">

        Powered by

      </span>

      <a
        href="https://www.rdep.io"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center"
      >

        <Image
          src="/images/design-mode/RDEP%20cropped.png"
          alt="RDEP"
          width={60}
          height={16}
          className="object-contain"
        />

      </a>

    </div>

  </div>

</div>
          <div id="height-marker" style={{ height: "1px" }} />
        </div>

        {/* Feedback Modal */}
        {showFeedbackModal && (
          <div
            style={getModalPositionRelativeToContainer(feedbackButtonRef)}
            className="bg-white rounded-lg w-full overflow-hidden shadow-xl z-[9999] max-w-sm"
          >
            <div className="flex justify-between items-center p-4 border-b bg-blue-700 text-white">
              <h3 className="text-lg font-semibold">How was your shopping experience?</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white"
                onClick={() => setShowFeedbackModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </Button>
            </div>

            <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
              {[
                { key: "service", label: "Service Quality" },
                { key: "quality", label: "Product Quality" },
                { key: "style", label: "Shoe Style/Design" },
                { key: "pricing", label: "Value for Money" },
                { key: "store", label: "Store Ambiance" },
              ].map((category) => (
                <div key={category.key} className="flex items-center justify-between">
                  <span className="text-sm">{category.label}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                        onClick={() =>
                          setFeedback((prev) => ({
                            ...prev,
                            [category.key as keyof typeof feedback]: star,
                          }))
                        }
                      >
                        <Star
                          className={`h-5 w-5 ${
                            feedback[category.key as keyof typeof feedback] >= star
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              <Textarea
                placeholder="Please share your feedback about your purchase (optional)"
                className="mt-2"
                value={feedback.comments}
                onChange={(e) => setFeedback((prev) => ({ ...prev, comments: e.target.value }))}
              />
            </div>

            <div className="p-4 border-t">
              <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white" onClick={handleFeedbackSubmit}>
                Submit Feedback
              </Button>
            </div>
          </div>
        )}

        {/* Transaction History Modal */}
{showTransactionHistory && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center">

    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => setShowTransactionHistory(false)}
    />

    {/* Modal */}
    <div className="relative bg-white rounded-2xl w-full max-w-sm mx-4 shadow-2xl border border-gray-200 font-poppins overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">

        <div className="flex items-center">

          <div className="bg-[#E1251B] p-2 rounded-lg mr-3">
            <History className="h-4 w-4 text-white" />
          </div>

          <h3 className="text-sm font-semibold text-gray-900">
            Order History
          </h3>

        </div>

        <button
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          onClick={() => setShowTransactionHistory(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-4 w-4 text-gray-500"
          >
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>

      </div>


      {/* Transaction List */}
      <div className="max-h-80 overflow-y-auto p-4 space-y-3">

        {transactionHistory.map((transaction) => (

          <button
            key={transaction.id}
            onClick={() => {
              setCurrentReceiptId(transaction.id)
              setShowTransactionHistory(false)
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="w-full flex items-center p-3 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#E1251B] transition"
          >

            <div className="bg-white border border-gray-200 p-2 rounded-lg mr-3">
              <FileText className="h-4 w-4 text-[#E1251B]" />
            </div>

            <div className="flex-grow text-left">

              <div className="text-sm font-semibold text-gray-900">
                Grill'd
              </div>

              <div className="text-[11px] text-gray-500">
                {transaction.date}
              </div>

            </div>

            <div className="text-sm font-semibold text-[#E1251B]">
              ${transaction.amount.toFixed(2)}
            </div>

          </button>

        ))}

      </div>

    </div>

  </div>
)}
        {/* Refer & Earn Modal */}
        {showReferModal && (
          <div
            style={getModalPositionRelativeToContainer(referButtonRef)}
            className="bg-white rounded-lg w-full overflow-hidden shadow-xl z-[9999] max-w-sm"
          >
            <div className="flex justify-between items-center p-4 border-b bg-blue-700 text-white">
              <h3 className="text-lg font-semibold flex items-center">
                <Share2 className="h-5 w-5 mr-2" />
                Refer & Earn
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-blue-600"
                onClick={() => setShowReferModal(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </Button>
            </div>
            <div className="p-4 space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Share2 className="h-8 w-8 text-blue-700" />
                </div>
                <h4 className="text-lg font-semibold text-blue-700 mb-2">Share & Earn RM50!</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Refer friends to Skechers and both of you get RM50 off your next purchase!
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="text-xs font-medium text-blue-800 mb-1">Your Referral Code</div>
                <div className="text-lg font-bold text-blue-700 text-center">SKECH{customerName.toUpperCase()}50</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `Try Skechers! Use code SKECH${customerName.toUpperCase()}50 for RM50 off!`,
                    )
                    setShowReferModal(false)
                  }}
                >
                  Copy Code
                </Button>
                <Button
                  className="bg-blue-700 hover:bg-blue-800 text-white"
                  onClick={() => {
                    window.open(
                      `https://wa.me/60362032728?text=Try Skechers Malaysia! Use my code SKECH${customerName.toUpperCase()}50 for RM50 off your next purchase!`,
                    )
                    setShowReferModal(false)
                  }}
                >
                  Share Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
