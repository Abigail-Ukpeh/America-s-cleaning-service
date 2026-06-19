import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Phone,
  Menu,
  X,
  Star,
  CheckCircle,
  Clock,
  MapPin,
  Shield,
  Sparkles,
  Building2,
  ChevronRight,
  Droplets,
  Wind,
  Trash2,
  Mail,
  ArrowRight,
} from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

import logoImg from "@/imports/WhatsApp_Image_2026-06-19_at_13.48.53.jpeg";
import heroImg from "@/imports/WhatsApp_Image_2026-06-19_at_13.48.49.jpeg";
import kitchenImg from "@/imports/WhatsApp_Image_2026-06-19_at_13.48.49__3_.jpeg";
import workOfficeImg from "@/imports/WhatsApp_Image_2026-06-19_at_13.48.49__2_.jpeg";
import bathroomImg from "@/imports/WhatsApp_Image_2026-06-19_at_13.48.49__1_.jpeg";
import hallwayMopImg from "@/imports/WhatsApp_Image_2026-06-19_at_13.48.48__1_.jpeg";
import corridorImg from "@/imports/WhatsApp_Image_2026-06-19_at_13.48.48.jpeg";

// ─── Brand tokens ────────────────────────────────────────────────────────────
const BLUE = "#2A6496";
const RED = "#C0392B";
const DARK = "#1E1E2E";
const GREY = "#6C757D";
const GOLD = "#F5A623";
const LIGHT = "#F5F6FA";

// ─── Fade-in wrapper ─────────────────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const offsets = { up: { y: 40, x: 0 }, left: { y: 0, x: -40 }, right: { y: 0, x: 40 }, none: { y: 0, x: 0 } };
  const { y, x } = offsets[direction];
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated counter ────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Home", "Services", "COVID-19", "Reviews", "Contact"];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-md bg-white" : "bg-white"
      }`}
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-14 h-14 relative">
              <img
                src={logoImg}
                alt="America's Cleaning Service mascot"
                className="w-full h-full object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-lg leading-none" style={{ color: BLUE }}>
                America&apos;s Cleaning Service
              </div>
              <div className="font-black text-sm tracking-widest uppercase" style={{ color: RED }}>
                NYC
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace("-", "")}`}
                className="text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-[#2A6496]"
                style={{ color: DARK }}
              >
                {link}
              </a>
            ))}
            <a
              href="tel:9178184438"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-95"
              style={{ backgroundColor: RED }}
            >
              <Phone size={15} />
              Get a Free Quote
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} color={DARK} /> : <Menu size={24} color={DARK} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden md:hidden bg-white border-t border-gray-100"
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace("-", "")}`}
              className="font-semibold py-1 border-b border-gray-100"
              style={{ color: DARK }}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="tel:9178184438"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white mt-2"
            style={{ backgroundColor: RED }}
          >
            <Phone size={15} />
            Get a Free Quote
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={heroImg}
          alt="Sparkling clean NYC office space"
          className="w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(26,58,110,0.82) 0%, rgba(42,100,150,0.7) 60%, rgba(192,57,43,0.45) 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-black tracking-widest uppercase"
          style={{ backgroundColor: RED, color: "#fff" }}
        >
          <Star size={12} fill="currentColor" />
          New York City&apos;s #1 Janitorial Experts
          <Star size={12} fill="currentColor" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-black leading-[1.05] mb-6"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4rem)", maxWidth: 820, letterSpacing: "-0.02em" }}
        >
          Keeping NYC Businesses
          <br />
          <span style={{ color: "#7DD3FC" }}>Spotless</span> — 24/7
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-white/85 mb-10 max-w-2xl leading-relaxed"
          style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", fontFamily: "'Open Sans', sans-serif" }}
        >
          Professional janitorial, office cleaning & COVID-19 disinfecting for NYC businesses.
          <br className="hidden sm:block" />
          Reliable. Certified. Always available.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="tel:9178184438"
            className="flex items-center gap-3 px-8 py-4 rounded-full font-black text-white text-lg shadow-xl transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95"
            style={{ backgroundColor: RED }}
          >
            <Phone size={20} />
            Call (917) 818-4438
          </a>
          <a
            href="#contact"
            className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white text-base border-2 border-white/70 hover:bg-white/10 transition-all duration-200"
          >
            Request a Free Quote
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>

      {/* Trust strip */}
      <div className="relative z-10 w-full bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
            {[
              { icon: <Clock size={22} />, title: "Open 24 Hours, 7 Days", sub: "Always available, no exceptions" },
              { icon: <MapPin size={22} />, title: "Serving All NYC Boroughs", sub: "Manhattan · Brooklyn · Queens · Bronx · SI" },
              { icon: <Shield size={22} />, title: "COVID-19 Certified", sub: "EPA-approved disinfection protocols" },
            ].map(({ icon, title, sub }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.95 + i * 0.1 }}
                className="flex items-center gap-4 px-8 py-6"
              >
                <div className="rounded-full p-2.5 flex-shrink-0" style={{ backgroundColor: `${BLUE}18`, color: BLUE }}>
                  {icon}
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: DARK, fontFamily: "'Montserrat', sans-serif" }}>
                    {title}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: GREY, fontFamily: "'Open Sans', sans-serif" }}>
                    {sub}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About / Stats ───────────────────────────────────────────────────────────
function About() {
  const stats = [
    { value: 500, suffix: "+", label: "Happy Clients" },
    { value: 12, suffix: "+", label: "Years in NYC" },
    { value: 10000, suffix: "+", label: "Jobs Completed" },
    { value: 100, suffix: "%", label: "Satisfaction Rate" },
  ];

  return (
    <section id="home" className="py-24 bg-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <FadeIn>
          <div
            className="inline-block text-xs font-black tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: BLUE, backgroundColor: `${BLUE}15` }}
          >
            About Us
          </div>
          <h2 className="font-black mb-6" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: DARK, letterSpacing: "-0.02em" }}>
            NYC&apos;s Most Trusted Cleaning Company
          </h2>
          <p
            className="leading-relaxed mx-auto mb-16"
            style={{ maxWidth: 680, color: GREY, fontSize: "1.1rem", fontFamily: "'Open Sans', sans-serif" }}
          >
            America&apos;s Cleaning Service is New York City&apos;s go-to partner for janitorial and office cleaning. Our trained professional staff work around your schedule — nights, weekends, and holidays — so your business is always clean, safe, and ready for your team.
          </p>
        </FadeIn>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ value, suffix, label }, i) => (
            <FadeIn key={label} delay={i * 0.1}>
              <div
                className="rounded-2xl py-10 px-6 flex flex-col items-center gap-2 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                style={{ background: i % 2 === 0 ? BLUE : RED }}
              >
                <div className="font-black text-white" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
                  <AnimatedCounter target={value} suffix={suffix} />
                </div>
                <div className="text-white/80 font-semibold text-sm uppercase tracking-wide">{label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────
function Services() {
  const services = [
    { icon: <Building2 size={28} />, title: "Office Cleaning", desc: "Daily, weekly, or monthly commercial office cleaning tailored to your schedule and workspace." },
    { icon: <Sparkles size={28} />, title: "Janitorial Services", desc: "Full-service janitorial programs for offices, retail, medical, and industrial facilities." },
    { icon: <Shield size={28} />, title: "COVID-19 Disinfection", desc: "EPA-approved disinfection protocols using hospital-grade products to keep your team safe." },
    { icon: <Droplets size={28} />, title: "Deep Cleaning", desc: "Comprehensive deep cleans for move-ins, move-outs, post-construction, and special events." },
    { icon: <Wind size={28} />, title: "Floor Care", desc: "Professional stripping, waxing, buffing, and polishing for all hard floor surfaces." },
    { icon: <Trash2 size={28} />, title: "Waste Management", desc: "Scheduled trash removal, recycling coordination, and sanitation supply restocking." },
  ];

  return (
    <section id="services" className="py-24" style={{ backgroundColor: LIGHT }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <div
            className="inline-block text-xs font-black tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: RED, backgroundColor: `${RED}15`, fontFamily: "'Montserrat', sans-serif" }}
          >
            What We Do
          </div>
          <h2
            className="font-black mb-4"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: DARK, letterSpacing: "-0.02em", fontFamily: "'Montserrat', sans-serif" }}
          >
            Professional Cleaning Services
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: GREY, fontFamily: "'Open Sans', sans-serif" }}>
            From daily janitorial programs to emergency deep cleans — we do it all, on your schedule.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <div
                className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 group-hover:text-white"
                  style={{ backgroundColor: `${BLUE}15`, color: BLUE }}
                >
                  {icon}
                </div>
                <h3
                  className="font-bold text-lg mb-3"
                  style={{ color: DARK, fontFamily: "'Montserrat', sans-serif" }}
                >
                  {title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: GREY, fontFamily: "'Open Sans', sans-serif" }}>
                  {desc}
                </p>
                <div className="flex items-center gap-1 mt-5 text-xs font-bold uppercase tracking-wide" style={{ color: BLUE }}>
                  Learn More <ChevronRight size={14} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery (real work photos) ───────────────────────────────────────────────
function Gallery() {
  const photos = [
    { src: corridorImg, alt: "Gleaming office corridor after janitorial service" },
    { src: heroImg, alt: "Modern open office space spotlessly clean" },
    { src: kitchenImg, alt: "Commercial kitchen with polished checkerboard floor" },
    { src: workOfficeImg, alt: "Private office with gleaming hardwood floors" },
    { src: hallwayMopImg, alt: "Office hallway after professional mopping" },
    { src: bathroomImg, alt: "Sparkling clean commercial bathroom" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <div
            className="inline-block text-xs font-black tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: BLUE, backgroundColor: `${BLUE}15`, fontFamily: "'Montserrat', sans-serif" }}
          >
            Our Work
          </div>
          <h2
            className="font-black"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: DARK, letterSpacing: "-0.02em", fontFamily: "'Montserrat', sans-serif" }}
          >
            Real Results, Real NYC Spaces
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map(({ src, alt }, i) => (
            <FadeIn key={i} delay={i * 0.07}>
              <div className="relative overflow-hidden rounded-2xl bg-gray-100 group" style={{ aspectRatio: "4/3" }}>
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                  style={{ background: "linear-gradient(to top, rgba(26,58,110,0.85) 0%, transparent 60%)" }}
                >
                  <p className="text-white text-sm font-semibold p-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {alt}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COVID-19 Section ─────────────────────────────────────────────────────────
function CovidSection() {
  const points = [
    "EPA List N approved disinfectants used on all surfaces",
    "CDC and DOH guideline-compliant procedures",
    "Trained and certified COVID-19 cleaning specialists",
    "Electrostatic spraying for complete surface coverage",
    "Detailed post-service sanitation reports available",
    "Same-day emergency disinfection response",
  ];

  return (
    <section id="covid19" className="py-24" style={{ backgroundColor: DARK }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="left">
            <div
              className="inline-block text-xs font-black tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full"
              style={{ color: "#fff", backgroundColor: RED, fontFamily: "'Montserrat', sans-serif" }}
            >
              COVID-19 Response
            </div>
            <h2
              className="font-black text-white mb-6"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", letterSpacing: "-0.02em", fontFamily: "'Montserrat', sans-serif" }}
            >
              Certified Disinfection.
              <br />
              <span style={{ color: "#7DD3FC" }}>Zero Compromises.</span>
            </h2>
            <p
              className="mb-8 leading-relaxed"
              style={{ color: "rgba(255,255,255,0.72)", fontFamily: "'Open Sans', sans-serif", fontSize: "1.05rem" }}
            >
              We take the health and safety of your workplace seriously. Our COVID-19 disinfection program follows the strictest protocols from the CDC, EPA, and NYC DOH — giving your team the confidence to come back to work.
            </p>
            <ul className="space-y-3">
              {points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#34D399" }} />
                  <span style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Open Sans', sans-serif", fontSize: "0.95rem" }}>
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="relative">
              <div className="overflow-hidden rounded-2xl" style={{ aspectRatio: "4/3" }}>
                <img src={hallwayMopImg} alt="Professional mopping in NYC office hallway" className="w-full h-full object-cover" />
              </div>
              <div
                className="absolute -bottom-6 -left-6 rounded-2xl px-6 py-5 shadow-2xl"
                style={{ backgroundColor: RED }}
              >
                <div className="font-black text-white text-2xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>CDC</div>
                <div className="text-white/90 text-xs font-semibold uppercase tracking-wide mt-0.5">Compliant Protocol</div>
              </div>
              <div
                className="absolute -top-6 -right-6 rounded-2xl px-6 py-5 shadow-2xl"
                style={{ backgroundColor: BLUE }}
              >
                <div className="font-black text-white text-2xl" style={{ fontFamily: "'Montserrat', sans-serif" }}>EPA</div>
                <div className="text-white/90 text-xs font-semibold uppercase tracking-wide mt-0.5">List N Certified</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ──────────────────────────────────────────────────────────────────
function Reviews() {
  const reviews = [
    {
      name: "Marcus T.",
      role: "Office Manager, Midtown Manhattan",
      text: "We've been using America's Cleaning Service for two years. They show up every single night without fail, and our office has never looked better. The team is professional, discreet, and thorough.",
      rating: 5,
    },
    {
      name: "Jennifer R.",
      role: "Property Manager, Brooklyn Heights",
      text: "After our building had a COVID exposure, they responded within hours with their full disinfection team. The documentation they provided for our tenants was exactly what we needed. Absolutely top notch.",
      rating: 5,
    },
    {
      name: "David K.",
      role: "CEO, Financial Services Firm, FiDi",
      text: "I've tried three cleaning companies in the past five years. America's Cleaning Service is on a completely different level — reliable, communicative, and the results speak for themselves.",
      rating: 5,
    },
    {
      name: "Priya S.",
      role: "Facilities Director, Queens Medical Center",
      text: "Healthcare cleaning requires precision and compliance. This team understands that. They know our protocols, they follow them perfectly, and our inspection scores have never been higher.",
      rating: 5,
    },
  ];

  return (
    <section id="reviews" className="py-24" style={{ backgroundColor: LIGHT }}>
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="text-center mb-16">
          <div
            className="inline-block text-xs font-black tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{ color: GOLD, backgroundColor: `${GOLD}20`, fontFamily: "'Montserrat', sans-serif" }}
          >
            ★ Client Reviews
          </div>
          <h2
            className="font-black"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: DARK, letterSpacing: "-0.02em", fontFamily: "'Montserrat', sans-serif" }}
          >
            What NYC Businesses Say
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map(({ name, role, text, rating }, i) => (
            <FadeIn key={name} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: rating }).map((_, j) => (
                    <Star key={j} size={16} fill={GOLD} color={GOLD} />
                  ))}
                </div>
                <p
                  className="leading-relaxed flex-1 mb-6"
                  style={{ color: GREY, fontFamily: "'Open Sans', sans-serif", fontSize: "0.95rem" }}
                >
                  &ldquo;{text}&rdquo;
                </p>
                <div>
                  <div className="font-bold text-sm" style={{ color: DARK, fontFamily: "'Montserrat', sans-serif" }}>
                    {name}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: GREY, fontFamily: "'Open Sans', sans-serif" }}>
                    {role}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA / Contact ────────────────────────────────────────────────────────────
function ContactCTA() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn direction="left">
            <div
              className="inline-block text-xs font-black tracking-widest uppercase mb-5 px-4 py-1.5 rounded-full"
              style={{ color: BLUE, backgroundColor: `${BLUE}15`, fontFamily: "'Montserrat', sans-serif" }}
            >
              Contact Us
            </div>
            <h2
              className="font-black mb-6 text-balance"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: DARK, letterSpacing: "-0.02em", fontFamily: "'Montserrat', sans-serif" }}
            >
              Get Your Free Quote Today
            </h2>
            <p
              className="mb-8 leading-relaxed"
              style={{ color: GREY, fontFamily: "'Open Sans', sans-serif", fontSize: "1.05rem" }}
            >
              Ready for a cleaner, safer workplace? Reach out for a free, no-obligation quote. We respond within 1 hour during business hours.
            </p>

            <div className="space-y-5">
              <a href="tel:9178184438" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${RED}15` }}>
                  <Phone size={20} style={{ color: RED }} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold mb-0.5" style={{ color: GREY, fontFamily: "'Montserrat', sans-serif" }}>Call Us</div>
                  <div className="font-bold text-lg group-hover:underline" style={{ color: DARK, fontFamily: "'Montserrat', sans-serif" }}>(917) 818-4438</div>
                </div>
              </a>
              <a href="mailto:info@americascleaningservicenyc.com" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${BLUE}15` }}>
                  <Mail size={20} style={{ color: BLUE }} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold mb-0.5" style={{ color: GREY, fontFamily: "'Montserrat', sans-serif" }}>Email Us</div>
                  <div className="font-bold group-hover:underline" style={{ color: DARK, fontFamily: "'Montserrat', sans-serif" }}>info@americascleaningservicenyc.com</div>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${BLUE}15` }}>
                  <Clock size={20} style={{ color: BLUE }} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold mb-0.5" style={{ color: GREY, fontFamily: "'Montserrat', sans-serif" }}>Hours</div>
                  <div className="font-bold" style={{ color: DARK, fontFamily: "'Montserrat', sans-serif" }}>Open 24 Hours / 7 Days a Week</div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-xl p-12 text-center"
              >
                <CheckCircle size={60} className="mx-auto mb-4" style={{ color: "#34D399" }} />
                <h3 className="font-black text-2xl mb-2" style={{ color: DARK, fontFamily: "'Montserrat', sans-serif" }}>Message Sent!</h3>
                <p style={{ color: GREY, fontFamily: "'Open Sans', sans-serif" }}>We&apos;ll get back to you within the hour.</p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 space-y-5"
              >
                {[
                  { key: "name", label: "Full Name", type: "text", placeholder: "Jane Smith" },
                  { key: "email", label: "Email Address", type: "email", placeholder: "jane@company.com" },
                  { key: "phone", label: "Phone Number", type: "tel", placeholder: "(212) 000-0000" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: DARK, fontFamily: "'Montserrat', sans-serif" }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      required
                      placeholder={placeholder}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 transition-all"
                      style={{ fontFamily: "'Open Sans', sans-serif", color: DARK, focusRingColor: BLUE } as React.CSSProperties}
                      onFocus={(e) => (e.target.style.borderColor = BLUE)}
                      onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: DARK, fontFamily: "'Montserrat', sans-serif" }}>
                    Tell Us About Your Space
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Type of facility, frequency, special requirements..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none resize-none transition-all"
                    style={{ fontFamily: "'Open Sans', sans-serif", color: DARK }}
                    onFocus={(e) => (e.target.style.borderColor = BLUE)}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-black text-white text-base uppercase tracking-wide transition-all duration-200 hover:brightness-110 active:scale-98"
                  style={{ backgroundColor: RED, fontFamily: "'Montserrat', sans-serif" }}
                >
                  Send My Free Quote Request
                </button>
                <p className="text-center text-xs" style={{ color: GREY, fontFamily: "'Open Sans', sans-serif" }}>
                  No obligation. We respond within 1 hour.
                </p>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const navLinks = ["Home", "Services", "COVID-19", "Reviews", "Contact"];
  const services = ["Office Cleaning", "Janitorial Services", "COVID-19 Disinfection", "Deep Cleaning", "Floor Care", "Waste Management"];
  const boroughs = ["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island", "Long Island City"];

  return (
    <footer style={{ backgroundColor: DARK, fontFamily: "'Montserrat', sans-serif" }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-lg p-1 flex-shrink-0">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain" style={{ mixBlendMode: "multiply" }} />
              </div>
              <div>
                <div className="font-bold text-sm text-white leading-tight">America&apos;s Cleaning Service</div>
                <div className="font-black text-xs tracking-widest" style={{ color: RED }}>NYC</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Open Sans', sans-serif" }}>
              New York City&apos;s most trusted commercial janitorial and office cleaning service. Available 24/7, 365 days a year.
            </p>
            <a
              href="tel:9178184438"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:brightness-110"
              style={{ backgroundColor: RED }}
            >
              <Phone size={14} />
              (917) 818-4438
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-5">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace("-", "")}`}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Open Sans', sans-serif" }}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-5">Service Areas</h4>
            <ul className="space-y-3">
              {boroughs.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <MapPin size={12} style={{ color: RED }} />
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Open Sans', sans-serif" }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.1)" }}
        >
          <p className="text-xs text-center sm:text-left" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Open Sans', sans-serif" }}>
            © {new Date().getFullYear()} America&apos;s Cleaning Service NYC. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "'Open Sans', sans-serif" }}>
            <Shield size={12} />
            Licensed · Bonded · Insured
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2A649660; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #2A6496; }
      `}</style>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <CovidSection />
      <Reviews />
      <ContactCTA />
      <Footer />
    </div>
  );
}
