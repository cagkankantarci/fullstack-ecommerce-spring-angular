package com.cagkankantarci.e_ticaret.service;

import com.cagkankantarci.e_ticaret.dto.Purchase;
import com.cagkankantarci.e_ticaret.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
