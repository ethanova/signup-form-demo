var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, context, callback) => {
  const body = event.queryStringParameters;
  if (!body.username) {
    callback(Error('You must include a username to check.'));
  }
  const dynamoTableName = 'tst-demo-ingest';
  const params = {
    Key: {
      username: { S: body.username },
    },
    TableName: dynamoTableName,
  };
  ddb.getItem(params, (err, data) => {
    if (err) {
      console.log(err);
      callback(Error(err));
    } else {
      console.log(data);
      const usernameExists = !!data.Item;
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ usernameExists: usernameExists }),
      });
    }
  });
};
