
;(function(jQuery) {
console.log('loading manage-local-storage');

var basil = null

var StorageOptions = {
    namespace: null,
    expireDays: 3650,
}

var StorageManager = {

    initializeBasil: function() {
        // intialize basil using options from StorageOptions.
        // StorageOptions.namespace must be explicitly assigned an appropriate value, otherwise basil init is not performed.
        console.log('INSIDE StorageManager.initializeBasil');
        if (StorageOptions.namespace == null) {
            console.log('manage-local-storage : error : namespace must be explicitly assigned prior to basil initialization');
            return;
        }
        basil = new window.Basil(StorageOptions)
    },

    readLocationsFromLocalStorage: function() {
        // read all locations saved in storage.
        // returns locations as key-value pairs (id: location)
        console.log('INSIDE StorageManager.readLocationsFromLocalStorage');
        var data = {};
        var locations = basil.get('locations');
        var location_ids = Object.keys(locations);
        for (var i = 0; i < location_ids.length; i++) {
            data[location_ids[i]] = locations[location_ids[i]];
        }
        return data;
    },

    writeLocationsToLocalStorage: function(data,selected) {
        // write all provided locations to storage.
        // data : key-value pairs (id : location) for all saved locations
        // selected : id of currently selected location
        console.log('INSIDE StorageManager.writeLocationsToLocalStorage');
        var locations = basil.get('locations');
        var location_ids = Object.keys(locations);
        var new_loc = null; old_loc = null;
        jQuery.each(data, function(id, loc) {
            if (id == selected) {
                loc['selected'] = 1
            } else {
                loc['selected'] = 0
            }
            if (jQuery.inArray(id,location_ids) != -1) {
                // location already exists, so extend
                old_loc = locations[id];
                new_loc = jQuery.extend({},old_loc,loc);
                locations[id] = new_loc;
            } else {
                // new location, just create
                locations[id] = loc;
            }
        });
        basil.remove('locations');
        basil.set('locations',locations);
    },

    getIdsToDeleteFromLocalStorage: function(data) {
        // get array of location IDs to delete.
        // The returned ids array contains ids that are currently in local storage, but on in the context returned by the location picker.
        // In other words, the returned ids array contains location IDs that the user would like removed.
        // data : should be context.all_locations returned from the location picker
        var ids = []
        var locations = basil.get('locations')
        var basil_location_ids = Object.keys(locations)
        var location_ids = Object.keys(data)
        jQuery.each(basil_location_ids, function(idx,id) {
            if (jQuery.inArray(id,location_ids) == -1) {
                ids.push(id);
            };
        });
        return ids
    },

    deleteLocationsFromLocalStorage: function(loc_ids) {
        // delete locations, keyed by given IDs, from local storage
        // loc_ids : array of location keys
        var locations = basil.get('locations')
        jQuery.each(loc_ids, function(idx,id) {
            delete locations[id]
        });
        basil.remove('locations')
        basil.set('locations',locations);
    },

    updateLocationInLocalStorage: function(id,loc) {
        // update location from one or more key-value pairs in loc
        // id : key of location
        // loc : key-value pair(s) to update for this id
        var old_loc = null; new_loc = null;
        var locations = basil.get('locations');
        old_loc = locations[id];
        new_loc = jQuery.extend({},old_loc,loc);
        locations[id] = new_loc;
        basil.remove('locations')
        basil.set('locations',locations);
    },

    getSelectedID: function() {
        // get the currently selected ID (only the id associated with the selected location, without location key-value pairs)
        console.log('INSIDE StorageManager.getSelectedID');
        var selectedID = null;
        var data = this.readLocationsFromLocalStorage();
        var idArray = Object.keys(data);
        for (var i = 0; i < idArray.length; i++) {
            if (data[idArray[i]]['selected'] == 1) { selectedID = idArray[i] }
        }
        return selectedID;
    },

    getSelectedLocation: function() {
        // get the currently selected location (all key-value pairs for location)
        console.log('INSIDE StorageManager.getSelectedLocation');
        var selectedID = null;
        var data = this.readLocationsFromLocalStorage();
        var idArray = Object.keys(data);
        for (var i = 0; i < idArray.length; i++) {
            if (data[idArray[i]]['selected'] == 1) { selectedID = idArray[i] }
        }
        return data[selectedID];
    },

    transferOldLocations: function(namespace_old) {
        // move the previously saved locations into the new 'locations' key
        var basil_old = new window.Basil({ 'namespace': namespace_old });
        var basil_old_keys = basil_old.keys();
        var locations_new = basil.get('locations');
        if (locations_new == null) { locations_new = {} };
        jQuery.each(basil_old_keys, function(idx,id) {
            // copy old locations into new 'locations' key
            locations_new[id] = basil_old.get(id)
            // remove old locations from old namespace
            basil_old.remove(id)
        });
        basil.remove('locations');
        basil.set('locations',locations_new);
    },

}

var jQueryStorageProxy = function() {
    if (arguments.length==1) {
        var arg_0 = arguments[0];
        switch(arg_0) {
            case "init": StorageManager.initializeBasil(); break;
            case "read": return StorageManager.readLocationsFromLocalStorage(); break;
            case "selected_id": return StorageManager.getSelectedID(); break;
            case "selected_loc": return StorageManager.getSelectedLocation(); break;
        }
    } else if (arguments.length==2) {
        var arg_0 = arguments[0];
        var arg_1 = arguments[1];
        switch(arg_0) {
            case "namespace": StorageOptions.namespace = arg_1; break;
            case "expireDays": StorageOptions.expireDays = arg_1; break;
            case "getIdsToDelete": return StorageManager.getIdsToDeleteFromLocalStorage(arg_1); break;
            case "delete": StorageManager.deleteLocationsFromLocalStorage(arg_1); break;
            case "transfer": StorageManager.transferOldLocations(arg_1); break;
        }
    } else if (arguments.length==3) {
        var arg_0 = arguments[0];
        var arg_1 = arguments[1];
        var arg_2 = arguments[2];
        switch(arg_0) {
            case "write": console.log('write to storage'); StorageManager.writeLocationsToLocalStorage(arg_1,arg_2); break;
            case "update": console.log('update storage'); StorageManager.updateLocationInLocalStorage(arg_1,arg_2); break;
        }
    }
}

jQuery.fn.CsfToolManageLocalStorage = function(options) {
    if (typeof options !== 'undefined') {
        jQuery.each(options, function(key,value) {
            jQueryStorageProxy(key,value);
        });
    } else {
        return jQueryStorageProxy;
    }
}

})(jQuery);

