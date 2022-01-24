package com.wpn.service.subscribe;

import com.wpn.dto.DtoResponseSubscription;
import com.wpn.entity.Subscription;
import com.wpn.repository.RepositorySubscription;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.List;

@Service
public class ServiceSubscriptionImpl implements ServiceSubscription{

    @Autowired
    private RepositorySubscription subscriptionRepository;

    private ModelMapper modelMapper = new ModelMapper();

    public Subscription create (DtoResponseSubscription dtoResponseSubscription){
        Subscription sub = null;
        try {
            sub = convertToEntity(dtoResponseSubscription);
            sub = subscriptionRepository.save(sub);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return sub;
    }

    public List<Subscription> list(){
        return subscriptionRepository.findAll();
    }
    @Transactional
    public List<Integer> deleteAllByIdIn(List<Integer> ids){
        subscriptionRepository.deleteByIdIn(ids);
        return ids;
    }


    private Subscription convertToEntity(DtoResponseSubscription dtoResponseSubscription) throws ParseException {
        Subscription subscription = modelMapper.map(dtoResponseSubscription, Subscription.class);
        subscription.setExpirationTime(subscription.getExpirationTime());
        subscription.setAuth(dtoResponseSubscription.getKeys().getAuth());
        subscription.setP256dh(dtoResponseSubscription.getKeys().getP256dh());
        subscription.setUpdatetimestamp(System.currentTimeMillis());
        return subscription;
    }
}
