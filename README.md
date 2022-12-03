# lambdaf

Best practice for building AWS Lambda functions.

## Get started
```sh
npm i --save lambdaf
```

## Example
```ts
// Set up your request.
// This type must contain `body`, `queryStringParameters`, `pathParameters`
// to use `apiGatewayProxyLambda`.
type Request = {
  body: {
    name: string;
  };
  queryStringParameters: never;
  pathParameters: never;
};

// Set up your response.
// This type must contain `statusCode`, `body`
// to use `apiGatewayProxyLambda`.
type Response = {
  statusCode: 200;
  body: {
    message: string;
  };
};

// Set up your dependencies.
// You can access whatever you've put into your context
// when you write an usecase.
const context = {
  greet: (name: string) => `Hello, ${name}!`,
};

// Simply create a AWS Lambda handler with your usecase and context.
const handler = apiGatewayProxyLambda<Request, Response, typeof context>(({ body }, context) => {
  return response(200, {
    message: context.greet(body.name),
  });
}, context);

// Set up an event for testing.
const event = {
  body: JSON.stringify({
    name: "Jinsu",
  }),
};

// Execute the handler for testing.
const result = await handler(event as any, {} as any, () => null);

// The body in the result should contain a message
// that says `Hello, Jinsu!`.
expect(result?.body).toBe(
  JSON.stringify({
    message: "Hello, Jinsu!",
  }),
);
```