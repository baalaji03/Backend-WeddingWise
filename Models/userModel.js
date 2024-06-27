import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture:{
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
      }
}, { timestamps: true });

userSchema.pre('save', function(next) {
    if (!this.username) {
      next(new Error('Username cannot be null or empty'));
    } else {
      next();
    }
  });

const User = mongoose.model("User", userSchema);
export default User;
