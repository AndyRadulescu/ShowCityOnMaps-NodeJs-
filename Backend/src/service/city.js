"use strict";

const country = require('../models').country;
const city = require('../models').city;

exports.list = function (req, res, next) {
    console.log('ceva');

    city.findAll({
        where: req.query,
        include: [{ all: true }]
    }).then(city => {
        res.jsonp(city);
    }).catch(next);
};

exports.findById = function (req, res) {
    let id = req.params.id;
    console.log('ceva');
    city.findById(id).then(city => {
        res.jsonp(city);
    });
};

