import mongoose, { Document } from 'mongoose';

interface Credential {
    credentialID: string;
    publicKey: string;
    counter: number;
}

interface IUser extends Document {
    id: string;
    credentials: Credential[];
}

interface UserModel extends mongoose.Model<IUser> {
    findByCredentialID(credentialID: string): Promise<IUser | null>;
}

const credentialSchema = new mongoose.Schema({
    credentialID: String,
    publicKey: String,  // base64 encoded string
    counter: Number,
});

const userSchema = new mongoose.Schema({
    id: String,
    credentials: [credentialSchema]
});

userSchema.statics.findByCredentialID = function(credentialID: string) {
    return this.findOne({ 'credentials.credentialID': credentialID });
};

export const User = mongoose.model<IUser, UserModel>('User', userSchema);