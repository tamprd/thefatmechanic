/* ==========================================================================
   THE FAT MECHANIC — SITE CONFIG
   This is the only file you should need to touch for day-to-day updates.
   Anything left as "" (empty) is hidden on the site automatically.
   ========================================================================== */

window.TFM = {

  /* ---------- SOCIALS ---------------------------------------------------- */
  socials: {
    tiktok:    "https://www.tiktok.com/@thefatmechanic",
    instagram: "",   // e.g. "https://www.instagram.com/thefatmechanic"
    youtube:   "",   // e.g. "https://www.youtube.com/@thefatmechanic"
    facebook:  ""
  },

  tiktokFollowers: "100K+",

  /* ---------- VIDEOS -----------------------------------------------------
     Paste a TikTok video link (from Share > Copy link, the long form:
     https://www.tiktok.com/@thefatmechanic/video/1234567890123456789).
     - If "thumb" is blank, the site tries to pull the thumbnail + caption
       from TikTok automatically.
     - "tag" drives the filter buttons: projects | tips | realtalk | oscar
     - First 8 are shown. Newest at the top.
     ---------------------------------------------------------------------- */
  videos: [
    { url: "https://www.tiktok.com/@thefatmechanic", title: "Under the bonnet with the supervisor", tag: "projects", thumb: "assets/img/under-the-bonnet.webp" },
    { url: "https://www.tiktok.com/@thefatmechanic", title: "Oscar's quality control inspection",    tag: "oscar",    thumb: "assets/img/real-oscar.webp" },
    { url: "https://www.tiktok.com/@thefatmechanic", title: "Brakes: when to actually worry",         tag: "tips",     thumb: "assets/img/card-tips.webp" },
    { url: "https://www.tiktok.com/@thefatmechanic", title: "Straight talk from the workshop",        tag: "realtalk", thumb: "assets/img/real-adam.webp" },
    { url: "https://www.tiktok.com/@thefatmechanic", title: "Project car: bad idea, good times",      tag: "projects", thumb: "assets/img/card-projects.webp" },
    { url: "https://www.tiktok.com/@thefatmechanic", title: "The tools I'd actually buy again",       tag: "tips",     thumb: "assets/img/card-tools.webp" }
  ],

  /* ---------- EVENTS ----------------------------------------------------- */
  events: [
    {
      title: "Budget Enduro",
      blurb: "Grassroots endurance racing that doesn't need a second mortgage. Run by Tampered Motorsport.",
      img: "assets/img/card-events.webp",
      url: ""   // e.g. "https://budgetenduro.com.au"
    },
    {
      title: "Tampered Motorsport",
      blurb: "The crew behind the events. Track time, timing and good people running it properly.",
      img: "assets/img/card-projects.webp",
      url: ""
    },
    {
      title: "VIP Track Days",
      blurb: "Bring your road car, get it on a real circuit, and find out what it can actually do.",
      img: "assets/img/card-story.webp",
      url: ""
    }
  ],

  /* ---------- MERCH ------------------------------------------------------
     storeUrl: where "Shop merch" goes (Shopify, Printful, Square Online…).
     Leave blank and the buttons send people to the contact form instead.
     type: tee | hoodie | stubby | stickers   (draws the product mock-up)
     ---------------------------------------------------------------------- */
  merch: {
    storeUrl: "",
    items: [
      { name: "Keep Livin' Large tee", price: "", type: "tee",      url: "" },
      { name: "Workshop hoodie",        price: "", type: "hoodie",   url: "" },
      { name: "Stubby holder",          price: "", type: "stubby",   url: "" },
      { name: "Sticker pack",           price: "", type: "stickers", url: "" }
    ]
  },

  /* ---------- CONTACT ----------------------------------------------------
     formEndpoint: a Formspree / Basin / Web3Forms URL to receive messages.
     If blank, the form opens the visitor's email app addressed to "email".
     ---------------------------------------------------------------------- */
  contact: {
    email: "hello@thefatmechanic.com.au",   // CHANGE ME to a real inbox
    formEndpoint: ""                         // e.g. "https://formspree.io/f/xxxxxxx"
  },

  /* ---------- SITE CREDIT --------------------------------------------- */
  credit: {
    url: ""   // Desk Frog website. Blank = badge shows but isn't a link.
  },

  /* ---------- WORKSHOP PLUG (optional) ---------------------------------- */
  workshop: {
    name: "Midas Ipswich",
    url: ""   // booking / website link. Blank = hidden.
  }
};
