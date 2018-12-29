package bjorn.petprojects.controllers;

import bjorn.petprojects.api.v1.model.TodoDTO;
import bjorn.petprojects.api.v1.model.TodoListDTO;
import bjorn.petprojects.services.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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

    @PostMapping("create")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<TodoDTO> createNewTodo(@RequestBody TodoDTO todo){
        System.out.println("CreateNewTodo called");
        System.out.println(todo.toString());
        try {
            TodoDTO savedTodo = todoService.createNewTodo(todo);
            return new ResponseEntity<>(savedTodo, HttpStatus.OK);
        }
        catch (IOException iOE){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

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

    @DeleteMapping("delete/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Long> deleteTodoById(@PathVariable Long id){
        try {
            todoService.deleteById(id);
            return new ResponseEntity<>(id,HttpStatus.OK);
            //return (ResponseEntity<Void>) ResponseEntity.status(HttpStatus.OK).;
        }
        catch(Exception e){
            return new ResponseEntity<>(id,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("update")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<TodoDTO> updateTodo(@RequestBody TodoDTO todo){
        System.out.println("UpdateTodo called");
        System.out.println(todo.toString());
        try {
            TodoDTO savedTodo = todoService.updateTodo(todo);
            return new ResponseEntity<>(savedTodo, HttpStatus.OK);
        }
        catch (IOException iOE){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
