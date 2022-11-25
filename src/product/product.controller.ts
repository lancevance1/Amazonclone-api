import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDocument } from './product.schema';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createPost(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string,
  ): Promise<ProductDocument> {
    return this.productService.create(name, price, description);
  }
  @Get()
  async findAll(): Promise<ProductDocument[]> {
    return this.productService.findAll();
  }
  @Get(':id')
  async findOne(@Param() params): Promise<ProductDocument> {
    return this.productService.findById(params.id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description?: string,
  ): Promise<ProductDocument> {
    return this.productService.updateById(id, name, price, description);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.deleteById(id);
  }
}
