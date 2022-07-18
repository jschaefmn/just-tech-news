const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create user model
class User extends Model {}

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
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing
    underscored: true,
    // make it so the model name stays lowercase
    modelName: 'user',
    // turn on audto increment
    autoIncrement: true
  }
);

module.exports = User;