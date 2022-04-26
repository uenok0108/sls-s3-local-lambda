# sls-s3-local-lambda
Sample sources of s3 trigger lambda with `serverless-offline` and `serverless-s3-local`.

# How to run
0. Set up your aws config in your local.
1. Execute `yarn offline:start`.
2. Put a file to local s3 bucket via aws cli.  
Here is the example of command.
```
aws --endpoint http://localhost:4387 s3 cp ./test.csv s3://test-bucket
```