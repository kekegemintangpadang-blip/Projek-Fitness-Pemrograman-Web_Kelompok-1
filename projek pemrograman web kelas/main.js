/**
 * PULSEFIT - Main JavaScript File (js/main.js)
 * Menangani interaksi UI, rendering data dari FitnessAPI (api.js),
 * menu mobile, filtering program, dan kalkulator BMI.
 */

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Inisialisasi Lucide Icons
  initIcons();

  // 2. Mobile Menu Toggle
  setupMobileMenu();

  // 3. Load & Render Program Latihan dari API
  await setupProgramSection();

  // 4. Kalkulator BMI Interaktif
  setupBMICalculator();

  // 5. Smooth Scroll Navigasi
  setupSmoothScroll();
});

/**
 * Inisialisasi icon Lucide
 */
function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * Toggle navigasi menu di tampilan mobile
 */
function setupMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Sembunyikan menu saat salah satu link diklik
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }
}

/**
 * Mengambil dan menampilkan program latihan dengan fitur filter kategori
 */
async function setupProgramSection() {
  const programGrid = document.getElementById("program-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  if (!programGrid) return;

  // Render animasi skeleton loading
  renderSkeleton(programGrid);

  // Ambil data program dari FitnessAPI (api.js)
  let allPrograms = [];
  try {
    if (window.FitnessAPI) {
      allPrograms = await window.FitnessAPI.getPrograms("all");
    } else if (window.getProgramsData) {
      allPrograms = await window.getProgramsData("all");
    }
  } catch (error) {
    console.error("Gagal mengambil data program:", error);
    programGrid.innerHTML = `