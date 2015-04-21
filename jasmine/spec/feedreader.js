/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
        * allFeeds variable has been defined and that it is not
        * empty. Experiment with this before you get started on
        * the rest of this project. What happens when you change
        * allFeeds in app.js to be an empty array and refresh the
        * page?
        */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        allFeeds.forEach(function (feed) {
            /* Loops through each feed
            * in the allFeeds object and ensures it has a URL defined
            * and that the URL is not empty.
            */
            it('url is defined and not empty', function () {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });


            /*loops through each feed
            * in the allFeeds object and ensures it has a name defined
            * and that the name is not empty.
            */
            it('name is defined and not empty', function () {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /*Test suite named "The menu" */
    describe('The menu', function () {
        var body = $('body');

        /* Test the menu element is hidden by default.*/
        it("body should have class menu-hidden", function () {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /*Test the menu changes visibility when the menu icon is clicked. This test
        have two expectations: does the menu display when clicked 
        and does it hide when clicked again.
        */
        it("Toggle visibility of the menu link when clicked", function () {
            var menuIcon = $('.menu-icon-link');

            //Check if the menu display when clicked
            menuIcon.click();
            expect(body.attr('class')).toBe('');


            //Check if the menu hide when clicked again
            menuIcon.click();
            expect(body.attr('class')).toBe('menu-hidden');
        });
    });


    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        //Jasmine's beforeEach and asynchronous done() function
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /*Check when the loadFeed function is called and completes its work, 
        there is at least a single .entry element within the .feed container*/
        it("Check the number of loaded feeds is greater than 1", function (done) {
            var numOfFeeds = $('.feed').children('.entry-link').children('.entry').length;
            expect(numOfFeeds).toBeGreaterThan(1);
            done();
        });
    });


    /* Test suite named "New Feed Selection"*/
    describe('New Feed Selection', function () {

        

        //Set current feed to a variable
        var currentFeed;

        //Jasmine's beforeEach and asynchronous done() function
        beforeEach(function (done) {
            currentFeed = $('.feed').html();
            loadFeed(3, function () {
                done();
            });
        });

        /*Check when a new feed is loaded by the loadFeed function 
        that the content actually changes*/
        it('changes the content displayed', function (done) {
            var newFeed = $('.feed').html();
         /* expect(currentFeed).not.toBe(newFeed); */
            expect(currentFeed).not.toEqual(newFeed);           
            done();
        });

    });

} ());
