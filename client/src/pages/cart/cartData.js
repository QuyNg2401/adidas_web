export const CART_NAV_LINKS = [
  { label: 'SHOP', to: '/products', active: false },
  { label: 'COLLECTIONS', href: '#', active: false },
  { label: 'SPORTS', href: '#', active: false },
  { label: 'OUTLET', href: '#', active: false },
]

export const CART_PAGE = {
  title: 'YOUR CART',
  subtitle: '3 ITEMS READY FOR PERFORMANCE',
}

export const CART_ITEMS = [
  {
    id: 'apex-x-runner-pro',
    name: 'APEX-X RUNNER PRO',
    variant: 'CORE BLACK / VOLT',
    size: '10.5 US',
    price: '$180.00',
    quantity: 1,
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqszd5cnYhreLgs9fD6Yn1cSNDEMnAg1rA46vU0ZO7SfRQSY07m336gYYkyKhao6_jrgdwKrxfNiT944wSzmeq5XiUZStUKlYH8bNCzSQrl-IYQsRKklelLruamX4F4Xp2DAFrBX4-nXjBvIQS2FtRsFyOVDkMr_tM7Ku60eT08y-Jn8w6NrLSfiaC-9CNUEUyxA5G8KXxDxzw5fdZ-HOi7v5MHYcSt_n4eA9dEeTrFboxP1zprZx-ZSRZHnkC4OEKovPOnvQbfja4',
      alt: 'Close-up of a sleek red and black performance running shoe against a clean white background with sharp shadows.',
    },
  },
  {
    id: 'stride-tech-tee',
    name: 'ADIDAS TECH TEE',
    variant: 'AEROREADY WHITE',
    size: 'LARGE',
    price: '$45.00',
    quantity: 2,
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlU-bQTjCC8468VYZ0boFSH_gt3QgVFog8jopbQrtbD9lR4zt6WeIVsxFJ2q4BKZEzfIdcq_SmaQH1knwKxLweHEL5G_OFWOi7ugeXcd4Qtewv8fHMAgW0nZAncUMALpax0FNe_FlptpfFcdnfnvlFpZ-r0M8mBi6qJKx0yBJm8mes1Q2p3nEXX2RGFSDWI7bLlr7N1qblc4R6_Nm0vdNkuSl1ek08xdt-__cQVjhVTzs4Ta2myObzgzLNZSMztDw5R747zqjM1d7T',
      alt: 'High-quality white compression performance shirt displayed on a minimalist mannequin in a high-contrast studio setting.',
    },
  },
  {
    id: 'pace-setter-shorts',
    name: 'PACE-SETTER SHORTS',
    variant: 'STEALTH BLACK',
    size: 'MEDIUM',
    price: '$60.00',
    quantity: 1,
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDpZPiD9JPIqhascvrXYM_Wt06VKNrnAWUpAqguGvpYcLexJuVKQ2PzoRDU6eaewZ1FW1tRelidiSeFeHopieGchmudskM8p7gnSQIBF2eMK8NdNLQ_rVfdZSwXXjeUnrhawPRku9QUJMLtobvX2oTI1mgMD5C-QbDZ5xEqd908Q1zJ_A8FvWjJPSqcTv1QZH3M4BkHlLWydP9MLZyiMyA6XC-vf1spXRYWyxBKHdv2rNDRmqktkJEPNgjEO12Q5Nl5p8Y3bgWfG47',
      alt: 'Athletic black performance shorts with subtle branding, laid flat on a grey concrete surface with dramatic lighting.',
    },
  },
]

export const ORDER_SUMMARY = {
  title: 'ORDER SUMMARY',
  rows: [
    { label: 'SUBTOTAL', value: '$285.00', muted: true },
    { label: 'ESTIMATED SHIPPING', value: 'FREE' },
    { label: 'TAX', value: '$22.80' },
  ],
  totalLabel: 'TOTAL',
  totalValue: '$307.80',
  ctaLabel: 'CHECKOUT',
  secureLabel: 'SECURE TRANSACTION GUARANTEED',
  paymentIcons: ['credit_card', 'payments', 'account_balance_wallet'],
}

export const PROMO = {
  title: 'HAVE A PROMO CODE?',
  placeholder: 'ENTER CODE',
  buttonLabel: 'APPLY',
}

export const CART_FOOTER = {
  brandTitle: 'ADIDAS',
  brandDescription:
    'HIGH PERFORMANCE GEAR FOR THE MODERN ATHLETE. PRECISION ENGINEERED.',
  columns: [
    {
      title: 'SUPPORT',
      links: [
        { label: 'HELP CENTER', href: '#' },
        { label: 'SHIPPING', href: '#' },
        { label: 'RETURNS', href: '#' },
      ],
    },
    {
      title: 'COLLECTIONS',
      links: [
        { label: 'RUNNING', href: '#' },
        { label: 'TRAINING', href: '#' },
        { label: 'LIFESTYLE', href: '#' },
      ],
    },
  ],
  copyright: '© 2026 ADIDAS PERFORMANCE. ALL RIGHTS RESERVED.',
}

