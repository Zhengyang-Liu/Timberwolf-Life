var BUTTON_CREATE_ID = 'create';

var Session = function() {
    console.log('[INFO] Loading Session Module...');

    this.authorized = false;
    this.create = document.getElementById(BUTTON_CREATE_ID);

    this.create.addEventListener('click', this.create.bind(this));

    this.init();
};

Session.prototype.sessionHandler = function(player) {
    this.authorized = player ? true : false;
};

Session.prototype.init = function() {
    this.db = firebase.database();
    this.auth = firebase.auth();

    this.auth.onAuthStateChanged(this.sessionHandler.bind(this));
};

Session.prototype.create = function() {
    if (authorized) {
        var newKey = this.db.ref().child('session').push().key;
        var updates = {};
        var sessionData = {
            'map': null,
            'challenger': null,
            'owner': this.auth.currentUser
        };

        updates['/sessions/' + newKey] = session;

        console.log('new session: ', newKey);

        return this.db.ref().update(updates);

    } else {
        alert('unable to create a room');
    }
};

Session.prototype.leave = function() {

};

Session.prototype.join = function() {

};

Session.prototype.invite = function() {

};
