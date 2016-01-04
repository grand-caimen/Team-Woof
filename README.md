# City Quest #
  > **Looking for a new adventure while on vacation or even in your hometown?**  
  > Use the City Quest app to search for "quests" that align with your interests.  
  > Once you've chosen a quest, follow the quest's steps and have fun!  
  > **Have an awesome agenda for a day in the city that you would like to recommend to others?**  
  > Get creative and turn that agenda into a "quest" with the City Quest app.

## How to Get Started ##
  > Search your destination and complete a quest of your choosing.

## Customer Quote ##
  > "This made my trip to Miami super easy. Thanks son!" -Mom

# Technical Documentation

## Getting Started

```
$ git clone https://github.com/teamwoof/Team-Woof.git
$ cd Team-Woof
$ bower install
$ npm install
$ node server/server.js
```

Now visit [localhost:3000](http://localhost:3000/)

### Architecture Overview

The tech stack is MongoDB, Express, Angular, and Node.

The app starts with client/city/city.html as the root '/' view.
The controller in client/city/city.js will take in the user's desired city
and save it away in the service in client/services/questStorageService.js.
Next, the controller in city.js will redirect to the client/questList/questList.html.

The controller in client/questList/questList.js will, upon loading, call into
client/services/questStorageService.js to fetch all quests that are
associated with the selected city that was saved to questStorageService.js
by the previous page/controller.  By clicking on a quest title in
questList.html, the app will route to client/questView/questView.html while passing
the corresponding quest._id as a routing parameter to client/questView/questView.js.

The controller in questView.js will receive the quest ID as a routing
parameter and then use the service in questStorageService.js to fetch
that quest's information and then place a marker for each quest step location
on a Google Map.
