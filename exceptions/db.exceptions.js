class DbExceptions extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = DbExceptions;