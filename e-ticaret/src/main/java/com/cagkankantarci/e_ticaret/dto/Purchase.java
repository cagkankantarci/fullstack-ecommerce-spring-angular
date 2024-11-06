package com.cagkankantarci.e_ticaret.dto;

import com.cagkankantarci.e_ticaret.entity.Address;
import com.cagkankantarci.e_ticaret.entity.Customer;
import com.cagkankantarci.e_ticaret.entity.Order;
import com.cagkankantarci.e_ticaret.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
