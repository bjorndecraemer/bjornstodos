package bjorn.petprojects.controllers;

import bjorn.petprojects.api.v1.model.TodoDTO;
import bjorn.petprojects.api.v1.model.TodoListDTO;
import bjorn.petprojects.services.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/v1/todos/")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<TodoListDTO> getAllTodos(){
        return new ResponseEntity<>(new TodoListDTO(todoService.findAllTodos()), HttpStatus.OK);
    }

    @GetMapping("complete/")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<TodoListDTO> getAllCompletedTodos(){
        return new ResponseEntity<>(new TodoListDTO(todoService.findCompleteTodos()), HttpStatus.OK);
    }
    @GetMapping("incomplete/")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<TodoListDTO> getAllInCompletedTodos(){
        return new ResponseEntity<>(new TodoListDTO(todoService.findInCompleteTodos()), HttpStatus.OK);
    }

    @GetMapping("id/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<TodoDTO> getTodoById(@PathVariable Long id){
        return new ResponseEntity<>(todoService.findById(id),HttpStatus.OK);
    }
}
