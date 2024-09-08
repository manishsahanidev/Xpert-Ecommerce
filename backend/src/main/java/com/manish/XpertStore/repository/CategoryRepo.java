package com.manish.XpertStore.repository;

import com.manish.XpertStore.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category, Long> {
}
