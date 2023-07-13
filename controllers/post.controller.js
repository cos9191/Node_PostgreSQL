const db = require('../db')
class PostController {
    async createPost(req, res) {
        const {title, content, userId} = req.body
        const newPost = await db.query(
            'INSERT INTO post (title, content, user_id) values($1, $2, $3) RETURNING *',
            [title, content, userId]
        )
        res.json(newPost.rows)
    }
    async getPostsByUser(req, res) {
        const id = req.query.id
        const posts = await db.query('SELECT * FROM post where user_id = $1', [id])
        res.json(posts.rows)
    }
    async getOnePost(req, res) {
        const id = req.params.id
        const user = await db.query('SELECT * FROM person where id = $1', [id])
        res.json(user.rows[0])
    }
    async updatePost(req, res) {
        const {id, name, surname} = req.body
        const user = await db.query(
            'UPDATE person set name = $1, surname = $2 where id = $3 RETURNING *',
            [name, surname, id]
        )
        res.json(user.rows[0])
    }
    async deletePost(req, res) {
        const id = req.params.id
        const user = await db.query('DELETE FROM person where id = $1', [id])
        res.json(`user ${id} was deleted`)
    }
}

module.exports = new PostController()
