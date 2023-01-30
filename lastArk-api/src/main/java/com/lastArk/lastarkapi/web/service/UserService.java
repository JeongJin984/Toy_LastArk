package com.lastArk.lastarkapi.web.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lastArk.lastarkapi.db.domain.UserInfo;
import com.lastArk.lastarkapi.db.repository.userInfo.UserInfoRepository;
import com.lastArk.lastarkapi.dto.FullUser;
import com.lastArk.lastarkapi.dto.LostArkCharacter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserInfoRepository userInfoRepository;
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public FullUser getFullUserInfo(String username) throws JsonProcessingException {
        FullUser fullUser = new FullUser();
        UserInfo userInfo = userInfoRepository.findByUsername(username);

        fullUser.setUserId(userInfo.getUserId());
        fullUser.setUsername(userInfo.getUsername());

        String cashedFullUser = redisTemplate.opsForValue().get(userInfo.getUserId());

        // get LostArkProfile And Init
        if(cashedFullUser == null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("authorization", "bearer "+ "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxMzE2MDgifQ.akC5yXd0NpOpxcu7gt77hDFYyrMOwXsa6vpD4tgmE4jN7yZiPt6pH5TrB3iO8CiB-Hs5HnWlTE_ZT-pcRqIMyQcxDHV5NC8H9a2KJsqtUGktxCyaV8l4zG9Z5nsDECGX3lIwQOcnBVvovBSAwseI5ZBxUKp4bwJw_woFpGgFV9GdF79D9dx2XghlKeT40kEkEm9IGhtcrbtQZ_UxHe8o5KNNY6dzZ-gp5fCo-WIqH9nTpyrMUnpWsX3a7PCgtk1_wquugTJf-n8JuUfYbm6vYjrpbMTWg1_mEmJtG_nIWHAaMmZ3xpwdzKxATBCcqjxel182uscsphbQiVeU13AbEQ");
            HttpEntity<String> entity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            Object[] userLostArkCharacters = restTemplate
                    .exchange(
                            "https://developer-lostark.game.onstove.com/characters/COVAX/siblings",
                            HttpMethod.GET,
                            entity,
                            Object[].class
                    ).getBody();

            assert userLostArkCharacters != null;
            List<LostArkCharacter> userLostArkCharacterList = Arrays.stream(userLostArkCharacters).map(characters -> {
                LinkedHashMap<String, Object> characterMap = (LinkedHashMap<String, Object>) characters;

                return new LostArkCharacter(characterMap.get("ServerName").toString(), characterMap.get("CharacterName").toString(), Integer.parseInt(characterMap.get("CharacterLevel").toString()), characterMap.get("CharacterClassName").toString(), characterMap.get("ItemAvgLevel").toString(), characterMap.get("ItemMaxLevel").toString());
            }).toList();

            List<FullUser.UserLostArkProfile> userLostArkProfile = userLostArkCharacterList.stream().map(lostArkCharacter -> {
                Object result = restTemplate
                        .exchange(
                                "https://developer-lostark.game.onstove.com/armories/characters/"
                                        + lostArkCharacter.getCharacterName() + "/profiles",
                                HttpMethod.GET,
                                entity,
                                Object.class
                        ).getBody();
                assert result != null;
                LinkedHashMap<String, Object> resultMap = (LinkedHashMap<String, Object>) result;
                return new FullUser.UserLostArkProfile(
                        resultMap.get("ServerName").toString(),
                        resultMap.get("CharacterName").toString(),
                        resultMap.get("CharacterImage").toString(),
                        (String) resultMap.get("GuildName"),
                        (String) resultMap.get("GuildMemberGrade"),
                        resultMap.get("CharacterClassName").toString()
                );
            }).toList();


            fullUser.setUserLostArkCharacters(userLostArkCharacterList);
            fullUser.setUserLostArkProfile(userLostArkProfile);

            redisTemplate.opsForValue().setIfAbsent(userInfo.getUserId(), objectMapper.writeValueAsString(fullUser));

            return fullUser;
        } else {
            return objectMapper.readValue(cashedFullUser, FullUser.class);
        }

    }
}
