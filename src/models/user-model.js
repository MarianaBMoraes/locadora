import db from "../config/db.js";
import bcrypt from "bcrypt";

const userSchema = new db.Schema({
  nome: {
    type: String,
    required: true,
  },
  birthday_date: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  permission: {
    type: String,
    enum: ["USU", "ADM"],
    required: true,
    default: "USU",
  },
  phones: [String],
  address: {
    type: Object,
    required: false,
  },
  house_number: {
    type: Number,
    required: false,
  },
});

userSchema.pre("save", async function () {
  // if (this.password !== this.confirmar_password) {} // Da pra deixar essa validação só no front

  // Monta o hash criptografado
  this.password = await bcrypt.hash(this.password, 10);
});

// Define um método para a classe
userSchema.methods.senhaCorreta = async function (senha) {
  return await bcrypt.compare(senha, this.password);
};

const User = db.model("User", userSchema);

export default User;
