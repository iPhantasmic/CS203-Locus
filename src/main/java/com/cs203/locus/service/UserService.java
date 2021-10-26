package com.cs203.locus.service;

import com.cs203.locus.models.user.User;
import com.cs203.locus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public User findByUsername(String username) {
        User result = userRepository.findByUsername(username);

        return result;
    }

    public User findByEmail(String email) {
        User result = userRepository.findByEmail(email);

        return result;
    }

    public User update(User user) {
        User updated = userRepository.save(user);

        return updated;
    }

    @Transactional
    public void delete(User user) {
        userRepository.delete(user);
    }

}
