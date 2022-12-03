# lambdaf

Best practice for building AWS Lambda functions.

## Example
```ts
// Set up your request.
// This type must contains `body`, `queryStringParameters`, `pathParameters`
// to use `apiGatewayProxyLambda`.
type Request = {
  body: {
    name: string;
  };
  queryStringParameters: never;
  pathParameters: never;
};

// Set up your response.
// This type must contains `statusCode`, `body`
// to use `apiGatewayProxyLambda`.
type Response = {
  statusCode: 200;
  body: {
    message: string;
  };
};

// Set up your dependencies.
// you can access whatever you put in the context
// while you write an usecase.
const context = {
  greet: (name: string) => `Hello, ${name}!`,
};

// Create a handler with your usecase and context.
const handler = apiGatewayProxyLambda<Request, Response, typeof context>(({ body }, context) => {
  return response(200, {
    message: context.greet(body.name),
  });
}, context);

// Set up an event for test.
const event = {
  body: JSON.stringify({
    name: "Jinsu",
  }),
};

// Execute the handler for test.
const result = await handler(event as any, {} as any, () => null);

// The body in the result should contain a message `Hello, Jinsu!`.
expect(result?.body).toBe(
  JSON.stringify({
    message: "Hello, Jinsu!",
  }),
);
```