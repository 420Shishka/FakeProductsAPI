interface ICategory {
  id: number;
  name: string;
  image: string;
  creationAt: Date;
  updatedAt: Date;
}

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ICategory;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
}

export { ICategory, IProduct };