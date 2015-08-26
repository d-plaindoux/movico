/*
 * Thicket
 * https://github.com/d-plaindoux/thicket
 *
 * Copyright (c) 2015 Didier Plaindoux
 * Licensed under the LGPL2 license.
 */

module.exports = (function () {

    'use strict';

    function Try(value,error) {
        this.value = value;
        this.error = error;
    }

    function success(value) {
        return new Try(value, null);
    }

    function failure(error) {
        return new Try(null, error);
    }

    Try.prototype.isSuccess = function () {
        return this.error === null;
    };

    Try.prototype.isFailure = function () {
        return !this.isSuccess();
    };

    Try.prototype.map = function (bindCall) {
        if (this.isSuccess()) {
            try {
                return success(bindCall(this.value));
            } catch (e) {
                return failure(e);
            }
        } else {
            return this;
        }
    };

    Try.prototype.flatmap = function (bindCall) {
        if (this.isSuccess()) {
            try {
                return bindCall(this.value);
            } catch (e) {
                return failure(e);
            }
        } else {
            return this;
        }
    };

    Try.prototype.success = function () {
        return this.value;
    };

    Try.prototype.failure = function () {
        return this.error;
    };

    Try.prototype.recoverWith = function (value) {
        if (this.isSuccess()) {
            return this.value;
        } else {
            return value;
        }
    };

    Try.prototype.lazyRecoverWith = function (value) {
        if (this.isSuccess()) {
            return this.value;
        } else {
            return value(this.error);
        }
    };

    Try.prototype.filter = function (f) {
        if (this.isSuccess() && f(this.value)) {
            return this;
        }

        return failure(new Error("FilterError"));
    };

    return {
        success : success,
        failure : failure
    };
}());
