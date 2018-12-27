package bjorn.petprojects.api.v1.mappers;

import bjorn.petprojects.api.v1.model.TodoDTO;
import bjorn.petprojects.domain.Todo;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Service;

@Mapper
@Service
public interface TodoMapper {

    TodoMapper INSTANCE = Mappers.getMapper(TodoMapper.class);

    TodoDTO todoToTodoDTO(Todo todo);
}
