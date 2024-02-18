const zod = require('zod')

const userSchema = zod.object({
    username:zod.string().min(3).max(30),
    password:zod.string().min(3).max(30),
    firstname:zod.string().max(30),
    lastname:zod.string().max(30)
})

module.exports = {userSchema}