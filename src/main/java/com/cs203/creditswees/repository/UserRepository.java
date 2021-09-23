package com.cs203.creditswees.repository;

import com.cs203.creditswees.models.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import javax.transaction.Transactional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUsername(String username);

    User findByEmail(String email);

    @Transactional
    void deleteByUsername(String username);
}