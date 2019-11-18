const { ApolloServer, gql } = require('apollo-server');

const TodoType = `
  type Todo {
    id: String,
    title: String
    completed: Boolean
  }
`;

const QueryType = `
  type Query {
    todos: [Todo]
  }
`;

const typeDefs = gql`
  ${TodoType}
  ${QueryType}
`;

const todos = [
  {
    id: 'id1',
    title: 'do homework',
    completed: false,
  },
  {
    id: 'id2',
    title: 'test apollo-server',
    completed: false,
  },
  {
    id: 'id3',
    title: 'be a good boy',
    completed: true,
  },
];

const resolvers = {
  Query: {
    todos: () => todos,
  },
};

const server = new ApolloServer({ typeDefs, resolvers, playground: true });

module.exports = async function() {
  await server.listen().then(({ url }) => {
    console.log('apollo server started successfully!');
  });
};
