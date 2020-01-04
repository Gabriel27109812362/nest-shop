import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';
import { Response } from 'express';
import { CreateEditCategoryDTO } from '../../DTO/category/createEditCategoryDTO';

@Controller('category')
export class CategoryController {

  constructor(private categoryService: CategoryService) {
  }

  @Get()
  async getAllCategories(@Res() res: Response) {
    const value = await this.categoryService.getAllCategoriesQueryExec();
    res.json(value);
  }

  @Get(':id')
  async getCategoryById(@Param() params, @Res() res: Response) {
    const { id } = params;
    const value = await this.categoryService.getCategoryByIdQueryExec(id);
    res.json(value);
  }

  @Post()
  async addNewCategory(@Body() createCategoryDTO: CreateEditCategoryDTO, @Res() res: Response) {
    await this.categoryService.createNewCategoryQueryExec(createCategoryDTO);
    res.send('Category has been created');
  }

  @Delete()
  async deleteCategoryById(@Param() params, @Res() res: Response) {
    const { id } = params;
    await this.categoryService.deleteCategoryByIdQueryExec(id);
    res.json(`Category ${id} has been deleted`);
  }

  @Patch(':id')
  async editCategoryById(@Param() params, @Body() editCategoryDTO: CreateEditCategoryDTO, @Res() res: Response) {
    const { id } = params;
    await this.categoryService.editCategoryByIdQueryExec(id, editCategoryDTO);
    res.send(`Category ${id} has been updated`);
  }

}
