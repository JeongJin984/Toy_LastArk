package com.lastArk.lastarkapi.web.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lastArk.lastarkapi.dto.FullUser;
import com.lastArk.lastarkapi.dto.RadeDTO;
import com.lastArk.lastarkapi.web.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController()
@RequiredArgsConstructor
public class UserAPI {
    private final UserService userService;

    @GetMapping("/user/logout")
    public void getRadeApply(HttpServletResponse response) {
        Cookie userCookie = new Cookie("username", "");
        userCookie.setPath("/");
        userCookie.setHttpOnly(true);
        response.addCookie(userCookie);
        response.addCookie(userCookie);
    }

    @GetMapping("/user/rade/apply")
    public List<RadeDTO> getRadeApply(@CookieValue(name = "username") String username, String state) {
        if(StringUtils.hasText(username)) {
            return userService.getUserRade(username, state);
        } else {
            return null;
        }
    }

    @GetMapping("/user/update/lostark")
    public FullUser hello(String username) throws JsonProcessingException {
        return userService.updateUserLostArkInfo(username);
    }

    @GetMapping("/user/get/save")
    public FullUser user(
            @RequestParam String username,
            @RequestParam String repCharacterName,
            HttpServletResponse response
    ) throws JsonProcessingException {
        Cookie userCookie = new Cookie("username", username);
        userCookie.setPath("/");
        userCookie.setHttpOnly(true);
        response.addCookie(userCookie);
        return userService.getOrSaveFullUserInfo(username, repCharacterName);
    }

    @GetMapping("/user/get")
    public FullUser user(@CookieValue(name = "username") String username) throws JsonProcessingException {
        if(StringUtils.hasText(username)) {
            return userService.getFullUserInfo(username);
        } else {
            return null;
        }
    }

    record SignUpInfo(String username, String repCharacterName) {}
}
