package com.cagkankantarci.e_ticaret.controller;

import com.cagkankantarci.e_ticaret.dto.Purchase;
import com.cagkankantarci.e_ticaret.dto.PurchaseResponse;
import com.cagkankantarci.e_ticaret.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        return checkoutService.placeOrder(purchase);
    }
}
