package com.lastArk.lastarkapi.web.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.lastArk.lastarkapi.dto.FullUser;
import com.lastArk.lastarkapi.web.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/user")
@RequiredArgsConstructor
public class UserAPI {
    private final UserService userService;

    @GetMapping("/update")
    public FullUser hello(String username) throws JsonProcessingException {
        return userService.updateUserLostArkInfo(username);
    }

    @PostMapping("/singUp")
    public FullUser signUp(@RequestBody SignUpInfo signUpInfo) throws JsonProcessingException {
        return userService.signUp(signUpInfo.userId, signUpInfo.username, signUpInfo.repCharacterName, signUpInfo.profileImage);
    }

    @GetMapping("/")
    public FullUser user(String username) throws JsonProcessingException {
        return userService.getFullUserInfo(username);
    }

    record SignUpInfo(String userId, String password, String repCharacterName, String profileImage, String username) {}
}
