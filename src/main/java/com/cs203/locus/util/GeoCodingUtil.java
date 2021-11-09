package com.cs203.locus.util;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class GeoCodingUtil {

    public double[] getGeoCode(String address) throws JSONException, IOException, InterruptedException {
        double result[] = new double[2];
        address = address.replaceAll(" ", "+");
        // Use GeoCode API to get Latitude and Longitude of the User's Starting Point
        String uri = String.format("https://maps.googleapis.com/maps/api/geocode/json?address=%s&key=%s", address, "AIzaSyDXznoFJsNayI0eS9L9v7iDjrddhdHY8HM");
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(uri))
                .build();
        JSONObject obj = new JSONObject(client.send(request, HttpResponse.BodyHandlers.ofString()).body());
        // Lat first the lng second
        result[0] = obj.getJSONArray("results").getJSONObject(0).getJSONObject("geometry").getJSONObject("location").getDouble("lat");
        result[1] = obj.getJSONArray("results").getJSONObject(0).getJSONObject("geometry").getJSONObject("location").getDouble("lng");

        return result;
//        String formattedAddress = obj.getJSONArray("results").getJSONObject(0).getString("formatted_address");
//        String locationType = obj.getJSONArray("results").getJSONObject(0).getJSONObject("geometry").getString("location_type");
    }
}
