package bjorn.petprojects.bootstrap;

import bjorn.petprojects.domain.Todo;
import bjorn.petprojects.repositories.TodoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class TodoCommandLineRunner implements CommandLineRunner {

    private final TodoRepository todoRepository;

    public TodoCommandLineRunner(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.print("Filling todo's ...");

        todoRepository.save(Todo.builder().title("Brush Puffy").description("Brush Puppy thoroughly").createdDate(new Date()).build());
        todoRepository.save(Todo.builder().title("Cuddle Chihiro with a very long text").description("Cuddle Chihoro today, she needs it so bad!").createdDate(new Date()).build());
        todoRepository.save(Todo.builder().title("Clean dishes").description("The dishes need cleaning, they are yucky!").createdDate(new Date()).build());
        todoRepository.save(Todo.builder().title("Call Kristel").description("Call Kristel to plan our trip to San Diego").createdDate(new Date()).build());
        todoRepository.save(Todo.builder()
                .title("Brush Roger")
                .description("Roger needs a good brushing")
                .createdDate(new Date())
                .completedDate(new Date())
                .completed(true)
                .build());
        todoRepository.save(Todo.builder()
                .title("Cuddle Jack")
                .description("Jack needs a lot of cuddles, he needs constant re-assurance that mommy and daddy love him!")
                .createdDate(new Date())
                .completedDate(new Date())
                .completed(true)
                .build());

        System.out.println(" done!");
        todoRepository.findAll().forEach(System.out::println);
    }
}
