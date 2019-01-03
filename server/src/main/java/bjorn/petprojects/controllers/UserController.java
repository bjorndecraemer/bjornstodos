package bjorn.petprojects.controllers;

import bjorn.petprojects.api.v1.model.ApiResponseMessage;
import bjorn.petprojects.api.v1.model.ApiResponseTechStatusCode;
import bjorn.petprojects.domain.ApplicationUser;
import bjorn.petprojects.repositories.ApplicationUserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/users")
public class UserController {

    private ApplicationUserRepository applicationUserRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserController(ApplicationUserRepository applicationUserRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.applicationUserRepository = applicationUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    @PostMapping("/signup")
    public ResponseEntity<ApiResponseMessage> signup(@RequestBody ApplicationUser user){
        System.out.println("USER : "+user.toString());
        ApplicationUser existingUser = applicationUserRepository.findByUsername(user.getUsername());
        System.out.println("USER2 : "+user.toString());
        ApiResponseMessage responseMessage = new ApiResponseMessage();
        System.out.println("USER3 : "+user.toString());
        if(existingUser != null) {
            System.out.println("USER4 : "+user.toString());
            responseMessage.setMessage("User already exists");
            responseMessage.setApiResponseTechStatusCode(ApiResponseTechStatusCode.USER_EXISTS);
            System.out.println("USER5 : "+user.toString());
            return new ResponseEntity<>( responseMessage,HttpStatus.OK);
        }

        System.out.println("USER6 : "+user.toString());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        System.out.println("USER7 : "+user.toString());

        applicationUserRepository.save(user);
        System.out.println("USER8 : "+user.toString());
        responseMessage.setMessage("User created");
        responseMessage.setApiResponseTechStatusCode(ApiResponseTechStatusCode.SUCCESS);
        System.out.println("USER9 : "+user.toString());
        return new ResponseEntity<>(responseMessage,HttpStatus.OK);
    }
}
