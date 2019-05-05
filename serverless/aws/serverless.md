## TIPs

- [Start](https://serverless.com/framework/docs/providers/aws/guide/quick-start/)
- [Deploy](https://serverless.com/framework/docs/providers/aws/guide/deploying/)
- [AWS credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
- [Tips](https://serverless.com/framework/docs/providers/aws/guide/workflow/)
- [Full serverless.yml](https://serverless.com/framework/docs/providers/aws/guide/serverless.yml/)

## Deploy, test and diagnose your service

1. **Deploy the Service**

Use this when you have made changes to your Functions, Events or Resources in `serverless.yml` or you simply want to deploy all changes within your Service at the same time.

```bash
serverless deploy
# deploy and show logs
serverless deploy -v
# deploy with stage adn region
serverless deploy --stage prod --region us-east-1
```

2. **Deploy the Function**

Use this to quickly upload and overwrite your function code, allowing you to develop faster.

```bash
serverless deploy function -f hello
```

3. **Invoke the Function**

Invokes a Function and returns logs.

```bash
serverless invoke -f hello -l
```

4. **Fetch the Function Logs**

Open up a separate tab in your console, set your [Provider Credentials](./credentials.md) and stream all logs for a specific Function using this command.

```bash
serverless logs -f hello -t
```

5. **Local development configuration with Serverless offline plugin**

Install the serverless-offline plugin:

```bash
npm install --save-dev serverless-offline
```

Then add the plugin to your serverless.yml:

```bash
plugins:
  - serverless-offline
```

Then, start the serverless-offline server:

```bash
sls offline start
```

## Cleanup

If at any point, you no longer need your service, you can run the following command to remove the Functions, Events and Resources that were created, and ensure that you don't incur any unexpected charges.

```bash
serverless remove
```
