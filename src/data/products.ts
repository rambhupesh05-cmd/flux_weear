export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  sizes: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Void Oversized Hoodie",
    price: 189.00,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=800&q=80",
    ],
    category: "Hoodies",
    description: "Premium heavyweight cotton hoodie with dropped shoulders and oversized fit. Features embroidered Flux logo on chest.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
  },
  {
    id: "2",
    name: "Eclipse Tech Jacket",
    price: 329.00,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
    category: "Jackets",
    description: "Water-resistant technical jacket with futuristic design. Multiple pockets and adjustable hood.",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "3",
    name: "Static Oversized Tee",
    price: 89.00,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    ],
    category: "Tees",
    description: "100% organic cotton oversized tee with signature graphic print. Relaxed fit with dropped shoulders.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
  },
  {
    id: "4",
    name: "Neon Shadow Hoodie",
    price: 199.00,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    ],
    category: "Hoodies",
    description: "Limited edition hoodie with reflective details. Made from recycled materials.",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "5",
    name: "Phantom Cargo Pants",
    price: 249.00,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
    ],
    category: "Pants",
    description: "Technical cargo pants with multiple utility pockets. Water-resistant fabric with adjustable waist.",
    sizes: ["28", "30", "32", "34", "36"],
    inStock: true,
  },
  {
    id: "6",
    name: "Flux Logo Cap",
    price: 59.00,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    ],
    category: "Accessories",
    description: "Classic 6-panel cap with embroidered Flux logo. Adjustable strap for perfect fit.",
    sizes: ["One Size"],
    inStock: true,
  },
  {
    id: "7",
    name: "Cipher Graphic Tee",
    price: 79.00,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    ],
    category: "Tees",
    description: "Premium cotton tee with abstract graphic print. Boxy fit with ribbed neckline.",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "8",
    name: "Drift Bomber Jacket",
    price: 389.00,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    ],
    category: "Jackets",
    description: "Premium bomber jacket with satin lining. Features hidden pockets and custom hardware.",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
];

export const categories = [
  { name: "All", value: "all" },
  { name: "Hoodies", value: "hoodies" },
  { name: "Tees", value: "tees" },
  { name: "Jackets", value: "jackets" },
  { name: "Pants", value: "pants" },
  { name: "Accessories", value: "accessories" },
];
