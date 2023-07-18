import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import * as api from 'aws-cdk-lib/aws-apigateway';

export default class WebHook extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // The code that defines your stack goes here
    // eslint-disable-next-line no-unused-vars
    const githubWebhook = new lambda.NodejsFunction(this, 'githubWebhook', {
      memorySize: 1024,
      entry: '././src/webhook-lambda/src/index.js',
      timeout: Duration.minutes(5),
      environment: {
       
      }
    });

    // eslint-disable-next-line no-unused-vars
    const apiWebhook = new api.RestApi(this, 'github-app-webhook-api', {
      description: 'GitHub enpoint for webhook events',
      deployOptions: {
        stageName: 'gh-webhook'
      }
    });

    apiWebhook.root
      .addResource('commit')
      .addMethod('POST', new api.LambdaIntegration(githubWebhook));
  }
}