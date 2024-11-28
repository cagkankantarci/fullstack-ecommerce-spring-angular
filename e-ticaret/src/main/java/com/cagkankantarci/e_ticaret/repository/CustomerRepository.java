package com.cagkankantarci.e_ticaret.repository;

import com.cagkankantarci.e_ticaret.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String theEmail);
}
