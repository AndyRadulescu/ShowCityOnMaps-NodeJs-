"use strict";

const continent = require('../models').continent;

exports.list = function (req, res, next) {
    continent.findAll({
        where: req.query,
        include: [{ all: true }]
    }).then(continent => {
        res.jsonp(continent);
    }).catch(next);
};

exports.findById = function (req, res) {
    let id = req.params.id;
    continent.findById(id, {
        include: [{ all: true }]
    }).then(continent => {
        res.jsonp(continent);
    });
};