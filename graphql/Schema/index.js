const { buildSchema} = require ('graphql')
module.exports = buildSchema(`
  type Event{
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
      creator: User!
  }
  type Booking{
      _id: ID!
      event: Event!
      user: User!
      createdAt: String!
      updatedAt: String!
  }
  type User{
      _id: ID!
      username: String!
      password: String
      createdEvents: [Event!]
  }
  type AuthData{
      userId: ID!
      token: String!
      TokenExpiration: Int!
      userName: String!
  }
  input EventInput{
      title: String!
      description: String!
      price: Float!
      date: String!
  }
  input UserInput{
      name:String!
      username:String!
      email:String!
      password:String!
  }
  type RootQuery {
      events:[Event!]!
      users:[User!]!
      login(username: String!, password: String!): AuthData!
      bookings: [Booking!]!
      userinfo:User!
  }
  type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
      bookEvent(eventId: ID!): Booking!
      cancelBooking(bookingId: ID!): Event!
  }
  schema {
      query: RootQuery
      mutation: RootMutation
  }
  `)
