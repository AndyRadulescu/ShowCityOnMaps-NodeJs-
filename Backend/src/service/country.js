"use strict";

const country = require('../models').country;

exports.list = function (req, res, next) {
    country.findAll({
        where: req.query,
        include: [{ all: true }]
    }).then(country => {
        res.jsonp(country);
    }).catch(next);
};

exports.findById = function (req, res) {
    let id = req.params.id;
    country.findById(id, {
        include: [{ all: true }]
    }).then(country => {
        res.jsonp(country);
    });
};