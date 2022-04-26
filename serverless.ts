import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import s3hook from '@functions/s3hook';

const serverlessConfiguration: AWS = {
  service: 'sls-s3-local-lambda',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-s3-local', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { hello, s3hook },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    s3: {
      host: 'localhost',
      port: 4387,
    }
  },
  resources: {
    Resources: {
      TestBucket: {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: 'test-bucket',
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
