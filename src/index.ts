import { Twitter } from "ts-twitter";
require("dotenv").config();

let twitter = new Twitter(
  process.env.TWITTER_CONSUMER_KEY,
  process.env.TWITTER_CONSUMER_SECRET,
  process.env.TOKEN,
  process.env.TOKEN_SECRET
);
 
twitter.getUserTimeline({ screen_name: "gbico" })
  .then(tweets => {
    console.info(tweets);
});
 
twitter.searchTweets({ q: "@gbico" })
    .then(function (t) {
    console.info(t);
})
    .catch(function (e) {
    console.info(e);
});