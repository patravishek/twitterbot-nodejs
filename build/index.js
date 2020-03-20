"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_twitter_1 = require("ts-twitter");
require("dotenv").config();
let twitter = new ts_twitter_1.Twitter(process.env.TWITTER_CONSUMER_KEY, process.env.TWITTER_CONSUMER_SECRET);
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
