
import { MenuItem, CommunityPost, Event } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE (6)
  {
    id: '1',
    name: 'Lavender Oat Latte',
    price: 6.50,
    description: 'House-made lavender syrup with creamy oat milk and a double espresso shot.',
    category: 'Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegan'],
    allergens: ['None']
  },
  {
    id: '2',
    name: 'Signature Cold Brew',
    price: 5.00,
    description: '24-hour steeped Ethiopian beans. Smooth, bold, and low acidity.',
    category: 'Coffee',
    imageUrl: 'https://i.pinimg.com/736x/3c/d2/db/3cd2dbc15a2818ece2fbd4a71d642f09.jpg',
    dietary: ['Vegan', 'Gluten Free'],
    allergens: ['None']
  },
  {
    id: '3',
    name: 'Smoked Vanilla Cortado',
    price: 5.25,
    description: 'Equal parts espresso and velvety steamed milk with house-smoked vanilla bean syrup.',
    category: 'Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1534706936160-d5ee67737049?auto=format&fit=crop&w=800&q=80',
    dietary: ['Gluten Free'],
    allergens: ['Dairy']
  },
  {
    id: '4',
    name: 'Maple Spice Latte',
    price: 6.50,
    description: 'Pure Vermont maple syrup, warm autumnal spices, and velvet micro-foam.',
    category: 'Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&w=800&q=80',
    dietary: [],
    allergens: ['Dairy']
  },
  {
    id: '5',
    name: 'Nitro Cold Brew',
    price: 6.00,
    description: 'Our signature cold brew infused with nitrogen for a silky, Guinness-like head.',
    category: 'Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1599398054066-846f28917f38?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegan', 'Gluten Free'],
    allergens: ['None']
  },
  {
    id: '6',
    name: 'Single Origin Pour-Over',
    price: 5.75,
    description: 'Hand-poured Hario V60 featuring our rotating seasonal single-origin bean.',
    category: 'Coffee',
    imageUrl: 'https://images.unsplash.com/photo-1544787210-2213d84ad960?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegan', 'Gluten Free'],
    allergens: ['None']
  },

  // TEA (6)
  {
    id: '7',
    name: 'Ceremonial Matcha',
    price: 5.75,
    description: 'Authentic Uji matcha whisked with honey and choice of milk.',
    category: 'Tea',
    imageUrl: 'https://images.unsplash.com/photo-1582743947481-9197aae8e24c?auto=format&fit=crop&w=800&q=80',
    dietary: ['Gluten Free'],
    allergens: ['Dairy (optional)']
  },
  {
    id: '8',
    name: 'Hibiscus Berry Iced Tea',
    price: 4.75,
    description: 'Brewed organic hibiscus, forest berries, and a touch of agave over ice.',
    category: 'Tea',
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegan', 'Gluten Free'],
    allergens: ['None']
  },
  {
    id: '9',
    name: 'Earl Grey Cream',
    price: 4.50,
    description: 'High-grade bergamot tea with a hint of vanilla and a splash of cream.',
    category: 'Tea',
    imageUrl: 'https://images.unsplash.com/photo-1521500831169-a72a1139c1e0?auto=format&fit=crop&w=800&q=80',
    dietary: ['Gluten Free'],
    allergens: ['Dairy']
  },
  {
    id: '10',
    name: 'London Fog',
    price: 5.50,
    description: 'Earl Grey tea latte with house-made vanilla syrup and lavender buds.',
    category: 'Tea',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    dietary: ['Gluten Free'],
    allergens: ['Dairy']
  },
  {
    id: '11',
    name: 'Moroccan Mint',
    price: 4.25,
    description: 'Traditional green tea blended with fresh spearmint and a touch of sugar.',
    category: 'Tea',
    imageUrl: 'https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegan', 'Gluten Free'],
    allergens: ['None']
  },
  {
    id: '12',
    name: 'Rooibos Vanilla Chai',
    price: 5.25,
    description: 'Caffeine-free red bush tea simmered with warming spices and vanilla bean.',
    category: 'Tea',
    imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegan', 'Gluten Free'],
    allergens: ['None']
  },

  // BREAKFAST (6)
  {
    id: '13',
    name: 'Heirloom Avo Toast',
    price: 12.00,
    description: 'Smashed avocado, radish, microgreens, and lemon zest on house sourdough.',
    category: 'Breakfast',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    dietary: ['Vegan'],
    allergens: ['Wheat']
  },
  {
    id: '14',
    name: 'Truffle Mushroom Melt',
    price: 14.00,
    description: 'Sautéed wild mushrooms, truffle oil, and aged gruyère on toasted sourdough.',
    category: 'Breakfast',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    dietary: [],
    allergens: ['Wheat', 'Dairy']
  },
  {
    id: '15',
    name: 'Shakshuka Skillet',
    price: 13.50,
    description: 'Two poached eggs in a spiced tomato and red pepper sauce with feta and bread.',
    category: 'Breakfast',
    imageUrl: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=800&q=80',
    dietary: ['Gluten Free'],
    allergens: ['Egg', 'Dairy', 'Wheat']
  },
  {
    id: '16',
    name: 'Smoked Salmon Bagel',
    price: 11.50,
    description: 'Everything bagel with herb cream cheese, capers, red onion, and wild-caught salmon.',
    category: 'Breakfast',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    dietary: [],
    allergens: ['Wheat', 'Dairy', 'Fish']
  },
  {
    id: '17',
    name: 'Overnight Bircher Muesli',
    price: 9.00,
    description: 'Oats soaked in apple juice and yogurt with seasonal berries and honey.',
    category: 'Breakfast',
    imageUrl: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=800&q=80',
    dietary: ['Gluten Free'],
    allergens: ['Dairy', 'Honey']
  },
  {
    id: '18',
    name: 'Ricotta Honey Toast',
    price: 10.50,
    description: 'Whipped ricotta, thyme-infused honey, and toasted walnuts on thick brioche.',
    category: 'Breakfast',
    imageUrl: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80',
    dietary: [],
    allergens: ['Wheat', 'Dairy', 'Nuts']
  },

  // BAKERY (6)
  {
    id: '19',
    name: 'Cardamom Spice Bun',
    price: 4.25,
    description: 'Hand-twisted brioche dough with orange zest and Swedish cardamom.',
    category: 'Bakery',
    imageUrl: 'https://i.pinimg.com/1200x/68/47/e5/6847e541349c09f4f9c53f81c3dcdd7f.jpg',
    dietary: [],
    allergens: ['Wheat', 'Egg', 'Dairy']
  },
  {
    id: '20',
    name: 'Pistachio Rose Croissant',
    price: 5.50,
    description: 'Twice-baked sourdough croissant with pistachio frangipane and rose glaze.',
    category: 'Bakery',
    imageUrl: 'https://i.pinimg.com/736x/26/b5/34/26b5340c787861d4fb636c6f385b3ddc.jpg',
    dietary: [],
    allergens: ['Wheat', 'Nuts', 'Dairy']
  },
  {
    id: '21',
    name: 'Salted Caramel Brownie',
    price: 4.50,
    description: 'Fudgy 70% dark chocolate brownie with a swirl of sea salt caramel.',
    category: 'Bakery',
    imageUrl: 'https://i.pinimg.com/1200x/ab/92/78/ab9278de6b297457a508e39f180d9423.jpg',
    dietary: ['Gluten Free'],
    allergens: ['Dairy', 'Egg']
  },
  {
    id: '22',
    name: 'Blueberry Lemon Muffin',
    price: 3.75,
    description: 'Bursting with fresh blueberries and topped with a bright lemon sugar crumble.',
    category: 'Bakery',
    imageUrl: 'https://i.pinimg.com/736x/39/e1/d8/39e1d8dd453134dce70a10f21606f87a.jpg',
    dietary: [],
    allergens: ['Wheat', 'Dairy', 'Egg']
  },
  {
    id: '23',
    name: 'Almond Bear Claw',
    price: 4.75,
    description: 'Flaky danish pastry filled with sweet almond paste and topped with sliced almonds.',
    category: 'Bakery',
    imageUrl: 'https://i.pinimg.com/1200x/88/00/aa/8800aa45e553df67d8260810e3aecfcd.jpg',
    dietary: [],
    allergens: ['Wheat', 'Dairy', 'Nuts']
  },
  {
    id: '24',
    name: 'Seasonal Fruit Galette',
    price: 5.25,
    description: 'Rustic free-form tart with seasonal fruit in a buttery cornmeal crust.',
    category: 'Bakery',
    imageUrl: 'https://i.pinimg.com/1200x/e5/2d/13/e52d13f6a7756556b5635c0197b9d724.jpg',
    dietary: [],
    allergens: ['Wheat', 'Dairy']
  },

  // SPECIALTY (6)
  {
    id: '25',
    name: 'Golden Turmeric Latte',
    price: 5.75,
    description: 'Healing blend of turmeric, ginger, and black pepper with steamed coconut milk.',
    category: 'Specialty',
    imageUrl: 'https://i.pinimg.com/1200x/f4/6d/ce/f46dceeefd16c20353a72997eef346a6.jpg',
    dietary: ['Vegan', 'Gluten Free'],
    allergens: ['None']
  },
  {
    id: '26',
    name: 'Blue Spirulina Latte',
    price: 6.25,
    description: 'Antioxidant-rich blue spirulina with vanilla and steamed macadamia milk.',
    category: 'Specialty',
    imageUrl: 'https://i.pinimg.com/736x/24/ff/3a/24ff3a445b91c5d9c3e0e8c6ea3672d3.jpg',
    dietary: ['Vegan', 'Gluten Free'],
    allergens: ['Nuts']
  },
  {
    id: '27',
    name: 'Beetroot Cacao Brew',
    price: 6.00,
    description: 'Earthy beetroot powder blended with raw cacao and a hint of cinnamon.',
    category: 'Specialty',
    imageUrl: 'https://i.pinimg.com/1200x/5b/9d/9b/5b9d9be7be8a7054dd5bc9354d3b14e5.jpg',
    dietary: ['Vegan', 'Gluten Free'],
    allergens: ['None']
  },
  {
    id: '28',
    name: 'Charcoal Detox Latte',
    price: 6.50,
    description: 'Activated charcoal, raw honey, and steamed cashew milk. Deeply restorative.',
    category: 'Specialty',
    imageUrl: 'https://i.pinimg.com/1200x/d0/25/68/d02568a9da0eebeeee95c03f29ed93f3.jpg',
    dietary: ['Gluten Free'],
    allergens: ['Nuts', 'Honey']
  },
  {
    id: '29',
    name: 'Rose Water Wellness Elixir',
    price: 5.50,
    description: 'Chilled sparking water infused with rose, mint, and cold-pressed cucumber.',
    category: 'Specialty',
    imageUrl: 'https://i.pinimg.com/736x/3b/94/50/3b9450c89ec1634925fd312b812f0f56.jpg',
    dietary: ['Vegan', 'Gluten Free'],
    allergens: ['None']
  },
  {
    id: '30',
    name: 'Adaptogenic Mushroom Mocha',
    price: 6.75,
    description: 'Double shot espresso, 70% dark cocoa, and a blend of Lion\'s Mane and Reishi.',
    category: 'Specialty',
    imageUrl: 'https://i.pinimg.com/1200x/be/98/a6/be98a6c1067a6dcae3765b7700e80b77.jpg',
    dietary: ['Vegan', 'Gluten Free'],
    allergens: ['None']
  }
];

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'p1',
    author: 'Alex M.',
    content: "The Lavender Latte is a literal hug in a mug. Best place to study!",
    date: '2 hours ago',
    type: 'review'
  },
  {
    id: 'p2',
    author: 'Café Team',
    content: "Artist of the month: Elena Rossi. View her gallery in the patio.",
    date: '1 day ago',
    type: 'announcement'
  }
];

export const EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'Open Mic Night',
    date: 'Oct 15',
    time: '7:00 PM',
    description: 'Join us for a night of local talent and warm brews.',
    isRSVPed: false,
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'e2',
    title: 'Cupping Workshop',
    date: 'Oct 22',
    time: '10:00 AM',
    description: 'Learn to identify tasting notes like a professional roaster.',
    isRSVPed: false,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80'
  }
];
