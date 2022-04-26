import { S3Handler } from "aws-lambda";
import { s3 } from "@libs/s3";
import { parse } from "fast-csv";

export const main: S3Handler = async (event, context) => {
  console.log(JSON.stringify(event));
  console.log(JSON.stringify(context));

  const readStream = s3
    .getObject({
      Bucket: event.Records[0].s3.bucket.name,
      Key: event.Records[0].s3.object.key,
    })
    .createReadStream();
  readStream.pipe(parse({ headers: true })).on("data", (row) => {
    console.log(row);
  });
};
