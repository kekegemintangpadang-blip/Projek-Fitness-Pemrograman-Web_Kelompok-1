code = """/**
 * PULSEFIT - Fitness Website API Service (api.js)
 * File ini berfungsi sebagai API Layer / Data Service.
 * Berisi Mock Data dan Fungsi Fetch yang mensimulasikan koneksi ke Backend REST API.
 * Bisa langsung dicopy-paste ke VS Code.
 */

// ==========================================
// 1. MOCK DATA (DATABASE SEMENTARA)
// ==========================================

const MOCK_DATA = {
  // Data Program Latihan
  programs: [
    {
      id: 1,
      title: "Bodybuilding & Muscle Gain",
      category: "strength",
      duration: "60 Menit",
      trainer: "Alex Pratama",
      level: "Intermediate",
      calories: "450-600 kcal",
      price: "Free for Pro",
      image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
      description: "Fokus pada pembentukan hipertrofi otot dengan skema progresif overload dan teknik isolasi beban."
    },
    {
      id: 2,
      title: "High Intensity Fat Burn (HIIT)",
      category: "cardio",
      duration: "45 Menit",
      trainer: "Sarah Wijaya",
      level: "Semua Tingkat",
      calories: "600-800 kcal",
      price: "Free for All",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
      description: "Kombinasi gerakan interval berintensitas tinggi untuk membakar lemak cepat dan memicu efek afterburn (EPOC)."
    },
    {
      id: 3,
      title: "Vinyasa Flow & Flexibility",
      category: "yoga",
      duration: "50 Menit",
      trainer: "David Santos",
      level: "Pemula",
      calories: "250-350 kcal",
      price: "Free for Pro",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80",
      description: "Meningkatkan kelenturan tubuh, mempebaiki postur tulang belakang, serta melatih kestabilan pernapasan."
    },
    {
      id: 4,
      title: "Powerlifting Heavy Duty",
      category: "strength",
      duration: "75 Menit",
      trainer: "Alex Pratama",
      level: "Advanced",
      calories: "500-700 kcal",
      price: "VIP Only",
      image: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&w=600&q=80",
      description: "Program kekuatan maksimal berfokus pada 3 gerakan utama: Barbell Squat, Bench Press, dan Deadlift."
    },
    {
      id: 5,
      title: "CrossFit Functional Circuit",
      category: "cardio",
      duration: "50 Menit",
      trainer: "David Santos",
      level: "Intermediate",
      calories: "550-750 kcal",
      price: "Free for Pro",
      image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=600&q=80",
      description: "Sirkuit latihan fungsional menggunakan kettlebell, plyometrics, dan beban tubuh untuk stamina dan ketahanan fisik."
    },
    {
      id: 6,
      title: "Pilates Core Reformer",
      category: "yoga",
      duration: "45 Menit",
      trainer: "Sarah Wijaya",
      level: "Pemula",
      calories: "300-400 kcal",
      price: "VIP Only",
      image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=600&q=80",
      description: "Memperkuat otot perut dan pinggul (core stability) serta membentuk lekuk tubuh yang proporsional."
    }
  ],

  // Data Instruktur / Trainer
  trainers: [
    {
      id: 1,
      name: "Alex Pratama",
      role: "Head Bodybuilding Coach",
      specialty: "Hypertrophy & Strength",
      experience: "8 Tahun",
      image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80",
      bio: "Mantan atlet profesional spesialis pembentukan massa otot dan persiapan kompetisi fisik."
    },
    {
      id: 2,
      name: "Sarah Wijaya",
      role: "HIIT & Weight Loss Specialist",
      specialty: "Fat Loss & Nutrition",
      experience: "6 Tahun",
      image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=600&q=80",
      bio: "Pakar transformasi tubuh melalui latihan kardio terukur dan skema defisit kalori seimbang."
    },
    {
      id: 3,
      name: "David Santos",
      role: "CrossFit & Mobility Master",
      specialty: "Functional Training & Yoga",
      experience: "7 Tahun",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
      bio: "Berfokus pada fleksibilitas sendi, pemulihan cedera ringan, dan kekuatan fungsional harian."
    }
  ],

  // Data Paket Harga Membership
  pricingPlans: [
    {
      id: "starter",
      name: "Starter Pass",
      price: "Rp 299.000",
      period: "/ bulan",
      isPopular: false,
      features: [
        "Akses Gym jam 08:00 - 17:00",
        "Akses Locker & Shower Room",
        "Free Konsultasi Awal & Body Check",
        "Akses Komunitas Fitness PulseFit"
      ]
    },
    {
      id: "pro",
      name: "Pro Fitness Pass",
      price: "Rp 499.000",
      period: "/ bulan",
      isPopular: true,
      badgeText: "Paling Populer",
      features: [
        "Akses Gym 24/7 Tanpa Batas",
        "Bebas Akses Semua Kelas Group (HIIT, Yoga)",
        "2x Sesi Personal Trainer / bulan",
        "Akses Sauna & Recovery Lounge",
        "Diskon 10% Suplemen di PulseBar"
      ]
    },
    {
      id: "vip",
      name: "Elite VIP Member",
      price: "Rp 899.000",
      period: "/ bulan",
      isPopular: false,
      features: [
        "Semua Fasilitas Pro Pass",
        "Unlimited Personal Trainer On-Demand",
        "Custom Meal Plan & Konsultasi Ahli Gizi",
        "Locker Pribadi & Handuk Gratis",
        "Gratis 1 Merchandise Exclusif PulseFit"
      ]
    }
  ]
};

// ==========================================
// 2. FUNGSI UTAMA API (SIMULASI REST API)
// ==========================================

const FitnessAPI = {
  /**
   * Mengambil semua daftar program latihan
   * @param {string} category - Optional filter ('all', 'strength', 'cardio', 'yoga')
   * @returns {Promise}
   */
  async getPrograms(category = "all") {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (category === "all") {
          resolve(MOCK_DATA.programs);
        } else {
          const filtered = MOCK_DATA.programs.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
          );
          resolve(filtered);
        }
      }, 300); // Simulasi delay jaringan 300ms
    });
  },

  /**
   * Mengambil detail program berdasarkan ID
   * @param {number} id
   * @returns {Promise}
   */
  async getProgramById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const program = MOCK_DATA.programs.find((p) => p.id === Number(id));
        resolve(program || null);
      }, 200);
    });
  },

  /**
   * Mengambil daftar semua trainer
   * @returns {Promise}
   */
  async getTrainers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_DATA.trainers);
      }, 300);
    });
  },

  /**
   * Mengambil daftar paket harga / membership
   * @returns {Promise}
   */
  async getPricingPlans() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_DATA.pricingPlans);
      }, 200);
    });
  },

  /**
   * Simulasi pengiriman form pendaftaran member baru (POST request)
   * @param {Object} formData - Data pendaftar { name, email, planId, phone }
   * @returns {Promise