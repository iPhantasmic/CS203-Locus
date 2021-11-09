package com.cs203.locus.models.admin;

import java.io.Serializable;
import java.time.LocalDateTime;

public class NewsArticleDTO implements Serializable {

    private String title;

    private String bodyText;

    private LocalDateTime datePublished;

    private String articleLink;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getBodyText() { return bodyText; }
    public void setBodyText(String bodyText) { this.bodyText = bodyText; }

    public LocalDateTime getDatePublished() { return datePublished; }
    public void setDatePublished(LocalDateTime datePublished) { this.datePublished = datePublished; }

    public String getArticleLink() { return articleLink; }
    public void setArticleLink(String articleLink) { this.articleLink = articleLink; }

    public String toJson() {
        return "{" +
                "\"title\":\"" + title + "\"," +
                "\"bodyText\":\"" + bodyText + "\"," +
                "\"datePublished\":\"" + datePublished.toString() + "\"," +
                "\"articleLink\":\"" + articleLink + "\"}";
    }

}
