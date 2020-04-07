var AWS = require('aws-sdk');
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, context, callback) => {
  const body = event.queryStringParameters;
  if (!body.username) callback(Error('You must include a username.'));
  const dynamoTableName = 'tst-demo-ingest';
  const params = {
    TableName: dynamoTableName,
    Item: {
      username: { S: body.username },
      password: { S: 'password' },
    },
    ConditionExpression: 'attribute_not_exists(username)',
  };
  ddb.putItem(params, function (err, data) {
    if (err) {
      console.log('Error', err);
      callback(null, {
        body: JSON.stringify({ success: false, message: 'Unable to add user' }),
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
    } else {
      console.log('Success', data);
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'User added: ' + body.username }),
      };
      callback(null, response);
    }
  });
};
