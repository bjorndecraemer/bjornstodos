package bjorn.petprojects.api.v1.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class TodoListDTO {
    private List<TodoDTO> todolist;
}
