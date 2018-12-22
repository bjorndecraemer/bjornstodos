package bjorn.petprojects.api.v1.model;

import lombok.Data;

import java.util.Date;

@Data
public class TodoDTO {

    private Long id;
    private String description;
    private Date createdDate;
    private Date completedDate;
    private Boolean completed;
}
