//----------------------------------------------------------------------------//
// This error handling middleware allows us to have more centralized and
// consistent control over how errors are returned. When an error occurs,
// nothing is more frustrating to a developer than not having enough information
// about what happened. 
// 
// To use this, make sure it is the last server.use() in the chain (in the
// server.js file), and anyplace you intend to send back a 4xx or 5xx response,
// instead of setting res.status().json() directly, call:
// 
//      next({apiCode:4xx, apiMessage:'whatever the error is'})
// 
// If you are returning a 5xx error because of an exception in knex or some
// other exception, you will want to return the error details as well. You can
// add them to the next() error object using the "rest" operator:
// 
//      next({apiCode: 4xx, apiMessage: 'whatever the error is', ...err})
//
//----------------------------------------------------------------------------//
module.exports = (err, req, res, next) => {
    console.log('express error: ', err);
    if (err.apiCode && err.apiCode >= 400) {
        // ensure that err.apiMessage exists so we don't throw an exception
        // trying to return it.
        err.apiMessage = err.apiMessage ? err.apiMessage : '';
        res.status(err.apiCode).json({
            apiCode: err.apiCode, apiMessage: err.apiMessage, ...err
        });
    } else {
        next();
    }
}