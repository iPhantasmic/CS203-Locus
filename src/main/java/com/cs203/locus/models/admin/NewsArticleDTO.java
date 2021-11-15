package com.cs203.locus.models.admin;

import javax.validation.constraints.NotBlank;
import java.io.Serializable;
import java.time.LocalDateTime;

public class NewsArticleDTO implements Serializable {

    @NotBlank
    private String title;

    @NotBlank
    private String bodyText;

    private LocalDateTime datePublished;

    @NotBlank
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
