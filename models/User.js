const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create user model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
 }

// define table columns and configuration
User.init(
  {
    id: {
      // use the special Sequelize DataTypes object to provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      //instruct that this is the primary key
      primaryKey: true,
      //turn on auto increment
      autoIncrement: true
    },
    // define username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // define email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be any duplicate email values in this table
      unique: true,
      // if allowNull is set to false, we can run the data through validators before creating the table data
      validate: {
        isEmail: true
      }
    },
    // define password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least 4 characters long
        len: [4]
      }
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing
    underscored: true,
    // make it so the model name stays lowercase
    modelName: 'user'
  }
);

module.exports = User;