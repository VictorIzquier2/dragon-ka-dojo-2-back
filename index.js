const {ApolloServer, gql} = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');
const jwt = require('jsonwebtoken');

// conectar a la base de datos de mongo 
conectarDB();

// servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => {
    const token = req.headers['authorization'] || '';
    if(token) {
      try {
        const user = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);
        return {
          user
        }
      }catch(err) {
        console.log('It was an error', err);
      }
    }
  }
});

// arrancar el servidor 
server
  .listen()
  .then(({url}) => {
    console.log(`Servidor listo en la URL ${url}`)
  }
);