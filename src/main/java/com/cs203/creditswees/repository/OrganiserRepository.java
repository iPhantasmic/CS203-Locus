package com.cs203.creditswees.repository;

import com.cs203.creditswees.models.organiser.Organiser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganiserRepository extends CrudRepository<Organiser, Integer> {

}
