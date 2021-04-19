import { Express, Request, Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
const express = require('express');
import { User } from './Entities/User';
import { Helloresolver } from './Query/Resolver';

const main: () => Promise<void> = async () => {
  const app: Express = express();
  createConnection({
    type: 'postgres',
    username: 'postgres',
    host: 'localhost',
    port: 5432,
    password: 'helloworld',
    database: 'postgres',
    synchronize: true,
    logging: true,
    entities: [User],
  });
  app.get('/', (_: Request, res: Response) => {
    User.find().then((data) => {
      res.json(data);
    });
  });

  app.post('/', (_: Request, res: Response) => {
    User.insert({ firstName: 'mohd', lastName: 'Anzar', age: 21 });
    res.end();
  });

  const schema: GraphQLSchema | void = await buildSchema({
    resolvers: [Helloresolver],
  });

  const apolloserver: ApolloServer = new ApolloServer({ schema });
  apolloserver.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('sever started on http://localhost:4000/graphql');
  });
};

main();
