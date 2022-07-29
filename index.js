import { ApolloServer, UserInputError, gql } from 'apollo-server'
import { v1 as uuid } from 'uuid'
import axios from 'axios'
import './db.js'
import person from './models/person.js'

const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
  }
`

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      // Falta filtro
      return Person.find({})
    },
    findPerson: (root, args) => {
      const { name } = args
      return Person.findOne({ name })
    }
  },

  Mutation: {
    addPerson: (root, args) => {
      if (persons.find((p) => p.name === args.name)) {
        throw new UserInputError('Name must be unique', {
          invalidArgs: args.name
        })
      }
      //  const {name, phone, street, city} = args
      const person = { ...args, id: uuid() }
      persons.push(person) // Update database with a new person
      return person
    },
    editNumber: (root, args) => {
      const personIndex = persons.findIndex((p) => p.name === args.name)
      if (!personIndex === -1) return null

      const person = persons[personIndex]

      const updatedPerson = { ...person, phone: args.phone }
      persons[personIndex] = updatedPerson

      return updatedPerson
    }
  },

  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
