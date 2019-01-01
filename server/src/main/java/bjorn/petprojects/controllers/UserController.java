package bjorn.petprojects.controllers;

import bjorn.petprojects.domain.ApplicationUser;
import bjorn.petprojects.repositories.ApplicationUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private ApplicationUserRepository applicationUserRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(ApplicationUserRepository applicationUserRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.applicationUserRepository = applicationUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    @PostMapping("/sign-up")
    public ResponseEntity<String> signup(@RequestBody ApplicationUser user){
        ApplicationUser existingUser = applicationUserRepository.findByUsername(user.getUsername());
        if(existingUser != null) {
            return new ResponseEntity<>("User : "+user.getUsername()+" already exists!",HttpStatus.INTERNAL_SERVER_ERROR);
        }

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));


        applicationUserRepository.save(user);
        return new ResponseEntity<>("User : "+user.getUsername()+" created successfully",HttpStatus.OK);
    }
}
