package com.wpn.repository;

import com.wpn.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepositorySubscription extends JpaRepository<Subscription, Integer> {
    List<Subscription> deleteByIdIn(List<Integer> ids);
}
