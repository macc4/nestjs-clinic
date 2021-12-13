import { ConsoleLogger } from '@nestjs/common';
import * as AWS from 'aws-sdk';

export class Logger extends ConsoleLogger {
  private nextSequenceToken: any;
  private eventsQueue: any[];
  private interval: any;

  constructor() {
    super();

    this.nextSequenceToken = null;
    this.eventsQueue = [];
    this.interval = null;
  }
  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }

  async error(message: any, ...optionalParams: any[]) {
    await this.cloudWatchLog(message);

    super.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    super.debug(message, ...optionalParams);
  }

  async cloudWatchLog(message) {
    if (this.nextSequenceToken == null) {
      let res = await this.cloudWatchDescribeLogStreams('clinic/test');

      this.nextSequenceToken = res.logStreams[0].uploadSequenceToken;
    }

    this.eventsQueue.push({
      message: message,
      timestamp: new Date().getTime(),
    });

    await this.cloudWatchStartLogQueue();
  }

  cloudWatchDescribeLogStreams(logGroupName: string) {
    const cloudWatchLogs = new AWS.CloudWatchLogs({ region: 'eu-north-1' });

    const params = {
      logGroupName,
    };

    return cloudWatchLogs.describeLogStreams(params).promise();
  }

  cloudWatchPutLogEvents(
    logEvents: any,
    logGroupName: string,
    logStreamName: string,
    sequenceToken: string,
  ) {
    const cloudWatchLogs = new AWS.CloudWatchLogs({ region: 'eu-north-1' });

    const params = {
      logEvents,
      logGroupName,
      logStreamName,
      sequenceToken,
    };

    return cloudWatchLogs.putLogEvents(params).promise();
  }

  async cloudWatchStartLogQueue() {
    if (this.interval == null) {
      this.interval = setInterval(async () => {
        if (this.eventsQueue.length == 0) {
          clearInterval(this.interval);
          this.interval = null;

          return;
        }

        let event = this.eventsQueue.shift();

        try {
          let res = await this.cloudWatchPutLogEvents(
            [event],
            'clinic/test',
            'prod',
            this.nextSequenceToken,
          );
          this.nextSequenceToken = res.nextSequenceToken; // store the new sequence token
        } catch (error) {
          console.log(error);
        }
      }, 1000);
    }
  }
}
