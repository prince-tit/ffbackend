import mongoose, { Schema } from "mongoose";
import { GroupTypes } from "../types/GroupTypes";
import UserRoleEnum from "../enums/UserRoleEnum";

const GroupSchema: Schema = new Schema({
    groupName: {
        type: String,
        required: true,
    },
    groupLogo: {
        type: String,
        default: ""
    },
    groupBio: {
        type: String,
        default: "fairyfunds"
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    funds: {
        type: Number,
        default: 0,
    },
    users: [
        {
            role: {
                type: String,
                default: UserRoleEnum.Member,
            },
            userID: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            credit: {
                type: Number,
                default: 0
            }
        }
    ],
    items: [
        {
            addedBy: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            broughtBy: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            message: {
                type: String,
            },
            title: {
                type: String,
                required: true,
            },
            totalPrice: {
                type: Number,
                required: true,
            },
            includedMembers: [
                {
                    userID: {
                        type: Schema.Types.ObjectId,
                        required: true
                    },
                    deductAmount: {
                        type: Number,
                        default: 0,
                    }
                }
            ],
            product: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    price: {
                        type: Number,
                        required: true,
                    },
                    quantity: {
                        type: String,
                        default: "",
                        required: true
                    }
                }
            ],
            date: {
                type: Date,
                default: new Date()
            },
            createdAt: {
                type: Date,
                default: new Date()
            }
        }
    ],
    updatedAt: {
        select: false,
        type: Date,
        default: new Date()
    }
})


GroupSchema.pre<any>('findOneAndUpdate', async function (next: any) {
    try {
        console.log("hii there")
        console.log(this.schema.obj)
        const totalCredits:any = this.schema.obj.users.reduce((total:any, user: any) => total + user.credit, 0);
        this.funds = totalCredits;
        next();
    } catch (error) {
        // console.error(error);
        next(error);
    }
});
const Group = mongoose.model<GroupTypes>("Group", GroupSchema);
export default Group;