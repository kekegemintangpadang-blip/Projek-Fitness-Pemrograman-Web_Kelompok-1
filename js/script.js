// =========================================================
// FITZONE
// 1. Variables + operators
// 2. Looping
// 3. Functions
// 4. Schedule filter
// 5. BMI calculator
// 6. Form validation
// 7. FAQ accordion
// 8. Mobile menu
// =========================================================

// ---------- MOBILE MENU ----------
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", function () {
  const isOpen = mobileMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
  menuBtn.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll("#mobileMenu a").forEach(function (link) {
  link.addEventListener("click", function () {
    mobileMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
  });
});

// ---------- SCHEDULE FILTER ----------
const scheduleData = {
  Monday: [
    { time: "06:30", name: "Strength Lab", trainer: "Alex Morgan", type: "STRENGTH" },
    { time: "17:00", name: "Yoga Flow", trainer: "Maya Chen", type: "MOBILITY" },
    { time: "19:00", name: "HIIT Burn", trainer: "Ryan Cole", type: "CARDIO" }
  ],
  Tuesday: [
    { time: "07:00", name: "Functional", trainer: "Sofia Reyes", type: "FUNCTIONAL" },
    { time: "17:30", name: "Boxing Fit", trainer: "Jordan Blake", type: "BOXING" },
    { time: "19:30", name: "Personal Training", trainer: "Ethan Brooks", type: "COACHING" }
  ],
  Wednesday: [
    { time: "06:30", name: "Strength Lab", trainer: "Alex Morgan", type: "STRENGTH" },
    { time: "17:00", name: "Boxing Fit", trainer: "Jordan Blake", type: "BOXING" },
    { time: "19:00", name: "Functional", trainer: "Sofia Reyes", type: "FUNCTIONAL" }
  ],
  Thursday: [
    { time: "07:00", name: "Yoga Flow", trainer: "Maya Chen", type: "MOBILITY" },
    { time: "17:30", name: "HIIT Burn", trainer: "Ryan Cole", type: "CARDIO" },
    { time: "19:30", name: "Personal Training", trainer: "Ethan Brooks", type: "COACHING" }
  ],
  Friday: [
    { time: "06:30", name: "Strength Lab", trainer: "Alex Morgan", type: "STRENGTH" },
    { time: "17:00", name: "HIIT Burn", trainer: "Ryan Cole", type: "CARDIO" },
    { time: "19:00", name: "Boxing Fit", trainer: "Jordan Blake", type: "BOXING" }
  ],
  Saturday: [
    { time: "08:00", name: "Functional", trainer: "Sofia Reyes", type: "FUNCTIONAL" },
    { time: "10:00", name: "Yoga Flow", trainer: "Maya Chen", type: "MOBILITY" },
    { time: "16:00", name: "Personal Training", trainer: "Ethan Brooks", type: "COACHING" }
  ]
};

const scheduleList = document.getElementById("scheduleList");
const dayButtons = document.querySelectorAll(".day-btn");

// Function to display schedule based on selected day (Table Rows)
function showSchedule(day) {
  const classes = scheduleData[day];
  scheduleList.innerHTML = "";

  // Looping: render every class for the selected day
  classes.forEach(function (item) {
    const row = document.createElement("tr");
    row.className = "border-b border-white/10 bg-[#101417] transition-colors hover:bg-[#14191d] animate-[fadeUp_0.35s_ease_both]";
    row.innerHTML = `
      <td class="py-5 px-6 font-extrabold text-lg">${item.time}</td>
      <td class="py-5 px-6 font-bold">${item.name}</td>
      <td class="py-5 px-6 text-gray-400 text-sm">${item.trainer}</td>
      <td class="py-5 px-6 text-right text-fit-lime text-xs font-extrabold tracking-widest">${item.type}</td>
    `;
    scheduleList.appendChild(row);
  });
}

dayButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    dayButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    showSchedule(button.dataset.day);
  });
});

// Initial schedule
showSchedule("Monday");

// ---------- BMI CALCULATOR ----------
const bmiButton = document.getElementById("bmiBtn");
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const bmiValue = document.getElementById("bmiValue");
const bmiCategory = document.getElementById("bmiCategory");
const bmiMessage = document.getElementById("bmiMessage");

function calculateBMI(weight, heightCm) {
  const heightMeter = heightCm / 100;
  const bmi = weight / (heightMeter * heightMeter);
  return bmi;
}

function getBMICategory(bmi) {
  if (bmi < 18.5) {
    return { category: "Underweight", message: "BMI berada di bawah rentang umum." };
  } else if (bmi < 25) {
    return { category: "Healthy range", message: "BMI berada dalam rentang umum yang sehat." };
  } else if (bmi < 30) {
    return { category: "Overweight", message: "BMI berada di atas rentang umum." };
  } else {
    return { category: "Obesity range", message: "BMI berada pada rentang obesitas." };
  }
}

bmiButton.addEventListener("click", function () {
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);

  if (weight <= 0 || height <= 0 || Number.isNaN(weight) || Number.isNaN(height)) {
    bmiValue.textContent = "--";
    bmiCategory.textContent = "Input belum valid";
    bmiMessage.textContent = "Masukkan berat dan tinggi badan yang benar.";
    return;
  }

  const bmi = calculateBMI(weight, height);
  const result = getBMICategory(bmi);

  bmiValue.textContent = bmi.toFixed(1);
  bmiCategory.textContent = result.category;
  bmiMessage.textContent = result.message;
});

// ---------- FORM VALIDATION ----------
const joinForm = document.getElementById("joinForm");
const successMessage = document.getElementById("formSuccess");

function setError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

function clearErrors() {
  setError("nameError", "");
  setError("emailError", "");
  setError("planError", "");
  setError("goalError", "");
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

joinForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();
  successMessage.textContent = "";

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const plan = document.getElementById("plan").value;
  const goal = document.getElementById("goal").value.trim();

  let isValid = true;

  if (name.length < 3) {
    setError("nameError", "Nama minimal 3 karakter.");
    isValid = false;
  }

  if (!validateEmail(email)) {
    setError("emailError", "Masukkan email yang valid.");
    isValid = false;
  }

  if (plan === "") {
    setError("planError", "Pilih membership.");
    isValid = false;
  }

  if (goal.length < 5) {
    setError("goalError", "Tuliskan tujuan minimal 5 karakter.");
    isValid = false;
  }

  if (isValid) {
    successMessage.textContent = `✓ Terima kasih, ${name}! Permintaan membership ${plan} berhasil dikirim.`;
    joinForm.reset();
  }
});

// ---------- FAQ ACCORDION ----------
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {
  question.addEventListener("click", function () {
    const currentItem = question.parentElement;
    const currentAnswer = currentItem.querySelector(".faq-answer");
    const isOpen = currentItem.classList.contains("open");

    // Close other FAQ items
    document.querySelectorAll(".faq-item").forEach(function (item) {
      item.classList.remove("open");
      item.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      item.querySelector(".faq-answer").style.maxHeight = null;
    });

    // Open selected item if it was closed
    if (!isOpen) {
      currentItem.classList.add("open");
      question.setAttribute("aria-expanded", "true");
      currentAnswer.style.maxHeight = currentAnswer.scrollHeight + "px";
    }
  });
});