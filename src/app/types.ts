export interface Tag {
    _id: string;
    title: string;
  }
  
  export interface BlockContent {
    children: { text: string }[];
  }
  
  export interface Blog {
    _id: string;
    slug: { current: string };
    tags?: Tag[];
    title: string;
    content?: BlockContent[];
    titleImage?: any; // Replace 'any' with the appropriate type if known
  }
  