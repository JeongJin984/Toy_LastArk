package com.lastArk.lastarkapi.security.jwt;

import com.lastArk.lastarkapi.dto.FullUser;
import com.lastArk.lastarkapi.dto.UserDetailDTO;
import com.lastArk.lastarkapi.dto.UserInfoDTO;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;

public class JwtAuthenticationToken implements Authentication {
    private UserInfoDTO userData;
    private UserDetailDTO userDetailDTO;
    private String password;
    private boolean authenticated;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<>();
    }

    @Override
    public Object getCredentials() {
        return password;
    }

    @Override
    public Object getDetails() {
        return this.userDetailDTO;
    }

    @Override
    public Object getPrincipal() {
        return this.userData;
    }

    @Override
    public boolean isAuthenticated() {
        return this.authenticated;
    }

    @Override
    public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {
        this.authenticated = isAuthenticated;
    }

    @Override
    public String getName() {
        return this.userData.getUsername();
    }
}
