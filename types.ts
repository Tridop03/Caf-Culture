
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Coffee' | 'Tea' | 'Breakfast' | 'Bakery' | 'Specialty';
  imageUrl: string;
  dietary: ('Vegan' | 'Gluten Free')[];
  allergens: string[];
}

export interface Order {
  id: string;
  date: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: 'Completed' | 'Processing';
}

export interface CartItem extends MenuItem {
  quantity: number;
  customizations: {
    milk?: string;
    syrup?: string;
    temperature?: 'Hot' | 'Iced' | 'Extra Hot';
    sweetness?: number;
  };
}

export interface User {
  name: string;
  email: string;
  memberSince: string;
  points: number;
  favorites: string[]; // item ids
  punchCardCount: number;
  orderHistory: Order[];
}

export interface CommunityPost {
  id: string;
  author: string;
  content: string;
  date: string;
  type: 'review' | 'announcement' | 'event';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  isRSVPed: boolean;
  image: string;
}
