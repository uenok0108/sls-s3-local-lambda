import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: "test-bucket",
        event: "s3:*",
      },
    },
  ],
  iamRoleStatementsInherit: true,
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: ["s3:GetObject"],
      Resource: {
        "Fn::Join": ["", [{ "Fn::GetAtt": ["TestBucket", "Arn"] }, "/*"]],
      },
    },
  ],
};
