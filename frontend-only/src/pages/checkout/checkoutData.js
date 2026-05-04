export const CHECKOUT_NAV_LINKS = [
  { label: 'SHOP', to: '/products', active: false },
  { label: 'COLLECTIONS', href: '#', active: false },
  { label: 'SPORTS', href: '#', active: false },
  { label: 'OUTLET', href: '#', active: false },
]

export const CHECKOUT_PAGE = {
  title: 'Checkout',
  sections: [
    { step: '01', title: 'Shipping Address' },
    { step: '02', title: 'Payment Method' },
  ],
}

export const CHECKOUT_FORMS = {
  shipping: {
    fields: [
      { label: 'First Name', placeholder: 'Enter first name', colSpan: 1 },
      { label: 'Last Name', placeholder: 'Enter last name', colSpan: 1 },
      { label: 'Address Line 1', placeholder: 'Street address', colSpan: 2 },
      {
        label: 'Address Line 2 (Optional)',
        placeholder: 'Apartment, suite, etc.',
        colSpan: 2,
      },
      { label: 'City', placeholder: 'City', colSpan: 1 },
      { label: 'State', placeholder: 'NY', colSpan: 0.5 },
      { label: 'Zip Code', placeholder: '10001', colSpan: 0.5 },
    ],
  },
  payment: {
    methods: [
      {
        icon: 'credit_card',
        active: true,
        title: 'CREDIT / DEBIT CARD',
        description: 'Pay with Visa, Mastercard, or AMEX',
      },
      {
        icon: 'account_balance_wallet',
        active: false,
        title: 'DIGITAL WALLET',
        description: 'Apple Pay / Google Pay',
      },
    ],
    cardFields: [
      { label: 'Card Number', placeholder: '0000 0000 0000 0000' },
      { label: 'Expiration Date', placeholder: 'MM/YY' },
      { label: 'CVV', placeholder: '123' },
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
      name: 'STRIDE VELOCITY V1',
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
    { label: 'SHIPPING', value: '$15.00' },
    { label: 'ESTIMATED TAX', value: '$18.50' },
  ],
  total: { label: 'TOTAL', value: '$258.50' },
  promo: {
    label: 'Promo Code',
    placeholder: 'Enter code',
    button: 'Apply',
  },
  secure: 'Encrypted & Secure Transaction',
}

export const CHECKOUT_FOOTER = {
  brandTitle: 'STRIDE PERFORMANCE',
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
  copyright: '© 2024 STRIDE PERFORMANCE. ALL RIGHTS RESERVED.',
}

