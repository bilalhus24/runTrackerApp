package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.mapper.UserDto;
import com.example.demo.service.Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.security.Principal;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "${frontend.url}")
public class UserController {


    private final Service service;
    private static final Logger logger = Logger.getLogger(UserController.class.getName());


    public UserController(Service service) {
        this.service = service;
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/profile")
    public ResponseEntity<UserDto> getProfile(Principal principal) {
        UserDto userDto = service.getUserByEmail(principal.getName());

        logger.info("Logged in User: " + userDto.getEmail());
        logger.info("User Role: " + userDto.getRole());

        BigDecimal roundedTotalDistance = BigDecimal.valueOf(userDto.getTotalDistance())
                .setScale(2, RoundingMode.HALF_UP);
        userDto.setTotalDistance(roundedTotalDistance.doubleValue());
        return ResponseEntity.ok(userDto);
    }

    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto userDto = service.getUserById(id);
        BigDecimal roundedTotalDistance = BigDecimal.valueOf(userDto.getTotalDistance())
                .setScale(2, RoundingMode.HALF_UP);
        userDto.setTotalDistance(roundedTotalDistance.doubleValue());
        return ResponseEntity.ok(userDto);
    }

    //can work for someone with role "ROLE_USER" or "ROLE_ADMIN" for reference
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping()
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = service.getAllUsers();
        users.forEach(userDto -> {
            BigDecimal roundedTotalDistance = BigDecimal.valueOf(userDto.getTotalDistance())
                    .setScale(2, RoundingMode.HALF_UP);
            userDto.setTotalDistance(roundedTotalDistance.doubleValue());
        });
        return ResponseEntity.ok(users);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/add")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(service.createUser(userDto), HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}/update")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long id, @RequestBody UserDto userDto) {
        userDto.setId(id);
        return new ResponseEntity<>(service.updateUser(userDto), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        service.deleteUser(id);
        return ResponseEntity.ok("User deleted");
    }
}
