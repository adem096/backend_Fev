const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        match: [
          /^(?=.*[a-zA-Z]{5,})[a-zA-Z0-9]*$/,
          "Username must contain at least 5 alphabetical characters and can include numbers"
        ]
      },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.",
      ],
    },
    role: {
      type: String,
      enum: ["admin", "client", "infi"],
    },
    user_image: { type: String, require: false, default: "client.png" },
    age: {type : Number },
    count: {type : Number, default:'0'},
    jobOffers : [{ type: mongoose.Schema.Types.ObjectId, ref: "JobOffer" }], 
    candidatures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidature" }],
    /*cv: {
      data: Buffer, // Stocke le fichier PDF sous forme de buffer
      contentType: String // Stocke le type MIME du fichier (ex: 'application/pdf')
    }*/
   experience : {type: String},
   etat: Boolean,
   ban: Boolean
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    const user = this;
    user.password = await bcrypt.hash(user.password, salt);
    user.etat = false ;
    user.ban = true ;
    user.count = user.count + 1;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.post("save", async function (req, res, next) {
  console.log("new user was created & saved successfully");
  next();
});

userSchema.statics.login = async function (email, password) {
  //console.log(email, password);
  const user = await this.findOne({ email });
  //console.log(user)
  if (user) {
    const auth = await bcrypt.compare(password,user.password);
    //console.log(auth)
    if (auth) {
      // if (user.etat === true) {
      //   if (user.ban === false) {
          return user;
      //   } else {
      //     throw new Error("ban");
      //   }
      // } else {
      //   throw new Error("compte desactive ");
      // }
    } else {
      throw new Error("password invalid"); 
    }
  } else {
    throw new Error("email not found");
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;