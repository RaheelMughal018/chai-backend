import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/apiError.js";

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
});
export { registerUser };
