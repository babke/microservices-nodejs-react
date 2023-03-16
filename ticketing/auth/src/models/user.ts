import mongoose, { Mongoose } from 'mongoose';
import { Password } from '../services/password';

// an interface that describes the properties that
// are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes teh properties
// that the User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that the User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// using function keyword in the signature to be able to use 'this'
// modifier in the function body
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// function for creation of new users instead of directly
// using 'new' keyword to ensure type consistency
const buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User, buildUser };
