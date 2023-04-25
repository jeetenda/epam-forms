import { Database } from '../config/db.config.js';

export class UserModel {
  /**
   * @description
   * the following method fetches all blogs from the database
   * @returns the array of blogs fetched from the database
   */
  static async getAllBlogs() {
    const query = 'SELECT * FROM blogs';

    const blogs = await Database.executeQuery(query);

    return blogs;
  }

  /**
   * @description
   * the following method fetches the blog corresponding to a particular id
   * @param {number} blogId the id of the blog
   * @returns the blog fetched from the database
   */
  static async getBlogById(blogId) {
    const query = 'SELECT * FROM blogs WHERE id = ?';
    const params = [blogId];

    const result = await Database.executeQuery(query, params);

    return result[0];
  }

  /**
   * @description
   * the following method creates a blog for a particular user
   * @param {string} title the title for the blog to be created
   * @param {string} description the description for the blog to be created
   * @param {number} userId the id of the user for whom the blog needs to be created
   * @returns the result of an sql insertion operation
   */
  static async createBlog(title, description, userId) {
    const query = 'INSERT INTO blogs SET ?';
    const params = { userId, title, description };

    const result = await Database.executeQuery(query, params);

    return result;
  }

  /**
   * @description
   * the following method updates the blog corresponding to a particular id
   * @param {object} targetObj the fields and their corresponding values of the blog to be updated
   * @param {number} blogId the id of the blog
   * @returns the blog updation result
   */
  static async updateBlog(targetObj, blogId) {
    let query = 'UPDATE blogs SET ';

    Object.entries(targetObj).forEach(([key, value], index) => {
      if (index === Object.keys(targetObj).length - 1) query += `${key} = '${value}' WHERE id = ?`;
      else query += `${key} = '${value}', `;
    });

    const params = [blogId];

    const result = await Database.executeQuery(query, params);

    return result;
  }

  /**
   * @description
   * the following method deletes a blog corresponding to a particular id
   * @param {number} blogId the id of the blog
   * @returns the blog deletion result
   */
  static async deleteBlog(blogId) {
    const query = 'DELETE FROM blogs WHERE id = ?';
    const params = [blogId];

    const result = await Database.executeQuery(query, params);

    return result;
  }
}
