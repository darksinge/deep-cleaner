var utils = require('../utils');
var expect = require('chai').expect;


describe('utils.js', function () {

    describe("#isArray()", function() {
        it('should return true', function(done) {
            expect(utils.isArray([])).to.be.true;
            expect(utils.isArray(new Array())).to.be.true;
            done();
        });
        
        it('should return false', function(done) {
            expect(utils.isArray(null)).to.be.false;
            expect(utils.isArray(undefined)).to.be.false;
            expect(utils.isArray('this is not an array')).to.be.false;
            expect(utils.isArray(0)).to.be.false;
            expect(utils.isArray({})).to.be.false;
            done();
        });
    });

    describe("#isObject()", function() {
        it('should return true', function(done) {
            expect(utils.isObject({})).to.be.true;
            done();
        });

        it('should return false', function(done) {
            expect(utils.isObject(0)).to.be.false;
            expect(utils.isObject('asdf')).to.be.false;
            expect(utils.isObject([])).to.be.false;
            expect(utils.isObject(null)).to.be.false;
            expect(utils.isObject(undefined)).to.be.false;
            done();
        });
    });

    describe("#isString()", function() {
        it('should return true', function(done) {
            expect(utils.isString('')).to.be.true;
            expect(utils.isString('asdf')).to.be.true;
            done();
        });

        it('should return false', function(done) {
            expect(utils.isString({})).to.be.false;
            expect(utils.isString(0)).to.be.false;
            expect(utils.isString([])).to.be.false;
            expect(utils.isString(null)).to.be.false;
            expect(utils.isString(undefined)).to.be.false;
            done();
        });
    });

    describe("#isNull()", function() {
        it('should return true', function(done) {
            expect(utils.isNull(null)).to.be.true;
            done();
        });

        it('should return false', function(done) {
            expect(utils.isNull({})).to.be.false;
            expect(utils.isNull(0)).to.be.false;
            expect(utils.isNull([])).to.be.false;
            expect(utils.isNull('null')).to.be.false;
            expect(utils.isNull(undefined)).to.be.false;
            expect(utils.isNull()).to.be.false;
            done();
        });
    });

    describe("#isUndefined()", function() {
        it('should return true', function(done) {
            expect(utils.isUndefined(undefined)).to.be.true;
            expect(utils.isUndefined()).to.be.true;
            done();
        });

        it('should return false', function(done) {
            expect(utils.isUndefined({})).to.be.false;
            expect(utils.isUndefined(0)).to.be.false;
            expect(utils.isUndefined([])).to.be.false;
            expect(utils.isUndefined('null')).to.be.false;
            done();
        });
    });

    describe("#isEmpty()", function() {
        it('should return true', function(done) {
            expect(utils.isEmpty({})).to.be.true;
            expect(utils.isEmpty('')).to.be.true;
            expect(utils.isEmpty([])).to.be.true;
            expect(utils.isEmpty(null)).to.be.true;
            expect(utils.isEmpty(undefined)).to.be.true;
            expect(utils.isEmpty()).to.be.true;
            done();
        });

        it('should return false', function(done) {
            expect(utils.isEmpty(0)).to.be.false;
            expect(utils.isEmpty({foo: 'bar'})).to.be.false;
            expect(utils.isEmpty('a non-empty string')).to.be.false;
            expect(utils.isEmpty(['a', 'non', 'empty', 'array'])).to.be.false;
            done();
        });
    });

    describe('#isTruthyish()', function() {
        it('should return true', function(done) {
            expect(utils.isTruthyish(true)).to.be.true;
            expect(utils.isTruthyish('')).to.be.true;
            expect(utils.isTruthyish('asdf')).to.be.true;
            expect(utils.isTruthyish([])).to.be.true;
            expect(utils.isTruthyish({})).to.be.true;
            expect(utils.isTruthyish(0)).to.be.true;
            expect(utils.isTruthyish(9999)).to.be.true;
            done();
        });

        it('should return false', function(done) {
            expect(utils.isTruthyish(null)).to.be.false;
            expect(utils.isTruthyish(undefined)).to.be.false;
            expect(utils.isTruthyish(false)).to.be.false;
            done();
        });

    });

});