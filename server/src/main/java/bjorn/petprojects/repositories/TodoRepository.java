package bjorn.petprojects.repositories;

import bjorn.petprojects.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
