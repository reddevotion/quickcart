export interface ProductType {
    _id: string;          
    userId: string;       
    name: string;         
    description: string;  
    price: number;        
    offerPrice: number;   
    image: string[];     
    category: string;     
    createdAt: string;    
    updatedAt: string;    
    __v: number; 
  }

  export interface User {
    _id: string;          
    clerkUserId: string;       
    name: string;         
    imageUrl: string;  
    cartItems: string[];  
    favoriteItems: string[];  
    createdAt: string;    
    updatedAt: string;    
    __v: number;  
  }
  
  export interface ProductList {
    products: ProductType[];
  } 

  export interface ProductCardProps {
    product: ProductType,
    isFavorite: boolean,
    userData: User,
    onFavoriteUpdate: () => void
  }

  export interface Address {
    fullName: string;
    phoneNumber: string;
    pincode: string;
    area: string;
    city: string;
    state: string;
  }

  export interface CartItems {
      [itemId: string]: number;
  }