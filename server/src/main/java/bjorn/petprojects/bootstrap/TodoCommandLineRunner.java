package bjorn.petprojects.bootstrap;

import bjorn.petprojects.domain.Todo;
import bjorn.petprojects.repositories.TodoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.stream.Stream;

@Component
public class TodoCommandLineRunner implements CommandLineRunner {

    private final TodoRepository todoRepository;

    public TodoCommandLineRunner(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.print("Filling todo's ...");
        Stream.of("Brush Puffy","Cuddle Chihiro","Clean Dishes","Call Kristel").forEach(name-> {
            todoRepository.save(Todo.builder().name(name).createdDate(new Date()).build());
        });
        Stream.of("Brush Roger","Cuddle Jack").forEach(name-> {
            todoRepository.save(Todo.builder().name(name).createdDate(new Date()).completedDate(new Date()).completed(true).build());
        });
        System.out.println(" done!");
        todoRepository.findAll().forEach(System.out::println);
    }
}
