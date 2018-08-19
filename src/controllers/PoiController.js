/*
 * Poi controller responsible for adding poi's
 */
const commons = require('node-commons')

// COMMONS
const logger = commons.logger

// DATA_PROVIDERS
const Poi = require('../models/Poi')

function PoiController () {

}

/**
 * Checks if a user is authorized to execute this request
 * @param {obj} poiObj
 * @param next
 */
PoiController.prototype.create = function (poiObj, next) {
  const poiModel = new Poi(poiObj)
  poiModel.save(function (error, result) {
    if (error) { logger.error(error) }
    return next(error)
  })
}

module.exports = new PoiController()
