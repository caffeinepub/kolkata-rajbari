import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AdminPanel from "./AdminPanel";
import { useSubmitReservation } from "./hooks/useQueries";

// ── Data ────────────────────────────────────────────────────────────────────

const MENU_DATA = {
  starters: [
    {
      name: "Mughlai Paratha",
      description:
        "Flaky layered flatbread stuffed with spiced egg and minced lamb, served with kasundi mustard chutney.",
      price: "₹180",
      image: "/assets/generated/dish-mughlai-paratha.dim_400x300.jpg",
    },
    {
      name: "Jhalmuri",
      description:
        "Classic Kolkata street-style puffed rice tossed with mustard oil, green chilli and fresh coconut.",
      price: "₹80",
      image: "/assets/generated/dish-jhalmuri.dim_400x300.jpg",
    },
    {
      name: "Fish Fry",
      description:
        "Golden-fried Bhetki fish fillets marinated in aromatic spices, a beloved Kolkata classic.",
      price: "₹220",
      image: "/assets/generated/dish-fish-fry.dim_400x300.jpg",
    },
  ],
  mains: [
    {
      name: "Kosha Mangsho",
      description:
        "Slow-cooked mutton in a deeply caramelised onion and spice gravy — the pride of Bengali kitchens.",
      price: "₹480",
      image: "/assets/generated/dish-kosha-mangsho.dim_400x300.jpg",
    },
    {
      name: "Bhetki Paturi",
      description:
        "Bhetki fish steeped in mustard-coconut paste, wrapped in banana leaf and steam-cooked to perfection.",
      price: "₹420",
      image: "/assets/generated/dish-bhetki-paturi.dim_400x300.jpg",
    },
    {
      name: "Cholar Dal",
      description:
        "Split Bengal gram cooked with coconut slivers, raisins and mild spices — a festive Bengali staple.",
      price: "₹180",
      image: "/assets/generated/dish-cholar-dal.dim_400x300.jpg",
    },
  ],
  desserts: [
    {
      name: "Rosogolla",
      description:
        "Soft, spongy cottage-cheese dumplings simmered in light sugar syrup — Bengal's most iconic sweet.",
      price: "₹120",
      image: "/assets/generated/dish-rosogolla.dim_400x300.jpg",
    },
    {
      name: "Mishti Doi",
      description:
        "Sweetened, slow-set yogurt fermented in traditional clay pots, with a rich caramel undertone.",
      price: "₹100",
      image: "/assets/generated/dish-mishti-doi.dim_400x300.jpg",
    },
    {
      name: "Sandesh",
      description:
        "Delicate fresh-cheese sweets shaped in ornamental moulds, flavoured with cardamom and saffron.",
      price: "₹140",
      image: "/assets/generated/dish-sandesh.dim_400x300.jpg",
    },
  ],
};

const GALLERY_IMAGES = [
  {
    src: "/assets/generated/gallery-dining.dim_600x400.jpg",
    caption: "The Grand Dining Hall",
  },
  {
    src: "/assets/generated/gallery-courtyard.dim_600x400.jpg",
    caption: "The Heritage Courtyard",
  },
  {
    src: "/assets/generated/gallery-kitchen.dim_600x400.jpg",
    caption: "The Royal Kitchen",
  },
  {
    src: "/assets/generated/gallery-private.dim_600x400.jpg",
    caption: "Private Dining Suite",
  },
  {
    src: "/assets/generated/gallery-exterior.dim_600x400.jpg",
    caption: "The Palace Exterior",
  },
  {
    src: "/assets/generated/gallery-banquet.dim_600x400.jpg",
    caption: "Royal Banquet Hall",
  },
  {
    src: "/assets/generated/gallery-thali.dim_600x400.jpg",
    caption: "The Bengali Thali Experience",
  },
  {
    src: "/assets/generated/gallery-rooftop.dim_600x400.jpg",
    caption: "Rooftop Terrace Dining",
  },
];

const TIME_SLOTS = [
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
];

const ABOUT_LINKS = [
  "Our History",
  "Our Chefs",
  "Cuisine Philosophy",
  "Press & Media",
  "Awards",
];

// ── Sub-components ───────────────────────────────────────────────────────────

function PalaceSVG() {
  return (
    <svg
      role="img"
      aria-label="Kolkata Rajbari palace logo"
      width="48"
      height="32"
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-1"
    >
      <rect
        x="4"
        y="18"
        width="40"
        height="12"
        rx="1"
        fill="#C9A24E"
        opacity="0.9"
      />
      <rect
        x="8"
        y="12"
        width="32"
        height="8"
        rx="1"
        fill="#C9A24E"
        opacity="0.8"
      />
      <rect
        x="14"
        y="7"
        width="20"
        height="7"
        rx="1"
        fill="#C9A24E"
        opacity="0.85"
      />
      <rect x="20" y="3" width="8" height="6" rx="1" fill="#C9A24E" />
      <path d="M24 1 L27 5 L21 5 Z" fill="#C9A24E" />
      <rect
        x="6"
        y="20"
        width="4"
        height="10"
        rx="0.5"
        fill="#8B6914"
        opacity="0.6"
      />
      <rect
        x="38"
        y="20"
        width="4"
        height="10"
        rx="0.5"
        fill="#8B6914"
        opacity="0.6"
      />
      <rect
        x="20"
        y="22"
        width="8"
        height="8"
        rx="0.5"
        fill="#8B6914"
        opacity="0.6"
      />
      {[10, 18, 26, 34].map((x) => (
        <ellipse
          key={x}
          cx={x + 2}
          cy="17"
          rx="2"
          ry="2.5"
          fill="#C9A24E"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 justify-center my-4">
      <div className="h-px bg-gold flex-1 max-w-[80px] opacity-60" />
      <svg
        role="img"
        aria-label="ornamental star"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M8 1 L9.5 6.5 L15 8 L9.5 9.5 L8 15 L6.5 9.5 L1 8 L6.5 6.5 Z"
          fill="#C9A24E"
          opacity="0.8"
        />
      </svg>
      <div className="h-px bg-gold flex-1 max-w-[80px] opacity-60" />
    </div>
  );
}

function MenuCard({
  item,
}: {
  item: { name: string; description: string; price: string; image: string };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-parchment-light rounded-lg shadow-card overflow-hidden group gold-corners"
    >
      <div className="overflow-hidden h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold text-brown leading-tight">
            {item.name}
          </h3>
          <span className="font-serif font-bold text-gold text-base whitespace-nowrap">
            {item.price}
          </span>
        </div>
        <p className="mt-2 text-sm text-brown-medium font-body leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────

function MainSite() {
  const [activeSection, setActiveSection] = useState("home");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    guestName: "",
    date: "",
    time: "",
    numberOfGuests: "",
    specialRequests: "",
  });

  const submitMutation = useSubmitReservation();

  const sectionRefsRef = useRef<Record<string, HTMLElement | null>>({});

  const setRef = (key: string) => (el: HTMLElement | null) => {
    sectionRefsRef.current[key] = el;
  };

  const scrollTo = (section: string) => {
    sectionRefsRef.current[section]?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const sectionNames = [
      "home",
      "story",
      "menu",
      "gallery",
      "reservations",
      "contact",
    ];

    const handleScroll = () => {
      setNavScrolled(window.scrollY > 60);
      for (let i = sectionNames.length - 1; i >= 0; i--) {
        const el = sectionRefsRef.current[sectionNames[i]];
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 100) {
            setActiveSection(sectionNames[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGalleryPrev = () =>
    setGalleryIndex(
      (i) => (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
    );
  const handleGalleryNext = () =>
    setGalleryIndex((i) => (i + 1) % GALLERY_IMAGES.length);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.guestName ||
      !formData.date ||
      !formData.time ||
      !formData.numberOfGuests
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await submitMutation.mutateAsync({
        guestName: formData.guestName,
        date: formData.date,
        time: formData.time,
        numberOfGuests: BigInt(formData.numberOfGuests),
        specialRequests: formData.specialRequests,
      });
      toast.success(
        "Your reservation has been confirmed! We look forward to welcoming you.",
      );
      setFormData({
        guestName: "",
        date: "",
        time: "",
        numberOfGuests: "",
        specialRequests: "",
      });
    } catch {
      toast.error(
        "Unable to process your reservation. Please try again or call us directly.",
      );
    }
  };

  const navItems = [
    { key: "home", label: "HOME" },
    { key: "story", label: "OUR STORY" },
    { key: "menu", label: "MENU" },
    { key: "gallery", label: "GALLERY" },
    { key: "reservations", label: "RESERVATIONS" },
    { key: "contact", label: "CONTACT" },
  ];

  return (
    <div className="min-h-screen bg-parchment font-body">
      <Toaster position="top-center" richColors />

      {/* ── Navigation ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navScrolled
            ? "bg-parchment shadow-royal border-b border-gold/30"
            : "bg-parchment/95 border-b border-gold/30"
        }`}
        data-ocid="nav.panel"
      >
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Brand */}
            <button
              type="button"
              onClick={() => scrollTo("home")}
              className="flex flex-col items-center group"
              data-ocid="nav.link"
            >
              <PalaceSVG />
              <div className="text-center">
                <div className="font-serif text-xs font-bold tracking-[0.08em] text-brown lowercase leading-none">
                  www.kolkatarajbari.com
                </div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-6"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.key}
                  onClick={() => scrollTo(item.key)}
                  data-ocid={`nav.${item.key}.link`}
                  className={`font-body text-xs tracking-[0.15em] uppercase transition-colors duration-200 pb-1 ${
                    activeSection === item.key
                      ? "text-gold nav-link-active"
                      : "text-brown-medium hover:text-gold"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* CTA */}
            <button
              type="button"
              onClick={() => scrollTo("reservations")}
              data-ocid="nav.primary_button"
              className="hidden lg:flex items-center gap-2 bg-gold hover:bg-gold-dark text-brown font-body font-semibold text-xs tracking-[0.12em] uppercase px-5 py-2.5 rounded-lg shadow-gold transition-all duration-200 hover:shadow-none"
            >
              BOOK A TABLE
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="lg:hidden p-2 text-brown"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              <div className="space-y-1.5">
                <span
                  className={`block w-6 h-0.5 bg-brown transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-brown transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-brown transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-parchment border-t border-gold/20 px-4 py-4"
            >
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.key}
                  onClick={() => scrollTo(item.key)}
                  className="block w-full text-left py-2.5 font-body text-xs tracking-[0.15em] uppercase text-brown-medium hover:text-gold transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollTo("reservations")}
                className="mt-3 w-full bg-gold text-brown font-semibold text-xs tracking-[0.12em] uppercase px-5 py-2.5 rounded-lg"
              >
                BOOK A TABLE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section
        ref={setRef("home")}
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-ocid="hero.section"
      >
        <img
          src="/assets/generated/hero-rajbari.dim_1400x700.jpg"
          alt="Kolkata Rajbari heritage palace facade at dusk"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown/40 via-brown/30 to-brown/75" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-gold mb-4 opacity-90">
              KOLKATA RAJBARI &nbsp;·&nbsp; Heritage Bengali Cuisine
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
              Experience the Grandeur
              <br />
              of a Royal Era
            </h1>
            <GoldDivider />
            <p className="font-body text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed mb-10">
              Step into the regal splendour of Kolkata's finest heritage dining.
              A culinary journey through centuries of Bengali gastronomy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => scrollTo("reservations")}
                data-ocid="hero.primary_button"
                className="bg-gold hover:bg-gold-dark text-brown font-semibold text-sm tracking-[0.12em] uppercase px-8 py-3.5 rounded-lg shadow-gold transition-all duration-200"
              >
                BOOK YOUR TABLE
              </button>
              <button
                type="button"
                onClick={() => scrollTo("menu")}
                data-ocid="hero.secondary_button"
                className="border border-white/60 hover:border-gold text-white hover:text-gold font-semibold text-sm tracking-[0.12em] uppercase px-8 py-3.5 rounded-lg transition-all duration-200"
              >
                EXPLORE MENU
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        >
          <span className="font-body text-xs tracking-widest uppercase">
            Scroll
          </span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* ── Our Story ── */}
      <section
        ref={setRef("story")}
        id="story"
        className="py-24 bg-parchment filigree-bg"
        data-ocid="story.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative p-3 border-2 border-gold/60 rounded-sm shadow-royal bg-parchment-dark">
                <img
                  src="/assets/generated/story-interior.dim_600x400.jpg"
                  alt="Rajbari restaurant interior with ornate arches and warm golden lighting"
                  className="w-full h-72 lg:h-96 object-cover rounded-sm"
                />
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p className="font-body text-xs tracking-[0.25em] uppercase text-gold mb-3">
                OUR STORY
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-brown leading-tight mb-2">
                The Legacy of Bengali Gastronomy
              </h2>
              <GoldDivider />
              <p className="font-body text-base text-brown-medium leading-relaxed mb-5">
                Nestled in the heart of Ballygunge, Kolkata Rajbari was born
                from a singular vision — to preserve and celebrate the
                magnificent culinary traditions of Bengal's royal households.
                Our founders, themselves descendants of the zamindar class,
                opened these doors in 1987 to share the recipes that had been
                guarded in noble kitchens for generations.
              </p>
              <p className="font-body text-base text-brown-medium leading-relaxed mb-8">
                Today, each dish we serve carries the weight of history —
                hand-ground spices, slow-cooked gravies that simmer for hours,
                and sweets made from pure chhena following methods passed down
                through masters of the craft. Dining here is not merely a meal;
                it is an audience with history.
              </p>
              <button
                type="button"
                onClick={() => scrollTo("menu")}
                data-ocid="story.primary_button"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-brown font-body font-semibold text-xs tracking-[0.15em] uppercase px-7 py-3 rounded-lg transition-all duration-200"
              >
                DISCOVER OUR MENU
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Menu ── */}
      <section
        ref={setRef("menu")}
        id="menu"
        className="py-24 bg-parchment-dark filigree-bg"
        data-ocid="menu.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-gold mb-3">
              CURATED FOR ROYALTY
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brown mb-2">
              EXPLORE OUR MENU
            </h2>
            <GoldDivider />
            <p className="font-body text-brown-medium max-w-xl mx-auto">
              Each dish is a chapter in Bengal's culinary saga — ingredients
              sourced locally, cooked by masters.
            </p>
          </div>

          <Tabs defaultValue="starters" className="w-full" data-ocid="menu.tab">
            <TabsList className="flex justify-center mb-10 bg-transparent gap-2 h-auto">
              {["starters", "mains", "desserts"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  data-ocid={`menu.${tab}.tab`}
                  className="font-body text-xs tracking-[0.2em] uppercase px-6 py-2.5 rounded-lg border border-gold/30 data-[state=active]:bg-gold data-[state=active]:text-brown data-[state=active]:border-gold text-brown-medium hover:text-gold transition-all"
                >
                  {tab === "starters"
                    ? "STARTERS"
                    : tab === "mains"
                      ? "MAIN COURSES"
                      : "DESSERTS"}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="starters">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MENU_DATA.starters.map((item, i) => (
                  <div key={item.name} data-ocid={`menu.item.${i + 1}`}>
                    <MenuCard item={item} />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="mains">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MENU_DATA.mains.map((item, i) => (
                  <div key={item.name} data-ocid={`menu.item.${i + 1}`}>
                    <MenuCard item={item} />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="desserts">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MENU_DATA.desserts.map((item, i) => (
                  <div key={item.name} data-ocid={`menu.item.${i + 1}`}>
                    <MenuCard item={item} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section
        ref={setRef("gallery")}
        id="gallery"
        className="py-24 bg-parchment"
        data-ocid="gallery.section"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-gold mb-3">
              A VISUAL JOURNEY
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brown mb-2">
              THE RAJBARI AMBIANCE
            </h2>
            <GoldDivider />
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-xl shadow-royal">
              <AnimatePresence mode="wait">
                <motion.div
                  key={galleryIndex}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <img
                    src={GALLERY_IMAGES[galleryIndex].src}
                    alt={GALLERY_IMAGES[galleryIndex].caption}
                    className="w-full h-80 sm:h-[480px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brown/70 to-transparent p-6">
                    <p className="font-serif text-lg text-white font-medium">
                      {GALLERY_IMAGES[galleryIndex].caption}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={handleGalleryPrev}
              data-ocid="gallery.pagination_prev"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brown/60 hover:bg-gold text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={handleGalleryNext}
              data-ocid="gallery.pagination_next"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brown/60 hover:bg-gold text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {GALLERY_IMAGES.map((img, i) => (
                <button
                  type="button"
                  key={img.caption}
                  onClick={() => setGalleryIndex(i)}
                  data-ocid={`gallery.item.${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === galleryIndex
                      ? "w-8 h-2.5 bg-gold"
                      : "w-2.5 h-2.5 bg-gold/30 hover:bg-gold/60"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 mt-8 max-w-4xl mx-auto">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                type="button"
                key={img.caption}
                onClick={() => setGalleryIndex(i)}
                data-ocid={`gallery.item.${i + 1}`}
                className={`overflow-hidden rounded-lg transition-all duration-200 ${
                  i === galleryIndex
                    ? "ring-2 ring-gold ring-offset-2 ring-offset-parchment"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-16 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reservations ── */}
      <section
        ref={setRef("reservations")}
        id="reservations"
        className="py-24 bg-parchment-dark filigree-bg relative overflow-hidden"
        data-ocid="reservations.section"
      >
        <div className="absolute left-0 top-0 bottom-0 w-8 lg:w-16 flex flex-col items-center justify-around py-12 opacity-30">
          {["p1", "p2", "p3", "p4", "p5", "p6"].map((k) => (
            <div key={k} className="w-2 h-8 bg-gold rounded-full" />
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-8 lg:w-16 flex flex-col items-center justify-around py-12 opacity-30">
          {["p1", "p2", "p3", "p4", "p5", "p6"].map((k) => (
            <div key={k} className="w-2 h-8 bg-gold rounded-full" />
          ))}
        </div>

        <div className="max-w-2xl mx-auto px-10">
          <div className="text-center mb-12">
            <p className="font-body text-xs tracking-[0.25em] uppercase text-gold mb-3">
              RESERVE YOUR TABLE
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-brown mb-2">
              RESERVATIONS
            </h2>
            <GoldDivider />
            <p className="font-body text-brown-medium">
              Join us for an unforgettable royal dining experience.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-parchment-light rounded-xl shadow-royal p-8 space-y-5"
            data-ocid="reservations.modal"
          >
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="guest-name"
                  className="font-body text-xs tracking-[0.1em] uppercase text-brown-light font-semibold"
                >
                  Full Name *
                </label>
                <Input
                  id="guest-name"
                  data-ocid="reservations.input"
                  placeholder="Your name"
                  value={formData.guestName}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, guestName: e.target.value }))
                  }
                  className="bg-white border-gold/30 focus:border-gold font-body text-brown"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="booking-date"
                  className="font-body text-xs tracking-[0.1em] uppercase text-brown-light font-semibold"
                >
                  Date *
                </label>
                <Input
                  id="booking-date"
                  data-ocid="reservations.input"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, date: e.target.value }))
                  }
                  min={new Date().toISOString().split("T")[0]}
                  className="bg-white border-gold/30 focus:border-gold font-body text-brown"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="booking-time"
                  className="font-body text-xs tracking-[0.1em] uppercase text-brown-light font-semibold"
                >
                  Time *
                </label>
                <Select
                  value={formData.time}
                  onValueChange={(v) => setFormData((p) => ({ ...p, time: v }))}
                >
                  <SelectTrigger
                    id="booking-time"
                    data-ocid="reservations.select"
                    className="bg-white border-gold/30 focus:border-gold font-body text-brown"
                  >
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {TIME_SLOTS.map((slot) => (
                      <SelectItem key={slot} value={slot} className="font-body">
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="num-guests"
                  className="font-body text-xs tracking-[0.1em] uppercase text-brown-light font-semibold"
                >
                  Guests *
                </label>
                <Select
                  value={formData.numberOfGuests}
                  onValueChange={(v) =>
                    setFormData((p) => ({ ...p, numberOfGuests: v }))
                  }
                >
                  <SelectTrigger
                    id="num-guests"
                    data-ocid="reservations.select"
                    className="bg-white border-gold/30 focus:border-gold font-body text-brown"
                  >
                    <SelectValue placeholder="Number of guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <SelectItem
                        key={n}
                        value={String(n)}
                        className="font-body"
                      >
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="special-requests"
                  className="font-body text-xs tracking-[0.1em] uppercase text-brown-light font-semibold"
                >
                  Special Requests
                </label>
                <Textarea
                  id="special-requests"
                  data-ocid="reservations.textarea"
                  placeholder="Dietary requirements, celebrations..."
                  value={formData.specialRequests}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      specialRequests: e.target.value,
                    }))
                  }
                  className="bg-white border-gold/30 focus:border-gold font-body text-brown resize-none h-20"
                />
              </div>
            </div>

            <div className="text-center pt-2">
              <Button
                type="submit"
                data-ocid="reservations.submit_button"
                disabled={submitMutation.isPending}
                className="bg-gold hover:bg-gold-dark text-brown font-body font-bold text-sm tracking-[0.15em] uppercase px-10 py-3 h-auto rounded-lg shadow-gold transition-all duration-200"
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    PROCESSING...
                  </>
                ) : (
                  "BOOK YOUR EXPERIENCE"
                )}
              </Button>
            </div>

            {submitMutation.isSuccess && (
              <div
                data-ocid="reservations.success_state"
                className="text-center text-sm font-body text-gold font-semibold py-2"
              >
                ✦ Your reservation has been confirmed. We await your arrival.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        ref={setRef("contact")}
        id="contact"
        className="bg-maroon text-white"
        data-ocid="footer.section"
      >
        <div className="border-t-2 border-gold/40" />
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <PalaceSVG />
                <div className="text-center mt-1">
                  <div className="font-serif text-xs tracking-[0.08em] text-gold lowercase">
                    www.kolkatarajbari.com
                  </div>
                </div>
              </div>
              <p className="font-body text-xs text-white/70 leading-relaxed">
                A heritage Bengali dining experience in the heart of Ballygunge,
                Kolkata.
              </p>
            </div>

            {/* About */}
            <div>
              <h3 className="font-body text-xs tracking-[0.2em] uppercase text-gold font-bold mb-4">
                ABOUT US
              </h3>
              <ul className="space-y-2">
                {ABOUT_LINKS.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      className="font-body text-xs text-white/70 hover:text-gold transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-body text-xs tracking-[0.2em] uppercase text-gold font-bold mb-4">
                QUICK LINKS
              </h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => scrollTo(item.key)}
                      data-ocid={`footer.${item.key}.link`}
                      className="font-body text-xs text-white/70 hover:text-gold transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-body text-xs tracking-[0.2em] uppercase text-gold font-bold mb-4">
                CONTACT
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                  <span className="font-body text-xs text-white/70 leading-relaxed">
                    12 Raja Lane, Ballygunge
                    <br />
                    Kolkata — 700019
                    <br />
                    West Bengal, India
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={14} className="text-gold shrink-0" />
                  <a
                    href="tel:+913324567890"
                    className="font-body text-xs text-white/70 hover:text-gold transition-colors"
                  >
                    +91 33 2456 7890
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-gold shrink-0" />
                  <a
                    href="mailto:reservations@kolkatarajbari.com"
                    className="font-body text-xs text-white/70 hover:text-gold transition-colors break-all"
                  >
                    reservations@kolkatarajbari.com
                  </a>
                </li>
              </ul>

              <div className="mt-5">
                <p className="font-body text-xs tracking-[0.2em] uppercase text-gold font-bold mb-3">
                  SOCIALS
                </p>
                <div className="flex gap-3">
                  {[
                    {
                      icon: Instagram,
                      label: "Instagram",
                      href: "https://instagram.com",
                    },
                    {
                      icon: Facebook,
                      label: "Facebook",
                      href: "https://facebook.com",
                    },
                    {
                      icon: Twitter,
                      label: "Twitter",
                      href: "https://twitter.com",
                    },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      data-ocid={`footer.${label.toLowerCase()}.link`}
                      className="w-8 h-8 rounded-full border border-gold/40 hover:border-gold hover:bg-gold/10 flex items-center justify-center transition-all duration-200"
                    >
                      <Icon size={14} className="text-white/70" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gold/20">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-xs text-white/50">
              © {new Date().getFullYear()} Kolkata Rajbari. All rights reserved.
            </p>
            <Link
              to="/admin"
              data-ocid="footer.admin.link"
              className="font-body text-xs text-white/30 hover:text-gold/60 transition-colors"
            >
              Admin
            </Link>
            <p className="font-body text-xs text-white/40">
              Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/60 hover:text-gold transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const rootRoute = createRootRoute({ component: Outlet });
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: MainSite,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPanel,
});
const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
