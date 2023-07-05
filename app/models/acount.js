import { Schema, model, models } from 'mongoose';

const AccountSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    type: String,
    provider: String,
    providerAccountId: String,
    refresh_token: String,
    access_token: String,
    expires_at: Number,
    token_type: String,
    scope: String,
    id_token: String,
    session_state: String
  });

const Account = models.Account || model('Account', AccountSchema);

export default Account;