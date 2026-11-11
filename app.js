/**
 * misspbeauty_parlor - Bulawayo, Zimbabwe
 * Premium Boutique, 100% Virgin Hair & SADC Brand Agent Platform
 * Features: Interactive Color Swatches, Custom Hair Lengths (8"-42"), Size Guides, Dynamic Pricing
 * WhatsApp: +263 78 550 5967 | Calls: 0714895272
 */

// Primary WhatsApp & Phone Contacts for misspbeauty_parlor
const PRIMARY_WHATSAPP_NUMBER = '263785505967'; // +263 78 550 5967
const SECONDARY_PHONE_NUMBER = '0714895272';   // +263 71 489 5272
const STORE_LOCATION = 'Bulawayo CBD (Fife Street), Zimbabwe';

// Global App State
const state = {
  currency: 'USD',
  currencyRates: {
    USD: { symbol: '$', rate: 1 },
    ZiG: { symbol: 'ZiG ', rate: 26.5 },
    ZAR: { symbol: 'R ', rate: 18.2 }
  },
  activeCategory: 'all',
  activeColorFilter: 'all',
  activeStyleFilter: 'all',
  searchQuery: '',
  stockFilterOnly: false,
  sortBy: 'featured',
  cart: JSON.parse(localStorage.getItem('misspbeauty_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('misspbeauty_wishlist') || '[]'),
  customUploads: JSON.parse(localStorage.getItem('misspbeauty_custom_uploads') || '[]'),
  currentModalProduct: null,
  currentModalSelectedOptions: {},
  currentModalSelectedColor: null,
  currentModalQty: 1,
  currentUploadedImageBase64: null,
  adWeeklyRate: parseFloat(localStorage.getItem('misspbeauty_ad_weekly_rate') || '1.00'),
  sponsoredAds: [],
  activeAdsTab: 'active',
  selectedAdDurationWeeks: 1,
  selectedRenewDurationWeeks: 1,
  currentAdDraft: {
    image: '',
    businessName: '',
    category: '100% Human Hair & Wigs',
    city: 'Bulawayo CBD',
    whatsapp: '',
    services: '',
    tiktok: '',
    instagram: '',
    facebook: '',
    durationWeeks: 1
  }
};

// Preset Color Swatches Definition
const COLOR_SWATCHES = {
  'Natural Black': { class: 'dot-1b', hex: '#121212', label: 'Natural Black #1B' },
  'Honey Blonde': { class: 'dot-613', hex: '#e5c365', label: 'Honey Blonde #613' },
  'Burgundy': { class: 'dot-99j', hex: '#5c1226', label: 'Burgundy Wine 99J' },
  'Ombre Highlight': { class: 'dot-ombre', hex: '#8a6225', label: 'Ombre Piano #4/27' },
  'Emerald Green': { class: 'dot-emerald', hex: '#0d5f43', label: 'Emerald Green' },
  'Royal Navy': { class: 'dot-royal', hex: '#1e3a8a', label: 'Royal Navy' },
  'Crimson Red': { class: 'dot-crimson', hex: '#991b1b', label: 'Crimson Red' },
  'Champagne Gold': { class: 'dot-gold', hex: '#d4af37', label: 'Champagne Gold' },
  'Silver Diamond': { class: 'dot-silver', hex: '#cbd5e1', label: 'Silver Diamond' },
  'Glossy Black': { class: 'dot-1b', hex: '#121212', label: 'Glossy Black' },
  'Nude Blush': { class: 'dot-nude', hex: '#d7b59a', label: 'Nude Gloss' },
  'Chocolate Brown': { class: 'dot-choco', hex: '#3d1c02', label: 'Chocolate Brown #4' },
  'Maroon': { class: 'dot-maroon', hex: '#5d0020', label: 'Deep Maroon Cherry' },
  'Chestnut Brown': { class: 'dot-brown', hex: '#7b4319', label: 'Chestnut Brown #30' },
  'Ginger': { class: 'dot-ginger', hex: '#c8560a', label: 'Warm Ginger Copper #350' },
  'Ankara Blue': { class: 'dot-ankara', hex: '#1a3c8f', label: 'Ankara Royal Blue Print' },
  'Kente Gold': { class: 'dot-kente', hex: '#d4a017', label: 'Kente Gold Print' },
  'Shweshwe Red': { class: 'dot-shweshwe', hex: '#8b0000', label: 'Shweshwe Crimson' },
  'Chitenge Violet': { class: 'dot-chitenge', hex: '#7b2d8b', label: 'Chitenge Violet Print' }
};

// Initial Product Catalog
const baseProductsData = [
  // 100% Virgin Human Hair & Wigs (Lengths 8" to 42")
  {
    id: 'hair-1',
    category: 'hair',
    title: 'Miss P Signature 13x4 HD Frontal Lace Bone Straight Wig (Grade 12A)',
    brand: "misspbeauty_parlor Exclusive",
    tag: 'BONE STRAIGHT (8"-42")',
    tagClass: 'tag-hot',
    rating: 5.0,
    reviewsCount: 142,
    basePrice: 185,
    originalPrice: 260,
    inStock: true,
    bulawayoStock: true,
    stockCount: 8,
    colors: ['Natural Black', 'Honey Blonde', 'Burgundy', 'Ombre Highlight', 'Chocolate Brown', 'Maroon', 'Chestnut Brown', 'Ginger'],
    images: {
      'Natural Black': [
        'https://files.catbox.moe/2ratyz.jpg'
      ],
      'Honey Blonde': [
        'https://files.catbox.moe/dcyt78.jpg'
      ],
      'Burgundy': [
        'https://files.catbox.moe/miima6.jpg'
      ],
      'Ombre Highlight': [
        'https://files.catbox.moe/fhwzm6.jpg'
      ],
      'Chocolate Brown': [
        'https://files.catbox.moe/q7lwbz.jpg'
      ],
      'Maroon': [
        'https://files.catbox.moe/rm01ky.jpg'
      ],
      'Chestnut Brown': [
        'https://files.catbox.moe/ifuan3.jpg'
      ],
      'Ginger': [
        'https://files.catbox.moe/3isba7.jpg'
      ]
    },
    shortDesc: '100% Certified Virgin Human Hair bone straight wig. Super silky mirror-like glass shine, pre-plucked invisible HD lace melting flawlessly into African hairlines.',
    specs: [
      '100% Certified Virgin Human Hair (Grade 12A)',
      'Pre-plucked natural hairline with baby hairs',
      'Bleaches to #613 with zero shedding',
      'Tangle-free, lasts 2+ years with proper care'
    ],
    optionGroups: [
      {
        id: 'length',
        label: 'Hair Length',
        type: 'pills',
        options: [
          { name: '8 inches', priceDiff: -60 },
          { name: '10 inches', priceDiff: -50 },
          { name: '12 inches', priceDiff: -40 },
          { name: '14 inches', priceDiff: -30 },
          { name: '16 inches', priceDiff: -20 },
          { name: '18 inches', priceDiff: -10 },
          { name: '20 inches', priceDiff: 0, default: true },
          { name: '22 inches', priceDiff: 20 },
          { name: '24 inches', priceDiff: 45 },
          { name: '26 inches', priceDiff: 70 },
          { name: '28 inches', priceDiff: 95 },
          { name: '30 inches', priceDiff: 120 },
          { name: '32 inches', priceDiff: 145 },
          { name: '34 inches', priceDiff: 175 },
          { name: '36 inches', priceDiff: 205 },
          { name: '38 inches', priceDiff: 235 },
          { name: '40 inches', priceDiff: 265 },
          { name: '42 inches (Extreme Floor Length)', priceDiff: 300 }
        ]
      },
      {
        id: 'density',
        label: 'Wig Density',
        type: 'pills',
        options: [
          { name: '150% (Natural Everyday)', priceDiff: 0, default: true },
          { name: '180% (Full Glam)', priceDiff: 25 },
          { name: '250% (Super Thick Baddie)', priceDiff: 55 }
        ]
      },
      {
        id: 'laceType',
        label: 'Lace Construction',
        type: 'pills',
        options: [
          { name: '13x4 HD Transparent Lace', priceDiff: 0, default: true },
          { name: '13x6 Deep Parting Lace', priceDiff: 20 },
          { name: 'Glueless 3D Dome Cap (Wear & Go)', priceDiff: 15 }
        ]
      }
    ]
  },
  {
    id: 'hair-2',
    category: 'hair',
    title: 'Brazilian Deep Wave 13x6 HD Lace Frontal Wig (8"–42")',
    brand: "misspbeauty_parlor Exclusive",
    tag: 'DEEP WAVE (8"-42")',
    tagClass: 'tag-gold',
    rating: 4.9,
    reviewsCount: 98,
    basePrice: 175,
    originalPrice: 240,
    inStock: true,
    bulawayoStock: true,
    stockCount: 6,
    colors: ['Natural Black', 'Burgundy', 'Honey Blonde', 'Chocolate Brown', 'Maroon', 'Chestnut Brown', 'Ginger'],
    images: {
      'Natural Black': [
        'https://files.catbox.moe/28r9b0.jpg'
      ],
      'Burgundy': [
        'https://files.catbox.moe/miima6.jpg'
      ],
      'Honey Blonde': [
        'https://files.catbox.moe/dcyt78.jpg'
      ],
      'Chocolate Brown': [
        'https://files.catbox.moe/q7lwbz.jpg'
      ],
      'Maroon': [
        'https://files.catbox.moe/rm01ky.jpg'
      ],
      'Chestnut Brown': [
        'https://files.catbox.moe/ifuan3.jpg'
      ],
      'Ginger': [
        'https://files.catbox.moe/3isba7.jpg'
      ]
    },
    shortDesc: 'Bouncy, luscious deep waves that hold definition wet or dry. 13x6 deep parting space with ultra-thin HD lace designed for seamless blending.',
    specs: [
      'Grade 12A 100% Virgin Hair',
      'Can be styled straight or deep curly',
      'Wash & Wear low maintenance',
      'Natural #1B Virgin Dark Brown/Black'
    ],
    optionGroups: [
      {
        id: 'length',
        label: 'Hair Length',
        type: 'pills',
        options: [
          { name: '8 inches', priceDiff: -60 },
          { name: '10 inches', priceDiff: -50 },
          { name: '12 inches', priceDiff: -40 },
          { name: '14 inches', priceDiff: -30 },
          { name: '16 inches', priceDiff: -20 },
          { name: '18 inches', priceDiff: 0, default: true },
          { name: '22 inches', priceDiff: 35 },
          { name: '26 inches', priceDiff: 75 },
          { name: '30 inches', priceDiff: 120 },
          { name: '34 inches', priceDiff: 170 },
          { name: '38 inches', priceDiff: 220 },
          { name: '42 inches (Extreme Floor Length)', priceDiff: 280 }
        ]
      },
      {
        id: 'density',
        label: 'Density',
        type: 'pills',
        options: [
          { name: '180% Full', priceDiff: 0, default: true },
          { name: '220% Extra Full', priceDiff: 35 }
        ]
      }
    ]
  },
  {
    id: 'hair-3',
    category: 'hair',
    title: 'Raw Virgin Single-Donor Bundles (3 Bundles) + 5x5 HD Closure Deal',
    brand: "misspbeauty_parlor Exclusive",
    tag: 'BUNDLE PACK (8"-42")',
    tagClass: 'tag-gold',
    rating: 5.0,
    reviewsCount: 114,
    basePrice: 195,
    originalPrice: 280,
    inStock: true,
    bulawayoStock: true,
    stockCount: 5,
    colors: ['Natural Black'],
    images: {
      'Natural Black': [
        'https://files.catbox.moe/2ratyz.jpg',
        'https://files.catbox.moe/28r9b0.jpg'
      ]
    },
    shortDesc: '3 Full Virgin Bundles + matching HD 5x5 Lace Closure. Unprocessed single-donor hair with full thick ends imported directly to Bulawayo.',
    specs: [
      '300g hair bundle weight + HD Closure',
      'Authentic raw single donor hair',
      'Lasts 3 to 5 years',
      'Heat tolerant up to 450°F'
    ],
    optionGroups: [
      {
        id: 'bundleSet',
        label: 'Bundle Length Combination',
        type: 'pills',
        options: [
          { name: '10", 12", 14" + 10" Closure', priceDiff: -40 },
          { name: '16", 18", 20" + 14" Closure', priceDiff: 0, default: true },
          { name: '20", 22", 24" + 18" Closure', priceDiff: 45 },
          { name: '24", 26", 28" + 20" Closure', priceDiff: 95 },
          { name: '28", 30", 32" + 20" Closure', priceDiff: 140 },
          { name: '34", 36", 38" + 22" Closure', priceDiff: 210 },
          { name: '38", 40", 42" + 24" Closure', priceDiff: 290 }
        ]
      }
    ]
  },
  {
    id: 'hair-4',
    category: 'hair',
    title: 'Glueless Wear & Go Blunt-Cut Bob Wig (100% Virgin Hair)',
    brand: "misspbeauty_parlor Exclusive",
    tag: 'READY TO WEAR (8"-16")',
    tagClass: 'tag-hot',
    rating: 4.8,
    reviewsCount: 76,
    basePrice: 85,
    originalPrice: 120,
    inStock: true,
    bulawayoStock: true,
    stockCount: 7,
    colors: ['Natural Black', 'Honey Blonde', 'Burgundy'],
    images: {
      'Natural Black': [
        'https://files.catbox.moe/1f8jfc.jpg'
      ],
      'Honey Blonde': [
        'https://files.catbox.moe/dcyt78.jpg'
      ],
      'Burgundy': [
        'https://files.catbox.moe/miima6.jpg'
      ]
    },
    shortDesc: 'Put on in 30 seconds! Zero glue required, pre-cut lace with adjustable elastic security band.',
    specs: [
      '100% Virgin Human Hair',
      'Pre-cut 3D dome cap',
      'No gel, no glue, no salon needed',
      'Perfect for daily corporate & casual wear'
    ],
    optionGroups: [
      {
        id: 'length',
        label: 'Bob Length',
        type: 'pills',
        options: [
          { name: '8 inches', priceDiff: -15 },
          { name: '10 inches', priceDiff: 0, default: true },
          { name: '12 inches', priceDiff: 15 },
          { name: '14 inches', priceDiff: 28 },
          { name: '16 inches', priceDiff: 45 }
        ]
      }
    ]
  },

  // Luxury Dresses
  {
    id: 'dress-1',
    category: 'dresses',
    title: 'Emerald Elegance Satin High-Slit Gala Evening Gown',
    brand: "misspbeauty_parlor Couture",
    tag: 'TOP RATED',
    tagClass: 'tag-hot',
    rating: 4.9,
    reviewsCount: 88,
    basePrice: 95,
    originalPrice: 145,
    inStock: true,
    bulawayoStock: true,
    stockCount: 4,
    colors: ['Emerald Green', 'Royal Navy', 'Champagne Gold'],
    images: {
      'Emerald Green': [
        'https://files.catbox.moe/ii54pe.jpg'
      ],
      'Royal Navy': [
        'https://files.catbox.moe/ii54pe.jpg'
      ],
      'Champagne Gold': [
        'https://files.catbox.moe/ii54pe.jpg'
      ]
    },
    shortDesc: 'Liquid-drape Duchess satin evening dress on boutique dress form. Features a boned corset bodice, asymmetric thigh slit, and floor-sweeping train.',
    specs: [
      'Heavyweight stretch Duchess satin',
      'Built-in bra cups and structured boning',
      'Hidden back zipper closure',
      'Dry clean recommended'
    ],
    optionGroups: [
      {
        id: 'size',
        label: 'Dress Size (UK / Standard)',
        type: 'pills',
        options: [
          { name: 'UK 6 (XS)', priceDiff: 0 },
          { name: 'UK 8 (S)', priceDiff: 0, default: true },
          { name: 'UK 10 (M)', priceDiff: 0 },
          { name: 'UK 12 (L)', priceDiff: 0 },
          { name: 'UK 14 (XL)', priceDiff: 0 },
          { name: 'UK 16 (2XL)', priceDiff: 5 },
          { name: 'UK 18 (3XL)', priceDiff: 10 }
        ]
      }
    ]
  },
  {
    id: 'dress-2',
    category: 'dresses',
    title: 'Crimson Velvet Corset Mermaid Evening Dress',
    brand: "misspbeauty_parlor Couture",
    tag: 'COUTURE',
    tagClass: 'tag-gold',
    rating: 4.8,
    reviewsCount: 52,
    basePrice: 120,
    originalPrice: 175,
    inStock: true,
    bulawayoStock: true,
    stockCount: 3,
    colors: ['Crimson Red', 'Glossy Black'],
    images: {
      'Crimson Red': [
        'https://files.catbox.moe/z4pri9.jpg'
      ],
      'Glossy Black': [
        'https://files.catbox.moe/z4pri9.jpg'
      ]
    },
    shortDesc: 'Rich royal ruby velvet gown contoured with sculpted sweetheart neckline and fishtail skirt.',
    specs: [
      'Premium stretch micro-velvet',
      'Figure-sculpting mermaid silhouette',
      'Floor length with subtle puddle train'
    ],
    optionGroups: [
      {
        id: 'size',
        label: 'Size (UK)',
        type: 'pills',
        options: [
          { name: 'UK 8 (S)', priceDiff: 0 },
          { name: 'UK 10 (M)', priceDiff: 0, default: true },
          { name: 'UK 12 (L)', priceDiff: 0 },
          { name: 'UK 14 (XL)', priceDiff: 0 },
          { name: 'UK 16 (2XL)', priceDiff: 5 },
          { name: 'UK 18 (3XL)', priceDiff: 10 }
        ]
      }
    ]
  },
  {
    id: 'dress-3',
    category: 'dresses',
    title: 'Modern African Ankara Print Couture Maxi Gown',
    brand: "misspbeauty_parlor Couture",
    tag: 'HANDMADE ZIM',
    tagClass: 'tag-gold',
    rating: 5.0,
    reviewsCount: 79,
    basePrice: 75,
    originalPrice: 110,
    inStock: true,
    bulawayoStock: true,
    stockCount: 7,
    colors: ['Champagne Gold', 'Emerald Green', 'Royal Navy'],
    images: {
      'Champagne Gold': [
        'https://files.catbox.moe/ffpmpq.jpg'
      ],
      'Emerald Green': [
        'https://files.catbox.moe/ffpmpq.jpg'
      ],
      'Royal Navy': [
        'https://files.catbox.moe/ffpmpq.jpg'
      ]
    },
    shortDesc: '100% authentic Dutch wax cotton tailored into a show-stopping off-shoulder modern African celebration gown.',
    specs: [
      '100% Premium Cotton Ankara',
      'Vibrant color fastness - will not fade',
      'Custom tailored by certified Bulawayo couturiers'
    ],
    optionGroups: [
      {
        id: 'size',
        label: 'Size (UK)',
        type: 'pills',
        options: [
          { name: 'UK 8 (S)', priceDiff: 0 },
          { name: 'UK 10 (M)', priceDiff: 0, default: true },
          { name: 'UK 12 (L)', priceDiff: 0 },
          { name: 'UK 14 (XL)', priceDiff: 0 },
          { name: 'UK 16 (2XL)', priceDiff: 5 },
          { name: 'UK 18 (3XL)', priceDiff: 10 }
        ]
      }
    ]
  },

  // Trendy Denim & Jeans (Flat Lay Product Photography)
  {
    id: 'jeans-1',
    category: 'jeans',
    title: 'High-Waist Sculpting Stretch Denim Jeans',
    brand: "misspbeauty_parlor Denim",
    tag: 'BEST FIT',
    tagClass: 'tag-hot',
    rating: 4.9,
    reviewsCount: 68,
    basePrice: 45,
    originalPrice: 65,
    inStock: true,
    bulawayoStock: true,
    stockCount: 10,
    colors: ['Classic Blue', 'Acid Black', 'Light Wash'],
    images: {
      'Classic Blue': [
        'https://files.catbox.moe/zormkg.jpg'
      ],
      'Acid Black': [
        'https://files.catbox.moe/zormkg.jpg'
      ],
      'Light Wash': [
        'https://files.catbox.moe/zormkg.jpg'
      ]
    },
    shortDesc: 'Premium comfort-stretch sculpting denim designed to contour the waist and hug curves comfortably.',
    specs: [
      '98% Cotton, 2% Spandex stretch denim',
      'High-rise waist sculpt fit',
      'Reinforced stitching with brass hardware'
    ],
    optionGroups: [
      {
        id: 'waistSize',
        label: 'Waist Size',
        type: 'pills',
        options: [
          { name: 'Size 26 (UK 6)', priceDiff: 0 },
          { name: 'Size 28 (UK 8)', priceDiff: 0, default: true },
          { name: 'Size 30 (UK 10)', priceDiff: 0 },
          { name: 'Size 32 (UK 12)', priceDiff: 0 },
          { name: 'Size 34 (UK 14)', priceDiff: 0 },
          { name: 'Size 36 (UK 16)', priceDiff: 5 },
          { name: 'Size 38 (UK 18)', priceDiff: 5 }
        ]
      }
    ]
  },

  // Luxury Handbags & Clutches (Accessories Photography)
  {
    id: 'bag-1',
    category: 'bags',
    title: 'Luxury Quilted Lambskin Chain Crossbody Bag',
    brand: "misspbeauty_parlor Luxury",
    tag: 'IT-BAG',
    tagClass: 'tag-gold',
    rating: 5.0,
    reviewsCount: 44,
    basePrice: 65,
    originalPrice: 95,
    inStock: true,
    bulawayoStock: true,
    stockCount: 6,
    colors: ['Glossy Black', 'Hot Pink', 'Champagne Gold'],
    images: {
      'Glossy Black': [
        'https://files.catbox.moe/lzxa0p.jpg'
      ],
      'Hot Pink': [
        'https://files.catbox.moe/lzxa0p.jpg'
      ],
      'Champagne Gold': [
        'https://files.catbox.moe/lzxa0p.jpg'
      ]
    },
    shortDesc: 'Chevron-quilted supple lambskin leather handbag with 24k polished gold chain strap and turn-lock clasp.',
    specs: [
      'Premium vegan lambskin leather',
      'Polished gold hardware chain',
      'Multi-compartment silk interior'
    ],
    optionGroups: [
      {
        id: 'hardware',
        label: 'Hardware Finish',
        type: 'pills',
        options: [
          { name: 'Polished Gold', priceDiff: 0, default: true },
          { name: 'Silver Chrome', priceDiff: 0 }
        ]
      }
    ]
  },
  {
    id: 'bag-2',
    category: 'bags',
    title: 'Designer Structured Top-Handle Glamour Tote',
    brand: "misspbeauty_parlor Luxury",
    tag: 'NEW DROP',
    tagClass: 'tag-hot',
    rating: 4.8,
    reviewsCount: 31,
    basePrice: 55,
    originalPrice: 85,
    inStock: true,
    bulawayoStock: true,
    stockCount: 5,
    colors: ['Crimson Red', 'Glossy Black', 'Nude Blush'],
    images: {
      'Crimson Red': [
        'https://files.catbox.moe/yhrtch.jpg'
      ],
      'Glossy Black': [
        'https://files.catbox.moe/lzxa0p.jpg'
      ],
      'Nude Blush': [
        'https://files.catbox.moe/yhrtch.jpg'
      ]
    },
    shortDesc: 'Structured lacquer-finish top handle handbag with gold lock and detachable cross-body strap.',
    specs: [
      'High-gloss structured finish',
      'Signature twist clasp closure',
      'Spacious everyday interior'
    ],
    optionGroups: [
      {
        id: 'strapStyle',
        label: 'Strap Style',
        type: 'pills',
        options: [
          { name: 'Classic Leather Strap', priceDiff: 0, default: true },
          { name: 'Gold Chain Accent Strap', priceDiff: 10 }
        ]
      }
    ]
  },

  // Glam T-Shirts & Tops (Apparel Flat Lay)
  {
    id: 'tshirt-1',
    category: 'tshirts',
    title: '"Pretty & Glam" Rose-Gold Foil Luxury Crop Tee',
    brand: "misspbeauty_parlor Glam",
    tag: 'HOT DROP',
    tagClass: 'tag-hot',
    rating: 4.9,
    reviewsCount: 57,
    basePrice: 28,
    originalPrice: 40,
    inStock: true,
    bulawayoStock: true,
    stockCount: 15,
    colors: ['White', 'Glossy Black', 'Hot Pink'],
    images: {
      'White': [
        'https://files.catbox.moe/tyr5z6.jpg'
      ],
      'Glossy Black': [
        'https://files.catbox.moe/tyr5z6.jpg'
      ],
      'Hot Pink': [
        'https://files.catbox.moe/tyr5z6.jpg'
      ]
    },
    shortDesc: '100% premium combed organic cotton crop tee with shimmering metallic rose-gold foil lettering.',
    specs: [
      '100% Ring-spun combed cotton',
      'Foil lettering will not peel or crack',
      'Pre-shrunk comfortable streetwear fit'
    ],
    optionGroups: [
      {
        id: 'teeSize',
        label: 'T-Shirt Size',
        type: 'pills',
        options: [
          { name: 'XS', priceDiff: 0 },
          { name: 'S', priceDiff: 0, default: true },
          { name: 'M', priceDiff: 0 },
          { name: 'L', priceDiff: 0 },
          { name: 'XL', priceDiff: 0 },
          { name: '2XL', priceDiff: 3 }
        ]
      }
    ]
  },

  // Designer Shoes (Pure Footwear Photography)
  {
    id: 'shoe-1',
    category: 'shoes',
    title: 'Floral Silk Pointed-Toe Stiletto Pumps (10.5cm)',
    brand: "Stiletto Haven Bulawayo",
    tag: 'BRIDAL & PARTY',
    tagClass: 'tag-hot',
    rating: 4.9,
    reviewsCount: 65,
    basePrice: 85,
    originalPrice: 130,
    inStock: true,
    bulawayoStock: true,
    stockCount: 5,
    colors: ['Royal Navy', 'Champagne Gold', 'Glossy Black'],
    images: {
      'Royal Navy': [
        'https://files.catbox.moe/fn8wrp.jpg'
      ],
      'Champagne Gold': [
        'https://files.catbox.moe/fn8wrp.jpg'
      ],
      'Glossy Black': [
        'https://files.catbox.moe/fn8wrp.jpg'
      ]
    },
    shortDesc: 'Luxury printed silk pointed-toe stilettos with cushioned memory foam insole and slender 10.5cm heel.',
    specs: [
      'Heel height: 10.5 cm (4.1 inches)',
      'Memory foam latex padded footbed',
      'Non-slip rubber grip sole',
      'Includes spare heel tips and dustbag'
    ],
    optionGroups: [
      {
        id: 'shoeSize',
        label: 'Shoe Size (EU)',
        type: 'pills',
        options: [
          { name: 'EU 36', priceDiff: 0 },
          { name: 'EU 37', priceDiff: 0 },
          { name: 'EU 38', priceDiff: 0, default: true },
          { name: 'EU 39', priceDiff: 0 },
          { name: 'EU 40', priceDiff: 0 },
          { name: 'EU 41', priceDiff: 0 },
          { name: 'EU 42', priceDiff: 0 }
        ]
      }
    ]
  },
  {
    id: 'shoe-2',
    category: 'shoes',
    title: 'Luxury Retro High-Top Designer Platform Sneakers',
    brand: "Couture Kicks Zim",
    tag: 'NEW DROP',
    tagClass: 'tag-gold',
    rating: 4.8,
    reviewsCount: 42,
    basePrice: 78,
    originalPrice: 115,
    inStock: true,
    bulawayoStock: true,
    stockCount: 6,
    colors: ['Crimson Red', 'Glossy Black'],
    images: {
      'Crimson Red': [
        'https://files.catbox.moe/vb96yt.jpg'
      ],
      'Glossy Black': [
        'https://files.catbox.moe/vb96yt.jpg'
      ]
    },
    shortDesc: 'Iconic retro basketball high-top silhouette in premium leather with cushioned rebound air sole.',
    specs: [
      'Genuine tumbled leather upper',
      'Padded ankle collar for support',
      'Impact absorption cushioned midsole'
    ],
    optionGroups: [
      {
        id: 'shoeSize',
        label: 'Size (EU)',
        type: 'pills',
        options: [
          { name: 'EU 36', priceDiff: 0 },
          { name: 'EU 37', priceDiff: 0 },
          { name: 'EU 38', priceDiff: 0, default: true },
          { name: 'EU 39', priceDiff: 0 },
          { name: 'EU 40', priceDiff: 0 },
          { name: 'EU 41', priceDiff: 0 },
          { name: 'EU 42', priceDiff: 0 }
        ]
      }
    ]
  },

  // ─── African Traditional & Cultural Attire ───
  {
    id: 'african-1',
    category: 'african',
    title: 'Chitenge Lobola Ceremony Suit — Skirt & Blouse Set',
    brand: 'misspbeauty_parlor Traditional',
    tag: 'LOBOLA READY',
    tagClass: 'tag-hot',
    rating: 5.0,
    reviewsCount: 38,
    basePrice: 55,
    originalPrice: 85,
    inStock: true,
    bulawayoStock: true,
    stockCount: 10,
    colors: ['Ankara Blue', 'Chitenge Violet', 'Kente Gold', 'Shweshwe Red'],
    images: {
      'Ankara Blue': ['https://files.catbox.moe/ffpmpq.jpg'],
      'Chitenge Violet': ['https://files.catbox.moe/ffpmpq.jpg'],
      'Kente Gold': ['https://files.catbox.moe/ffpmpq.jpg'],
      'Shweshwe Red': ['https://files.catbox.moe/ffpmpq.jpg']
    },
    shortDesc: 'Exquisite chitenge fabric two-piece: fitted blouse + wrap skirt. Perfect for lobola ceremonies, umembeso & traditional weddings. SADC-wide delivery.',
    specs: [
      '100% Premium Chitenge / Ankara Print Fabric',
      'Fully lined, hand-finished seams',
      'Custom sizing available on order',
      'Available in multiple print colorways'
    ],
    optionGroups: [
      {
        id: 'size',
        label: 'Size (UK)',
        type: 'pills',
        options: [
          { name: 'UK 6', priceDiff: 0 },
          { name: 'UK 8', priceDiff: 0 },
          { name: 'UK 10', priceDiff: 0, default: true },
          { name: 'UK 12', priceDiff: 0 },
          { name: 'UK 14', priceDiff: 0 },
          { name: 'UK 16', priceDiff: 5 },
          { name: 'UK 18', priceDiff: 5 },
          { name: 'UK 20 (Plus Size)', priceDiff: 10 }
        ]
      },
      {
        id: 'style',
        label: 'Print Style',
        type: 'pills',
        options: [
          { name: 'Ankara Floral', priceDiff: 0, default: true },
          { name: 'Classic Chitenge', priceDiff: 0 },
          { name: 'Kente Geometric', priceDiff: 5 },
          { name: 'Shweshwe Dots', priceDiff: 5 }
        ]
      }
    ]
  },
  {
    id: 'african-2',
    category: 'african',
    title: 'Ankara Wedding Bridal Gown — Full-Length Couture',
    brand: 'misspbeauty_parlor Traditional',
    tag: 'WEDDING SPECIAL',
    tagClass: 'tag-gold',
    rating: 4.9,
    reviewsCount: 24,
    basePrice: 120,
    originalPrice: 180,
    inStock: true,
    bulawayoStock: true,
    stockCount: 5,
    colors: ['Ankara Blue', 'Kente Gold', 'Shweshwe Red'],
    images: {
      'Ankara Blue': ['https://files.catbox.moe/ffpmpq.jpg'],
      'Kente Gold': ['https://files.catbox.moe/ffpmpq.jpg'],
      'Shweshwe Red': ['https://files.catbox.moe/ffpmpq.jpg']
    },
    shortDesc: 'Breathtaking full-length Ankara bridal gown for traditional weddings & lobola. Custom-tailored to your measurements. SADC-wide delivery.',
    specs: [
      'Hand-crafted premium Ankara fabric',
      'Corset bodice with full flared skirt',
      'Custom made to measurements',
      'Free alterations for Bulawayo pickups'
    ],
    optionGroups: [
      {
        id: 'size',
        label: 'Size',
        type: 'pills',
        options: [
          { name: 'UK 6-8', priceDiff: 0, default: true },
          { name: 'UK 10-12', priceDiff: 0 },
          { name: 'UK 14-16', priceDiff: 10 },
          { name: 'UK 18-20', priceDiff: 20 },
          { name: 'Custom (Measurements)', priceDiff: 15 }
        ]
      }
    ]
  },
  {
    id: 'african-3',
    category: 'african',
    title: 'Royal Shweshwe Umembeso Set — Headwrap + Skirt + Sash',
    brand: 'misspbeauty_parlor Traditional',
    tag: 'UMEMBESO SET',
    tagClass: 'tag-new',
    rating: 4.9,
    reviewsCount: 19,
    basePrice: 70,
    originalPrice: 105,
    inStock: true,
    bulawayoStock: true,
    stockCount: 7,
    colors: ['Shweshwe Red', 'Ankara Blue', 'Chitenge Violet', 'Kente Gold'],
    images: {
      'Shweshwe Red': ['https://files.catbox.moe/ffpmpq.jpg'],
      'Ankara Blue': ['https://files.catbox.moe/ffpmpq.jpg'],
      'Chitenge Violet': ['https://files.catbox.moe/ffpmpq.jpg'],
      'Kente Gold': ['https://files.catbox.moe/ffpmpq.jpg']
    },
    shortDesc: 'Complete 3-piece umembeso ceremony set: turban headwrap, wrap skirt & decorative sash. Ships to ZW, ZA, ZM & BW.',
    specs: [
      'Authentic shweshwe cotton blend',
      'Complete 3-piece matching set',
      'Hand-tied turban included',
      'Nationwide SADC delivery'
    ],
    optionGroups: [
      {
        id: 'size',
        label: 'Size (UK)',
        type: 'pills',
        options: [
          { name: 'UK 8', priceDiff: 0 },
          { name: 'UK 10', priceDiff: 0, default: true },
          { name: 'UK 12', priceDiff: 0 },
          { name: 'UK 14', priceDiff: 5 },
          { name: 'UK 16', priceDiff: 5 },
          { name: 'UK 18+', priceDiff: 10 }
        ]
      }
    ]
  }

];

// Salons Data (Hairdressers, Braiders & Stylists in Bulawayo)
const baseSalonsData = [
  {
    id: 'salon-1',
    name: 'misspbeauty_parlor VIP Lounge',
    tagline: 'HD Frontal Melt, Custom Bleaching, Wig Cut & Glass Hair Styling',
    location: 'Bulawayo CBD (Fife Street) & Online Store',
    verified: true,
    whatsapp: PRIMARY_WHATSAPP_NUMBER,
    phoneCall: SECONDARY_PHONE_NUMBER,
    startingPrice: 25,
    duration: '1.5 - 2.5 hrs',
    rating: 5.0,
    reviews: 124,
    styleTag: 'installs',
    stylesOffered: [
      '13x4 & 13x6 HD Lace Frontal Melt',
      'Custom Knot Bleaching & Plucking',
      'Wig Revival, Deep Conditioning & Cut',
      'Silk Press & Glass Hair Finishing'
    ],
    images: {
      main: 'https://files.catbox.moe/i28ks9.jpg',
      sub1: 'https://files.catbox.moe/2ratyz.jpg',
      sub2: 'https://files.catbox.moe/28r9b0.jpg'
    }
  },
  {
    id: 'salon-2',
    name: 'Crown & Glory Braiding Studio',
    tagline: 'Painless Knotless Box Braids & Bohemian Goddess Braids',
    location: 'Bulawayo & Harare (Avondale)',
    verified: true,
    whatsapp: PRIMARY_WHATSAPP_NUMBER,
    phoneCall: SECONDARY_PHONE_NUMBER,
    startingPrice: 20,
    duration: '3 - 4 hrs',
    rating: 4.9,
    reviews: 96,
    styleTag: 'braids',
    stylesOffered: [
      'Painless Knotless Box Braids',
      'Boho Curls & French Curl Braids',
      'Fulani Tribal Braids',
      'Kid-friendly neat braiding'
    ],
    images: {
      main: 'https://files.catbox.moe/28r9b0.jpg',
      sub1: 'https://files.catbox.moe/2ratyz.jpg',
      sub2: 'https://files.catbox.moe/1f8jfc.jpg'
    }
  },
  {
    id: 'salon-3',
    name: 'Goddess Locs & Natural Hair Bar',
    tagline: 'Soft Butterfly Locs & Distressed Goddess Locs',
    location: 'Bulawayo (Jason Moyo Ave), Zimbabwe',
    verified: true,
    whatsapp: PRIMARY_WHATSAPP_NUMBER,
    phoneCall: SECONDARY_PHONE_NUMBER,
    startingPrice: 35,
    duration: '3.5 - 5 hrs',
    rating: 4.8,
    reviews: 64,
    styleTag: 'locs',
    stylesOffered: [
      'Featherweight Butterfly Locs',
      'Boho Goddess Locs (Human Hair Curls)',
      'Faux Locs Retouch & Maintenance',
      'Organic Scalp Detox & Oil Massage'
    ],
    images: {
      main: 'https://files.catbox.moe/28r9b0.jpg',
      sub1: 'https://files.catbox.moe/miima6.jpg',
      sub2: 'https://files.catbox.moe/fhwzm6.jpg'
    }
  },
  {
    id: 'salon-4',
    name: 'Luxe Bridal Hair & Silk Press Studio',
    tagline: 'Bridal Hair Updos, Silk Press & Custom Color in Bulawayo',
    location: 'Bulawayo (Fife Street & 9th Ave)',
    verified: true,
    whatsapp: PRIMARY_WHATSAPP_NUMBER,
    phoneCall: SECONDARY_PHONE_NUMBER,
    startingPrice: 30,
    duration: '2 - 3 hrs',
    rating: 4.9,
    reviews: 78,
    styleTag: 'bridal',
    stylesOffered: [
      'Bridal Hair Updos & Hairpieces',
      'Glass-shine Silk Press (Heat damage free)',
      'Custom Wig Coloring & Highlights',
      'Mobile Bridal Glam Squad'
    ],
    images: {
      main: 'https://files.catbox.moe/dcyt78.jpg',
      sub1: 'https://files.catbox.moe/2ratyz.jpg',
      sub2: 'https://files.catbox.moe/1f8jfc.jpg'
    }
  }
];


// Combine custom uploaded salon styles with base salons
let salonsData = [...state.customUploads.filter(u => u.itemKind === 'salon'), ...baseSalonsData];

// Format Price helper based on active currency
function formatPrice(amountInUSD) {
  const rateInfo = state.currencyRates[state.currency] || state.currencyRates.USD;
  const converted = amountInUSD * rateInfo.rate;

  if (state.currency === 'USD') {
    return `$${converted.toFixed(0)}`;
  } else if (state.currency === 'ZiG') {
    return `ZiG ${(converted).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  } else {
    return `R ${converted.toFixed(0)}`;
  }
}

// Get Image list for product based on color
function getProductImages(product, selectedColor) {
  if (Array.isArray(product.images)) {
    return product.images;
  }
  if (product.images && typeof product.images === 'object') {
    if (selectedColor && product.images[selectedColor]) {
      return product.images[selectedColor];
    }
    const firstKey = Object.keys(product.images)[0];
    return product.images[firstKey] || [];
  }
  return ['https://files.catbox.moe/2ratyz.jpg'];
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  renderProductGrid();
  renderSalonsGrid();
  updateCartBadges();
  setupEventListeners();
  initAdvertisingSystem();
});

// Event Listeners Setup
function setupEventListeners() {
  // Currency switcher
  const currencySelect = document.getElementById('currency-select');
  if (currencySelect) {
    currencySelect.addEventListener('change', (e) => {
      state.currency = e.target.value;
      renderProductGrid();
      renderSalonsGrid();
      updateCartDrawer();
      showToast(`Currency changed to ${state.currency}`);
    });
  }

  // Category filter buttons
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.dataset.category;
      renderProductGrid();
    });
  });

  // Nav Links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const filter = link.dataset.filter;
      if (filter && filter !== 'promotions') {
        state.activeCategory = filter;
        document.querySelectorAll('.filter-pill').forEach(b => {
          b.classList.toggle('active', b.dataset.category === filter);
        });
        renderProductGrid();
      }
    });
  });

  // Salon Style filter tabs
  document.querySelectorAll('.style-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.style-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeStyleFilter = tab.dataset.styleTag;
      renderSalonsGrid();
    });
  });

  // Search input
  const searchInput = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.classList.toggle('show', state.searchQuery.length > 0);
      renderProductGrid();
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        state.searchQuery = '';
        clearBtn.classList.remove('show');
        renderProductGrid();
      });
    }
  }

  // Sort selector
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProductGrid();
    });
  }

  // Stock Filter toggle
  const stockToggle = document.getElementById('stock-filter-toggle');
  if (stockToggle) {
    stockToggle.addEventListener('change', (e) => {
      state.stockFilterOnly = e.target.checked;
      renderProductGrid();
    });
  }

  // Cart Drawer open/close
  const cartBtn = document.getElementById('cart-toggle-btn');
  const cartBackdrop = document.getElementById('cart-drawer-backdrop');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartCheckoutBtn = document.getElementById('cart-whatsapp-checkout-btn');

  if (cartBtn && cartBackdrop) {
    cartBtn.addEventListener('click', () => {
      cartBackdrop.classList.add('show');
      updateCartDrawer();
    });
  }
  if (cartCloseBtn && cartBackdrop) {
    cartCloseBtn.addEventListener('click', () => cartBackdrop.classList.remove('show'));
    cartBackdrop.addEventListener('click', (e) => {
      if (e.target === cartBackdrop) cartBackdrop.classList.remove('show');
    });
  }
  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', checkoutCartViaWhatsApp);
  }

  // Wishlist Drawer open/close
  const wishlistBtn = document.getElementById('wishlist-toggle-btn');
  const wishlistBackdrop = document.getElementById('wishlist-drawer-backdrop');
  const wishlistCloseBtn = document.getElementById('wishlist-close-btn');

  if (wishlistBtn && wishlistBackdrop) {
    wishlistBtn.addEventListener('click', () => {
      wishlistBackdrop.classList.add('show');
      updateWishlistDrawer();
    });
  }
  if (wishlistCloseBtn && wishlistBackdrop) {
    wishlistCloseBtn.addEventListener('click', () => wishlistBackdrop.classList.remove('show'));
    wishlistBackdrop.addEventListener('click', (e) => {
      if (e.target === wishlistBackdrop) wishlistBackdrop.classList.remove('show');
    });
  }
}

// Filter by Color
function filterByColor(colorName) {
  state.activeColorFilter = colorName;
  document.querySelectorAll('.color-filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.color === colorName);
  });
  renderProductGrid();
}

// Render Products Grid
function renderProductGrid() {
  const grid = document.getElementById('product-grid');
  const countEl = document.getElementById('results-count');
  if (!grid) return;

  // Filter products
  let filtered = productsData.filter(product => {
    // Category match
    if (state.activeCategory !== 'all' && product.category !== state.activeCategory) {
      return false;
    }
    // Color filter match
    if (state.activeColorFilter !== 'all') {
      if (!product.colors || !product.colors.some(c => c.toLowerCase().includes(state.activeColorFilter.toLowerCase()))) {
        return false;
      }
    }
    // Stock filter (Bulawayo)
    if (state.stockFilterOnly && !product.bulawayoStock) {
      return false;
    }
    // Search query match
    if (state.searchQuery) {
      const q = state.searchQuery;
      const matchTitle = product.title.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchDesc = product.shortDesc.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      if (!matchTitle && !matchBrand && !matchDesc && !matchCategory) {
        return false;
      }
    }
    return true;
  });

  // Sort products
  if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => a.basePrice - b.basePrice);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a, b) => b.basePrice - a.basePrice);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (countEl) {
    countEl.textContent = `Showing ${filtered.length} items`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 1rem;"></i>
        <h3 style="font-size: 1.25rem; color: #1e293b;">No matching items found</h3>
        <p style="color: #64748b; margin-top: 0.5rem;">Try adjusting your color, search, or category filters.</p>
        <button class="btn btn-outline mt-2" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    const isWishlisted = state.wishlist.some(item => item.id === product.id);
    const productImages = getProductImages(product, null);
    const primaryImg = productImages[0];

    // Interactive Color Swatches on Card
    let swatchesHtml = '';
    if (product.colors && product.colors.length) {
      swatchesHtml = `
        <div class="card-swatches-row">
          ${product.colors.map(colorName => {
            const swatchInfo = COLOR_SWATCHES[colorName] || { class: 'dot-1b', label: colorName };
            return `
              <span class="card-color-dot ${swatchInfo.class} ${product.colors[0] === colorName ? 'active' : ''}" 
                    title="${swatchInfo.label} - Tap to preview color" 
                    onclick="changeCardColor('${product.id}', '${colorName}', event)">
              </span>
            `;
          }).join('')}
          <span style="font-size:0.72rem; color:#6b7280; font-weight:600;">+${product.colors.length} colors</span>
        </div>
      `;
    }

    // Length / Size Pills Preview
    const previewVariants = product.optionGroups && product.optionGroups[0] 
      ? product.optionGroups[0].options.slice(0, 4).map(opt => `<span class="variant-chip">${opt.name}</span>`).join('')
      : '';

    const savingsUSD = product.originalPrice ? (product.originalPrice - product.basePrice) : 0;

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-card-top" onclick="openProductModal('${product.id}')" style="cursor: pointer;">
          <img id="card-img-${product.id}" src="${primaryImg}" alt="${product.title}" loading="lazy">
          ${product.tag ? `<span class="product-tag ${product.tagClass || ''}">${product.tag}</span>` : ''}
          ${savingsUSD > 0 ? `<span class="discount-ribbon"><i class="fa-solid fa-tag"></i> SAVE $${savingsUSD}</span>` : ''}
          <button class="wishlist-btn-card ${isWishlisted ? 'active' : ''}" 
                  onclick="event.stopPropagation(); toggleWishlist('${product.id}')" 
                  aria-label="Save to wishlist" title="Save to wishlist">
            <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
          </button>
        </div>

        <div class="product-card-body">
          <div class="product-brand-line">
            <span>${product.brand}</span>
            <div class="product-rating">
              <i class="fa-solid fa-star"></i>
              <span>${product.rating} (${product.reviewsCount})</span>
            </div>
          </div>

          <h3 class="product-title" onclick="openProductModal('${product.id}')" style="cursor: pointer;">
            ${product.title}
          </h3>

          ${swatchesHtml}

          <div class="product-variants-preview">
            ${previewVariants}
          </div>

          <div class="stock-indicator ${product.bulawayoStock ? 'in-stock' : 'low-stock'}">
            <i class="fa-solid fa-bolt"></i>
            <span>${product.bulawayoStock ? `In Stock (Bulawayo CBD - ${product.stockCount} left)` : 'Pre-order / Courier'}</span>
          </div>

          <div class="product-card-footer">
            <div class="product-card-price">
              <span class="card-curr-price">${formatPrice(product.basePrice)}</span>
              ${product.originalPrice ? `<span class="card-orig-price">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>

            <div class="card-actions">
              <button class="btn-card-quick" onclick="openProductModal('${product.id}')" title="Choose length, color, size">
                Pick Options
              </button>
              <button class="btn-card-wa" onclick="orderDirectWhatsApp('${product.id}')" title="Quick Order on WhatsApp (+263 78 550 5967)">
                <i class="fa-brands fa-whatsapp"></i>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Render Hairdressing Salons Directory
function renderSalonsGrid() {
  const grid = document.getElementById('salons-grid');
  if (!grid) return;

  const filtered = salonsData.filter(salon => {
    if (state.activeStyleFilter === 'all') return true;
    return salon.styleTag === state.activeStyleFilter;
  });

  grid.innerHTML = filtered.map(salon => {
    return `
      <div class="salon-card">
        <div class="salon-card-gallery">
          <img src="${salon.images.main}" alt="${salon.name}" class="salon-main-img" loading="lazy">
          <div class="salon-sub-imgs">
            <img src="${salon.images.sub1}" alt="${salon.name}" loading="lazy">
            <img src="${salon.images.sub2}" alt="${salon.name}" loading="lazy">
          </div>
        </div>

        <div class="salon-card-content">
          <div class="salon-header-line">
            <div>
              <h3 class="salon-name">${salon.name}</h3>
              <div class="salon-location">
                <i class="fa-solid fa-location-dot"></i> ${salon.location}
              </div>
            </div>
            ${salon.verified ? `<span class="badge badge-gold"><i class="fa-solid fa-circle-check"></i> VERIFIED</span>` : ''}
          </div>

          <p style="font-size: 0.85rem; color: #4b5563; margin-bottom: 0.85rem; font-style: italic;">
            "${salon.tagline}"
          </p>

          <div class="salon-styles-list">
            ${salon.stylesOffered.map(st => `<span class="salon-style-badge"><i class="fa-solid fa-check text-gold"></i> ${st}</span>`).join('')}
          </div>

          <div class="salon-pricing-line">
            <div class="salon-rate">
              From <strong>${formatPrice(salon.startingPrice)}</strong> <span style="font-size:0.75rem">(${salon.duration})</span>
            </div>
            <a href="https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=Hello!%20I%20saw%20${encodeURIComponent(salon.name)}%20on%20misspbeauty_parlor%20and%20would%20like%20to%20book%20an%20appointment." 
               target="_blank" class="btn btn-whatsapp btn-sm">
              <i class="fa-brands fa-whatsapp"></i> Book Stylist
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Reset all filters
function resetFilters() {
  state.activeCategory = 'all';
  state.activeColorFilter = 'all';
  state.searchQuery = '';
  state.stockFilterOnly = false;
  state.sortBy = 'featured';

  const sInput = document.getElementById('search-input');
  if (sInput) sInput.value = '';
  const clearBtn = document.getElementById('search-clear-btn');
  if (clearBtn) clearBtn.classList.remove('show');
  const stockToggle = document.getElementById('stock-filter-toggle');
  if (stockToggle) stockToggle.checked = false;

  document.querySelectorAll('.filter-pill').forEach(b => {
    b.classList.toggle('active', b.dataset.category === 'all');
  });
  document.querySelectorAll('.color-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.color === 'all');
  });

  renderProductGrid();
}

// Filter category helper from footer
function filterCategory(category) {
  state.activeCategory = category;
  document.querySelectorAll('.filter-pill').forEach(b => {
    b.classList.toggle('active', b.dataset.category === category);
  });
  renderProductGrid();
}

// ==========================================================================
// Interactive Product Customizer Modal
// ==========================================================================
function openProductModal(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  state.currentModalProduct = product;
  state.currentModalQty = 1;
  state.currentModalSelectedOptions = {};
  state.currentModalSelectedColor = product.colors ? product.colors[0] : null;

  // Initialize default options
  if (product.optionGroups) {
    product.optionGroups.forEach(group => {
      const defaultOpt = group.options.find(o => o.default) || group.options[0];
      state.currentModalSelectedOptions[group.id] = defaultOpt;
    });
  }

  const modalBackdrop = document.getElementById('product-modal');
  if (!modalBackdrop) return;

  renderProductModalContent();
  modalBackdrop.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function changeCardColor(productId, colorName, event) {
  if (event) event.stopPropagation();
  const product = productsData.find(p => p.id === productId);
  if (!product) return;
  const cardImg = document.getElementById(`card-img-${productId}`);
  if (cardImg) {
    const images = getProductImages(product, colorName);
    if (images && images.length) {
      cardImg.src = images[0];
    }
  }
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (card) {
    card.querySelectorAll('.card-color-dot').forEach(dot => dot.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
  }
}


function changeSpotlightColor(colorName, dotEl) {
  // Read dynamically from hair-1 product images (Single Source of Truth)
  const hairProduct = baseProductsData.find(p => p.id === 'hair-1');
  let imageUrl = '';
  if (hairProduct && hairProduct.images && hairProduct.images[colorName] && hairProduct.images[colorName].length) {
    imageUrl = hairProduct.images[colorName][0];
  } else if (typeof dotEl === 'string') {
    // Backward-compatibility if called with (colorName, imageUrl, dotEl)
    imageUrl = dotEl;
  } else {
    imageUrl = 'https://files.catbox.moe/2ratyz.jpg';
  }

  const img = document.getElementById('hero-spotlight-img');
  if (img && imageUrl) {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.25s ease';
    setTimeout(() => {
      img.src = imageUrl;
      img.alt = `Miss P ${colorName} Bone Straight HD Lace Wig`;
      img.style.opacity = '1';
    }, 150);
  }
  document.querySelectorAll('.spotlight-quick-swatches .color-dot').forEach(d => d.classList.remove('active'));
  const activeDot = (dotEl instanceof HTMLElement) ? dotEl : document.querySelector(`.spotlight-quick-swatches [data-color="${colorName}"]`);
  if (activeDot) activeDot.classList.add('active');
}

function selectCategoryFilter(category) {
  document.querySelectorAll('.filter-pill').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-category') === category);
  });
  filterByCategory(category);
}

function openProductModalWithColor(productId, colorName) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  openProductModal(productId);
  selectModalColor(colorName);
}

function closeProductModal() {
  const modalBackdrop = document.getElementById('product-modal');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function renderProductModalContent() {
  const product = state.currentModalProduct;
  const modalContent = document.getElementById('product-modal-content');
  if (!product || !modalContent) return;

  // Calculate dynamic price based on selected variants
  let dynamicPrice = product.basePrice;
  Object.values(state.currentModalSelectedOptions).forEach(opt => {
    if (opt && opt.priceDiff) dynamicPrice += opt.priceDiff;
  });

  const totalCalculated = dynamicPrice * state.currentModalQty;
  const savingsUSD = product.originalPrice ? (product.originalPrice * state.currentModalQty - totalCalculated) : 0;

  // Build Interactive Color Swatches HTML
  let colorSwatchesHtml = '';
  if (product.colors && product.colors.length) {
    colorSwatchesHtml = `
      <div class="option-group">
        <div class="option-header-line">
          <label class="option-label">Color: <strong style="color:var(--accent-gold);">${state.currentModalSelectedColor || product.colors[0]}</strong></label>
        </div>
        <div class="swatch-chips">
          ${product.colors.map(colorName => {
            const swatchInfo = COLOR_SWATCHES[colorName] || { class: 'dot-1b', label: colorName };
            const isSelected = state.currentModalSelectedColor === colorName;
            return `
              <div class="swatch-chip ${isSelected ? 'selected' : ''}" onclick="selectModalColor('${colorName}')">
                <span class="color-dot ${swatchInfo.class}" style="width:18px; height:18px;"></span>
                <span>${colorName}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // Build Interactive Option Groups HTML (Lengths, Sizes, Densities)
  let optionGroupsHtml = '';
  if (product.optionGroups) {
    optionGroupsHtml = product.optionGroups.map(group => {
      const selected = state.currentModalSelectedOptions[group.id];
      const isLengthOrSize = group.id === 'length' || group.id === 'size' || group.id === 'shoeSize';

      return `
        <div class="option-group">
          <div class="option-header-line">
            <label class="option-label">${group.label}: <strong style="color:var(--accent-gold);">${selected ? selected.name : ''}</strong></label>
            ${isLengthOrSize ? `<span class="size-guide-link" onclick="openSizeGuideModal()"><i class="fa-solid fa-ruler-combined"></i> Size Guide</span>` : ''}
          </div>
          <div class="option-chips">
            ${group.options.map(opt => {
              const isSelected = selected && selected.name === opt.name;
              return `
                <button type="button" class="option-chip ${isSelected ? 'selected' : ''}" 
                        onclick="selectModalOption('${group.id}', '${opt.name.replace(/'/g, "\\'")}')">
                  ${opt.name} ${opt.priceDiff ? `(${opt.priceDiff > 0 ? '+' : ''}${formatPrice(opt.priceDiff)})` : ''}
                </button>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  // Gallery Images based on chosen color
  const productImages = getProductImages(product, state.currentModalSelectedColor);
  const mainImage = productImages[0];
  const thumbsHtml = productImages.map((imgUrl, idx) => `
    <div class="modal-thumb ${idx === 0 ? 'active' : ''}" onclick="switchModalThumb(this, '${imgUrl}')">
      <img src="${imgUrl}" alt="${product.title}">
    </div>
  `).join('');

  modalContent.innerHTML = `
    <!-- Gallery Column -->
    <div class="modal-gallery">
      <div class="modal-main-image-wrapper">
        <img id="modal-main-img" src="${mainImage}" alt="${product.title}">
        ${savingsUSD > 0 ? `<span class="discount-ribbon"><i class="fa-solid fa-tag"></i> SAVE $${savingsUSD.toFixed(0)}</span>` : ''}
      </div>
      <div class="modal-thumbs">
        ${thumbsHtml}
      </div>
    </div>

    <!-- Product Customization Column -->
    <div class="modal-product-info">
      <div class="modal-badge-row">
        <span class="badge badge-gold">${product.brand}</span>
        ${product.tag ? `<span class="product-tag ${product.tagClass || ''}">${product.tag}</span>` : ''}
      </div>

      <h2 class="modal-title">${product.title}</h2>

      <div class="modal-meta-row">
        <div class="product-rating">
          <i class="fa-solid fa-star"></i>
          <strong>${product.rating}</strong> (${product.reviewsCount} verified reviews)
        </div>
        <span>•</span>
        <div class="stock-indicator ${product.bulawayoStock ? 'in-stock' : 'low-stock'}">
          <i class="fa-solid fa-bolt"></i> ${product.bulawayoStock ? `In Stock in Bulawayo (${product.stockCount} left)` : 'Fast Courier Available'}
        </div>
      </div>

      <!-- Pricing Box -->
      <div class="modal-pricing-box">
        <div>
          <span style="font-size:0.75rem; text-transform:uppercase; color:#6b7280; display:block;">Instant Price</span>
          <span class="modal-curr-price" id="modal-calculated-price">${formatPrice(totalCalculated)}</span>
          ${product.originalPrice ? `<span class="modal-orig-price">${formatPrice(product.originalPrice * state.currentModalQty)}</span>` : ''}
        </div>
        <div style="font-size: 0.8rem; color: #059669; font-weight:700;">
          <i class="fa-solid fa-truck-fast"></i> Same-Day Bulawayo CBD Delivery
        </div>
      </div>

      <p style="font-size: 0.9rem; color: #4b5563; margin-bottom: 1.25rem;">
        ${product.shortDesc}
      </p>

      <!-- Color Swatches -->
      ${colorSwatchesHtml}

      <!-- Dynamic Variant Pickers (Lengths, Sizes, Densities) -->
      <div class="modal-options-wrapper">
        ${optionGroupsHtml}
      </div>

      <!-- Quantity Row -->
      <div class="modal-quantity-row">
        <span style="font-size: 0.86rem; font-weight: 700;">Quantity:</span>
        <div class="qty-counter">
          <button class="qty-btn" onclick="adjustModalQty(-1)"><i class="fa-solid fa-minus"></i></button>
          <input type="text" class="qty-input" id="modal-qty-input" value="${state.currentModalQty}" readonly>
          <button class="qty-btn" onclick="adjustModalQty(1)"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>

      <!-- 1-Click WhatsApp Order Actions -->
      <div class="modal-actions">
        <button class="btn btn-whatsapp btn-modal-wa" onclick="orderModalOnWhatsApp()">
          <i class="fa-brands fa-whatsapp"></i> Buy on WhatsApp (${formatPrice(totalCalculated)})
        </button>
        <button class="btn btn-outline" onclick="addModalItemToCart()">
          <i class="fa-solid fa-bag-shopping"></i> Add to Bag
        </button>
      </div>

      <!-- Guarantees Accordion -->
      <div class="modal-guarantees">
        <ul>
          <li><i class="fa-solid fa-circle-check"></i> <strong>100% Genuine Quality:</strong> Authentic virgin hair, true-to-fit dresses, designer footwear.</li>
          <li><i class="fa-solid fa-circle-check"></i> <strong>Bulawayo Pickup & Dispatch:</strong> Fife Street CBD pickup or fast courier across Zimbabwe.</li>
          <li><i class="fa-solid fa-circle-check"></i> <strong>Payment Methods:</strong> Cash on delivery (USD), EcoCash, or Swipe.</li>
        </ul>
      </div>
    </div>
  `;
}

function selectModalColor(colorName) {
  state.currentModalSelectedColor = colorName;
  renderProductModalContent();
}

function switchModalThumb(element, imgUrl) {
  document.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
  element.classList.add('active');
  const mainImg = document.getElementById('modal-main-img');
  if (mainImg) mainImg.src = imgUrl;
}

function selectModalOption(groupId, optionName) {
  const product = state.currentModalProduct;
  if (!product || !product.optionGroups) return;

  const group = product.optionGroups.find(g => g.id === groupId);
  if (!group) return;

  const opt = group.options.find(o => o.name === optionName);
  if (!opt) return;

  state.currentModalSelectedOptions[groupId] = opt;
  renderProductModalContent();
}

function adjustModalQty(delta) {
  const nextQty = state.currentModalQty + delta;
  if (nextQty >= 1 && nextQty <= 10) {
    state.currentModalQty = nextQty;
    renderProductModalContent();
  }
}

// Order directly on WhatsApp from the Modal with pre-filled SKU options
function orderModalOnWhatsApp() {
  const product = state.currentModalProduct;
  if (!product) return;

  let dynamicPrice = product.basePrice;
  const selectedDetails = [];

  if (state.currentModalSelectedColor) {
    selectedDetails.push(`Color: ${state.currentModalSelectedColor}`);
  }

  Object.entries(state.currentModalSelectedOptions).forEach(([groupId, opt]) => {
    if (opt) {
      if (opt.priceDiff) dynamicPrice += opt.priceDiff;
      selectedDetails.push(`${opt.name}`);
    }
  });

  const totalCalculated = dynamicPrice * state.currentModalQty;
  const optionsString = selectedDetails.length ? selectedDetails.join(' | ') : 'Standard';

  const message = `Hello misspbeauty_parlor! 👑
I would like to place an order from your online store in Bulawayo:

🛍️ *Product:* ${product.title}
🏷️ *Brand:* ${product.brand}
🎨 *Selected Options:* ${optionsString}
🔢 *Quantity:* ${state.currentModalQty}
💵 *Total Price:* ${formatPrice(totalCalculated)} (${state.currency})

📍 *My Delivery Address / City:* (e.g. Bulawayo CBD / Harare / Gweru)
👤 *My Full Name:*
📞 *My Phone:*

Please confirm availability and dispatch schedule. Thank you!`;

  const waUrl = `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

// Quick 1-click order from card
function orderDirectWhatsApp(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const message = `Hello misspbeauty_parlor! 👑
I am inquiring about ordering:
🛍️ *${product.title}*
🏷️ *Brand:* ${product.brand}
💵 *Price:* ${formatPrice(product.basePrice)} (${state.currency})

Is this available for delivery in Bulawayo or nationwide courier?`;

  const waUrl = `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

// Add Item from Modal to Cart
function addModalItemToCart() {
  const product = state.currentModalProduct;
  if (!product) return;

  let dynamicPrice = product.basePrice;
  const selectedOptions = {};

  if (state.currentModalSelectedColor) {
    selectedOptions['color'] = state.currentModalSelectedColor;
  }

  Object.entries(state.currentModalSelectedOptions).forEach(([groupId, opt]) => {
    if (opt) {
      if (opt.priceDiff) dynamicPrice += opt.priceDiff;
      selectedOptions[groupId] = opt.name;
    }
  });

  const cartItemId = `${product.id}_${Object.values(selectedOptions).join('_')}`;
  const existingIndex = state.cart.findIndex(item => item.cartItemId === cartItemId);

  const productImages = getProductImages(product, state.currentModalSelectedColor);

  if (existingIndex > -1) {
    state.cart[existingIndex].qty += state.currentModalQty;
  } else {
    state.cart.push({
      cartItemId: cartItemId,
      id: product.id,
      title: product.title,
      brand: product.brand,
      image: productImages[0],
      unitPriceUSD: dynamicPrice,
      selectedOptions: selectedOptions,
      qty: state.currentModalQty
    });
  }

  saveCart();
  updateCartBadges();
  closeProductModal();
  showToast(`Added ${state.currentModalQty}x "${product.title}" to your bag!`);

  const cartBackdrop = document.getElementById('cart-drawer-backdrop');
  if (cartBackdrop) {
    cartBackdrop.classList.add('show');
    updateCartDrawer();
  }
}

// ==========================================================================
// Size & Length Guide Modal Logic
// ==========================================================================
function openSizeGuideModal() {
  const modal = document.getElementById('size-guide-modal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeSizeGuideModal() {
  const modal = document.getElementById('size-guide-modal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function switchGuideTab(tabId) {
  document.querySelectorAll('.guide-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.guide-tab-content').forEach(c => c.style.display = 'none');

  if (event && event.target) event.target.classList.add('active');
  const target = document.getElementById(tabId);
  if (target) target.style.display = 'block';
}

// ==========================================================================
// Shopping Bag & Checkout State
// ==========================================================================
function saveCart() {
  localStorage.setItem('misspbeauty_cart', JSON.stringify(state.cart));
}

function updateCartBadges() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cart-badge');
  const drawerCount = document.getElementById('cart-drawer-count');
  if (badge) badge.textContent = totalCount;
  if (drawerCount) drawerCount.textContent = totalCount;

  const wishlistBadge = document.getElementById('wishlist-badge');
  const wishlistDrawerCount = document.getElementById('wishlist-drawer-count');
  if (wishlistBadge) wishlistBadge.textContent = state.wishlist.length;
  if (wishlistDrawerCount) wishlistDrawerCount.textContent = state.wishlist.length;
}

function updateCartDrawer() {
  const container = document.getElementById('cart-drawer-items');
  const subtotalEl = document.getElementById('cart-subtotal');
  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <i class="fa-solid fa-bag-shopping"></i>
        <h4>Your Bag is Empty</h4>
        <p style="font-size:0.85rem; margin-top:0.4rem;">Browse misspbeauty_parlor wigs, dresses, and heels to add items.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatPrice(0);
    return;
  }

  let totalUSD = 0;
  container.innerHTML = state.cart.map(item => {
    const itemTotalUSD = item.unitPriceUSD * item.qty;
    totalUSD += itemTotalUSD;

    const optionsStr = Object.values(item.selectedOptions).join(', ');

    return `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.title}</h4>
          ${optionsStr ? `<span class="cart-item-variant">${optionsStr}</span>` : ''}
          <span class="cart-item-price">${formatPrice(item.unitPriceUSD)} × ${item.qty} = <strong>${formatPrice(itemTotalUSD)}</strong></span>
          <button class="cart-item-remove" onclick="removeCartItem('${item.cartItemId}')">
            <i class="fa-regular fa-trash-can"></i> Remove
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalEl) {
    subtotalEl.textContent = formatPrice(totalUSD);
  }
}

function removeCartItem(cartItemId) {
  state.cart = state.cart.filter(item => item.cartItemId !== cartItemId);
  saveCart();
  updateCartBadges();
  updateCartDrawer();
  showToast('Item removed from bag');
}

function clearCart() {
  state.cart = [];
  saveCart();
  updateCartBadges();
  updateCartDrawer();
  showToast('Bag cleared');
}

// WhatsApp Multi-Item Cart Checkout
function checkoutCartViaWhatsApp() {
  if (state.cart.length === 0) {
    showToast('Your shopping bag is empty!');
    return;
  }

  let totalUSD = 0;
  const itemsSummary = state.cart.map((item, idx) => {
    const itemTotalUSD = item.unitPriceUSD * item.qty;
    totalUSD += itemTotalUSD;
    const opts = Object.values(item.selectedOptions).join(', ');
    return `${idx + 1}. *${item.title}* (Qty: ${item.qty})
   Options: ${opts || 'Standard'}
   Price: ${formatPrice(itemTotalUSD)}`;
  }).join('\n\n');

  const message = `Hello misspbeauty_parlor! 👑
I am ready to checkout my shopping bag:

${itemsSummary}

---------------------------
💰 *Subtotal:* ${formatPrice(totalUSD)} (${state.currency})
🚚 *Delivery:* Free Bulawayo CBD / Nationwide Courier
💳 *Preferred Payment:* Cash on Delivery (USD) / EcoCash

📍 *Delivery Address:* [Please enter your address & city]
👤 *My Full Name:* [Your name]
📞 *Phone Number:*

Please confirm order availability and dispatch schedule!`;

  const waUrl = `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
}

// ==========================================================================
// Wishlist Handlers
// ==========================================================================
function toggleWishlist(productId) {
  const index = state.wishlist.findIndex(item => item.id === productId);
  const product = productsData.find(p => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast('Removed from wishlist');
  } else if (product) {
    const productImages = getProductImages(product, null);
    state.wishlist.push({
      id: product.id,
      title: product.title,
      price: product.basePrice,
      image: productImages[0]
    });
    showToast(`Saved "${product.title}" to wishlist!`);
  }

  localStorage.setItem('misspbeauty_wishlist', JSON.stringify(state.wishlist));
  updateCartBadges();
  renderProductGrid();
}

function updateWishlistDrawer() {
  const container = document.getElementById('wishlist-drawer-items');
  if (!container) return;

  if (state.wishlist.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <i class="fa-regular fa-heart"></i>
        <h4>No Saved Items Yet</h4>
        <p style="font-size:0.85rem; margin-top:0.4rem;">Tap the heart icon on any hair, dress, or shoe card to save it here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.wishlist.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.title}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.title}</h4>
        <span class="cart-item-price">${formatPrice(item.price)}</span>
        <div style="display:flex; gap:0.6rem; margin-top:0.5rem;">
          <button class="btn btn-sm btn-primary" onclick="openProductModal('${item.id}')">View</button>
          <button class="cart-item-remove" onclick="toggleWishlist('${item.id}'); updateWishlistDrawer();">
            <i class="fa-solid fa-xmark"></i> Remove
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// Photo Studio (Take & Upload Original Pictures)
// ==========================================================================
function openUploadModal() {
  const modal = document.getElementById('upload-modal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeUploadModal() {
  const modal = document.getElementById('upload-modal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function previewSelectedImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    state.currentUploadedImageBase64 = e.target.result;
    const previewImg = document.getElementById('upload-preview-img');
    const placeholder = document.getElementById('upload-placeholder');
    if (previewImg && placeholder) {
      previewImg.src = e.target.result;
      previewImg.style.display = 'block';
      placeholder.style.display = 'none';
    }
  };
  reader.readAsDataURL(file);
}

function handleUploadSubmit(event) {
  event.preventDefault();

  if (!state.currentUploadedImageBase64) {
    showToast('Please take a photo or select an image first!');
    return;
  }

  const category = document.getElementById('upload-category').value;
  const title = document.getElementById('upload-title').value;
  const price = parseFloat(document.getElementById('upload-price').value) || 50;
  const desc = document.getElementById('upload-desc').value;
  const optionsRaw = document.getElementById('upload-options').value;

  const optionList = optionsRaw ? optionsRaw.split(',').map(s => s.trim()).filter(Boolean) : ['Standard'];

  if (category === 'salons') {
    const newSalonItem = {
      itemKind: 'salon',
      id: `custom-salon-${Date.now()}`,
      name: title,
      tagline: `Bulawayo Salon Service • misspbeauty_parlor`,
      location: STORE_LOCATION,
      verified: true,
      whatsapp: PRIMARY_WHATSAPP_NUMBER,
      phoneCall: SECONDARY_PHONE_NUMBER,
      startingPrice: price,
      duration: '1.5 - 3 hrs',
      rating: 5.0,
      reviews: 1,
      styleTag: 'installs',
      stylesOffered: optionList.length ? optionList : ['Custom Plucking', 'HD Lace Install'],
      images: {
        main: state.currentUploadedImageBase64,
        sub1: state.currentUploadedImageBase64,
        sub2: state.currentUploadedImageBase64
      }
    };

    state.customUploads.unshift(newSalonItem);
    localStorage.setItem('misspbeauty_custom_uploads', JSON.stringify(state.customUploads));
    salonsData.unshift(newSalonItem);
    renderSalonsGrid();
    showToast(`New Hairstyle "${title}" published to your salon gallery!`);
  } else {
    const newProduct = {
      itemKind: 'product',
      id: `custom-prod-${Date.now()}`,
      category: category,
      title: title,
      brand: "misspbeauty_parlor Exclusive",
      tag: 'NEW ARRIVAL',
      tagClass: 'tag-hot',
      rating: 5.0,
      reviewsCount: 1,
      basePrice: price,
      originalPrice: Math.round(price * 1.35),
      inStock: true,
      bulawayoStock: true,
      stockCount: 3,
      colors: ['Natural Black'],
      images: [state.currentUploadedImageBase64],
      shortDesc: desc,
      specs: [
        '100% Authentic Quality Guaranteed',
        'Available in Bulawayo for pickup or same-day dispatch',
        'Express courier delivery across Zimbabwe'
      ],
      optionGroups: [
        {
          id: 'customOption',
          label: 'Available Options',
          type: 'pills',
          options: optionList.map((optName, idx) => ({
            name: optName,
            priceDiff: 0,
            default: idx === 0
          }))
        }
      ]
    };

    state.customUploads.unshift(newProduct);
    localStorage.setItem('misspbeauty_custom_uploads', JSON.stringify(state.customUploads));
    productsData.unshift(newProduct);
    renderProductGrid();
    showToast(`"${title}" published to your online store with your photo!`);
  }

  closeUploadModal();
  event.target.reset();
  state.currentUploadedImageBase64 = null;
  const previewImg = document.getElementById('upload-preview-img');
  const placeholder = document.getElementById('upload-placeholder');
  if (previewImg) previewImg.style.display = 'none';
  if (placeholder) placeholder.style.display = 'block';
}

// ==========================================================================
// EcoCash Advertising System & Partner Directory Engine
// Features:
// - Upload staff/product photo with instant preview
// - 1, 2, 3, 4, 8, 12 weeks duration scaling with dynamic rate ($1/week default)
// - EcoCash direct transfer to Miss P (0785505967 / +263 78 550 5967)
// - USSD code generator (*151*1*1*0785505967*Amount#)
// - Auto-archiving of expired/unpaid ads into archived directory
// - WhatsApp payment due reminder trigger directly to advertiser
// - Owner ad rate editor (allows Miss P to change charges anytime)
// ==========================================================================

const defaultSponsoredAds = [
  {
    id: 'ad-flagship-1',
    name: 'misspbeauty_parlor Official VIP Studio',
    category: '100% Human Hair & Wigs',
    location: 'Bulawayo CBD (Fife Street)',
    whatsapp: PRIMARY_WHATSAPP_NUMBER,
    bio: 'Flagship store & studio. 100% Brazilian raw human hair (8"-42"), custom HD frontal melts, luxury silk press & wig revivals.',
    image: 'https://files.catbox.moe/i28ks9.jpg',
    tiktok: '@misspbeauty_parlor',
    instagram: '@misspbeauty_parlor',
    facebook: 'misspbeautyparlorbyo',
    status: 'active',
    durationWeeks: 52,
    createdAt: Date.now() - 3 * 86400 * 1000,
    expiresAt: Date.now() + 350 * 86400 * 1000,
    paidAmount: 52.00,
    senderEcoCash: '0785505967',
    approvalCode: 'MP_FLAGSHIP',
    verified: true,
    badge: 'FLAGSHIP STORE'
  },
  {
    id: 'ad-salon-2',
    name: 'Crown & Glory Braiding Studio',
    category: 'Hairdressing & Braids',
    location: 'Bulawayo & Harare',
    whatsapp: PRIMARY_WHATSAPP_NUMBER,
    bio: 'Bulawayo & Harare top destination for knotless box braids, bohemian goddess locs, stitch braids & painless styling.',
    image: 'https://files.catbox.moe/28r9b0.jpg',
    tiktok: '@crownglorybyo',
    instagram: '@crownglorybraids',
    facebook: 'CrownGloryBraidsZim',
    status: 'active',
    durationWeeks: 4,
    createdAt: Date.now() - 7 * 86400 * 1000,
    expiresAt: Date.now() + 21 * 86400 * 1000,
    paidAmount: 4.00,
    senderEcoCash: '0773412589',
    approvalCode: 'MP261103.8821',
    verified: true,
    badge: 'VERIFIED SALON'
  },
  {
    id: 'ad-boutique-3',
    name: 'Stiletto Haven Bulawayo',
    category: 'Shoes & Footwear',
    location: 'Bulawayo CBD',
    whatsapp: PRIMARY_WHATSAPP_NUMBER,
    bio: 'Exclusive imported designer heels, bridal stilettos, luxury pumps & evening party footwear with countrywide courier delivery.',
    image: 'https://files.catbox.moe/fn8wrp.jpg',
    tiktok: '@stilettobyoboutique',
    instagram: '@stilettohavenzim',
    facebook: 'StilettoHavenZW',
    status: 'active',
    durationWeeks: 2,
    createdAt: Date.now() - 3 * 86400 * 1000,
    expiresAt: Date.now() + 11 * 86400 * 1000,
    paidAmount: 2.00,
    senderEcoCash: '0782390145',
    approvalCode: 'MP261107.4412',
    verified: true,
    badge: 'VERIFIED BOUTIQUE'
  },
  {
    id: 'ad-due-4',
    name: 'Harare Glam Lace Bar',
    category: '100% Human Hair & Wigs',
    location: 'Harare (Avondale)',
    whatsapp: PRIMARY_WHATSAPP_NUMBER,
    bio: 'HD lace frontals, custom colored burgundy & blonde wigs, closure replacements. Expiring soon - renewal due!',
    image: 'https://files.catbox.moe/miima6.jpg',
    status: 'due',
    durationWeeks: 1,
    createdAt: Date.now() - 6.5 * 86400 * 1000,
    expiresAt: Date.now() + 0.5 * 86400 * 1000, // Due in 12 hours!
    paidAmount: 1.00,
    senderEcoCash: '0778901234',
    approvalCode: 'MP261104.9912',
    verified: true,
    badge: 'DUE SOON'
  },
  {
    id: 'ad-archived-5',
    name: 'Vintage Ankara Couture',
    category: 'Dresses & Fashion',
    location: 'Bulawayo Suburbs',
    whatsapp: PRIMARY_WHATSAPP_NUMBER,
    bio: 'African print tailored gala dresses, wedding guest outfits & bespoke skirts. (Auto-archived due to expired subscription)',
    image: 'https://files.catbox.moe/ffpmpq.jpg',
    status: 'archived',
    durationWeeks: 1,
    createdAt: Date.now() - 14 * 86400 * 1000,
    expiresAt: Date.now() - 7 * 86400 * 1000, // Expired 7 days ago!
    paidAmount: 1.00,
    senderEcoCash: '0714567890',
    approvalCode: 'MP261027.3321',
    verified: false,
    badge: 'ARCHIVED'
  }
];

function initAdvertisingSystem() {
  const savedAds = localStorage.getItem('misspbeauty_sponsored_ads');
  if (savedAds) {
    try {
      const parsed = JSON.parse(savedAds);
      state.sponsoredAds = parsed.map(ad => {
        const defaultMatch = defaultSponsoredAds.find(d => d.id === ad.id);
        if (defaultMatch) {
          return {
            ...defaultMatch,
            ...ad,
            tiktok: ad.tiktok || defaultMatch.tiktok,
            instagram: ad.instagram || defaultMatch.instagram,
            facebook: ad.facebook || defaultMatch.facebook
          };
        }
        return ad;
      });
    } catch (e) {
      state.sponsoredAds = [...defaultSponsoredAds];
    }
  } else {
    state.sponsoredAds = [...defaultSponsoredAds];
    localStorage.setItem('misspbeauty_sponsored_ads', JSON.stringify(state.sponsoredAds));
  }

  checkAdExpirations();
  renderBrandsGrid();
  updateAdRateDisplays();

  // Periodic check for expirations
  setInterval(checkAdExpirations, 60000);
}

function checkAdExpirations() {
  const now = Date.now();
  let changed = false;

  state.sponsoredAds.forEach(ad => {
    // Flagship ad never expires
    if (ad.id === 'ad-flagship-1') {
      ad.status = 'active';
      return;
    }
    const timeLeft = ad.expiresAt - now;
    if (timeLeft <= 0) {
      if (ad.status !== 'archived') {
        ad.status = 'archived';
        changed = true;
      }
    } else if (timeLeft <= 2 * 24 * 3600 * 1000) {
      if (ad.status !== 'due') {
        ad.status = 'due';
        changed = true;
      }
    } else {
      if (ad.status !== 'active') {
        ad.status = 'active';
        changed = true;
      }
    }
  });

  if (changed) {
    localStorage.setItem('misspbeauty_sponsored_ads', JSON.stringify(state.sponsoredAds));
  }
}


function formatSocialLink(val, platform) {
  if (!val) return '#';
  val = val.trim();
  if (val.startsWith('http://') || val.startsWith('https://')) {
    return val;
  }
  const cleanHandle = val.replace(/^@/, '').replace(/^\/+/, '');
  if (platform === 'tiktok') {
    return `https://www.tiktok.com/@${cleanHandle}`;
  } else if (platform === 'instagram') {
    return `https://www.instagram.com/${cleanHandle}`;
  } else if (platform === 'facebook') {
    return `https://www.facebook.com/${cleanHandle}`;
  }
  return `https://${val}`;
}

function renderBrandsGrid() {
  const container = document.getElementById('brands-grid');
  if (!container) return;

  checkAdExpirations();

  // Update counts
  const activeAds = state.sponsoredAds.filter(a => a.status === 'active');
  const dueAds = state.sponsoredAds.filter(a => a.status === 'due');
  const archivedAds = state.sponsoredAds.filter(a => a.status === 'archived');

  const countActiveEl = document.getElementById('count-active-ads');
  const countDueEl = document.getElementById('count-due-ads');
  const countArchivedEl = document.getElementById('count-archived-ads');

  if (countActiveEl) countActiveEl.textContent = activeAds.length;
  if (countDueEl) countDueEl.textContent = dueAds.length;
  if (countArchivedEl) countArchivedEl.textContent = archivedAds.length;

  const currentList = state.activeAdsTab === 'active' 
    ? activeAds 
    : (state.activeAdsTab === 'due' ? dueAds : archivedAds);

  updateAdRateDisplays();

  if (currentList.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: #fff8fb; border: 1.5px dashed #fbcfe8; border-radius: var(--radius-md);">
        <i class="fa-solid fa-box-open" style="font-size: 2.5rem; color: var(--primary); margin-bottom: 0.75rem;"></i>
        <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">No ${state.activeAdsTab.toUpperCase()} Adverts Found</h3>
        <p style="color: #6b7280; font-size: 0.9rem; max-width: 480px; margin: 0 auto 1.5rem;">
          ${state.activeAdsTab === 'due' ? 'Great news! There are currently no adverts with payments due.' : (state.activeAdsTab === 'archived' ? 'No expired adverts have been archived yet.' : 'Be the first to feature your business here for only $' + state.adWeeklyRate.toFixed(2) + '/week!')}
        </p>
        <button class="btn btn-gold" onclick="openAdvertiseModal()">
          <i class="fa-solid fa-bullhorn"></i> Place Advert via EcoCash ($${state.adWeeklyRate.toFixed(2)}/wk)
        </button>
      </div>
    `;
    return;
  }

  let html = currentList.map(ad => {
    const isDue = ad.status === 'due';
    const isArchived = ad.status === 'archived';
    const cardBorderClass = isDue ? 'ad-due-border' : (isArchived ? 'ad-archived-border' : '');
    
    // Calculate days remaining
    const daysLeft = Math.ceil((ad.expiresAt - Date.now()) / (1000 * 60 * 60 * 24));
    let timeLabel = '';
    if (ad.id === 'ad-flagship-1') {
      timeLabel = '<span class="text-success"><i class="fa-solid fa-infinity"></i> Permanent Flagship</span>';
    } else if (daysLeft > 1) {
      timeLabel = `<span class="text-success"><i class="fa-regular fa-clock"></i> ${daysLeft} days active remaining</span>`;
    } else if (daysLeft === 1) {
      timeLabel = '<span class="text-warning"><i class="fa-solid fa-triangle-exclamation"></i> Expires in 24 hours</span>';
    } else if (daysLeft === 0) {
      timeLabel = '<span class="text-warning"><i class="fa-solid fa-bell"></i> Payment Due Today!</span>';
    } else {
      timeLabel = `<span class="text-muted"><i class="fa-solid fa-box-archive"></i> Expired ${Math.abs(daysLeft)} days ago</span>`;
    }

    const badgeStatusHtml = isDue
      ? '<span class="ad-status-badge ad-status-due"><i class="fa-solid fa-bell"></i> PAYMENT DUE SOON</span>'
      : (isArchived 
          ? '<span class="ad-status-badge ad-status-archived"><i class="fa-solid fa-box-archive"></i> ARCHIVED / UNPAID</span>'
          : '<span class="ad-status-badge ad-status-active"><i class="fa-solid fa-circle-check"></i> ACTIVE</span>');

    const cleanWaNumber = (ad.whatsapp || PRIMARY_WHATSAPP_NUMBER).replace(/[^0-9]/g, '');

    return `
      <div class="brand-card ${cardBorderClass}">
        ${badgeStatusHtml}
        <div class="brand-card-img-wrapper">
          <img src="${ad.image || 'https://files.catbox.moe/28r9b0.jpg'}" alt="${ad.name}" class="brand-card-img" onerror="this.src='https://files.catbox.moe/28r9b0.jpg'">
        </div>

        <div class="brand-info">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap: 0.5rem;">
            <h4 class="brand-title" style="margin-bottom: 0.25rem;">${ad.name}</h4>
            ${ad.verified ? '<i class="fa-solid fa-circle-check text-gold" title="Verified Partner" style="margin-top:4px;"></i>' : ''}
          </div>
          <p style="font-size:0.78rem; color: #ff2d87; font-weight:700; margin-bottom: 0.35rem;">
            <i class="fa-solid fa-location-dot"></i> ${ad.location} &bull; ${ad.category}
          </p>
          <p class="brand-bio">${ad.bio}</p>

          <div class="ad-duration-tag">
            ${timeLabel}
          </div>
        </div>

        ${(() => {
          const pills = [];
          if (ad.tiktok) {
            pills.push(`<a href="${formatSocialLink(ad.tiktok, 'tiktok')}" target="_blank" rel="noopener noreferrer" class="ad-social-pill ad-social-tiktok" title="Follow on TikTok"><i class="fa-brands fa-tiktok"></i> <span>TikTok</span></a>`);
          }
          if (ad.instagram) {
            pills.push(`<a href="${formatSocialLink(ad.instagram, 'instagram')}" target="_blank" rel="noopener noreferrer" class="ad-social-pill ad-social-instagram" title="Follow on Instagram"><i class="fa-brands fa-instagram"></i> <span>Instagram</span></a>`);
          }
          if (ad.facebook) {
            pills.push(`<a href="${formatSocialLink(ad.facebook, 'facebook')}" target="_blank" rel="noopener noreferrer" class="ad-social-pill ad-social-facebook" title="Visit Facebook Page"><i class="fa-brands fa-facebook"></i> <span>Facebook</span></a>`);
          }
          return pills.length ? `<div class="ad-socials-bar"><span class="ad-socials-label"><i class="fa-solid fa-link"></i> Socials:</span><div class="ad-socials-links">${pills.join('')}</div></div>` : '';
        })()}

        <div class="ad-card-actions">
          <a href="https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(`Hello ${ad.name}! I saw your showcase advert on misspbeauty_parlor and would love to inquire about your services/products.`)}" target="_blank" class="btn btn-sm btn-whatsapp">
            <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
          </a>

          ${isDue ? `
            <button class="btn btn-sm btn-gold" onclick="openRenewAdModal('${ad.id}')" title="Renew Advert via EcoCash">
              <i class="fa-solid fa-rotate"></i> Pay EcoCash
            </button>
            <button class="btn btn-sm btn-outline" onclick="sendDueReminderWhatsApp('${ad.id}')" title="Send WhatsApp Due Reminder">
              <i class="fa-solid fa-bell"></i> Notify
            </button>
          ` : ''}

          ${isArchived ? `
            <button class="btn btn-sm btn-gold" onclick="openRenewAdModal('${ad.id}')" title="Reactivate Advert via EcoCash">
              <i class="fa-solid fa-bolt"></i> Reactivate ($${state.adWeeklyRate.toFixed(2)})
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  // Append Place Ad CTA Card
  html += `
    <div class="brand-card advertise-cta-card" style="display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; background:linear-gradient(135deg, #fff5f8 0%, #ffe4f0 100%); border:2px dashed #f472b6;">
      <div class="brand-avatar gold-bg" style="margin-bottom:0.75rem;">
        <i class="fa-solid fa-bullhorn" style="font-size:1.4rem;"></i>
      </div>
      <div class="brand-info" style="margin-bottom:1rem;">
        <h4 class="brand-title">List Your Brand on Miss P</h4>
        <p class="brand-bio">Upload your hair, dresses, shoes or salon photos & pay straight via EcoCash for only <strong>$${state.adWeeklyRate.toFixed(2)}/week</strong>!</p>
      </div>
      <button class="btn btn-gold w-100" onclick="openAdvertiseModal()">
        <i class="fa-solid fa-plus"></i> Place Ad via EcoCash
      </button>
    </div>
  `;

  container.innerHTML = html;
}

function switchAdTab(tabKey) {
  state.activeAdsTab = tabKey;
  ['active', 'due', 'archived'].forEach(k => {
    const btn = document.getElementById(`tab-${k}-btn`);
    if (btn) {
      if (k === tabKey) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });
  renderBrandsGrid();
}

function renderAdDurationChips(containerId, isRenew = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const durations = [
    { weeks: 1, label: '1 Week', desc: 'Standard week' },
    { weeks: 2, label: '2 Weeks', desc: 'Fortnight promotion' },
    { weeks: 3, label: '3 Weeks', desc: 'Tri-week showcase' },
    { weeks: 4, label: '4 Weeks', desc: 'Full Month (Popular)' },
    { weeks: 8, label: '8 Weeks', desc: '2 Months Featured' },
    { weeks: 12, label: '12 Weeks', desc: '3 Months VIP' }
  ];

  const currentSelectedWeeks = isRenew ? state.selectedRenewDurationWeeks : state.selectedAdDurationWeeks;

  container.innerHTML = durations.map(d => {
    const cost = (d.weeks * state.adWeeklyRate).toFixed(2);
    const isSelected = d.weeks === currentSelectedWeeks;
    return `
      <div class="duration-chip ${isSelected ? 'selected' : ''}" onclick="${isRenew ? 'selectRenewDuration' : 'selectAdDuration'}(${d.weeks})">
        <strong>${d.label}</strong>
        <span>$${cost} USD</span>
      </div>
    `;
  }).join('');
}

function selectAdDuration(weeks) {
  state.selectedAdDurationWeeks = weeks;
  state.currentAdDraft.durationWeeks = weeks;
  renderAdDurationChips('ad-duration-selector', false);
  const total = (weeks * state.adWeeklyRate).toFixed(2);
  const btnTotal = document.getElementById('btn-total-fee');
  if (btnTotal) btnTotal.textContent = `$${total}`;
}

function selectRenewDuration(weeks) {
  state.selectedRenewDurationWeeks = weeks;
  renderAdDurationChips('renew-duration-selector', true);
  const total = (weeks * state.adWeeklyRate).toFixed(2);
  const disp = document.getElementById('renew-total-display');
  if (disp) disp.textContent = `$${total} USD`;
  const ussdText = document.getElementById('renew-ussd-text');
  if (ussdText) ussdText.textContent = `USSD: *151*1*1*0785505967*${Math.round(total * 100) / 100}#`;
}

function handleAdImageUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const base64 = e.target.result;
    state.currentAdDraft.image = base64;
    const previewContainer = document.getElementById('ad-preview-container');
    const previewImg = document.getElementById('ad-preview-image');
    const dropzonePlaceholder = (document.getElementById('ad-dropzone-placeholder') || document.getElementById('ad-dropzone-placeholder'));

    if (previewImg) previewImg.src = base64;
    if (previewContainer) previewContainer.style.display = 'block';
    if (dropzonePlaceholder) dropzonePlaceholder.style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function handleAdImageUrl(url) {
  if (!url || !url.startsWith('http')) return;
  state.currentAdDraft.image = url;
  const previewContainer = document.getElementById('ad-preview-container');
  const previewImg = document.getElementById('ad-preview-image');
  const dropzonePlaceholder = (document.getElementById('ad-dropzone-placeholder') || document.getElementById('ad-dropzone-placeholder'));

  if (previewImg) previewImg.src = url;
  if (previewContainer) previewContainer.style.display = 'block';
  if (dropzonePlaceholder) dropzonePlaceholder.style.display = 'none';
}

function removeAdImage() {
  state.currentAdDraft.image = '';
  const previewContainer = document.getElementById('ad-preview-container');
  const dropzonePlaceholder = (document.getElementById('ad-dropzone-placeholder') || document.getElementById('ad-dropzone-placeholder'));
  const fileInput = document.getElementById('ad-image-file');
  const urlInput = document.getElementById('ad-image-url-input');

  if (fileInput) fileInput.value = '';
  if (urlInput) urlInput.value = '';
  if (previewContainer) previewContainer.style.display = 'none';
  if (dropzonePlaceholder) dropzonePlaceholder.style.display = 'block';
}

function proceedToEcoCashPayment() {
  const businessName = (document.getElementById('ad-business-name')?.value || '').trim();
  const category = document.getElementById('ad-category')?.value;
  const city = document.getElementById('ad-city')?.value;
  const whatsapp = (document.getElementById('ad-whatsapp')?.value || '').trim();
  const services = (document.getElementById('ad-services')?.value || '').trim();

  if (!businessName) {
    alert('Please enter your Business or Salon Name.');
    document.getElementById('ad-business-name')?.focus();
    return;
  }
  if (!whatsapp) {
    alert('Please enter your WhatsApp contact number.');
    document.getElementById('ad-whatsapp')?.focus();
    return;
  }
  if (!services) {
    alert('Please enter your services offered or products.');
    document.getElementById('ad-services')?.focus();
    return;
  }

  const tiktok = (document.getElementById('ad-tiktok')?.value || '').trim();
  const instagram = (document.getElementById('ad-instagram')?.value || '').trim();
  const facebook = (document.getElementById('ad-facebook')?.value || '').trim();

  // Update draft
  state.currentAdDraft.businessName = businessName;
  state.currentAdDraft.category = category;
  state.currentAdDraft.city = city;
  state.currentAdDraft.whatsapp = whatsapp;
  state.currentAdDraft.services = services;
  state.currentAdDraft.tiktok = tiktok;
  state.currentAdDraft.instagram = instagram;
  state.currentAdDraft.facebook = facebook;
  state.currentAdDraft.durationWeeks = state.selectedAdDurationWeeks;

  const totalFee = (state.selectedAdDurationWeeks * state.adWeeklyRate).toFixed(2);
  const ussdAmount = Math.round(totalFee * 100) / 100;
  const ussdCode = `*151*1*1*0785505967*${ussdAmount}#`;

  // Update step 2 UI
  const durationSummary = document.getElementById('ecocash-duration-summary');
  const rateSummary = document.getElementById('ecocash-rate-summary');
  const totalDisplay = document.getElementById('ecocash-total-display');
  const ussdCodeEl = document.getElementById('ecocash-ussd-code');
  const dialLink = document.getElementById('ecocash-dial-link');
  const instructAmount = document.getElementById('instruction-amount');

  if (durationSummary) durationSummary.textContent = `${state.selectedAdDurationWeeks} Week(s)`;
  if (rateSummary) rateSummary.textContent = `$${state.adWeeklyRate.toFixed(2)} USD`;
  if (totalDisplay) totalDisplay.textContent = `$${totalFee} USD`;
  if (ussdCodeEl) ussdCodeEl.textContent = ussdCode;
  if (dialLink) dialLink.href = `tel:${encodeURIComponent(ussdCode)}`;
  if (instructAmount) instructAmount.textContent = `$${totalFee}`;

  // Toggle step view
  document.getElementById('ad-step-1').style.display = 'none';
  document.getElementById('ad-step-2').style.display = 'block';
  document.getElementById('indicator-step-1').classList.remove('active');
  document.getElementById('indicator-step-2').classList.add('active');
}

function backToStep1() {
  document.getElementById('ad-step-2').style.display = 'none';
  document.getElementById('ad-step-1').style.display = 'block';
  document.getElementById('indicator-step-2').classList.remove('active');
  document.getElementById('indicator-step-1').classList.add('active');
}

function submitEcoCashAdvert(event) {
  event.preventDefault();
  const senderEcoCash = (document.getElementById('advertiser-ecocash-num')?.value || '').trim();
  const approvalCode = (document.getElementById('advertiser-approval-code')?.value || '').trim();

  if (!senderEcoCash || !approvalCode) {
    alert('Please provide your EcoCash phone number and the EcoCash Approval Code received via SMS.');
    return;
  }

  const now = Date.now();
  const weeks = state.currentAdDraft.durationWeeks || 1;
  const expiresAt = now + (weeks * 7 * 24 * 3600 * 1000);
  const paidAmount = weeks * state.adWeeklyRate;

  const newAd = {
    id: 'ad-' + now,
    name: state.currentAdDraft.businessName,
    category: state.currentAdDraft.category,
    location: state.currentAdDraft.city,
    whatsapp: state.currentAdDraft.whatsapp,
    bio: state.currentAdDraft.services,
    tiktok: state.currentAdDraft.tiktok || '',
    instagram: state.currentAdDraft.instagram || '',
    facebook: state.currentAdDraft.facebook || '',
    image: state.currentAdDraft.image || 'https://files.catbox.moe/28r9b0.jpg',
    status: 'active',
    durationWeeks: weeks,
    createdAt: now,
    expiresAt: expiresAt,
    paidAmount: paidAmount,
    senderEcoCash: senderEcoCash,
    approvalCode: approvalCode,
    verified: true,
    badge: 'VERIFIED ADVERT'
  };

  state.sponsoredAds.unshift(newAd);
  localStorage.setItem('misspbeauty_sponsored_ads', JSON.stringify(state.sponsoredAds));

  // WhatsApp transfer confirmation message straight to Miss P
  const waMessage = `*NEW ECOCASH ADVERT PAYMENT on misspbeauty_parlor!* 💰👑

📍 *Business Name:* ${newAd.name}
🏷️ *Category:* ${newAd.category}
🌍 *Location:* ${newAd.location}
📱 *Advertiser WhatsApp:* ${newAd.whatsapp}${newAd.tiktok ? `\n🎵 *TikTok:* ${newAd.tiktok}` : ''}${newAd.instagram ? `\n📸 *Instagram:* ${newAd.instagram}` : ''}${newAd.facebook ? `\n📘 *Facebook:* ${newAd.facebook}` : ''}
📅 *Duration:* ${weeks} week(s)
💵 *Amount Paid:* $${paidAmount.toFixed(2)} USD
📲 *Sender EcoCash Number:* ${senderEcoCash}
🧾 *EcoCash Approval Code:* ${approvalCode}
👤 *Transferred Straight To:* Miss P (0785505967)

*Offer / Description:*
${newAd.bio}

The advert has been published to misspbeauty_parlor and is now live! ✨`;

  const waUrl = `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
  window.open(waUrl, '_blank');

  closeAdvertiseModal();
  renderBrandsGrid();
  showToast(`🎉 Advert published! $${paidAmount.toFixed(2)} transferred via EcoCash to Miss P (0785505967).`);

  // Reset form
  removeAdImage();
  const bNameEl = document.getElementById('ad-business-name');
  const bWaEl = document.getElementById('ad-whatsapp');
  const bServEl = document.getElementById('ad-services');
  const sEcoEl = document.getElementById('advertiser-ecocash-num');
  const sAppEl = document.getElementById('advertiser-approval-code');
  if (bNameEl) bNameEl.value = '';
  if (bWaEl) bWaEl.value = '';
  if (bServEl) bServEl.value = '';
  if (sEcoEl) sEcoEl.value = '';
  if (sAppEl) sAppEl.value = '';
  backToStep1();
}

function sendDueReminderWhatsApp(adId) {
  const ad = state.sponsoredAds.find(a => a.id === adId);
  if (!ad) return;

  const cleanPhone = (ad.whatsapp || PRIMARY_WHATSAPP_NUMBER).replace(/[^0-9]/g, '');
  const reminderMsg = `Hello *${ad.name}*! 👋

This is *misspbeauty_parlor* in Bulawayo. Your sponsored advert showcase on our platform is currently *DUE FOR RENEWAL*. ⏳

To keep your business active and featured in front of thousands of beauty and fashion shoppers:
💸 *Weekly Rate:* $${state.adWeeklyRate.toFixed(2)} USD per week
📲 *EcoCash Transfer To:* 0785505967 (misspbeauty_parlor)
⚡ *Quick USSD:* *151*1*1*0785505967*${state.adWeeklyRate.toFixed(2)}#

_Note: If payment is not renewed, your advert will be auto-archived by the system._

Thank you for partnering with misspbeauty_parlor! 💖`;

  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(reminderMsg)}`;
  window.open(waUrl, '_blank');
  showToast(`WhatsApp renewal reminder sent to ${ad.name}!`);
}

function openRenewAdModal(adId) {
  const ad = state.sponsoredAds.find(a => a.id === adId);
  if (!ad) return;

  const modal = document.getElementById('ad-renew-modal');
  const title = document.getElementById('renew-modal-title');
  const hiddenId = document.getElementById('renew-ad-id');

  if (title) title.textContent = `Renew Advert: ${ad.name}`;
  if (hiddenId) hiddenId.value = adId;

  state.selectedRenewDurationWeeks = 1;
  renderAdDurationChips('renew-duration-selector', true);
  selectRenewDuration(1);

  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeRenewAdModal() {
  const modal = document.getElementById('ad-renew-modal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function submitAdRenewal(event) {
  event.preventDefault();
  const adId = document.getElementById('renew-ad-id')?.value;
  const senderEcoCash = (document.getElementById('renew-ecocash-num')?.value || '').trim();
  const approvalCode = (document.getElementById('renew-approval-code')?.value || '').trim();

  const ad = state.sponsoredAds.find(a => a.id === adId);
  if (!ad) return;

  const weeks = state.selectedRenewDurationWeeks || 1;
  const now = Date.now();
  // Extend from now or from current expiresAt if future
  const baseTime = (ad.expiresAt > now) ? ad.expiresAt : now;
  ad.expiresAt = baseTime + (weeks * 7 * 24 * 3600 * 1000);
  ad.status = 'active';
  ad.durationWeeks += weeks;
  const addedCost = weeks * state.adWeeklyRate;
  ad.paidAmount = (ad.paidAmount || 0) + addedCost;
  ad.senderEcoCash = senderEcoCash;
  ad.approvalCode = approvalCode;

  localStorage.setItem('misspbeauty_sponsored_ads', JSON.stringify(state.sponsoredAds));

  const waMessage = `*ECOCASH ADVERT RENEWAL on misspbeauty_parlor!* 🔄💎

📍 *Business Name:* ${ad.name}
📅 *Extended By:* ${weeks} week(s)
💵 *Renewal Fee Paid:* $${addedCost.toFixed(2)} USD
📲 *Sender EcoCash Number:* ${senderEcoCash}
🧾 *Approval Code:* ${approvalCode}
👤 *Transferred Straight To:* Miss P (0785505967)

Advert has been renewed and reactivated on misspbeauty_parlor! ✨`;

  const waUrl = `https://wa.me/${PRIMARY_WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
  window.open(waUrl, '_blank');

  closeRenewAdModal();
  renderBrandsGrid();
  showToast(`🎉 Advert renewed for ${weeks} week(s)! Reactivated via EcoCash to 0785505967.`);
}

function openAdSettingsModal() {
  const modal = document.getElementById('ad-settings-modal');
  const rateInput = document.getElementById('setting-weekly-rate');
  if (rateInput) rateInput.value = state.adWeeklyRate.toFixed(2);

  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeAdSettingsModal() {
  const modal = document.getElementById('ad-settings-modal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function saveAdSettings(event) {
  event.preventDefault();
  const rateInput = document.getElementById('setting-weekly-rate');
  const newRate = parseFloat(rateInput?.value);
  if (isNaN(newRate) || newRate <= 0) {
    alert('Please enter a valid weekly rate.');
    return;
  }

  state.adWeeklyRate = newRate;
  localStorage.setItem('misspbeauty_ad_weekly_rate', newRate.toString());

  updateAdRateDisplays();
  renderAdDurationChips('ad-duration-selector', false);
  renderBrandsGrid();
  closeAdSettingsModal();
  showToast(`✅ Owner Settings Saved: Advert rate set to $${newRate.toFixed(2)} USD per week!`);
}

function updateAdRateDisplays() {
  const rateDisplay = document.getElementById('ad-current-rate-display');
  if (rateDisplay) {
    rateDisplay.textContent = `$${state.adWeeklyRate.toFixed(2)} USD / week`;
  }
}

function openAdvertiseModal() {
  const modal = document.getElementById('advertise-modal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    renderAdDurationChips('ad-duration-selector', false);
    selectAdDuration(state.selectedAdDurationWeeks || 1);
    backToStep1();
  }
}

function closeAdvertiseModal() {
  const modal = document.getElementById('advertise-modal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}


// ==========================================================================
// Toast Notification Utility
// ==========================================================================
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-gold"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
