class ClassRepository {
    constructor(dao) {
        this.dao = dao
    }
    getItems = async () => await this.dao.getAll()
    getItem = async filter => await this.dao.getBy(filter)
    createItem = async newItem => await this.dao.create(newItem)
    updateItem = async (id, itemUpdate) => await this.dao.update(id, itemUpdate)
    deleteItem = async id => await this.dao.delete(id)
}

module.exports = {
    ClassRepository
}