const { UserDaoMongo} = require ('../dao/mongo/userDaoMongo.js');
const { UserRepository} = require ('../repositories/userRepository.js');

const userService = new UserRepository(new UserDaoMongo())
//faltan los otros


module.exports = {
    userService
}