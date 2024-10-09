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


// Auxiliary Interfaces

// Interface for the Slug
export interface Slug {
  current: string;
  _type: string;
}

// Interface for Image with Caption and Hotspot
export interface GalleryImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: string;
  };
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

// Interface for Estate Type Reference
export interface EstateTypeReference {
  name: string;
  _ref: string;
  _type: 'reference';
}

// Interface for Estate Features Reference
export interface EstateFeatureReference {
  _ref: string;
  name:string;
  _id: string
  _type: 'reference';
}

// Interface for Place Reference
export interface PlaceReference {
  _ref: string;
  _type: 'reference';
  // Assuming 'location' has a 'name' field
  // You might need to expand this based on your 'location' schema
  name?: string;
}

// Interface for Agent Reference
export interface AgentReference {
  profileImage: string;
  _ref: string;
  _type: 'reference';
  name: string;
  // Add additional agent fields if needed
}

// Interface for Block Content (for Description and Location)
export interface Block {
  _key: string;
  _type: 'block';
  children: Array<{
    _key: string;
    _type: 'span';
    text: string;
    marks: string[];
  }>;
  markDefs: any[];
  style: string;
}

// Interface for Floor Plan Images
export interface FloorPlanImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: string;
  };
}

// Updated FullEstate Interface

export interface FullEstate {
  _id: string;
  _type: 'realEstate';
  title: string;
  slug: Slug;
  gallery: GalleryImage[];
  price: number;
  estateType: EstateTypeReference;
  features: EstateFeatureReference[];
  area: number;
  rooms: number;
  plotSize: number;
  address: string;
  place: PlaceReference;
  description: Block[];
  location: Block[];
  floorPlan: FloorPlanImage[];
  agent: AgentReference;
  _createdAt: Date;
  _updatedAt: Date;
}
