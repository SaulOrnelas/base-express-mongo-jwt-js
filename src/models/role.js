import { Schema, model } from "mongoose";

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'Role is required'],
  },
})

export default model('Role', RoleSchema)
