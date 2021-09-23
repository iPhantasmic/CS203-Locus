package com.cs203.creditswees.security;

import com.cs203.creditswees.models.user.User;
import com.cs203.creditswees.models.user.UserDTO;
import com.cs203.creditswees.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<SimpleGrantedAuthority> roles = new ArrayList<SimpleGrantedAuthority>();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        roles.add(new SimpleGrantedAuthority(user.getRole()));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), roles);
    }

    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        List<SimpleGrantedAuthority> roles = new ArrayList<SimpleGrantedAuthority>();
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        roles.add(new SimpleGrantedAuthority(user.getRole()));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), roles);
    }

    public User create(UserDTO user) {
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setName(user.getName());
        // Default to ROLE_USER
        // User with ROLE_ADMIN field can be edited in database to produce an Administrator account
        newUser.setRole("ROLE_USER");
        newUser.setEmail(user.getEmail());
        newUser.setEmailVerified(false);

        userRepository.save(newUser);
        newUser.setPassword("");
        return newUser;
    }

    public void updatePwd(User user) {
        user.setPassword(bcryptEncoder.encode(user.getPassword()));

        userRepository.save(user);
        user.setPassword("");
    }
}
