// First set of images
const set1 = [
  "/_next/Charlie_Hunnam_(53619946303).jpg",
  "/_next/Kacey-Musgraves-grammy-feb-2025-a-billboard-1548.jpg",
  "/_next/avJFARzEPaB24rKQUYLinGQqilL.jpg",
  "/_next/WhatsApp%20Image%202026-03-17%20at%202.58.38%20PM.jpeg",
];

// Second set of images
const set2 = [
  "/images/speaker1s.png",
  "https://i.postimg.cc/pXhq90Kn/Sebastian-Stan-in-2024.jpg",
  "/images/speaker6s.png",
  "/images/speaker2s.png",
];

let currentSet = 0;

const cols = document.querySelectorAll(".col-x");

// Attach listener to ONE animated element (they run in sync)
const trigger = document.querySelector(".animate-slide-down");

trigger.addEventListener("animationiteration", () => {
  console.log("Cycle complete → swapping images");

  const nextSet = currentSet === 0 ? set2 : set1;

  cols.forEach((col, index) => {
    const img = col.querySelector(".img");
    if (img && nextSet[index]) {
      img.src = nextSet[index];
    }
    img.style.opacity = 0;

    setTimeout(() => {
      img.src = nextSet[index];
      img.style.opacity = 1;
    }, 200);
  });

  currentSet = currentSet === 0 ? 1 : 0;
});
