// Hamburger Menu Toggle
const hamburgerMenu = document.getElementById("hamburgerMenu")
const hamburgerOverlay = document.getElementById("hamburgerOverlay")
const closeMenu = document.getElementById("closeMenu")

hamburgerMenu.addEventListener("click", () => {
  hamburgerOverlay.classList.add("active")
})

closeMenu.addEventListener("click", () => {
  hamburgerOverlay.classList.remove("active")
})

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburgerOverlay.contains(e.target) && !hamburgerMenu.contains(e.target)) {
    hamburgerOverlay.classList.remove("active")
  }
})

// Statistics Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.floor(current).toLocaleString()
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target.toLocaleString()
      }
    }

    updateCounter()
  })
}

// Intersection Observer for counter animation
const statsSection = document.querySelector(".stats-section")
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters()
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

if (statsSection) {
  statsObserver.observe(statsSection)
}

// Environmental Impact Calculator
const calculateBtn = document.querySelector(".calculate-btn")
const wasteAmountInput = document.getElementById("wasteAmount")
const co2SavedElement = document.getElementById("co2Saved")
const energyGeneratedElement = document.getElementById("energyGenerated")

calculateBtn.addEventListener("click", () => {
  const wasteAmount = Number.parseFloat(wasteAmountInput.value) || 0

  // Simple calculation formulas (these would be more complex in real implementation)
  const co2Saved = (wasteAmount * 0.15).toFixed(1) // 0.15 kg CO2 per kg waste
  const energyGenerated = (wasteAmount * 0.6).toFixed(1) // 0.6 kWh per kg waste

  co2SavedElement.textContent = `${co2Saved} kg`
  energyGeneratedElement.textContent = `${energyGenerated} kWh`

  // Add animation effect
  co2SavedElement.style.transform = "scale(1.1)"
  energyGeneratedElement.style.transform = "scale(1.1)"

  setTimeout(() => {
    co2SavedElement.style.transform = "scale(1)"
    energyGeneratedElement.style.transform = "scale(1)"
  }, 300)
})

// Testimonials Slider
let currentTestimonial = 0
const testimonialCards = document.querySelectorAll(".testimonial-card")
const testimonialDots = document.querySelectorAll(".dot")

function showTestimonial(index) {
  testimonialCards.forEach((card, i) => {
    card.classList.toggle("active", i === index)
  })

  testimonialDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index)
  })
}

testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentTestimonial = index
    showTestimonial(currentTestimonial)
  })
})

// Auto-advance testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonialCards.length
  showTestimonial(currentTestimonial)
}, 5000)

// Tips Carousel
let currentTip = 0
const tipCards = document.querySelectorAll(".tip-card")
const prevTipBtn = document.getElementById("prevTip")
const nextTipBtn = document.getElementById("nextTip")

function showTip(index) {
  tipCards.forEach((card, i) => {
    card.classList.toggle("active", i === index)
  })
}

prevTipBtn.addEventListener("click", () => {
  currentTip = currentTip > 0 ? currentTip - 1 : tipCards.length - 1
  showTip(currentTip)
})

nextTipBtn.addEventListener("click", () => {
  currentTip = (currentTip + 1) % tipCards.length
  showTip(currentTip)
})

// Auto-advance tips
setInterval(() => {
  currentTip = (currentTip + 1) % tipCards.length
  showTip(currentTip)
}, 4000)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.backdropFilter = "blur(10px)"
  } else {
    header.style.background = "var(--white)"
    header.style.backdropFilter = "none"
  }
})

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Show first testimonial and tip
  showTestimonial(0)
  showTip(0)

  // Add loading animation to stats cards
  const statCards = document.querySelectorAll(".stat-card")
  statCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
    card.style.animation = "fadeInUp 0.6s ease forwards"
  })
})

// CSS animation for fade in up effect
const style = document.createElement("style")
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`
document.head.appendChild(style)
