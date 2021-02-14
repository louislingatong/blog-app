const { DataSource } = require('apollo-datasource');

class PostAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async find(id) {
    const post = await this.store.posts.findByPk(id);

    return post ? post.dataValues : {};
  }

  async findAll(pagination = {}) {
    const posts = await this.store.posts.findAll({
      ...pagination,
      order: [
        [ 'id', 'DESC' ]
      ]
    });

    return posts ?  posts.map((post) => post.dataValues) : [];
  }

  async create(post) {
    if (!this.context.user) {
      return { id: -1 };
    }

    const result = await this.store.posts.create(post);

    if (result) {
      const post = await this.store.posts.findByPk(result.id);

      return post ? post.dataValues : {};
    }
    else {
      return { id: -1 };
    }
  }

  async update(post) {
    if (!this.context.user) {
      return { id: -1 };
    }

    const result = await this.store.posts.update(post, { where: { id: post.id } });

    if (result && result.length) {
      const post = await this.store.posts.findByPk(result[0]);

      return post ? post.dataValues : {};
    }
    else {
      return { id: -1 };
    }
  }

  async getComments(id) {
    const comments = await this.store.comments.findAll({
      where: { postId: id },
      order: [
        [ 'id', 'DESC' ]
      ]
    });

    return comments ? comments.map((comment) => comment.dataValues) : [];
  }

  async addComment(postId, content) {
    const result = await this.store.comments.create({ postId, content });

    if (result) {
      const comment = await this.store.comments.findByPk(result.id);

      return comment ? comment.dataValues : {};
    }
    else {
      return { id: -1 };
    }
  }
}

module.exports = PostAPI;
