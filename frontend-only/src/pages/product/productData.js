export const PDP_NAV_LINKS = [
  { label: 'SHOP', to: '/products', active: true },
  { label: 'COLLECTIONS', href: '#', active: false },
  { label: 'SPORTS', href: '#', active: false },
  { label: 'OUTLET', href: '#', active: false },
]

export const PRODUCT = {
  slug: 'stride-carbon-x1',
  breadcrumb: 'PRO-SERIES / ELITE',
  name: 'STRIDE CARBON X1',
  price: '$240.00 USD',
  gallery: [
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_tf4fKRdXRbL_OXT70zfTdHhwVhJ2bLvJX-SxzU9Y_CF-SND8MTUzIow8aB4stplErGTrdHg5i5Z-0Pl5YZPisD4EJfOrhFQKgGX7BL7EyZpDRBK8S5vRj3e5jwLNU0gcezohcxLCM40SWOH_yfLw1_xp7WByIBZPsXQFsBjojkiNXKSMt7TceZBByVevZg5cIdF0lrMKrqdmP33zs1uobBBoDzsgcrl-WRt7RMn1tGzk9bd0oUv3TO5VnDPze4J3jHwKp-8KIYwa',
      alt: 'Close-up side profile of a high-performance black and red running shoe on a minimalist white reflective surface with sharp shadows',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfzTqPERV2FHhbh4Iz8w7vPKSsveAEVwjmVAoPSrNlO5iEKrLCe9XcUx2HPWSZJTkBPwtYLHcluQ9ZnDy_D-5hl96cQU3JNowwNUOmsSvQzmpRg0of5IM15l3e_jmR14CV89jlCSOrEj5Dr-uMe9Ct9Xn4ahu0EUiUoJEQVnMzBXsbaVxC0dE8AfRDLclLM5_ijjSJ_1gaJn8xo2syHoL-k08J8psagOFF1eiQLm5MQC6elTnXHCWykmMMX7ILCXyqE-yuRrbe37ib',
      alt: 'Detailed top-down view of athletic sneaker lacing system and mesh texture, monochrome aesthetic with high contrast lighting',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpMxnbGf9qceaNEaLOND54prYrn4-ncWmdGs6sitYmeu2OfzzUI0g-WQSPWbPc9CMO2UDuGUneoZldLEI_G2jOcdoiaofWnIkOkpgL4DSgfIhbJo-pMedfd_F0sZj605rwzTkmlP92Spj2-TQJXzlcKnRE01LOERjkE0EXTOjQRMtzrMj0BrGgpb3B-gSNR8KWhsR6v84Lecj7pO1R-ukxc3YsmchxS2RkfABzTjUnhjHssUL7whlS9zQF5JxpkGq4eXj0S9lw0DH7',
      alt: 'Close-up of a shoe sole showing advanced carbon fiber texture and grip patterns, industrial minimalist style',
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM6aDiHVJ4yhkuUV4DCC5Ms7obuv6ximca0Q93PZJ9xnONaFeNAAXV5yq3IYtBenl4DYKfjcS8Um5nCTrs4DGvgSHEP784pQZTt8GpYGAkAzlv43sTVM80g8OPeaqjT-6h9mO6Tv4-L2NGuTf__uvHzzCZtlJbMlc9x9Y3O3Y4wQzpuQW2n426OfbuobUPeutwfev8BTyndwpvMCh1K0tFPvKdpFP-9t54oeJGzVdwIpIX3AjDm0am6IuNQFXO2auv-gt2TDsFG3B2',
      alt: 'Wide angle shot of athletic shoes on a concrete architectural background, professional sports photography style, moody lighting',
    },
  ],
  sizes: [
    { label: 'US 7', enabled: true },
    { label: 'US 8', enabled: true },
    { label: 'US 9', enabled: true },
    { label: 'US 10', enabled: true, selected: true },
    { label: 'US 11', enabled: true },
    { label: 'US 12', enabled: true },
    { label: 'US 13', enabled: false },
    { label: 'US 14', enabled: true },
  ],
  accordions: [
    {
      title: 'PRODUCT TECHNOLOGY',
      open: true,
      paragraphs: [
        'Integrated Carbon-Fiber plate for maximum energy return and propulsion.',
        'STRIDE-FOAM+ midsole offering 25% more responsiveness than standard compounds.',
        'Seamless knit upper for weightless support and breathability.',
      ],
    },
    {
      title: 'SPECIFICATIONS',
      open: false,
      kv: [
        { k: 'WEIGHT:', v: '198g (Size 9)' },
        { k: 'OFFSET:', v: '8mm' },
        { k: 'SURFACE:', v: 'ROAD / TRACK' },
      ],
    },
    {
      title: 'SHIPPING & RETURNS',
      open: false,
      text: 'Free express shipping on orders over $150. 30-day performance return guarantee.',
    },
  ],
  feature: {
    title: 'ENGINEERED FOR SPEED',
    body: 'The STRIDE Carbon X1 was designed in collaboration with world-class sprinters. Every millimeter of the shoe serves a singular purpose: reducing ground contact time and increasing forward force.',
    stats: [
      { value: '1.2s', label: 'AVERAGE PACE GAIN' },
      { value: '15%', label: 'ENERGY SAVINGS' },
    ],
    image: {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC81lPfCn8ljCNm7v1rFzcP7dZAUxOSkOZGua6oak9wDN4JJxRW-OwPnFFL4noXt0NeomVPtQMSBpFekZ2FxJkQbTq7kgR_MmkBN3H0QsMXux0BmOxzcUY1H946ELsQSSrt3EXWgi-3XjKrOQTwLdYmFghvBa5zdIjiZra-tzOrLz0VjuUyya8OCHz4OXtCCvfzluh56Me6F22_POBRmiGhIDMRs8vZRiXMXl89uZvyP2TXaJe9esDpsDWiqLnNOPPHiRIh1SnfRp_M',
      alt: 'Cinematic long exposure shot of a runner at night in a city, glowing light trails and urban minimalism',
    },
  },
  related: {
    title: 'COMPLETE THE KIT',
    items: [
      {
        slug: 'drift-low',
        badge: 'NEW',
        title: 'PRO-VENT COMPRESSION TEE',
        price: '$85.00',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAadCEnQeigoIzZwgmZV9nBl2yNn3K0zSRU98y95PKvBoR0YNUblveXec-w-ZdjqYow2Wu7r1DoHR6bE6oLICQ1HZYUI1FHKncB6JOXm8eTmNriUVK8O-wOxHtIudHR0hdGOXPua-Mt1GV2VJ6Mk-csVFCw1GO-brG_NblRjyxtdrtItq9Iz5GTIpzISvK3b5xgQPZg0he6aVfOL8QThjiHQoHumRE0PpbVFrhk3kkljg0eRT33d1ZPNghKO0wnkOb5XbhC0EzRcJL-',
        alt: 'Professional athlete apparel, black compression top on a white background, high-end sportswear photography',
      },
      {
        slug: 'legacy-high',
        title: 'AERO-SPLIT SHORTS',
        price: '$65.00',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLVnL5qx9H3OFON9b3sgEriy89_T0wkLtXNhABllAfdHJsFPNeWOGEoJheoj1sGH9XFjYM2jVP1Z_N4G7k5Puiy23eFjHOlkVTwrbQnFgmlBj2zJbK-RfJcycF4rwYAmo_cJ08dyoUKrcxtXEKBREI64ucWhaaJjBRNIqh7LQQchqJt9jJo_q1ATeeBYUmhRENEbuHIDUUuA1Dox5AI3prCdViRTXIMlk1SkMXHnnbYziXUmHItPTwC42fZZe3sCPgJ6LCdMkG_8bg',
        alt: 'Detail shot of black running shorts with minimalist reflective logo, gym interior lighting',
      },
      {
        slug: 'cobalt-force',
        title: 'TECH-GRIP SOCKS',
        price: '$22.00',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCrZjk6x80KgUGR4fbWkqwVlP86WNIYnk-gSlnEseyXDWftL2uFH7FdQVM0Ne6VA7Ngcf2p208NkTt818MHe1he6o6qu731h9wA1dDYrmzRhtVvuScXyu0qGaIzxUpmfpv2HC6eQwjgFj2MXnonsy-F1UX_VFDzT8VtiKNNQtzHJpywEDhYRCtsh1Pjn0ijCfn3kcxhqdqCuL0O9kYi8PIkXw6Fp13vNprhVc5DEmtQbC7Tk_gNgRpRIDL7WTTXOiC_cnnKuRa65LA',
        alt: 'High-performance athletic socks, white with black stripes, displayed on a minimalist grey pedestal',
      },
    ],
  },
}

export const PDP_FOOTER = {
  brandTitle: 'STRIDE PERFORMANCE',
  brandDescription:
    'Pushing the boundaries of human performance through uncompromising design and elite materials.',
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
        { label: 'PRO-SERIES', href: '#' },
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

