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
    q: "#100DaysOfCode",
    count: 4,
    result_type: 'recent',
    lang:"en"
};



setInterval(()=>{
    twitter.get('search/tweets', twitterOptions, (err: Error, data: any) => {
        if(!err){
            for(let i=0; i< data.statuses.length; i++){
                let retweetId = data.statuses[i].id_str;
                console.info(retweetId);
                twitter.post('statuses/retweet/'+retweetId,{},
                (err: Error, data: any)=>{
                    if(!err){
                        console.info('Success!, the bot has successfully posted the data')
                    }else{
                        console.error('An error has occurred!',err);
                    }
                });
            }
        }else{
            console.error(err);
        }
    });
}, 1000*20);

