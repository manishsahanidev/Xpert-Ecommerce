package com.manish.XpertStore.service.interf;


import com.manish.XpertStore.dto.OrderRequest;
import com.manish.XpertStore.dto.Response;
import com.manish.XpertStore.enums.OrderStatus;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;

public interface OrderItemService {
    Response placeOrder(OrderRequest orderRequest);
    Response updateOrderItemStatus(Long orderItemId, String status);
    Response filterOrderItems(OrderStatus status, LocalDateTime startDate, LocalDateTime endDate, Long itemId, Pageable pageable);
}
