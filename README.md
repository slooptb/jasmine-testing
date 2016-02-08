# Feed Reader Testing with Jasmine

This project was cloned from [here](http://github.com/udacity/frontend-nanodegree-feedreader) with instructions to add
Jasmine test suites.

Tests were written on a pre-existing application to test underlying business logic and DOM manipulation and are outlined
in detail below.

## Getting Started

Everything needed to run is included in this repo or served via 3rd party (see index.html). Dependencies/includes: jQuery, 
Jasmine, Handlebars and Google Feeds API.

- Open index.html in a web browser to run the app and see test results.
- Jasmine tests are located in the jasmine folder here: jasmine/spec/feedreader.js
- App javascript can be found here: js/app.js

## Tests

RSS Feeds
- are defined: tests to see if the allFeeds variable has been defined and is not empty.
- have a URL defined and is not empty: iterates through allFeeds array and checks each object for a url to be defined and not empty.
- have a name defined and is not empty: iterates through allFeeds array and checks each object for a name to be defined and not empty.

The Menu
- is hidden by default: checks the .menu-hidden class is applied to the body.
- changes visibility when clicked: checks the .menu-hidden class is removed/added when clicking the menu button, simulating 
opening/closing the menu.

Menu feed list
- displays the same number of feeds in menu: checks that the allFeeds array length is the same as the number of feed
items that populate the menu.
- hides menu on feed name click: checks that the menu is closed when selecting a feed.

Initial Entries
- are generated after loadFeed() has completed: checks that at least one .entry element within the .feed container after the
loadFeed() function has been called. 

New Feed Selection
- ensures content changes when a new feed is loaded: stores data from initial loadFeed call and compares to second loadFeed
call to check they are different.