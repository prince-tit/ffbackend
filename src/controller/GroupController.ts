import { Request, Response } from "express";
import Group from "../Schema/Group";
import UserRoleEnum from "../enums/UserRoleEnum";

export const CreateNewGroup = async (req: Request, res: Response) => {
    try {
        const { groupName, groupBio, groupLogo, userID } = req.body;
        let group = await Group.create({
            createdBy: userID,
            groupLogo,
            groupName,
            groupBio,
            users: [
                {
                    role: UserRoleEnum.Admin,
                    userID,
                },
            ],
        })
        return res.status(200).send({
            success: true,
            message: "Group Created Succesfully",
            group
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const FetchMyGroup = async (req: Request, res: Response) => {
    try {
        const { userID } = req.body;
        let groups = await Group.find({ "users.userID": userID })
        return res.status(200).send({
            success: true,
            groups,
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const AddItemsInGroup = async (req: Request, res: Response) => {
    const { groupID, userID, broughtBy, message, title, includedMembers, product, totalPrice, date } = req.body
    // addedBy - userID
    // broughtBy - userid which is must be in group
    // message - optional
    // title - required
    // funds: calculated by pre "save";
    // includedMembers: [id-member];
    // product: [{name , price , quantity}];
    // totalPrice: number;
    // date: when product baught update from user;
    // createdAt: Date;
    try {
        let group;
        group = await Group.findOneAndUpdate(
            { _id: groupID },
            {
                $push: {
                    items: {
                        addedBy: userID, broughtBy, message, title, includedMembers, product, totalPrice, date
                    },
                }
            },
            { new: true }
        )
        if (!group) {
            return res.status(404).send({
                success: false,
                message: "Group Not Found",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Added Item Successfuly",
            group
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }

}