import Router from 'express';
import { UserLogin, UserSignup } from '../controller/UserController';


const UserRoute = Router();

// user login signup route
UserRoute.post("/login", UserLogin)
UserRoute.post("/signup", UserSignup)

// update profile route
// User.put("/update" , verifyToken ,UpdateProfile)

// fetch user profile route
// User.get("/" , verifyToken ,FetchAccount)

export default UserRoute