package com.manish.XpertStore.service.interf;

import com.manish.XpertStore.dto.AddressDto;
import com.manish.XpertStore.dto.Response;

public interface AddressService {
    Response saveAndUpdateAddress(AddressDto addressDto);
}
