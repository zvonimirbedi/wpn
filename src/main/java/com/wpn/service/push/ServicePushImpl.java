package com.wpn.service.push;

import com.google.gson.Gson;
import com.wpn.dto.DtoResponseSendNotification;
import com.wpn.entity.Subscription;
import com.wpn.modal.PushPayload;
import com.wpn.service.subscribe.ServiceSubscription;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.Security;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;


@Service
public class ServicePushImpl implements ServicePush {

    @Value(value = "${vapid.key.public}")
    private String vapidKeyPublic;
    @Value(value = "${vapid.key.private}")
    private String vapidKeyPrivate;

    @Autowired
    ServiceSubscription subscriptionService;

    public DtoResponseSendNotification send(PushPayload payload)  {
        Gson gson = new Gson();
        String json = gson.toJson(payload);

        List<Subscription> subs = subscriptionService.list();
        List<Integer> idsToDelete = new ArrayList<>();
        try {
            Security.addProvider(new BouncyCastleProvider());
            for(Subscription sub : subs){
                PushService pushService = new PushService(vapidKeyPublic, vapidKeyPrivate, "mailto:admin@domain.com");
                Notification notification = new Notification(
                        sub.getEndpoint(),
                        sub.getP256dh(),
                        sub.getAuth(),
                        json.getBytes("ASCII"),
                        payload.getTtl());

                HttpResponse response = pushService.send(notification);
                HttpEntity entity = response.getEntity();
                //String responseString = EntityUtils.toString(entity, UTF_8);
                int responseStatus = response.getStatusLine().getStatusCode();
                System.out.println(responseStatus);
                if (responseStatus != 201){
                    idsToDelete.add(sub.getId());
                }
            }
            subscriptionService.deleteAllByIdIn(idsToDelete);
        } catch (GeneralSecurityException | IOException | JoseException | ExecutionException | InterruptedException e) {
            e.printStackTrace();
        }
        DtoResponseSendNotification dtoResponseSendNotification = new DtoResponseSendNotification();
        dtoResponseSendNotification.setSent(String.valueOf(subs.size()));
        dtoResponseSendNotification.setInvalidRemoved(String.valueOf(idsToDelete.size()));
        return dtoResponseSendNotification;
    }

}
