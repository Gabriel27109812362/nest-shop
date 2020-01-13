import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { Product } from '../../models/product';
import { CreateProductDTO } from '../../DTO/product/createProductDTO';
import { Category } from '../../models/category';
import { Vat } from '../../models/vat';
import { Producer } from '../../models/producer';
import { StoreHouse } from '../../models/storeHouse';
import { AddProducersDTO } from '../../DTO/product/addProducersDTO';
import { ProductProducer } from '../../models/productProducer';
import { AddCategoriesDTO } from '../../DTO/product/addCategoriesDTO';
import { EditProductDTO } from '../../DTO/product/editProductDTO';
import { DeleteProducersDTO } from '../../DTO/product/deleteProducersDTO';
import { DeleteCategoriesDTO } from '../../DTO/product/deleteCategoriesDTO';
import { ChangeVatDTO } from '../../DTO/product/changeVatDTO';
import { ChangeStoreHouseDTO } from '../../DTO/product/changeStoreHouseDTO';

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
    const { name, magazineState, unitOfMeasure, idStoreHouse, idVat } = createProductDTO;

    const vat = await this.manager
      .findOne(Vat, idVat);
    const store = await this.manager
      .findOne(StoreHouse, idStoreHouse);

    const product = new Product()
      .setName(name)
      .setMagazineState(magazineState)
      .setUnitOfMeasure(unitOfMeasure)
      .setVat(vat)
      .setStoreHouse(store);
    await this.manager.insert(Product, product);
  }

  async changeVatQueryExec(changeVatDTO: ChangeVatDTO) {
    const { idProduct, idVat } = changeVatDTO;

    const vat = await this.manager
      .findOne(Vat, idVat);

    const product = await this.manager
      .findOne(Product, idProduct);

    product.setVat(vat);
    await this.manager.save(product);
  }

  async changeStorehouseQueryExec(changeStoreHouseDTO: ChangeStoreHouseDTO) {
    const { idProduct, idStoreHouse } = changeStoreHouseDTO;

    const store = await this.manager
      .findOne(StoreHouse, idStoreHouse);

    const product = await this.manager
      .findOne(Product, idProduct);

    product.setStoreHouse(store);
    await this.manager.save(product);
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

  async addCategoriesQueryExec(addCategoriesDTO: AddCategoriesDTO) {
    const { idProduct, idCategories } = addCategoriesDTO;
    const product = await this.manager
      .findOne(Product, idProduct);

    const categories = await this.manager
      .findByIds(Category, idCategories);

    product.setCategories(categories);
    await this.manager.save(product);
  }

  async deleteProducersQueryExec(deleteProducersDTO: DeleteProducersDTO) {
    const { idProduct, idProducers } = deleteProducersDTO;
    const foundedProduct = await this.manager
      .findOne(Product, idProduct);

    const foundedProducers = await this.manager
      .findByIds(Producer, idProducers);

    const deletions = foundedProducers.map(foundedProducer => {
      return this.manager
        .delete(ProductProducer, { product: foundedProduct, producer: foundedProducer });
    });

    await Promise.all(deletions);
  }

  async deleteCategoriesQueryExec(deleteCategoriesDTO: DeleteCategoriesDTO) {
    const { idProduct, idCategories } = deleteCategoriesDTO;

    const product = await this.manager
      .createQueryBuilder(Product, 'product')
      .leftJoinAndSelect('product.categories', 'category')
      .where('product.idProduct = :id', { id: idProduct })
      .getOne();

    product.categories = product.categories.filter(category => {
      return !idCategories.includes(category.idCategory);
    });

    await this.manager
      .save(product);
  }

  deleteProductByIdQueryExec(id: number | string) {
    return this.manager
      .delete(Product, { idProduct: Number(id) });
  }

  editProductByIdQueryExec(id: number | string, changes: EditProductDTO) {
    return this.manager
      .update(Product, { idProduct: Number(id) }, { ...changes });
  }
}
