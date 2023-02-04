package com.lastArk.lastarkapi.web.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lastArk.lastarkapi.db.domain.UserInfo;
import com.lastArk.lastarkapi.db.domain.UserRadeApply;
import com.lastArk.lastarkapi.db.domain.etc.RadeInfo;
import com.lastArk.lastarkapi.db.repository.rade.RadeRepository;
import com.lastArk.lastarkapi.db.repository.rade.RadeRepositoryCustom;
import com.lastArk.lastarkapi.db.repository.userInfo.UserInfoRepository;
import com.lastArk.lastarkapi.db.repository.userRadeApply.UserRadeApplyRepository;
import com.lastArk.lastarkapi.db.repository.userRadeApply.UserRadeApplyRepositoryCustom;
import com.lastArk.lastarkapi.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserInfoRepository userInfoRepository;
    private final UserRadeApplyRepository radeApplyRepository;
    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public FullUser updateUserLostArkInfo(String username) throws JsonProcessingException {
        UserInfo userInfo = userInfoRepository.findByUsername(username);
        return updateFullUserCache(userInfo.getUsername(), userInfo.getRepCharacterName());
    }

    public FullUser getFullUserInfo(String username) throws JsonProcessingException {
        String cashedFullUser = redisTemplate.opsForValue().get(username);
        return objectMapper.readValue(cashedFullUser, FullUser.class);
    }

    public FullUser getOrSaveFullUserInfo(String username, String repCharacter) throws JsonProcessingException {
        String cashedFullUser = redisTemplate.opsForValue().get(username);

        if(cashedFullUser == null) {
            userInfoRepository.save(new UserInfo(username, repCharacter, null));
            return updateFullUserCache(username, repCharacter);
        } else {
            return objectMapper.readValue(cashedFullUser, FullUser.class);
        }
    }

    @Transactional
    public List<RadeDTO> getUserRade(String username, String state) {
        return radeApplyRepository.getAppliedRade(username, state);
    }

    private FullUser updateFullUserCache(String username, String repCharacter) throws JsonProcessingException {
        FullUser fullUser = new FullUser();
        fullUser.setUsername(username);
        fullUser.setRepCharacterName(repCharacter);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("authorization", "bearer "+ "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxMzE2MDgifQ.akC5yXd0NpOpxcu7gt77hDFYyrMOwXsa6vpD4tgmE4jN7yZiPt6pH5TrB3iO8CiB-Hs5HnWlTE_ZT-pcRqIMyQcxDHV5NC8H9a2KJsqtUGktxCyaV8l4zG9Z5nsDECGX3lIwQOcnBVvovBSAwseI5ZBxUKp4bwJw_woFpGgFV9GdF79D9dx2XghlKeT40kEkEm9IGhtcrbtQZ_UxHe8o5KNNY6dzZ-gp5fCo-WIqH9nTpyrMUnpWsX3a7PCgtk1_wquugTJf-n8JuUfYbm6vYjrpbMTWg1_mEmJtG_nIWHAaMmZ3xpwdzKxATBCcqjxel182uscsphbQiVeU13AbEQ");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        Object[] userLostArkCharacters = restTemplate
                .exchange(
                        "https://developer-lostark.game.onstove.com/characters/" + repCharacter + "/siblings",
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
                    String.valueOf(resultMap.get("ServerName")),
                    String.valueOf(resultMap.get("CharacterName")),
                    String.valueOf(resultMap.get("CharacterImage")),
                    (String) resultMap.get("GuildName"),
                    (String) resultMap.get("GuildMemberGrade"),
                    String.valueOf(resultMap.get("CharacterClassName"))
            );
        }).toList();


        fullUser.setUserLostArkCharacters(userLostArkCharacterList);
        fullUser.setUserLostArkProfile(userLostArkProfile);

        redisTemplate.opsForValue().set(username, objectMapper.writeValueAsString(fullUser));

        return fullUser;
    }
}
