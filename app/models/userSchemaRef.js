import { Schema, model, models } from 'mongoose';

const UserSchemaRef = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    email: { type: String, unique: true },
    emailVerified: Date,
    image: String,
    hashedPassword: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    accounts: [{ type: Schema.Types.ObjectId, ref: 'Account' }]
  });

const UserRef = models.UserRef || model('UserRef', UserSchemaRef);

export default UserRef;