const faker = require('@faker-js/faker');

class HomeConstants {

    arrivalItems = [
        {
            urlLink: 'http://practice.automationtesting.in/product/selenium-ruby/',
            imageLink: 'http://practice.automationtesting.in/wp-content/uploads/2017/01/Selenium-Ruby-300x300.jpg',
            itemName: 'Selenium Ruby',
            itemPrice: '500.00',
            description: 'The Selenium WebDriver Recipes book is a quick problem-solving guide to automated testing web applications with Selenium WebDriver.',
            tabDescription: 'The Selenium WebDriver Recipes book is a quick problem-solving guide to automated testing web applications with Selenium WebDriver. It contains hundreds of solutions to real-world problems, with clear explanations and ready-to-run test scripts you can use in your own projects.',
        },
        {
            urlLink: 'http://practice.automationtesting.in/product/thinking-in-html/',
            imageLink: 'http://practice.automationtesting.in/wp-content/uploads/2017/01/Thinking-in-HTML-300x300.jpg',
            itemName: 'Thinking in HTML',
            offerPrice: {
                origPrice: '450.00',
                newPrice: '400.00'
            },
            description: 'This book provides you with an intermediate knowledge of HTML. Instead of wandering through loads of theory, we will understand HTML practically so that we can understand the markup of a web page. We have used Notepad for the examples in this book.',
            tabDescription: 'This book provides you with an intermediate knowledge of HTML. Instead of wandering through loads of theory, we will understand HTML practically so that we can understand the markup of a web page. We have used Notepad for the examples in this book. Alternatively, you can also use Notepad++ or any advanced editor. All you need to do is copy the code and paste it into Notepad. Upon execution, you will get the output as depicted in the screenshots. Screenshots are provided for each piece of sample code.',
        },
        {
            urlLink: 'http://practice.automationtesting.in/product/mastering-javascript/',
            imageLink: 'http://practice.automationtesting.in/wp-content/uploads/2017/01/Mastering-JavaScript-300x300.jpg',
            itemName: 'Mastering JavaScript',
            itemPrice: '350.00',
            description: 'It would seem that everything that needs to be written about JavaScript has been written. Frankly, it is difficult to find a topic related to JavaScript that has not been discussed ad nauseam.',
            tabDescription: 'It would seem that everything that needs to be written about JavaScript has been written. Frankly, it is difficult to find a topic related to JavaScript that has not been discussed ad nauseam. However, JavaScript is changing at a rapid pace. ECMAScript 6 has the potential to transform the language and how we code in it. Node.js has already changed the way in which we write servers in JavaScript. Newer ideas such as React and Flux will drive the next iteration of the language.',
        },
    ]

    basketLink = 'http://practice.automationtesting.in/basket/';
}

module.exports = new HomeConstants();
