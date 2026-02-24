import mongoose ,{Document, Schema} from "mongoose";

interface MagicLinkToken extends Document{
    email: string
    token: string
    expiresAt:Date
}

const MagicLinkTokenSchema = new Schema<MagicLinkToken>({
    email:{
        type:String,
        required: true
    },
    token:{
        type:String,
        required:true
    },
    expiresAt:{
        type:Date, 
        required:true
    }
});

export const MagicLinTokenModel = mongoose.model<MagicLinkToken>('MagicLinkToken', MagicLinkTokenSchema)