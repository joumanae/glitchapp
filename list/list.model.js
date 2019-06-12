const mongoose = require('mongoose')

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
      trim: true
    }, 
    description: String, 
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId, 
      ref: 'user',
      required: true
    }
  }, 
  {timestamps: true}
)

listSchema.index({ user: 1, name: 1 }, { unique: true })

const List = mongoose.model('list', listSchema); 
module.exports = List

