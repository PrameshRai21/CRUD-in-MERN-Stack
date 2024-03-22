import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";

//creating user
const createUser = asyncHandler(async(req, res) => {

    const {firstname, lastname, username, email, password} = req.body;

    if(
        [firstname, lastname, username, email, password].some((field)=>field?.trim() == "")
    ){
        throw new ApiError(400, "All fields are required compulsory.")
    }

    const user = await User.create({
        firstname,
        lastname,
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password")
    if(!createdUser){
        throw new ApiError(400, "Something went wrong while creating user.")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "User created successfully."))
})

//getting all user
const getAllUser = asyncHandler(async(_, res) => {

    try {
        const user = await User.find();

        if(!user){
        throw new ApiError(400, "No users list.")
        }

        return res
        .status(200)
        .json(new ApiResponse(200, user, "All users data fetched successfully."))
    } 
    catch (error) {
        throw new ApiError(400, "No user found")
    }
})

//find one user by id
const findOneUserById = asyncHandler(async(req, res) =>{

    const _id = req.params.id;

    const user = await User.findById(_id);
    if(!user){
        throw new ApiError(400, "User not found");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched by id"))
})

//update user data
const updateUser = asyncHandler(async(req, res) => {

    const _id = req.params.id;
    const user = await User.findById(_id)
    if(!user){
        throw new ApiError(400, "User not found")
    }

    const {firstname, lastname, username, email} = req.body;
    if(
        [firstname, lastname, username, email].some((field)=>field?.trim() == "")
    ){
        throw new ApiError(400, "All fields are required.")
    }

    const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
            $set: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username
            }
        },
        {new: true}
    )

    return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "User data updated successfully."))
})

//delete user
const deleteUser = asyncHandler(async(req, res) => {
    
    const _id = req.params.id;
    const user = await User.findById(_id)
    if(!user){
        throw new ApiError(400, "User not found.")
    }
    
    await User.findByIdAndDelete(_id)

    return res
    .status(200)
    .json(200, "User deleted successfully.")
})

export {
    createUser,
    getAllUser,
    findOneUserById,
    updateUser,
    deleteUser
}
