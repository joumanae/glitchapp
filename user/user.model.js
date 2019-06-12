const mongoose = require('mongoose')
const shiftSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 8
    }, 
    start_time: {
      type: Date, 
      required: true, 
      trim: true
      
    }, 
    end_time: {
      type: Date, 
      required: true, 
      trim: true 
      
    }, 
    createdBy:{
      type: mongoose.SchemaTypes.ObjectId,
      required: true, 
      ref: 'user'
    }
  },
  { timestamps: true }
)
shiftSchema.index({user: 1, start_date: 1, end_date: 1}, {unique: true})
const Shift = mongoose.model('shift', shiftSchema)
module.exports = Shift 
 