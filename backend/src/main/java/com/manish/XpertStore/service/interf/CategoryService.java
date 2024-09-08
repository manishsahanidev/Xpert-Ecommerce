package com.manish.XpertStore.service.interf;

import com.manish.XpertStore.dto.CategoryDto;
import com.manish.XpertStore.dto.Response;

public interface CategoryService {

    Response createCategory(CategoryDto categoryRequest);
    Response updateCategory(Long categoryId, CategoryDto categoryRequest);
    Response getAllCategories();
    Response getCategoryById(Long categoryId);
    Response deleteCategory(Long categoryId);
}
