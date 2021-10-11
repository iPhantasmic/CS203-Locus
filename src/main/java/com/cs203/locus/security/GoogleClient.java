package com.cs203.locus.security;

import com.cs203.locus.models.security.FacebookUser;
import com.cs203.locus.models.security.GoogleUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class GoogleClient {

    @Autowired
    private RestTemplate restTemplate;

    private final String GOOGLE_OAUTH_USER_API = "https://www.googleapis.com/userinfo/v2";

    public GoogleUser getUser(String accessToken) {
        String path = "/me?&access_token=" + accessToken;

        return restTemplate.getForObject(GOOGLE_OAUTH_USER_API + path, GoogleUser.class);
    }
}
