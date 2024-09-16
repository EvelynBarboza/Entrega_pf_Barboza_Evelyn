const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { required } = require('nodemon/lib/config');

const userCollection = 'users'

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cartID: {
        type: Schema.ObjectId,
        ref: 'Carts'
    },
    role: {
        type: String,
        enum: ['user', 'user_premium', 'admin'],
        default: 'user'
    }
});

// Middleware para hashear la contraseña antes de guardar C#
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        try {
            this.password = createHash(this.password);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

userSchema.plugin(mongoosePaginate)

const usersModel = model(userCollection, userSchema);

module.exports = {
    usersModel
}