## Description of the project

**Background:**

Imagine you are on a web application with lots of requests that are constantly hitting the database. Most of the data in your database is mutated only once a year, so you decide to implement an aggressive cache strategy. To address this problem you decide to implement a cache api that lives on its own realm.

**Description:**

In Typescript, please design and implement a cache application server that exposes 3

operations: GET, PUT, DELETE

The first will allow you to fetch an object from the cache, the second one allows you to put something into the cache and the third one to remove an element from the cache.

The machine where we can deploy the cache server running lives on our own isolated VPN and has a restriction that **does not allow us to scale to more than 2GB of memory per server**.

**Bonus:**

– Implement a cache api client that can improve the dev experience of using such a cache in a client application.

  

**Typescript Node Boilerplate:**

  

https://www.mohammadfaisal.dev/blog/create-nodejs-typescript-boilerplate

  
  

### Install the dependencies

Then go inside the project and install the dependencies

 
```sh

nvm use
yarn

```

  

### Test it out!

Run test cases.

make sure redis-server is running locally.  

```sh

yarn  test

```
And then run the application

  

```sh

yarn  dev

```

Go ahead and hit the following URL `http://localhost:3000/` and you should be greeted with the following response

  

```json

{ "message": "Hello World!" }

```