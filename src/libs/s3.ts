import { S3 } from "aws-sdk";

const offlineOptions: S3.ClientConfiguration = {
  s3ForcePathStyle: true,
  accessKeyId: "S3RVER",
  secretAccessKey: "S3RVER",
  endpoint: "http://localhost:4387",
};

export const s3 = !!process.env["IS_OFFLINE"]
  ? new S3({ ...offlineOptions, region: "ap-northeast-1" })
  : new S3({ region: "ap-northeast-1" });
