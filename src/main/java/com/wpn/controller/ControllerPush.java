package com.wpn.controller;

import com.wpn.dto.DtoResponseSubscription;
import com.wpn.modal.PushPayload;
import com.wpn.service.push.ServicePush;
import com.wpn.service.subscribe.ServiceSubscription;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/wpn")
@Api(tags = "ControllerPush", description = "Rest web push notifications APIs")
@ApiResponses(value = {
        @ApiResponse(code = 200, message = "The request has succeeded"),
        @ApiResponse(code = 401, message = "The request requires user authentication"),
        @ApiResponse(code = 403, message = "Accessing the resource you were trying to reach is forbidden"),
        @ApiResponse(code = 404, message = "The server has not found anything matching the Request-URI")})
public class ControllerPush {

    @Autowired
    ServicePush pushService;

    @Autowired
    ServiceSubscription subscriptionService;

    @PostMapping(value = "/subscribe")
    @ApiOperation(value = "subscribe new user" )
    public ResponseEntity<?> subscribe(@Valid @RequestBody DtoResponseSubscription dtoResponseSubscription) {
          return new ResponseEntity<>(subscriptionService.create(dtoResponseSubscription), HttpStatus.OK);
    }

    @PostMapping(value = "/push")
    @ApiOperation(value = "send new Notification" )
    public ResponseEntity<?> send(@Valid @RequestBody PushPayload payload)  {
        return new ResponseEntity<>(pushService.send(payload), HttpStatus.OK);
    }
}
