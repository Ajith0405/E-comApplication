package com.demo.app.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.app.model.OrderDetail;
import com.demo.app.model.User;

@Repository
public interface OrderDetailDao extends CrudRepository<OrderDetail, Integer> {
	public List<OrderDetail> findByUser(User user);
}
