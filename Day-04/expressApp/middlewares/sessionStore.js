var store = {

};
function getNewSessionId(){
    return Date.now().toString();
}
function sessionExists(sessionId){
    return !!store[sessionId];
}
function getSessionObjectFor(sessionId){
    return store[sessionId];
}

module.exports = function(req, res, next){
    var sessionIdCookieValue = req.cookies['sessionId'];
    if (sessionIdCookieValue && sessionExists(sessionIdCookieValue)){
        req.session = getSessionObjectFor(sessionIdCookieValue);
        next();
    } else {
        var newSessionId = getNewSessionId();
        res.cookie('sessionId', newSessionId);
        store[newSessionId] = {};
        req.session = getSessionObjectFor(newSessionId);
        next();
    }
}
