export const ADMIN_NAV_LINKS = [
  { label: 'DASHBOARD', to: '/admin', active: true },
  { label: 'SHOP', to: '/products', active: false },
  { label: 'COLLECTIONS', href: '#', active: false },
  { label: 'SPORTS', href: '#', active: false },
  { label: 'OUTLET', href: '#', active: false },
]

export const ADMIN_HEADER = {
  kicker: 'ADMINISTRATION',
  title: 'SYSTEM OVERVIEW',
  actions: ['Generate Report', 'Export CSV'],
}

export const METRICS = [
  {
    icon: 'payments',
    delta: '+12.4%',
    deltaTone: 'up',
    label: 'TOTAL REVENUE',
    value: '$142,384.00',
  },
  {
    icon: 'shopping_bag',
    delta: '+8.1%',
    deltaTone: 'up',
    label: 'TOTAL ORDERS',
    value: '1,842',
  },
  {
    icon: 'group',
    delta: '0.0%',
    deltaTone: 'flat',
    label: 'NEW CUSTOMERS',
    value: '429',
  },
  {
    icon: 'trending_up',
    delta: '-2.4%',
    deltaTone: 'down',
    label: 'AVG ORDER VALUE',
    value: '$77.29',
  },
]

export const REVENUE_PERFORMANCE = {
  title: 'REVENUE PERFORMANCE',
  tabs: ['WEEKLY', 'MONTHLY'],
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
}

export const PROMOTIONS = {
  title: 'ACTIVE PROMOTIONS',
  items: [
    {
      code: 'SUMMER_24',
      description: '20% off all performance footwear. Ends in 2 days.',
    },
    {
      code: 'ELITE_MEMBERS',
      description: 'Early access to Autumn drop starts tonight.',
    },
  ],
}

export const INVENTORY = {
  title: 'INVENTORY MANAGEMENT',
  searchPlaceholder: 'SEARCH PRODUCTS...',
  columns: ['PRODUCT', 'CATEGORY', 'PRICE', 'STOCK', 'STATUS', 'ACTION'],
  rows: [
    {
      name: 'STRIDE VOLT-X1',
      category: 'FOOTWEAR',
      price: '$189.00',
      stock: '42 units',
      status: { label: 'In Stock', tone: 'ok' },
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0qsh3fmZVovEQIPlXtDYMp07evLs59tv8wu4U_dfyTiOXmsUkGy9xJI9C_7EqobbiDfkCCu_6iPWITlqmy_C6eoIa2vNcmzpmNAUGF3po8nG6NRnpTU04seua3UzUZ_etOdgoiv-a_PnWJRjVk2M2c4vkpFdkL0BcTPqsmhdHApD3WWcpKEJVIino8UqYgAPalXbBD2aeHY8P_-LxkOnJmXGAt5SSgc13RWVGbBA9wTl1vVEcsL8ZyR99L28xyvEzPKtLop9ww3hw',
        alt: 'Close-up profile shot of a sleek red running shoe with white branding against a dark background',
      },
    },
    {
      name: 'AERO-COMP SHELL',
      category: 'APPAREL',
      price: '$125.00',
      stock: '3 units',
      status: { label: 'Low Stock', tone: 'warn' },
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdul55ipwVwDY55Gkw1Iw4PLJkSRnaZeGCcZ14UUP8VgrLRBsyWDHsnpafn1fQ5XbnKFg3GPbYeCNxOcqnzcM4MbPbzSEluT2VH_h_XK9_yyDm0kvrIgnqOU4idYW5acTaKCosvPC-lwn4Ij8GdhthdK3vmijKh1IW80xsNBc4jK2dRGow4XMokf5UKgJ8o0MNQr8iBxhNAeJl2GXdfXaPcGdAz7IgCRZTh82Ba18xswUp0ZmB6AavXuSZ20ncpMNRFNXBTlz1fHq9',
        alt: 'Minimalist black athletic jacket draped on a clean white hanger against a grey concrete wall',
      },
    },
    {
      name: 'STRIDE CORE ELITE',
      category: 'FOOTWEAR',
      price: '$210.00',
      stock: '115 units',
      status: { label: 'In Stock', tone: 'ok' },
      image: {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_SNUrUbjIlJvmMxCZnOkULg6lnBxS--Mbw5XhPg3M_B0Do_w8Ev8gzfniPwwnwSOO3byCID5uB12gcF265MgwlGTJFKRPz7HG-ZeZEvmLnbZEVUtnbDgfKYp7OH7ifBjBBUv4urznjDMub5NBKrIVnOXJA7SMqUDqDuyFDCZmZCwriygFUAobnpo7LZqhhhPuxNir-9KFsGGRMe5IbL9Z7iMfSaeWPzxnNWYKWwRcoNjQy-9FGo6lRuu8KA5RLMb64uD3J6VaQQev',
        alt: 'High-performance white sports sneakers on a stark black platform with sharp directional lighting',
      },
    },
  ],
}

export const RECENT_ORDERS = {
  title: 'RECENT ORDERS',
  rows: [
    { id: 'ORDER #8821', meta: '3 items • Total $450.00', status: 'Processing' },
    { id: 'ORDER #8820', meta: '1 item • Total $189.00', status: 'Shipped' },
    { id: 'ORDER #8819', meta: '2 items • Total $310.00', status: 'Delivered' },
  ],
}

export const SYSTEM_LOGS = {
  title: 'SYSTEM LOGS',
  rows: [
    { text: 'Product STRIDE VOLT-X1 stock updated by Admin', time: '14:02 PM' },
    { text: 'Promotion SUMMER_24 activated', time: '11:30 AM' },
    { text: 'New user registration: j.miller@domain.com', time: '09:15 AM' },
  ],
}

export const ADMIN_FOOTER = {
  brandTitle: 'STRIDE PERFORMANCE',
  brandDescription:
    'High-precision athletic engineering for the modern competitor. Built for speed, designed for endurance.',
  columns: [
    {
      title: 'SUPPORT',
      links: [
        { label: 'CONTACT', href: '#' },
        { label: 'SHIPPING', href: '#' },
        { label: 'RETURNS', href: '#' },
      ],
    },
    {
      title: 'COLLECTIONS',
      links: [
        { label: 'ELITE', href: '#' },
        { label: 'TRAINING', href: '#' },
        { label: 'LIFESTYLE', href: '#' },
      ],
    },
    {
      title: 'NEWSLETTER',
      links: [],
    },
  ],
  copyright: '© 2024 STRIDE PERFORMANCE. ALL RIGHTS RESERVED.',
  bottomLinks: [
    { label: 'PRIVACY', href: '#' },
    { label: 'TERMS', href: '#' },
  ],
}

