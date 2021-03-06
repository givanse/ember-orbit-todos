import Ember from 'ember';
import EO from 'ember-orbit';
import Orbit from 'orbit/main';
import LocalStorageSource from 'orbit-common/local-storage-source';

var get = Ember.get,
    set = Ember.set;

var Promise = Ember.RSVP.Promise;

var LocalStorageStore = EO.Store.extend({
  	orbitSourceClass: LocalStorageSource,
  	orbitSourceOptions: {
	  namespace: "ember-orbit-todos" // n.s. for localStorage
	}
});

export default {
	name: 'injectStore',
	initialize: function(container, application) {
		Orbit.Promise = Ember.RSVP.Promise;
		application.register('schema:main', EO.Schema);
		
		//// default InMemoryStore ////
		// application.register('store:main', EO.Store);

		//// LocalStorageStore ///
		application.register('store:main', LocalStorageStore); 		

		application.inject('controller', 'store', 'store:main');
		application.inject('route', 'store', 'store:main');
	}
};
