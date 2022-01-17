package com.wpn.service.push;

import com.wpn.dto.DtoResponseSendNotification;
import com.wpn.modal.PushPayload;

public interface ServicePush {
    public DtoResponseSendNotification send(PushPayload payload);
}
