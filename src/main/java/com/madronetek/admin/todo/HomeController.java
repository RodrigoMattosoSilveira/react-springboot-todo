package com.madronetek.admin.todo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller // marks this class as a Spring MVC controller
public class HomeController {
    @RequestMapping(value = "/") // @RequestMapping flags the index() method to support the / route
    public String index() {
        // it returns index as the name of the template, which Spring Boot’s autoconfigured view resolver will map to
        // src/main/resources/templates/index.html.
        return "index";
    }
}
