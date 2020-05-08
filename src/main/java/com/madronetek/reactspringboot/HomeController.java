package com.madronetek.reactspringboot;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

// (1) 	@Controller marks this class as a Spring MVC controller.
@Controller
public class HomeController {

    // (2) @RequestMapping flags the index() method to support the / route.
    @RequestMapping(value = "/")
    public String index() {
        // (3) It returns index as the name of the template, which Spring Boot’s autoconfigured view resolver will map
        // to src/main/resources/templates/index.html.
        return "index";
    }

}
