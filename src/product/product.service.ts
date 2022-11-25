import { Injectable } from '@nestjs/common';
import { ProductDocument } from './product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(
    name: string,
    price: number,
    description: string,
  ): Promise<ProductDocument> {
    const newProduct = new this.productModel({ name, price, description });
    return newProduct.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  async updateById(
    id: string,
    name: string,
    price: number,
    description: string,
  ): Promise<ProductDocument> {
    const res = await this.findById(id);
    res.name = name ?? res.name;
    res.price = price ?? res.price;
    res.description = description ?? res.description;
    return res.save();
  }

  async deleteById(id: string) {
    return this.productModel.deleteOne({ _id: id });
  }
}
