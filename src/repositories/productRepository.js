const { ClassRepository } = require('./classRepository.js')

class ProductRepository extends ClassRepository {
    constructor(dao) {
        super(dao);
    }
}

module.exports = { ProductRepository };