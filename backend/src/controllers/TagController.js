const prismaClient = require('../database/prismaClient')

module.exports = {
  async index(req, res) {
    const response = await prismaClient.tags.findMany()

    return res.json(response)
  }
}