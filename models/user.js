const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "NORMAL",
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function () {
  try {
    const user = this;
    if (!user.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hexcode = createHmac("sha512", salt)
      .update(this.password)
      .digest("hex");
    this.salt = salt;
    this.password = hexcode;

    next();
  } catch (error) {
    console.log(error);
  }
});

userSchema.static("correctPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    // throw new Error("user not found..");
    return { msg: "invalid email." };
  }
  const salt = user.salt;
  const hexcode = createHmac("sha512", salt).update(password).digest("hex");

  return user.password === hexcode ? user : { msg: "incorrect password" };
});

const User = model("user", userSchema);

module.exports = {
  User,
};
