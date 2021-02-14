const SQL = require('sequelize');

module.exports = {
  createStore: () => {
    const db = new SQL({
      dialect: 'sqlite',
      storage: './db.sqlite',
    });

    const users = db.define('user', {
      email: {
        type: SQL.STRING,
        primaryKey: true
      },
      password: SQL.STRING,
      token: SQL.STRING,
      createdAt: SQL.DATE,
      updatedAt: SQL.DATE,
    });

    const posts = db.define('post', {
      id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: SQL.STRING,
      content: SQL.STRING,
      image: SQL.STRING,
      createdAt: SQL.DATE,
      updatedAt: SQL.DATE,
    });

    const comments = db.define('comment', {
      id: {
        type: SQL.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      postId: SQL.INTEGER,
      content: SQL.STRING,
      createdAt: SQL.DATE,
      updatedAt: SQL.DATE,
    });

    return { users, posts, comments };
  }
};
