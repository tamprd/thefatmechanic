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

  /* ---------- EVENTS ----------------------------------------------------- */
  events: [
    {
      title: "Budget Enduro",
      blurb: "$1,000 to enter. Real cars, real people, real racing. Grassroots endurance racing that doesn't need a second mortgage.",
      img: "assets/img/event-budget-enduro.webp",
      url: "https://www.budgetenduro.com.au"
    },
    {
      title: "Tampered Motorsport",
      blurb: "The crew behind Budget Enduro. Track time, timing and good people running events properly.",
      img: "assets/img/event-tampered.webp",
      url: "https://tamperedmotorsport.com.au"
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
