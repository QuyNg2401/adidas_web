export const ACCOUNT_NAV_LINKS = [
  { label: 'SHOP', to: '/products', active: false },
  { label: 'COLLECTIONS', href: '#', active: false },
  { label: 'SPORTS', href: '#', active: false },
  { label: 'OUTLET', href: '#', active: false },
]

export const ACCOUNT = {
  label: 'ATHLETE DASHBOARD',
  name: 'MARCUS REED',
  memberSinceLabel: 'MEMBER SINCE',
  memberSinceValue: 'AUGUST 2022',
}

export const LOYALTY = {
  title: 'STRIDE POINTS',
  subtitle: 'ELITE TIER STATUS ACTIVE',
  points: '12,450',
  pointsSuffix: 'PTS',
  progress: 75, // %
  leftLabel: 'ELITE TIER',
  rightLabel: '3,550 PTS TO PRO TIER',
  ctas: ['REDEEM REWARDS', 'TIER PERKS'],
}

export const STATS = [
  {
    icon: 'bolt',
    title: 'ACTIVE ORDERS',
    value: '02',
    variant: 'surface',
  },
  {
    icon: 'shopping_bag',
    title: 'TOTAL ITEMS',
    value: '48',
    variant: 'white',
  },
  {
    icon: 'location_on',
    title: 'SAVED ADDRESSES',
    value: '03',
    variant: 'white',
  },
  {
    icon: 'star',
    title: 'WISHLIST',
    value: '14',
    variant: 'black',
    filled: true,
  },
]

export const ORDER_HISTORY = {
  title: 'ORDER HISTORY',
  viewAll: 'VIEW ALL',
  rows: [
    {
      id: '#STRD-98442',
      date: 'NOV 14, 2023',
      items: 'APEX RUNNER X1, STRIDE CREW SOCK (3PK)',
      total: '$214.00',
      status: 'DELIVERED',
    },
    {
      id: '#STRD-97331',
      date: 'OCT 28, 2023',
      items: 'COMPRESSION TIGHTS 2.0, PERFORMANCE TEE',
      total: '$145.00',
      status: 'DELIVERED',
    },
    {
      id: '#STRD-96110',
      date: 'SEP 12, 2023',
      items: 'AERO-VEST, REFLECTIVE CAP',
      total: '$89.00',
      status: 'DELIVERED',
    },
  ],
}

export const FEATURED = {
  title: 'ELITE MEMBER EXCLUSIVE',
  body: 'Access the early drop of the Apex Predator series. Exclusive to athletes with 10k+ points.',
  cta: 'ENTER SHOP',
  image: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaUQKtv1h4U7e-aLXMf70Fet5DOZySnHKg1ePvf4SEXxA66CyfOgbHzJyBwUoLuwLtRjnHbXZWhszrt71P2L0wkUU6NinP_LXsKKABqZG-r76oQBCsQ121X28REztIvPmdWF_0erFgyXiA4NICqhrAs3a140E7XDk906LauXv8ol3qUj8AqzMnnyjYyUxl9x57qWbIQkg3k87xHuLsaX35LyFOhdtee-ERWhY5KO0usANIHvbI7JLM4nxIhei6PWkNv7zPyPFLxy29',
    alt: 'Close-up of a high-performance red and black running shoe with sharp architectural lighting and dark moody background',
  },
}

export const ACCOUNT_FOOTER = {
  brandTitle: 'STRIDE PERFORMANCE',
  brandDescription: 'EQUIPPING THE ELITE SINCE 2018. BUILT FOR PRECISION AND POWER.',
  columns: [
    {
      title: 'RESOURCES',
      links: [
        { label: 'SUPPORT', href: '#' },
        { label: 'COLLECTIONS', href: '#' },
        { label: 'NEWSLETTER', href: '#' },
      ],
    },
    {
      title: 'LEGAL',
      links: [
        { label: 'PRIVACY', href: '#' },
        { label: 'TERMS', href: '#' },
      ],
    },
  ],
  copyright: '© 2024 STRIDE PERFORMANCE. ALL RIGHTS RESERVED.',
}

