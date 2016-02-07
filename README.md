# Feed Reader Testing with Jasmine

This project was cloned from [here](http://github.com/udacity/frontend-nanodegree-feedreader) with instructions to add
Jasmine test suites.

Tests were written on a pre-existing application to test underlying business logic and DOM manipulation and are outlined
in detail below.

## Tests

1. RSS Feeds
- are defined: tests to see if the allFeeds variable has been defined and is not empty.
- have a URL defined and is not empty: iterates through allFeeds array and checks each object for a url to be defined and not empty.
- have a name defined and is not empty: iterates through allFeeds array and checks each object for a name to be defined and not empty.

2. The Menu
- is hidden by default: checks the .menu-hidden class is applied to the body.
- changes visibility when clicked: checks the .menu-hidden class is removed/added when clicking the menu button, simulating 
opening/closing the menu.
2a. Menu feed list
- displays the same number of feeds in menu: checks that the allFeeds array length is the same as the number of feed
items that populate the menu.
- hides menu on feed name click: checks that the menu is closed when selecting a feed.

3. Initial Entries
- are generated after loadFeed() has completed: checks that at least one .entry element within the .feed container after the
loadFeed() function has been called. 

4. New Feed Selection
- ensures content changes when a new feed is loaded: stores data from initial loadFeed call and compares to second loadFeed
call to check they are different.