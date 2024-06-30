let iter = 0

Handlebars.registerHelper("limiter", function(index) {
    let res =  iter / 3;
});