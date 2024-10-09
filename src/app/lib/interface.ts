export interface EstateCard {
  title: string;
  place: {
    name: string;
  };
  price: number;
  area: number;
  _createdAt: Date;
  features: string[];
  firstImage: string;
  slug: string;
  rooms: number;
  description: any;
}


  export interface FullEstate {
    title: string;
    place: string;
    price: string;
    area: string;
    imageUrl: string;
    slug: string;
  }