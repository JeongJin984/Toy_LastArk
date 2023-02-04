package com.lastArk.lastarkapi.dto;

import com.lastArk.lastarkapi.db.domain.UserInfo;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RadeDTO {
    private Long radeId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime startAt;
    private RadeInfoDTO radeInfo;
    private List<RadeApplicationDTO> apply = new ArrayList<>();
    private UserInfo writer;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RadeDTO radeDTO = (RadeDTO) o;
        return radeId.equals(radeDTO.radeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(radeId);
    }
}
