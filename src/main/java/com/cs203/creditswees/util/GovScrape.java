package com.cs203.creditswees.service;
import com.fasterxml.jackson.core.JsonParser;
import org.apache.tomcat.util.json.JSONParser;

import java.net.*;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;

public class GovScrape {
    public static String GovApiScrape(){
        String TOPIC_GOV_SG_API = "Health";
        String NUM_ROWS_GOV_SG_API = "" + 50;
        String GOV_SG_API = "https://www.gov.sg/api/v1/search?fq=contenttype_s:[*%20TO%20*]&fq=isfeatured_b:false&fq=primarytopic_s:%22" + TOPIC_GOV_SG_API + "%22&q=*:*&sort=publish_date_tdt%20desc&start=0&rows=" + NUM_ROWS_GOV_SG_API;

        // Standardised Codes for API Calling
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(GOV_SG_API))
                .setHeader("accept", "application/json, text/plain, */*")
                .setHeader("accept-language", "en-US,en;q=0.9")
                .setHeader("connection", "keep-alive")
                .setHeader("accept-encoding", "gzip, deflate, br")
                .setHeader("sec-ch-ua", "\\\" Not;A Brand\\\";v=\\\"99\\\", \\\"Google Chrome\\\";v=\\\"91\\\", \\\"Chromium\\\";v=\\\"91\\\"")
                .setHeader("sec-fetch-dest", "?0").setHeader("sec-fetch-mode", "empty").setHeader("sec-fetch-site", "same-origin")
                .setHeader("referer", "same-origin").setHeader("host", "www.gov.sg")
                .setHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36")

                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();
        HttpResponse<String> response = client.send(request,HttpResponse.BodyHandlers.ofString());
        String jsonString = response.body();
        JSONObject obj = new JSONObject(jsonString);

        return GOV_SG_API;
    }

}
