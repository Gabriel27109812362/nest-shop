import { Injectable, Logger } from '@nestjs/common';
import { getManager } from 'typeorm';
import { Product } from '../../models/product';
import { CreateProductDTO } from '../../DTO/product/createProductDTO';
import { Category } from '../../models/category';
import { Vat } from '../../models/vat';
import { Producer } from '../../models/producer';
import { StoreHouse } from '../../models/storeHouse';
import { AddProducersDTO } from '../../DTO/product/addProducersDTO';
import { ProductProducer } from '../../models/productProducer';

@Injectable()
export class ProductService {

  private manager = getManager();

  getAllProductsQueryExec() {
    return this.manager
      .find(Product, {});
  }

  getProductByIdQueryExec(id: number | string) {
    return this.manager
      .findOne(Product, { idProduct: Number(id) });

  }

  async addNewProductQueryExec(createProductDTO: CreateProductDTO) {
    const { name, magazineState, unitOfMeasure, idStore, idVat } = createProductDTO;

    const vat = await this.manager
      .findOne(Vat, idVat);
    const store = await this.manager
      .findOne(StoreHouse, idStore);

    const product = new Product()
      .setName(name)
      .setMagazineState(magazineState)
      .setUnitOfMeasure(unitOfMeasure)
      .setVat(vat)
      .setStoreHouse(store);

    await this.manager.insert(Product, product);
  }

  async addProducerQueryExec(addProducersDTO: AddProducersDTO) {
    const { idProduct, price, idProducer } = addProducersDTO;

    const product = await this.manager
      .findOne(Product, idProduct);

    const producer = await this.manager
      .findOne(Producer, idProducer);

    const productProducer = new ProductProducer()
      .setProducer(producer)
      .setProduct(product)
      .setPrice(price);
    await this.manager.save(productProducer);
  }
}
