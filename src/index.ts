import Twit from 'twit';
//Setting Up for environment variables
require("dotenv").config();

let twitter = new Twit({
    consumer_key:         <string>process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:      <string>process.env.TWITTER_CONSUMER_SECRET,
    access_token:         <string>process.env.TOKEN,
    access_token_secret:  <string>process.env.TOKEN_SECRET,
});
 
const twitterOptions: Twit.Params = {
    q: "#100DaysOfCode #typescript #javascript",
    count: 10,
    result_type: 'recent',
    lang:"en"
};

setInterval(()=>{
    twitter.get('search/tweets', twitterOptions, (err: Error, data: any) => {
        if(!err){
            for(let i=0; i< data.statuses.length; i++){
                let retweetId = data.statuses[i].id_str;
                let tweetInfo = data.statuses[i].text;
                let retweetCount = data.statuses[i].retweet_count;
                let favoriteCount = data.statuses[i].favorite_count;
                console.info(`Received tweet Id: ${retweetId} || Message: ${tweetInfo}`);
                //Checking if the tweet has been retweeted ever
                if((retweetCount>2) || (favoriteCount>1)){
                    //Retweeting a tweet.
                    console.info(`Retweet Id: ${retweetId} || Message: ${tweetInfo}`);
                    twitter.post('statuses/retweet/'+retweetId,{},
                    (err: Error, data: any)=>{
                        if(!err){
                            console.info(`Successfully Reply Posted for the tweet id: ${retweetId}`);
                        }else{
                            console.error(`An error has occurred!, ${err}`);
                        }
                    });

                    //Commeting on a tweet
                    console.info(`Commenting Id ${retweetId}`);
                    let commentInfo : Twit.Params = {
                        in_reply_to_status_id: data.statuses[i].id_str,
                        status: `@${data.statuses[i].user.screen_name} Keep learning, For any queries feel free to DM me.`
                    };

                    twitter.post('statuses/update/', commentInfo, (err: Error, data: any) => {
                        if(!err){
                            console.info(`Successfully Reply Posted for the tweet id: ${retweetId}`);
                        }else{
                            console.error(`An error has occurred!, ${err}`);
                        }
                    });
                }
            }
        }else{
            console.error(err);
        }
    });
}, 1000*20);

