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
               // Is URL defined
               expect(item.url).toBeDefined();
               // Is URL not empty (or in this case truthy)
               expect(item.url).toBeTruthy();
           })
        });

        it('have a name defined and is not empty', function() {
            allFeeds.forEach(function(item) {
                // Is name defined
                expect(item.name).toBeDefined();
                // Is name not empty (or in this case truthy)
                expect(item.name).toBeTruthy();
            })
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
            expect(menuClosed()).toBe(false);
            // Close menu
            menuBtn.click();
            expect(menuClosed()).toBe(true);

        });

        // additional tests
        describe('Menu feed list', function() {

            var feedLength = allFeeds.length;
            var menuLength = $('.feed-list').children().length;

            // Compare feed array length to number of items in menu
            it('displays the same number of feeds in menu', function() {
                expect(feedLength).toEqual(menuLength);
            });

            it('hides menu on feed name click', function() {

                $('a.feed-list').click(); // click on feed link

                expect(menuClosed()).toBe(true);
            });

        });

    });

    describe('Initial Entries', function() {

        var feedContainer = $('.feed'); // here is where the feed container lives

        beforeEach(function(done) {
            // Get our first feed and pass done as callback
            loadFeed(0, function() {
                done();
            });
        });

        it('are generated after loadFeed() has completed', function() {
            // jQuery .has('.entry').length returns 1 when at least one .entry class present
            expect(feedContainer.has('.entry').length).not.toBe(0);
        });
    });

    describe('New Feed Selection', function() {

        var firstCall,
            secondCall,
            feedContainer = $('.feed'); // here is where the feed container lives

        beforeEach(function(done) {

            /* Credit to the forums for this method, I was implementing a similar way!
                It works but I fear it is not as robust as it should be so please let me know
                if there is a better solution!
             */

            feedContainer.empty(); // clear out any old data

            // Get our first feed and store in firstCall.
            loadFeed(0, function() {
                firstCall = feedContainer.find("h2").text();
            });

            // load a different feed and store in secondCall. Call done() to let it know we're ready.
            loadFeed(1, function() {
                secondCall = feedContainer.find("h2").text();
                done();
            });
        });

        it('ensures content changes when a new feed is loaded', function() {
            // Simple comparison of the two loadFeed calls above.
            expect(firstCall).not.toEqual(secondCall);
        });
    });


}());
