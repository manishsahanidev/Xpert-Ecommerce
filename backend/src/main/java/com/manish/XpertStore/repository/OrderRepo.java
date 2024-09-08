package com.manish.XpertStore.repository;

import com.manish.XpertStore.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepo extends JpaRepository<Order, Long> {
}
