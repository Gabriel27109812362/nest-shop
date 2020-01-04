import { Injectable } from '@nestjs/common';
import { getManager } from 'typeorm';
import { Category } from '../../models/category';
import { CreateEditCategoryDTO } from '../../DTO/category/createEditCategoryDTO';

@Injectable()
export class CategoryService {

  private manager = getManager();

  getAllCategoriesQueryExec() {
    return this.manager
      .find(Category, {});
  }

  getCategoryByIdQueryExec(id: number | string) {
    return this.manager
      .findOne(Category, { idCategory: Number(id) });
  }

  createNewCategoryQueryExec(createCategoryDTO: CreateEditCategoryDTO) {
    return this.manager
      .insert(Category, { ...createCategoryDTO });

  }

  deleteCategoryByIdQueryExec(id: number | string) {
    return this.manager
      .delete(Category, { idCategory: Number(id) });
  }

  editCategoryByIdQueryExec(id: number | string, changes: CreateEditCategoryDTO) {
    return this.manager
      .update(Category, { idCategory: Number(id) }, { ...changes });
  }

}
