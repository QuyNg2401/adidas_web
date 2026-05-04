export const CHECKOUT_NAV_LINKS = [
  { label: 'SHOP', to: '/products', active: false },
  { label: 'COLLECTIONS', href: '#', active: false },
  { label: 'SPORTS', href: '#', active: false },
  { label: 'OUTLET', href: '#', active: false },
]

export const CHECKOUT_PAGE = {
  title: 'Checkout',
  sections: [{ step: '01', title: 'SHIPPING DETAILS (DEMO)' }],
}

/** Demo fields only — order API does not persist these values. */
export const CHECKOUT_FORMS = {
  shipping: {
    fields: [
      { name: 'fullName', label: 'FULL NAME' },
      {
        name: 'phone',
        label: 'PHONE NUMBER',
        inputMode: 'tel',
      },
      {
        name: 'address',
        label: 'SHIPPING ADDRESS',
      },
    ],
  },
}

export const CHECKOUT_ACTIONS = {
  primary: 'Complete Purchase',
  secondary: 'Return to Cart',
}

export const CHECKOUT_SUMMARY = {
  title: 'Order Summary',
  items: [
    {
      name: 'ADIDAS VELOCITY V1',
      meta: 'Black / Neon / 11 US',
      price: '$180.00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxsv8uQrrFw-QWfJ73JqHz6eZB8Fx8q7KydYHNzbuspnyasjTjP4WHJFw6FoJKWL0bt4Wt5_A4mNzLk6zRKxahoGq0_WP9pPkEqpDh5zbhztBamm5APHvKtBaPVMptZL68suLkjd6wzdOPGSHWm_Mu4sJHgCIkGqGp85FB2x020y8FbGHyLDoj_J6F7TVmPA9l2VWm8bRltKtlJtDp0tUEoEdOrm9XBLpWurjrH_M-2wHKOZrnVX0USRIfIOem6zcqOV-5JfxVkHJ5',
      alt: 'Close-up of a high-performance red athletic sneaker on a clinical white background with sharp shadows',
    },
    {
      name: 'CORE PERFORMANCE TEE',
      meta: 'Lunar White / L',
      price: '$45.00',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD378YFZBUtIbNkAota5N9aav4CMlINxY2_Vmc2zc5DfvZlVfoj0UnF7flvceuNuhfQjMZB-8slWZMToPKCrf2GBTTNcMvWa9WhZayka3WWB4IC1jjfVveda-F-O2OlxWvFc6dIHkZ8XuC1agV9dgXsW2H8gjQtxA93QYMHQmmI4_umVxwrm6td_GB_QyyZjB2m1IZhzGQRgIS2alD66klnNDxetUR1GFZIOFp6HY9bfk6NNZU-KhWOUWfHY7Ge40-Jrg1sXz4ydcBj',
      alt: 'Folded minimalist white cotton performance t-shirt on a dark stone surface with stark lighting',
    },
  ],
  totals: [
    { label: 'SUBTOTAL', value: '$225.00' },
    { label: 'SHIPPING', value: 'FREE' },
  ],
  total: { label: 'TOTAL', value: '$225.00' },
  secure: 'Encrypted & Secure Transaction',
}

export const CHECKOUT_FOOTER = {
  brandTitle: 'ADIDAS PERFORMANCE',
  brandDescription:
    'ENGINEERED FOR THE ELITE. MINIMALIST DESIGN FOR MAXIMUM PERFORMANCE. NO DISTRACTIONS.',
  columns: [
    {
      title: 'SHOP',
      links: [
        { label: 'NEW ARRIVALS', href: '#' },
        { label: 'BEST SELLERS', href: '#' },
        { label: 'COLLECTIONS', href: '#' },
      ],
    },
    {
      title: 'SUPPORT',
      links: [
        { label: 'HELP CENTER', href: '#' },
        { label: 'RETURNS', href: '#' },
        { label: 'SHIPPING', href: '#' },
      ],
    },
    {
      title: 'JOIN THE ELITE',
      links: [],
    },
  ],
  bottomLinks: [
    { label: 'PRIVACY', href: '#' },
    { label: 'TERMS', href: '#' },
  ],
  copyright: '© 2026 ADIDAS PERFORMANCE. ALL RIGHTS RESERVED.',
}

