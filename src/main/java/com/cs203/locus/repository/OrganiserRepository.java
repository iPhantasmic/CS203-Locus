package com.cs203.locus.repository;

import com.cs203.locus.models.organiser.Organiser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganiserRepository extends CrudRepository<Organiser, Integer> {

}
