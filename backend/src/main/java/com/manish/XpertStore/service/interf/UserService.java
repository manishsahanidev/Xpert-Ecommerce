package com.manish.XpertStore.service.interf;

import com.manish.XpertStore.dto.LoginRequest;
import com.manish.XpertStore.dto.Response;
import com.manish.XpertStore.dto.UserDto;
import com.manish.XpertStore.entity.User;

public interface UserService {
    Response registerUser(UserDto registrationRequest);
    Response loginUser(LoginRequest loginRequest);
    Response getAllUsers();
    User getLoginUser();
    Response getUserInfoAndOrderHistory();
}
