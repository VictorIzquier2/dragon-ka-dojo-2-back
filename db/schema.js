const {gql} = require('apollo-server');

// Schema
const typeDefs = gql`

  type User {
    id: ID
    username: String
    email: String
    password: String
    karatekas: [Karateka]
    sensei: Sensei
    created: String
    expire: Int
  }

  type Karateka {
    id: ID
    name: String
    genre: String
    solvency: String
    nature: String
    level: String
    strength: Int
    dexterity: Int 
    stamina: Int 
    mana: Int 
    standing: Int 
    imageUrl: String 
    owner: User
  }

  type Sensei {
    id: ID
    name: String
    genre: String
    solvency: String
    nature: String
    level: String
    strength: Int
    dexterity: Int 
    stamina: Int 
    mana: Int 
    standing: Int 
    imageUrl: String 
    owner: User
  }

  type Master {
    id: ID
    name: String
    genre: String
    solvency: String
    nature: String
    level: String
    strength: Int
    dexterity: Int 
    stamina: Int 
    mana: Int 
    standing: Int 
    imageUrl: String 
    owner: User
  }


  type Token {
    token: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input AuthInput{
    email: String!
    password: String!
    expire: Int
  }

  input SenseiInput {
    name: String
    genre: String
    solvency: String
    nature: String
    level: String
    strength: Int
    dexterity: Int
    stamina: Int
    mana: Int
    standing: Int
    imageUrl: String
  }
  
  type Query {
    
    #Usuarios
    getUser(token: String!): User
    
    #Karatekas
    getNumberOfKaratekas: Int

    #Civilians
    getNumberOfCivilians: Int 

    #Masters
    getNumberOfMasters: Int
    getMaster: Master
    #Sensei 

  }
  
  type Mutation {
    
    # Usuarios
    newUser(input: UserInput): User
    authUser(input: AuthInput): Token
    newSensei(input: SenseiInput): Sensei

    # Sensei

    # Karateka
  }
 
`;
module.exports = typeDefs;