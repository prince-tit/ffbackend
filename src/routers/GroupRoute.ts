import Router from 'express';
import { verifyToken } from '../middlewares/VerifyToken';
import { AddItemsInGroup, CreateNewGroup, FetchMyGroup } from '../controller/GroupController';

const GroupRoute = Router();

// create group
GroupRoute.post("/create", verifyToken, CreateNewGroup)

// fetch user group
GroupRoute.get("/fetchmygroup", verifyToken, FetchMyGroup)

// edit group 

// add product route
GroupRoute.post("/additem", verifyToken, AddItemsInGroup)
/**
{
  "groupID": "65847059267a3beee6422b21",
  "broughtBy": "6584163e303dbed93ef48a75",
  "message": "ok test message done",
  "title": "sheetal grocery",
  "includedMembers": [
    {
      "userID": "6584163e303dbed93ef48a75",
      "deductAmount": 12
    }
  ],
  "product": [
    {
      "name": "abc sabzi",
      "price": 120,
      "quantity": "1kg"
    },
    {
      "name": "abc sabzi 3",
      "price": 120,
      "quantity": "2kg"
    }
  ],
  "totalPrice": 120
} 

 */




// fetch group data route




export default GroupRoute