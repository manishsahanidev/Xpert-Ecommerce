package com.manish.XpertStore.repository;

import com.manish.XpertStore.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepo extends JpaRepository<Address, Long> {
}
