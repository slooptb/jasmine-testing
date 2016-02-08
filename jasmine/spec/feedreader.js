/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('have a URL defined and is not empty', function() {
           allFeeds.forEach(function(item) {
               // Is URL defined & not empty
               expect(item.url).toBeTruthy();
           });
        });

        it('have a name defined and is not empty', function() {
            allFeeds.forEach(function(item) {
                // Is name defined & not empty
                expect(item.name).toBeTruthy();
            });
        });
    });


    describe('The menu', function() {

        var menuClosed = function() {
            return $('body').hasClass('menu-hidden');
        };

        it('is hidden by default', function() {
            /* The menu is hidden when the .menu-hidden class is applied to the body
             * which should be by default.
             */
            expect(menuClosed()).toBe(true);
        });

        it('changes visibility when clicked', function() {
            // Our menu link
            var menuBtn = $('.menu-icon-link');
            // Make sure the menu is closed for purposes of test...
            if(!menuClosed()) {
                menuBtn.click();
            }
            // Open menu
            menuBtn.click();
            expect(menuClosed()).toBeFalsy();
            // Close menu
            menuBtn.click();
            expect(menuClosed()).toBeTruthy();
        });

        // additional tests
        describe('Menu feed list', function() {

            var feedLength = allFeeds.length;
            var menuLength = $('.feed-list').children().length;

            // Compare feed array length to number of items in menu
            it('displays the same number of feeds in menu', function() {
                expect(feedLength).toEqual(menuLength);
            });
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            // Get our first feed and pass done as callback
            loadFeed(0, done);
        });

        it('are generated after loadFeed() has completed', function() {
            // find how many entries and check greater than 0
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {

        var firstCall,
            secondCall,
            feedContainer = $('.feed'); // here is where the feed container lives

        beforeEach(function(done) {

            feedContainer.empty(); // clear out any old data

            // Get our first feed and store in firstCall.
            loadFeed(0, function() {
                firstCall = feedContainer.find("h2").text();
                console.log(firstCall);
                // Get second feed and call done within anonymous callback function here to ensure both
                // tests are asynchronous.
                loadFeed(1, function() {
                    secondCall = feedContainer.find("h2").text();
                    console.log(secondCall);
                    done();
                });
            });
        });

        it('ensures content changes when a new feed is loaded', function() {

            // simple comparison of the two feeds
            expect(firstCall).not.toEqual(secondCall);
        });
    });


}());
