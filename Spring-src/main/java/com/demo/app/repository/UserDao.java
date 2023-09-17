package com.demo.app.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.app.model.User;

@Repository
public interface UserDao extends CrudRepository<User, String> {

}
