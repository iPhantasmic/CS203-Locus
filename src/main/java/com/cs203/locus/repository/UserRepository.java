package com.cs203.locus.repository;

import com.cs203.locus.models.user.User;
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