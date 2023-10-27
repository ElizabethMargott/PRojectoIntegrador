package com.sxm.demo.user;

import lombok.Data;

@Data
public class ErrorResponse {
    private int status;
    private String error;
    private String message;

    
}
