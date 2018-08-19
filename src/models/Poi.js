'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')

const logger = require('node-commons').logger

const PoiSchema = new Schema({
  poi_id: {type: String, index: true, required: true, unique: true},
  title: {type: String, required: true},
  location: {type: String, required: true},
  // location: {
  //   lat: {type: Number, required: true},
  //   lon: {type: Number, required: true},
  //   city: {type: String, required: true},
  //   country: {type: String, required: true}
  // },
  date: {type: Date, required: true},
  description: {type: String, required: true},
  relevant_links: [{type: String}],
  deleted: {type: Boolean, default: false, select: false}
},
  {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}}
)

PoiSchema.pre('validate', function (next) {
  if (this.isNew) {
    // generate event_id
    this.poi_id = shortid.generate()
  }
  next()
})

PoiSchema.post('save', function (doc) {
  logger.info('PoiSchema:' + doc._id + ' has been saved')
})

// specify the transform schema option
if (!PoiSchema.options.toJSON) PoiSchema.options.toJSON = {}
PoiSchema.options.toJSON.transform = function (doc, ret, options) {
  // remove the _id, __v of every document before returning the result
  delete ret._id
  delete ret.__v
  delete ret.deleted

  return ret
}

const PoiModel = mongoose.model('Poi', PoiSchema)

module.exports = PoiModel
