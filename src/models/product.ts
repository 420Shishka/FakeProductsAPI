import { ICategory } from './category';

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ICategory;
  images: string[];
  creationAt: Date;
  updatedAt: Date;
}