const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");
//const { use } = require("../routes");
const auth = require('../auth')
const uri = "mongodb+srv://carlitos206:SharedFakePass123@cluster0.lshmeod.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri);

const database_seaHack = "seaHack";
const users_collection = "users";
module.exports = {};


// create user account
module.exports.createUser = async (user) => {
  try {
    await client.connect();
    const db = client.db(database_seaHack);
    const collection = db.collection(users_collection);
    let emailExist = await collection.findOne({ email: user.email });
    let usernameExist = await collection.findOne({ username: user.username });
    console.log(user)
    if(usernameExist && emailExist){
      return { Error: "Username already exists and Email already exists"};
    }
    if (emailExist) {
      return { Error: "Email already exists"};
    } 
    if(usernameExist){
      return { Error: "Username already exists"};
    }
    else {
      let hashedPassword = await bcrypt.hash(user.password, 10);
      let vettedUser = {
        username: user.username,
        email: user.email,
        password: hashedPassword,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender
      };
      const result = await collection.insertOne(vettedUser);
      return {
        newObjectId: result.insertedId,
        message: `User created! ID: ${result.insertedId}`
      };
    }
  } catch (err) {
    return { Error: "Failed to Create User" };
  } finally {
    await client.close();
  }
};

//user login
module.exports.signIn = async (user) => {
  try {
    await client.connect();
    const db = client.db(database_seaHack);
    const collection = db.collection(users_collection);
    const userExistEmail = await collection.findOne({
      email: user.usernameOrEmail,
    });
    const userExistUsername = await collection.findOne({
      username: user.usernameOrEmail,
    });
    if (userExistEmail) {
      if (await bcrypt.compare(user.password, userExistEmail.password)) {
        let token = auth.createToken(user.password)
        return {
          username: userExistEmail.username,
          email: userExistEmail.email,
          token: token
        };
      }
    }
    if (userExistUsername) {
      if (await bcrypt.compare(user.password, userExistUsername.password)) {
        return {
          username: userExistUsername.username,
          email: userExistUsername.email,
        };
      }
    }else{
      return {error: "Failed to locate user" }
    }
  } catch (err) {
    return { error: "Failed to locate user" };
  } finally {
    await client.close();
  }
};