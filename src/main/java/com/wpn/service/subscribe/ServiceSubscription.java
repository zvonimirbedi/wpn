package com.wpn.service.subscribe;

import com.wpn.dto.DtoResponseSubscription;
import com.wpn.entity.Subscription;

import java.util.List;

public interface ServiceSubscription {

    public Subscription create (DtoResponseSubscription dtoResponseSubscription);
    public List<Subscription> list();
    public List<Integer> deleteAllByIdIn(List<Integer> ids);
}
