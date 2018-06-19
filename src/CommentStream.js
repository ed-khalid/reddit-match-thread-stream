
import * as snoowrap from 'snoowrap';
import { EventEmitter } from 'events';

export class CommentStream {

    event;  
    snoowrapInstance;
    matchThread;

    constructor(matchThread, limit, depth , pollTime  ) {

        this.event = new EventEmitter();

        this.matchThread = matchThread;
        this.limit = limit;
        this.depth = depth;
        this.pollTime = pollTime;

        this.snoowrapInstance = new snoowrap({
            userAgent : 'Script/macOS' 
            ,clientId: 'T4lU2zT3g9xjPQ'
            ,clientSecret: 'ppo9lcUdI9sSuHDx5_Rq_v6XrNA'
            ,username: 'hawazin' 
            ,password: '3Erozepln2'
        });

    } 

    start() {
         let start = Date.now();

        let repeater = setInterval(() => { this.snoowrapInstance.getSubmission(this.matchThread)
        .expandReplies({limit:1, depth:1})
        .then(listing => listing.comments.forEach(comment => {
            var date = new Date(comment.created_utc*1000); 
            //if (comment.created_utc >=  start/1000) {
                this.event.emit('comment', 
                date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '\t' +  
                comment.body);
           // }
         }));
        }, this.pollTime);

        this.event.on('stop', () => clearInterval(repeater)); 

    }
}
