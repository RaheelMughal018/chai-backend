// use high order function

const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

// another method

// const asyncHandler = (fn)=> async (req,res,next)=>{
//     try {
//       await  fn(req,res,next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             error:error.message||'Internal Server Error'
//         })
//     }
// }

export { asyncHandler };
