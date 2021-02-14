const { DataSource } = require('apollo-datasource');

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async register(email, password) {
    const result = await this.store.users.create({ email, password });

    return !!result;
  }

  async authenticate(email, password) {
    const token = Math.random().toString(36).substr(2);

    const result = await this.store.users.update({ token }, {
      where: {
        email,
        password
      }
    });

    if (result && result[0]) {
      return token;
    }
    else {
      return '';
    }
  }
}

module.exports = UserAPI;
