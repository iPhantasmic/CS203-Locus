package com.cs203.creditswees.util;

import org.json.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.*;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

// to add cron job
public class GovScrape {
    public static String GovApiScrape() {
        String TOPIC_GOV_SG_API = "Health";
        String NUM_ROWS_GOV_SG_API = "" + 50;
        final String GOV_SG_API = "https://www.gov.sg/api/v1/search?fq=contenttype_s:[*%20TO%20*]&fq=isfeatured_b:false&fq=primarytopic_s:%22" + TOPIC_GOV_SG_API + "%22&q=*:*&sort=publish_date_tdt%20desc&start=0&rows=" + NUM_ROWS_GOV_SG_API;

        // Set A CONNECT timeout duration of 15s (not socket timeout)
        // commented off some headers bc abit useless
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(GOV_SG_API))
                .setHeader("accept", "application/json, text/plain, */*")
                .setHeader("accept-language", "en-US,en;q=0.9")
                //.setHeader("connection", "keep-alive")
                .setHeader("accept-encoding", "gzip, deflate, br")
                .setHeader("sec-ch-ua", "\\\" Not;A Brand\\\";v=\\\"99\\\", \\\"Google Chrome\\\";v=\\\"91\\\", \\\"Chromium\\\";v=\\\"91\\\"")
                .setHeader("sec-fetch-dest", "?0").setHeader("sec-fetch-mode", "empty").setHeader("sec-fetch-site", "same-origin")
                .setHeader("referer", "https://www/gov.sg/" + TOPIC_GOV_SG_API.toLowerCase())
                //.setHeader("host", "www.gov.sg")
                .setHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36")
                .build();

        // send request
        client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .thenApply(GovScrape::JSONStringParser).join();
        return GOV_SG_API;
    }

    public static String JSONStringParser(String responseBody){
        JSONObject obj = new JSONObject(responseBody);
        JSONArray arr = obj.getJSONObject("response").getJSONArray("docs");
        System.out.println("Num Records Returned :" + arr.length());
        for (int i = 0 ; i < arr.length() ; i++) {
            // to create a NewsArticle Object
            // NewsArticle newsArticle = new NewsArticle();
            // setters for all columns to be updated eg: newsArticle.setMainBody(mainBody);
            String shortDescription = "";
            try{shortDescription = arr.getJSONObject(i).getString("short_description_t");}
            catch (Exception e){
                shortDescription = "nth";
                continue;
            }
            String imageUrl = "https://gov.sg" + arr.getJSONObject(i).getString("imageurl_s");
            String fullArticleUrl = "https://gov.sg" + arr.getJSONObject(i).getString("pageurl_s");
            String datePublished = arr.getJSONObject(i).getString("publishdate_s");
            String title = arr.getJSONObject(i).getString("title_t");
            int minutesToRead = arr.getJSONObject(i).getInt("minuteread_s");

            String mainBody = arr.getJSONObject(i).getString("bodytext_t");

            System.out.println("Description: " + shortDescription);
            System.out.println("imageUrl: " + imageUrl);
            System.out.println("fullArticleUrl: " + fullArticleUrl);
            System.out.println("datePublished: " + datePublished);
            System.out.println("title: " + title);
            System.out.println("minutesToRead: " + minutesToRead);
            System.out.println("Body Text: " + mainBody);

            // System.out.println(arr.getJSONObject(i));
        }
        return null;
    }


    public static void main(String[] args) {
        GovApiScrape();
    }
// gvt topics eg: https://www.gov.sg/factually
// Topics:
//      health
//      economy-and-finance
//      education
//      employment
//      social-and-community
//      explainers
//      law-and-governance
//      transport
//      factually
//      pofma
//      foreign-affairs
//      environment
//      savings-and-taxes
//      stories

}
