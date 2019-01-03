package bjorn.petprojects.api.v1.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ApiResponseMessage {
    private String message;
    private ApiResponseTechStatusCode apiResponseTechStatusCode;
}
