var exports = {};

exports.gpCalc = function(iLvl, quality){
    return Math.round(0.483*Math.pow(2,(iLvl/26)+(quality-4)));
};

module.exports = exports;
