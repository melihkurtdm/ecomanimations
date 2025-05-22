import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductDetails from '@/components/products/ProductDetails';
import ProductCard from '@/components/products/ProductCard';
import { useToast } from "@/components/ui/use-toast";

const products = [
  {
    id: 1,
    name: "Diamond Eternity Ring",
    price: 4500,
    description: "A stunning diamond eternity ring that symbolizes never-ending love. Each carefully selected diamond is set in a continuous circle of precious metal, creating a timeless piece that will be treasured for generations.",
    details: "This exquisite Diamond Eternity Ring features 18 round brilliant cut diamonds, meticulously set in 18K white gold. Each diamond is hand-selected for its exceptional brilliance and clarity, creating a continuous circle of light that symbolizes eternal love. The ring has a total carat weight of 1.5ct and showcases our master craftsmen's dedication to perfection in every detail.",
    specifications: {
      material: "18K White Gold",
      gemstone: "Natural Diamond",
      weight: "1.5ct (total)",
      dimensions: "2.3mm width",
    },
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1603561596142-979a303c2d3c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1707170595292-abdce001a02a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2301&q=80",
      "https://images.unsplash.com/photo-1689784018113-5f9227069045?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    reviews: [
      {
        id: 1,
        author: "Elizabeth S.",
        rating: 5,
        date: "March 15, 2023",
        text: "Absolutely stunning ring! The diamonds catch the light beautifully and the craftsmanship is exceptional. My wife hasn't stopped admiring it since I gave it to her on our anniversary."
      },
      {
        id: 2,
        author: "Michael T.",
        rating: 5,
        date: "January 3, 2023",
        text: "The quality of this ring is outstanding. The diamonds are brilliantly clear and the white gold setting is perfect. Worth every penny."
      },
      {
        id: 3,
        author: "Sophia L.",
        rating: 4,
        date: "November 20, 2022",
        text: "Beautiful piece of jewelry. The only reason it's not 5 stars is that it took longer than expected to arrive. But the quality is impeccable."
      }
    ],
    category: "Rings",
  },
  {
    id: 2,
    name: "Sapphire Pendant",
    price: 2800,
    description: "An elegant sapphire pendant featuring a brilliant blue gemstone surrounded by a halo of diamonds, suspended on a delicate white gold chain.",
    details: "This sophisticated Sapphire Pendant showcases a stunning 1.2ct oval blue sapphire at its center, surrounded by 0.5ct of brilliant-cut diamonds. The pendant is crafted in 18K white gold with meticulous attention to detail, creating a piece that's both timeless and eye-catching. The sapphire has been heat-treated to enhance its natural blue color, resulting in exceptional clarity and brilliance.",
    specifications: {
      material: "18K White Gold",
      gemstone: "Blue Sapphire, Diamonds",
      weight: "1.2ct (sapphire), 0.5ct (diamonds)",
      dimensions: "14mm x 10mm pendant",
    },
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1620113623658-994d2b9d1862?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80",
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    reviews: [
      {
        id: 1,
        author: "Catherine M.",
        rating: 5,
        date: "April 2, 2023",
        text: "The color of this sapphire is breathtaking - a deep, rich blue that looks stunning against both light and dark clothing. It's quickly become my favorite piece of jewelry."
      },
      {
        id: 2,
        author: "Robert P.",
        rating: 5,
        date: "February 14, 2023",
        text: "Purchased this as a Valentine's gift for my wife and she absolutely loves it. The sapphire is vivid and the diamonds add the perfect amount of sparkle."
      }
    ],
    category: "Necklaces",
  },
  {
    id: 3,
    name: "Pearl Drop Earrings",
    price: 1950,
    description: "Elegant pearl drop earrings featuring lustrous South Sea pearls suspended from diamond-studded 18K gold fixtures.",
    details: "These refined Pearl Drop Earrings showcase exceptional 10mm South Sea pearls with natural luster and iridescence. Each pearl is suspended from an 18K yellow gold fixture adorned with 0.25ct of brilliant-cut diamonds. The leverback closure ensures security and comfort for all-day wear. These earrings are the perfect balance of classic sophistication and modern luxury.",
    specifications: {
      material: "18K Yellow Gold",
      gemstone: "South Sea Pearl, Diamonds",
      weight: "10mm (pearls), 0.25ct (diamonds)",
      dimensions: "35mm drop length",
    },
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2336&q=80",
      "https://images.unsplash.com/photo-1575863438850-fb1c07901f89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1633810253710-bcb35d38c4db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    reviews: [
      {
        id: 1,
        author: "Jennifer L.",
        rating: 5,
        date: "May 10, 2023",
        text: "I received these earrings as an anniversary gift and they are absolutely stunning. The pearls are large with a beautiful luster, and the diamond accents add just the right amount of sparkle."
      },
      {
        id: 2,
        author: "David R.",
        rating: 4,
        date: "March 28, 2023",
        text: "Purchased these for my wife's birthday. She loves them and says they're comfortable to wear despite their size. The only reason for 4 stars rather than 5 is that one of the clasps needed a slight adjustment."
      },
      {
        id: 3,
        author: "Emma T.",
        rating: 5,
        date: "December 15, 2022",
        text: "These earrings are elegant and versatile. They dress up a simple outfit and complement formal attire perfectly. The leverback closure is secure and comfortable."
      }
    ],
    category: "Earrings",
  },
  {
    id: 4,
    name: "Gold Tennis Bracelet",
    price: 3600,
    description: "Elegant gold tennis bracelet featuring a continuous line of brilliant diamonds set in 18K yellow gold.",
    details: "This stunning Gold Tennis Bracelet features 36 round brilliant diamonds (total weight 2ct) channel-set in luxurious 18K yellow gold. The flexible design ensures comfortable wear while the secure clasp provides peace of mind. Each diamond has been selected for exceptional brilliance, making this bracelet a timeless addition to any jewelry collection.",
    specifications: {
      material: "18K Yellow Gold",
      gemstone: "Natural Diamond",
      weight: "2.0ct (total)",
      dimensions: "7.25 inches (adjustable)",
    },
    images: [
      "https://images.unsplash.com/photo-1535632376185-8cfa625a3272?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1534421471151-804abae32ba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    reviews: [
      {
        id: 1,
        author: "Rebecca T.",
        rating: 5,
        date: "June 5, 2023",
        text: "The craftsmanship on this bracelet is exceptional. It catches the light beautifully, and I've received many compliments when wearing it."
      },
      {
        id: 2,
        author: "James L.",
        rating: 5,
        date: "April 18, 2023",
        text: "I purchased this as an anniversary gift for my wife and she absolutely loves it. The quality is outstanding and the diamonds are very brilliant."
      }
    ],
    category: "Bracelets",
  },
  {
    id: 5,
    name: "Diamond Stud Earrings",
    price: 2100,
    description: "Classic diamond stud earrings featuring brilliant-cut diamonds in a four-prong platinum setting.",
    details: "These timeless Diamond Stud Earrings feature two round brilliant-cut diamonds, totaling 1.0ct, set in a classic four-prong platinum setting. The earrings are secured with comfortable push backs for everyday wear. The diamonds are graded G-H for color and VS for clarity, ensuring exceptional brilliance and fire.",
    specifications: {
      material: "Platinum",
      gemstone: "Natural Diamond",
      weight: "1.0ct (total)",
      dimensions: "5.5mm diameter each",
    },
    images: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1633810253710-bcb35d38c4db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1574010498544-3521cfbe5ca1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1625939306826-c8717d436e2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    reviews: [
      {
        id: 1,
        author: "Olivia P.",
        rating: 5,
        date: "July 20, 2023",
        text: "These earrings are stunning - the perfect size to be noticeable without being over the top. The quality is exceptional."
      },
      {
        id: 2,
        author: "Thomas M.",
        rating: 4,
        date: "May 12, 2023",
        text: "I bought these for my wife's birthday and she wears them nearly every day. Great quality diamonds with excellent sparkle."
      },
      {
        id: 3,
        author: "Sarah B.",
        rating: 5,
        date: "February 2, 2023",
        text: "Classic, elegant, and perfect for any occasion. The security of the push backs is excellent."
      }
    ],
    category: "Earrings",
  },
  {
    id: 6,
    name: "Platinum Wedding Band",
    price: 1800,
    description: "Timeless platinum wedding band with a polished finish and comfort-fit interior.",
    details: "This classic Platinum Wedding Band features a 5mm width with a highly polished finish and a comfort-fit interior for everyday wearability. Crafted from 95% pure platinum, this premium band will maintain its white luster without replating. Each ring is hand-finished by our master craftsmen to ensure flawless quality.",
    specifications: {
      material: "Platinum (950/1000)",
      gemstone: "None",
      weight: "11.5 grams (average)",
      dimensions: "5mm width",
    },
    images: [
      "https://images.unsplash.com/photo-1607703829739-c05b7beddf60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1605753730689-7c5911d2fed3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1577130740063-239a21884e0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1616740795003-552d0dfcea3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    reviews: [
      {
        id: 1,
        author: "Michael W.",
        rating: 5,
        date: "August 8, 2023",
        text: "After 10 years of marriage, we upgraded to platinum rings and I couldn't be happier. The comfort fit makes it easy to wear all day."
      },
      {
        id: 2,
        author: "Jessica K.",
        rating: 5,
        date: "June 15, 2023",
        text: "Beautiful band with excellent weight and quality. The polish is perfect and it feels substantial."
      }
    ],
    category: "Rings",
  },
  {
    id: 7,
    name: "Emerald Halo Ring",
    price: 3850,
    description: "Stunning emerald halo ring featuring a vivid green center stone surrounded by brilliant diamonds.",
    details: "This exquisite Emerald Halo Ring showcases a 1.5ct natural emerald, exhibiting the most desirable deep green color. The center stone is embraced by a halo of 0.5ct round brilliant diamonds set in 18K white gold. The split-shank band adds a contemporary touch to this timeless design.",
    specifications: {
      material: "18K White Gold",
      gemstone: "Natural Emerald, Diamonds",
      weight: "1.5ct (emerald), 0.5ct (diamonds)",
      dimensions: "11mm x 9mm center setting",
    },
    images: [
      "https://images.unsplash.com/photo-1600721391689-2564bb8055de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80",
      "https://images.unsplash.com/photo-1589674781759-c21c37956a44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1598560917807-1bae44bd2be8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    reviews: [
      {
        id: 1,
        author: "Victoria L.",
        rating: 5,
        date: "September 12, 2023",
        text: "The emerald in this ring has incredible color and clarity. The halo setting makes it look even more spectacular."
      },
      {
        id: 2,
        author: "Richard B.",
        rating: 4,
        date: "July 3, 2023",
        text: "Purchased this as an anniversary gift. The craftsmanship is excellent and the emerald is a beautiful vibrant green."
      }
    ],
    category: "Rings",
  },
  {
    id: 8,
    name: "Ruby Pendant Necklace",
    price: 3200,
    description: "Elegant ruby pendant necklace featuring a deep red gemstone surrounded by a diamond halo.",
    details: "This luxurious Ruby Pendant Necklace showcases a 1.25ct natural ruby with exceptional color saturation. The center stone is encircled by 0.4ct of pavé-set diamonds in an 18K white gold setting. The pendant hangs from an adjustable 18-20 inch 18K white gold chain with a secure lobster clasp.",
    specifications: {
      material: "18K White Gold",
      gemstone: "Natural Ruby, Diamonds",
      weight: "1.25ct (ruby), 0.4ct (diamonds)",
      dimensions: "18-20 inch adjustable chain",
    },
    images: [
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfbfc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1611085583191-a3b181a88444?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80"
    ],
    reviews: [
      {
        id: 1,
        author: "Patricia G.",
        rating: 5,
        date: "October 8, 2023",
        text: "The ruby is a beautiful deep red and the diamonds add just the right amount of sparkle. It's become my signature piece."
      },
      {
        id: 2,
        author: "Daniel M.",
        rating: 5,
        date: "August 21, 2023",
        text: "I bought this for my wife's birthday and she absolutely loves it. The quality of the stone and setting is exceptional."
      }
    ],
    category: "Necklaces",
  },
  {
    id: 9,
    name: "Vintage Pearl Earrings",
    price: 2200,
    description: "Vintage-inspired pearl earrings featuring lustrous South Sea pearls with diamond accents in an antique gold setting.",
    details: "These exquisite Vintage Pearl Earrings showcase 9mm South Sea pearls with exceptional luster. Each pearl is crowned with an intricate vintage-inspired design set with 0.3ct of rose-cut diamonds in 18K yellow gold. The secure lever-back closures ensure comfortable all-day wear.",
    specifications: {
      material: "18K Yellow Gold",
      gemstone: "South Sea Pearl, Diamonds",
      weight: "9mm (pearls), 0.3ct (diamonds)",
      dimensions: "22mm total drop length",
    },
    images: [
      "https://images.unsplash.com/photo-1675576185671-64e1769332c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2336&q=80",
      "https://images.unsplash.com/photo-1575863438850-fb1c07901f89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1633810253710-bcb35d38c4db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    reviews: [
      {
        id: 1,
        author: "Elizabeth C.",
        rating: 5,
        date: "November 15, 2023",
        text: "These earrings are absolutely beautiful and the vintage design makes them truly unique. The pearls have a gorgeous luster."
      },
      {
        id: 2,
        author: "William S.",
        rating: 5,
        date: "September 30, 2023",
        text: "I purchased these for my wife's anniversary gift and she was thrilled. The craftsmanship is exceptional."
      }
    ],
    category: "Earrings",
  }
];

// Sample related products
const relatedProducts = [
  {
    id: 2,
    name: "Sapphire Pendant",
    price: 2800,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Necklaces",
  },
  {
    id: 4,
    name: "Gold Tennis Bracelet",
    price: 3600,
    image: "https://images.unsplash.com/photo-1611591320656-59019aca4fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    category: "Bracelets",
  },
  {
    id: 6,
    name: "Platinum Wedding Band",
    price: 1800,
    image: "https://images.unsplash.com/photo-1607703829739-c05b7beddf60?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "Rings",
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API fetch for product details
    setLoading(true);
    window.scrollTo(0, 0);
    
    setTimeout(() => {
      const foundProduct = products.find(p => p.id.toString() === id);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 flex justify-center items-center py-24">
            <div className="animate-pulse w-full max-w-4xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="aspect-square bg-gray-200"></div>
                <div>
                  <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-8 w-1/4"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 py-24 text-center">
            <h1 className="font-playfair text-3xl mb-4">Product Not Found</h1>
            <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <a href="/collections" className="luxury-button">Browse Collections</a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 py-12">
          <ProductDetails product={product} />
          
          {/* Related Products */}
          <div className="mt-24">
            <h2 className="font-playfair text-3xl mb-8">You May Also Like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
