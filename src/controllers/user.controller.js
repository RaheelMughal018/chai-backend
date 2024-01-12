import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/apiError.js";
import {User} from "../models/user.model.js"
import {uploadFileOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exist?: username || email
  // check for images, check for avatar
  // upload to cloudinary, check avatar in cloudinary
  //create user object - create entry in db
  // remove password and refresh token field  from response
  // check for user creation
  // return res

  const { fullName, email, password, username } = req.body;

  if (
    [fullName, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required!");
  }

  const exsistUser = User.findOne({
    $or : [{ username },{ email }]
  });
  if(exsistUser){
    throw new ApiError(409,"User already exsist!")
  }

  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path

  if(!avatarLocalPath) {
    throw new ApiError(400,"Avatar file is required!")
  }

  const avatar = await uploadFileOnCloudinary(avatarLocalPath);
  const coverImage = await uploadFileOnCloudinary(coverImageLocalPath);

  if(!avatar){
    throw new ApiError(400,"Avatar file is required!")
  }

  const user =  await User.create({
    username : username.toLowerCase(),
    avatar : avatar.url,
    coverImage : coverImage?.url || "",
    email,
    password,
    fullName  
  });
  console.log("🚀 ~ registerUser ~ user:", user);

  const createdUser = User.findById(user._id).select(
    "-password -refreshToken"
  );

  if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering user");
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully!")
  )


});
export { registerUser }; 
