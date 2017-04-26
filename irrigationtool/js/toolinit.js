// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// create global GDD tool state objects
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

IRR_TOOLVARS = null;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
// Initialize IRR_TOOLVARS to specific location
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
//IRR_TOOLVARS = { 'lat': 42.4433, 'lon': -76.5000, 'location': 'Ithaca, NY' }
IRR_TOOLVARS = {
    'locations': null,
    'locations_old': null,
    'location_id':'default',
    'address': "Cornell University, Ithaca, NY",
    'lat': 42.45,
    'lon': -76.48,
    //last irrigation date
    'irrigation_date': '03/01/2016',
    // soil water capacity
    'soilcapacity': 'high',
    'croptype': 'grass',
    'planting_date': '05/01/2016',
    'default_location': {
        'id': 'default',
        'address': "Cornell University, Ithaca, NY",
        'lat': 42.45,
        'lng': -76.48,
    },
    'default_selections': {
        'irrigation_date': '03/01/2016',
        'planting_date': '05/01/2016',
        'soilcapacity': 'high',
        'croptype': 'grass',
    },
    //'location': 'Ithaca, NY',
    //'street':'306 Tower Road',
    //'city':'Ithaca',
    //'state':'NY',
    'data': null,
    'data_to_display': null,
    // which date is the first displayed data point? 'irrigation' or 'recharge'
    'chartstart': 'recharge',
    'clim': null,
    // this year
    'this_year': null,
    // soil depth is in inches, and should be the effective root depth
    'soildepth': 12.0,
    // selected soil moisture characteristics
    'soilmoisture': null,
    // soil moisture characteristics for different levels of soil water capacity
    'soilmoistureoptions': {
        'low': { 'wiltingpoint': 1.0, 'prewiltingpoint': 1.15, 'stressthreshold': 1.5, 'fieldcapacity': 2.0, 'saturation': 5.0 },
        'medium': { 'wiltingpoint': 2.0, 'prewiltingpoint': 2.225, 'stressthreshold':2.8, 'fieldcapacity': 3.5, 'saturation': 5.5 },
        'high': { 'wiltingpoint': 3.0, 'prewiltingpoint': 3.3, 'stressthreshold':4.0, 'fieldcapacity': 5.0, 'saturation': 6.5 },
    },
    //today's date
    'date_today' : new Date(),
    //last day of season (October 31)
    //'last_date_of_season' : '10/31/2016',
    'last_date_of_season' : new Date(2016,9,31),
    // crop options, including crop coefficients for different growth stages, and length (days) of growth stages.
    // Crop coefficients will be used to create a coefficient curve when needed.
    // Growth stage length (L) and coefficients (Kc) from FAO-56, chapter 6, single crop coefficient
    'cropinfo': {
        'grass': {'Lini': 0, 'Ldev': 0, 'Lmid': 240, 'Llate': 0, 'Kcini': 1.00, 'Kcmid': 1.00, 'Kcend': 1.00, 'annual': false},
        'vegsmallshort': {'Lini': 20, 'Ldev': 35, 'Lmid': 35, 'Llate': 10, 'Kcini': 0.70, 'Kcmid': 1.05, 'Kcend': 0.95, 'annual': true},
        'vegsmalllong': {'Lini': 30, 'Ldev': 45, 'Lmid': 75, 'Llate': 30, 'Kcini': 0.70, 'Kcmid': 1.05, 'Kcend': 0.95, 'annual': true},
        'vegsolanum': {'Lini': 30, 'Ldev': 40, 'Lmid': 80, 'Llate': 30, 'Kcini': 0.60, 'Kcmid': 1.15, 'Kcend': 0.80, 'annual': true},
        'vegcucumber': {'Lini': 25, 'Ldev': 40, 'Lmid': 35, 'Llate': 20, 'Kcini': 0.50, 'Kcmid': 1.00, 'Kcend': 0.80, 'annual': true},
        'rootstubers': {'Lini': 20, 'Ldev': 30, 'Lmid': 50, 'Llate': 20, 'Kcini': 0.50, 'Kcmid': 1.15, 'Kcend': 0.70, 'annual': true},
        'legumes': {'Lini': 20, 'Ldev': 30, 'Lmid': 30, 'Llate': 10, 'Kcini': 0.50, 'Kcmid': 1.10, 'Kcend': 1.00, 'annual': true},
        'cereals': {'Lini': 20, 'Ldev': 35, 'Lmid': 60, 'Llate': 25, 'Kcini': 0.30, 'Kcmid': 1.15, 'Kcend': 0.30, 'annual': true},
        'forages': {'Lini': 10, 'Ldev': 15, 'Lmid': 20, 'Llate': 10, 'Kcini': 0.40, 'Kcmid': 1.20, 'Kcend': 1.10, 'annual': true},
        'grapes': {'Lini': 30, 'Ldev': 60, 'Lmid': 40, 'Llate': 80, 'Kcini': 0.30, 'Kcmid': 0.70, 'Kcend': 0.45, 'annual': false},
        //'corn': {'Lini': 25, 'Ldev': 40, 'Lmid': 45, 'Llate': 30, 'Kcini': 0.30, 'Kcmid': 1.20, 'Kcend': 0.35, 'annual': true},
        //'wheat': {'Lini': 20, 'Ldev': 25, 'Lmid': 60, 'Llate': 30, 'Kcini': 0.30, 'Kcmid': 1.15, 'Kcend': 0.35, 'annual': true},
    },
    // selected soil drainage rates
    'soildrainage': null,
    // soil drainage rates (from saturation to field capacity) for different levels of soil water capacity
    'soildrainageoptions': {
        'low': { 'daysToDrainToFcFromSat': 0.125 },
        'medium': { 'daysToDrainToFcFromSat': 1.0 },
        'high': { 'daysToDrainToFcFromSat': 2.0 },
    },
    // irrigation level options - 'saturation' or 'fieldcapacity'
    'irrigationlevel': 'fieldcapacity',
    // demo data for two stations: Ithaca and Geneva
    'demodata': null,
}

IRR_TOOLVARS.this_year = IRR_TOOLVARS.irrigation_date.slice(6,10)

IRR_TOOLVARS.soilmoisture = IRR_TOOLVARS.soilmoistureoptions[IRR_TOOLVARS.soilcapacity]
IRR_TOOLVARS.soildrainage = IRR_TOOLVARS.soildrainageoptions[IRR_TOOLVARS.soilcapacity]
IRR_TOOLVARS.demodata = {
    'ithaca':{"dates_pet": ["05/01", "05/02", "05/03", "05/04", "05/05", "05/06", "05/07", "05/08", "05/09", "05/10", "05/11", "05/12", "05/13", "05/14", "05/15", "05/16", "05/17", "05/18", "05/19", "05/20", "05/21", "05/22", "05/23", "05/24", "05/25", "05/26", "05/27", "05/28", "05/29", "05/30", "05/31", "06/01", "06/02", "06/03", "06/04", "06/05", "06/06", "06/07", "06/08", "06/09", "06/10", "06/11", "06/12", "06/13", "06/14", "06/15", "06/16", "06/17", "06/18", "06/19", "06/20", "06/21", "06/22", "06/23", "06/24", "06/25", "06/26", "06/27", "06/28", "06/29", "06/30", "07/01", "07/02", "07/03", "07/04", "07/05", "07/06", "07/07", "07/08", "07/09", "07/10", "07/11", "07/12", "07/13", "07/14", "07/15", "07/16", "07/17", "07/18", "07/19", "07/20", "07/21", "07/22", "07/23", "07/24", "07/25", "07/26", "07/27", "07/28", "07/29", "07/30", "07/31", "08/01", "08/02", "08/03", "08/04", "08/05", "08/06", "08/07", "08/08", "08/09", "08/10", "08/11", "08/12", "08/13", "08/14", "08/15"], "pet": [0.004, 0.048, 0.08800000000000001, 0.072, 0.09200000000000001, 0.068, 0.036, 0.08800000000000001, 0.12, 0.164, 0.084, 0.084, 0.124, 0.012, 0.08000000000000002, 0.06, 0.044000000000000004, 0.08800000000000001, 0.096, 0.136, 0.084, 0.06, 0.08800000000000001, 0.09200000000000001, 0.08800000000000001, 0.096, 0.024, 0.08000000000000002, 0.09200000000000001, 0.1, 0.1, 0.016, 0.012, 0.044000000000000004, 0.084, 0.12, 0.084, 0.08000000000000002, 0.11200000000000002, 0.012, 0.052000000000000005, 0.044000000000000004, 0.072, 0.06, 0.06, 0.13999999999999999, 0.084, 0.12, 0.072, 0.048, 0.06, 0.05600000000000001, 0.084, 0.12, 0.1, 0.068, 0.06, 0.044000000000000004, 0.016, 0.024, 0.052000000000000005, 0.04000000000000001, 0.07600000000000001, 0.10800000000000001, 0.08800000000000001, 0.048, 0.08800000000000001, 0.064, 0.09200000000000001, 0.036, 0.016, 0.09200000000000001, 0.10800000000000001, 0.072, 0.11200000000000002, 0.068, 0.052000000000000005, 0.08000000000000002, 0.048, 0.08800000000000001, 0.072, 0.11599999999999999, 0.08000000000000002, 0.10800000000000001, 0.132, 0.10400000000000001, 0.068, 0.10800000000000001, 0.1, 0.10400000000000001, 0.1, 0.08800000000000001, 0.10400000000000001, 0.09200000000000001, 0.1, 0.08800000000000001, 0.07600000000000001, 0.08800000000000001, 0.064, 0.064, 0.068, 0.08000000000000002, 0.05600000000000001, 0.052000000000000005, 0.068, 0.08800000000000001, 0.072], "dates_precip": ["05/01", "05/02", "05/03", "05/04", "05/05", "05/06", "05/07", "05/08", "05/09", "05/10", "05/11", "05/12", "05/13", "05/14", "05/15", "05/16", "05/17", "05/18", "05/19", "05/20", "05/21", "05/22", "05/23", "05/24", "05/25", "05/26", "05/27", "05/28", "05/29", "05/30", "05/31", "06/01", "06/02", "06/03", "06/04", "06/05", "06/06", "06/07", "06/08", "06/09", "06/10", "06/11", "06/12", "06/13", "06/14", "06/15", "06/16", "06/17", "06/18", "06/19", "06/20", "06/21", "06/22", "06/23", "06/24", "06/25", "06/26", "06/27", "06/28", "06/29", "06/30", "07/01", "07/02", "07/03", "07/04", "07/05", "07/06", "07/07", "07/08", "07/09", "07/10", "07/11", "07/12", "07/13", "07/14", "07/15", "07/16", "07/17", "07/18", "07/19", "07/20", "07/21", "07/22", "07/23", "07/24", "07/25", "07/26", "07/27", "07/28", "07/29", "07/30", "07/31", "08/01", "08/02", "08/03", "08/04", "08/05", "08/06", "08/07", "08/08", "08/09", "08/10", "08/11", "08/12", "08/13", "08/14", "08/15"], "dates_fcst": ["08/16", "08/17", "08/18"], "precip": [0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.0, 0.0, 0.0, 0.0, 0.28, 0.64, 0.13, 0.0, 0.0, 0.36, 0.01, 0.0, 1.09, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01, 0.0, 0.0, 0.2, 0.32, 0.0, 0.0, 0.0, 0.0, 0.29, 0.0, 0.05, 1.9, 0.31, 0.15, 0.0, 0.27, 0.0, 0.58, 0.07, 0.16, 0.0, 0.01, 0.0, 0.14, 0.16, 0.03, 0.12, 0.0, 0.0, 0.0, 1.68, 0.17, 0.05, 0.55, 0.1, 0.0, 0.15, 0.09, 0.0, 0.0, 0.23, 0.0, 0.8, 0.0, 0.0, 0.0, 0.05, 1.43, 0.0, 0.0, 0.0, 0.05, 0.18, 0.0, 0.57, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.32, 0.01, 0.0, 0.0, 0.3, 0.05, 0.0, 0.0, 0.0, 0.0, 0.0, 0.48, 0.0, 0.0, 0.0, 0.0], "lat": "42.4433", "lon": "-76.44917", "pet_fcst": [0.016, 0.09200000000000001, 0.10800000000000001], "precip_fcst": [0.0, 0.0, 0.0]},
    'geneva':{"dates_pet": ["05/01", "05/02", "05/03", "05/04", "05/05", "05/06", "05/07", "05/08", "05/09", "05/10", "05/11", "05/12", "05/13", "05/14", "05/15", "05/16", "05/17", "05/18", "05/19", "05/20", "05/21", "05/22", "05/23", "05/24", "05/25", "05/26", "05/27", "05/28", "05/29", "05/30", "05/31", "06/01", "06/02", "06/03", "06/04", "06/05", "06/06", "06/07", "06/08", "06/09", "06/10", "06/11", "06/12", "06/13", "06/14", "06/15", "06/16", "06/17", "06/18", "06/19", "06/20", "06/21", "06/22", "06/23", "06/24", "06/25", "06/26", "06/27", "06/28", "06/29", "06/30", "07/01", "07/02", "07/03", "07/04", "07/05", "07/06", "07/07", "07/08", "07/09", "07/10", "07/11", "07/12", "07/13", "07/14", "07/15", "07/16", "07/17", "07/18", "07/19", "07/20", "07/21", "07/22", "07/23", "07/24", "07/25", "07/26", "07/27", "07/28", "07/29", "07/30", "07/31", "08/01", "08/02", "08/03", "08/04", "08/05", "08/06", "08/07", "08/08", "08/09", "08/10", "08/11", "08/12", "08/13", "08/14", "08/15"], "pet": [0.08000000000000002, 0.064, 0.08800000000000001, 0.09200000000000001, 0.08800000000000001, 0.072, 0.09200000000000001, 0.08800000000000001, 0.11200000000000002, 0.084, 0.10800000000000001, 0.11599999999999999, 0.13999999999999999, 0.052000000000000005, 0.096, 0.032, 0.07600000000000001, 0.064, 0.09200000000000001, 0.144, 0.084, 0.084, 0.08000000000000002, 0.11200000000000002, 0.128, 0.07600000000000001, 0.11200000000000002, 0.028000000000000004, 0.136, 0.17600000000000002, 0.148, 0.09200000000000001, 0.04000000000000001, 0.044000000000000004, 0.05600000000000001, 0.08000000000000002, 0.168, 0.144, 0.11200000000000002, 0.072, 0.044000000000000004, 0.09200000000000001, 0.128, 0.15200000000000002, 0.08000000000000002, 0.04000000000000001, 0.05600000000000001, 0.096, 0.044000000000000004, 0.11200000000000002, 0.096, 0.05600000000000001, 0.084, 0.11599999999999999, 0.148, 0.096, 0.084, 0.15200000000000002, 1.304, 0.024, 0.004, 0.036, 0.064, 0.16000000000000003, 0.10800000000000001, 0.072, 0.09200000000000001, 0.08800000000000001, 0.136, 0.068, 0.028000000000000004, 0.15600000000000003, 0.064, 0.06, 0.13999999999999999, 0.072, 0.068, 0.096, 0.148, 0.128, 0.10400000000000001, 0.10800000000000001, 0.08800000000000001, 0.11599999999999999, 0.1, 0.096, 0.06, 0.072, 0.07600000000000001, 0.07600000000000001, 0.144, 0.132, 0.188, 0.128, 0.068, 0.084, 0.07600000000000001, 0.09200000000000001, 0.08000000000000002, 0.10800000000000001, 0.04000000000000001, 0.064, 0.0, 0.1, 0.11599999999999999, 0.09200000000000001, 0.06], "dates_precip": ["05/01", "05/02", "05/03", "05/04", "05/05", "05/06", "05/07", "05/08", "05/09", "05/10", "05/11", "05/12", "05/13", "05/14", "05/15", "05/16", "05/17", "05/18", "05/19", "05/20", "05/21", "05/22", "05/23", "05/24", "05/25", "05/26", "05/27", "05/28", "05/29", "05/30", "05/31", "06/01", "06/02", "06/03", "06/04", "06/05", "06/06", "06/07", "06/08", "06/09", "06/10", "06/11", "06/12", "06/13", "06/14", "06/15", "06/16", "06/17", "06/18", "06/19", "06/20", "06/21", "06/22", "06/23", "06/24", "06/25", "06/26", "06/27", "06/28", "06/29", "06/30", "07/01", "07/02", "07/03", "07/04", "07/05", "07/06", "07/07", "07/08", "07/09", "07/10", "07/11", "07/12", "07/13", "07/14", "07/15", "07/16", "07/17", "07/18", "07/19", "07/20", "07/21", "07/22", "07/23", "07/24", "07/25", "07/26", "07/27", "07/28", "07/29", "07/30", "07/31", "08/01", "08/02", "08/03", "08/04", "08/05", "08/06", "08/07", "08/08", "08/09", "08/10", "08/11", "08/12", "08/13", "08/14", "08/15"], "dates_fcst": ["08/16", "08/17", "08/18"], "precip": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.05, 0.0, 0.9, 0.43, 0.02, 0.0, 0.0, 0.15, 0.0, 0.0, 0.39, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.01, 0.0, 0.0, 1.58, 0.81, 0.0, 0.0, 0.0, 0.0, 0.65, 0.0, 0.05, 0.62, 0.58, 1.13, 0.0, 0.6, 0.0, 1.08, 0.0, 0.12, 0.0, 0.0, 0.0, 0.04, 0.0, 0.15, 0.04, 0.0, 0.01, 0.0, 1.5, 0.05, 0.05, 0.88, 0.08, 0.0, 0.0, 0.07, 0.0, 0.0, 0.49, 0.02, 0.59, 0.0, 0.0, 0.0, 0.06, 0.4, 0.0, 0.0, 0.35, 0.01, 0.0, 0.0, 0.17, 0.0, 0.0, 0.0, 0.37, 0.0, 0.0, 0.0, 0.04, 0.33, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.76, 0.0, 0.02, 0.0, 0.0], "lat": "42.87667", "lon": "-77.03083", "pet_fcst": [0.05600000000000001, 0.084, 0.11599999999999999], "precip_fcst": [0.03, 0.0, 0.0]},
    }

//install maxZindex function
jQuery.maxZIndex = jQuery.fn.maxZIndex = function(opt) {
    /// <summary>
    /// Returns the max zOrder in the document (no parameter)
    /// Sets max zOrder by passing a non-zero number
    /// which gets added to the highest zOrder.
    /// </summary>
    /// <param name="opt" type="object">
    /// inc: increment value,
    /// group: selector for zIndex elements to find max for
    /// </param>
    /// <returns type="jQuery" />
    var def = { inc: 10, group: "*" };
    jQuery.extend(def, opt);
    var zmax = 0;
    jQuery(def.group).each(function() {
        var cur = parseInt(jQuery(this).css("z-index"));
        zmax = cur > zmax ? cur : zmax;
    });
    if (!this.jquery)
        return zmax;

    return this.each(function() {
        zmax += def.inc;
        jQuery(this).css("z-index", zmax);
    });
}

// INITIALIZE TOOL SECTIONS
function initToolSections() {
    var input_html = [
        '<div id="csftool-input" class="csftool-input">',
        '<div id="user-input" class="user-input"></div>',
        //'<div id="text-output-header-1"></div>',
        //'<div id="text-output-1"></div>',
        //'<div id="text-output-header-2"></div>',
        //'<div id="text-output-2"></div>',//
        '</div>',

        '<div id="csftool-display-irrtool" class="csftool-display-irrtool">',
        '<div id="csftool-display" class="csftool-display">',
        '<ul>',
        //'<li><a href="#chart-output-1">Water Deficit Observed</a></li>',
        '<li id="tab1"><a href="#chart-output-2">Water Deficit Results</a></li>',
        //'<li><a href="#chart-output-3">Water Deficit With Budget</a></li>',
        '<li id="tab2"><a href="#chart-output-4">Next 30 days</a></li>',
        '<li id="tab3"><a href="#chart-output-5">Climate Change Projections</a></li>',
        '</ul>',
        //'<div id="chart-output-1"></div>',
        '<div id="chart-output-2"></div>',
        //'<div id="chart-output-3"></div>',
        //'<div id="chart-output-4">Coming Soon - please check back for this added feature</div>',
        '<div id="chart-output-4"></div>',
        '<div id="chart-output-5"></div>',
        '</div>',
        '</div>',

        '<div id="csftool-location-dialog" title="">',
        '<form id="csftool-location-radio-form">',
        '<input type="radio" name="location" value="address" checked><span>By Street Address</span>',
        '<input type="radio" name="location" value="coords"><span>By Coordinates</span><br/>',
        '</form>',
        '<div id="csftool-location-address"></div>',
        '<div id="csftool-location-coords"></div>',
        '<div id="csftool-location-message"></div>',
        '</div>',

        '<div id="irrtool-season-end-message-dialog" title="Growing Season Has Ended">',
        '<div id="season-end-message"></div>',
        '</div>',

        '<div id="irrtool-crop-type-info-dialog" title="Crop Type Groups">',
        '<div id="crop-type-info-message"></div>',
        '</div>'].join('');
    document.getElementById('csftool-content').innerHTML = input_html;
}

// USER INTERFACE SCRIPTS

// Set of functions to handle cookies ... create, read, delete
function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    //console.log('creating cookie:'+name)
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function initStorageManager() {
    // local storage manager initialization
    var storage_options = {
        namespace: 'CSF-'+CSFTOOL_NAME,
        expireDays: 3650
    }
    jQuery().CsfToolManageLocalStorage(storage_options);
    var manage_local_storage = jQuery().CsfToolManageLocalStorage();
    IRR_TOOLVARS.manage_local_storage = manage_local_storage
    IRR_TOOLVARS.manage_local_storage("init");
}

function transferOldLocations() {
    IRR_TOOLVARS.manage_local_storage("transfer", "CSF-LOC-"+CSFTOOL_NAME);
}

function initLocationState() {
    // bnb initialize location state
    var loc_obj = null;
    loc_obj = IRR_TOOLVARS.manage_local_storage("selected_loc");
    if (loc_obj) {
        IRR_TOOLVARS.lat = loc_obj.lat;
        IRR_TOOLVARS.lon = loc_obj.lng;
        IRR_TOOLVARS.address = loc_obj.address;
        IRR_TOOLVARS.location_id = loc_obj.id;
        if (loc_obj.planting_date) { IRR_TOOLVARS.planting_date = loc_obj.planting_date };
        if (loc_obj.irrigation_date) { IRR_TOOLVARS.irrigation_date = loc_obj.irrigation_date };
        if (loc_obj.soilcapacity) { IRR_TOOLVARS.soilcapacity = loc_obj.soilcapacity };
        if (loc_obj.croptype) { IRR_TOOLVARS.croptype = loc_obj.croptype };
        console.log('initLocationState : planting date : ',IRR_TOOLVARS.planting_date)
        // update user interface
        jQuery("#csftool-current-location").empty().append(IRR_TOOLVARS.address);
        jQuery("#csftool-current-lat").empty().append(IRR_TOOLVARS.lat.toFixed(2).toString());
        jQuery("#csftool-current-lon").empty().append(IRR_TOOLVARS.lon.toFixed(2).toString());
    } else {
        // update user interface using existing defaults
        jQuery("#csftool-current-location").empty().append(IRR_TOOLVARS.default_location.address);
        jQuery("#csftool-current-lat").empty().append(IRR_TOOLVARS.default_location.lat.toFixed(2).toString());
        jQuery("#csftool-current-lon").empty().append(IRR_TOOLVARS.default_location.lng.toFixed(2).toString());
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function soilTypeChanged() {
    //console.log("inside soilTypeChanged");
    var soiltype = jQuery("#irrtool-soil-select :selected").val();
    IRR_TOOLVARS.soilcapacity = soiltype
    IRR_TOOLVARS.soilmoisture = IRR_TOOLVARS.soilmoistureoptions[soiltype];
    IRR_TOOLVARS.soildrainage = IRR_TOOLVARS.soildrainageoptions[soiltype]
    IRR_TOOLVARS.locations[IRR_TOOLVARS.location_id]['soilcapacity'] = soiltype
    IRR_TOOLVARS.manage_local_storage("update",IRR_TOOLVARS.location_id,{"soilcapacity":IRR_TOOLVARS.soilcapacity});
    displayOutput()
}

function cropTypeChanged() {
    //console.log("inside cropTypeChanged");
    var croptype = jQuery("#irrtool-crop-select :selected").val();
    //var cropinfo = IRR_TOOLVARS.cropinfo[croptype];
    IRR_TOOLVARS.croptype = croptype;
    IRR_TOOLVARS.locations[IRR_TOOLVARS.location_id]['croptype'] = croptype
    IRR_TOOLVARS.manage_local_storage("update",IRR_TOOLVARS.location_id,{"croptype":IRR_TOOLVARS.croptype});
    displayOutput()
}

function plantingDateChanged(dateText, inst) {
    //console.log("datepicker is changing planting date to " + dateText + " from function");
    IRR_TOOLVARS.planting_date = dateText;
    IRR_TOOLVARS.locations[IRR_TOOLVARS.location_id]['planting_date'] = dateText
    IRR_TOOLVARS.manage_local_storage("update",IRR_TOOLVARS.location_id,{"planting_date":IRR_TOOLVARS.planting_date});
    displayOutput();
}

function irrigationDateChanged(dateText, inst) {
    //console.log("datepicker is changing irrigation date to " + dateText + " from function");
    IRR_TOOLVARS.irrigation_date = dateText; 
    IRR_TOOLVARS.locations[IRR_TOOLVARS.location_id]['irrigation_date'] = dateText
    IRR_TOOLVARS.manage_local_storage("update",IRR_TOOLVARS.location_id,{"irrigation_date":IRR_TOOLVARS.irrigation_date});
    IRR_TOOLVARS.chartstart = 'recharge';
    jQuery('#irrtool-checkbox-label').empty().append('<input type="checkbox" onclick="startAtIrrigationChanged(this)"> view since irrigation');
    updateDataToDisplay();
    displayOutput();
}

function startAtIrrigationChanged(cb) {
    var startAtIrrigation = cb.checked;
    if (startAtIrrigation) {
        IRR_TOOLVARS.chartstart = 'irrigation'
    } else {
        IRR_TOOLVARS.chartstart = 'recharge'
    }
    displayOutput();
}

function updateDataToDisplay() {
    var idxIrrigationDate = IRR_TOOLVARS.data.dates_precip.indexOf(IRR_TOOLVARS.irrigation_date.slice(0,5).replace('-','/'));
    IRR_TOOLVARS.data_to_display.pet = IRR_TOOLVARS.data.pet.slice(idxIrrigationDate,IRR_TOOLVARS.data.pet.length);
    IRR_TOOLVARS.data_to_display.dates_pet = IRR_TOOLVARS.data.dates_pet.slice(idxIrrigationDate,IRR_TOOLVARS.data.dates_pet.length);
    IRR_TOOLVARS.data_to_display.precip = IRR_TOOLVARS.data.precip.slice(idxIrrigationDate,IRR_TOOLVARS.data.precip.length);
    IRR_TOOLVARS.data_to_display.dates_precip = IRR_TOOLVARS.data.dates_precip.slice(idxIrrigationDate,IRR_TOOLVARS.data.dates_precip.length);
}

function getWaterStressCoeff(Dr) {
    // adjust ET by water stress factor
    // FAO-56 eq 84, pg 169
    // Dr is the antecedent water deficit
    var Ks = null
    var TAW = IRR_TOOLVARS.soilmoisture.fieldcapacity - IRR_TOOLVARS.soilmoisture.wiltingpoint
    var p = 0.5
    Dr = -1.*Dr
    Ks = (Dr<=(p*TAW)) ? 1. : (TAW-Dr)/((1-p)*TAW);
    Ks = Math.max(Ks,0.);
    return Ks;
}

function getSingleCropCoeff(numdays) {
    var crop = IRR_TOOLVARS.croptype
    //console.log(IRR_TOOLVARS)
    if (numdays <= IRR_TOOLVARS.cropinfo[crop]['Lini']) {
        // before planting or in initial growth stage
        Kc = IRR_TOOLVARS.cropinfo[crop]['Kcini']
    } else if ((numdays > IRR_TOOLVARS.cropinfo[crop]['Lini']) && (numdays < (IRR_TOOLVARS.cropinfo[crop]['Lini']+IRR_TOOLVARS.cropinfo[crop]['Ldev']))) {
        // in development growth stage
        // linearly interpolate between Kcini and Kcmid to find Kc within development stage
        Kc = IRR_TOOLVARS.cropinfo[crop]['Kcini'] + (numdays-IRR_TOOLVARS.cropinfo[crop]['Lini'])*(IRR_TOOLVARS.cropinfo[crop]['Kcmid']-IRR_TOOLVARS.cropinfo[crop]['Kcini'])/IRR_TOOLVARS.cropinfo[crop]['Ldev']
    } else if (numdays >=(IRR_TOOLVARS.cropinfo[crop]['Lini']+IRR_TOOLVARS.cropinfo[crop]['Ldev']) && numdays <= (IRR_TOOLVARS.cropinfo[crop]['Lini']+IRR_TOOLVARS.cropinfo[crop]['Ldev']+IRR_TOOLVARS.cropinfo[crop]['Lmid'])) {
        // in middle (mature) growth stage
        Kc = IRR_TOOLVARS.cropinfo[crop]['Kcmid']
    } else if (numdays >(IRR_TOOLVARS.cropinfo[crop]['Lini']+IRR_TOOLVARS.cropinfo[crop]['Ldev']+IRR_TOOLVARS.cropinfo[crop]['Lmid']) && numdays < (IRR_TOOLVARS.cropinfo[crop]['Lini']+IRR_TOOLVARS.cropinfo[crop]['Ldev']+IRR_TOOLVARS.cropinfo[crop]['Lmid']+IRR_TOOLVARS.cropinfo[crop]['Llate'])) {
        // in late growth stage
        Kc = IRR_TOOLVARS.cropinfo[crop]['Kcmid'] - (numdays-(IRR_TOOLVARS.cropinfo[crop]['Lini']+IRR_TOOLVARS.cropinfo[crop]['Ldev']+IRR_TOOLVARS.cropinfo[crop]['Lmid']))*(IRR_TOOLVARS.cropinfo[crop]['Kcmid']-IRR_TOOLVARS.cropinfo[crop]['Kcend'])/IRR_TOOLVARS.cropinfo[crop]['Llate']
    } else {
        // at end of growing season
        Kc = IRR_TOOLVARS.cropinfo[crop]['Kcend']
    }

    //console.log(numdays, Kc)

    return Kc
}

function irrigationLocationChanged(data) {
    // update data state variable
    IRR_TOOLVARS.data = jQuery.extend({}, data)
    IRR_TOOLVARS.data_to_display = jQuery.extend({}, IRR_TOOLVARS.data)
    //console.log(IRR_TOOLVARS.data)
    // update minimum date selectable for irrigation date
    var first_date = IRR_TOOLVARS.data.first_date
    //console.log(first_date);
    first_date = new Date(parseInt(first_date.slice(6,10)),parseInt(first_date.slice(0,2))-1,parseInt(first_date.slice(3,5)))
    jQuery("#csftool-datepicker").datepicker("option","minDate", first_date)
        .next('button').button({
            icons: {
                primary: 'ui-icon-pencil'
            }, text: false
        });
    jQuery("#irrtool-planting-datepicker").datepicker("option","minDate", first_date)
        .next('button').button({
            icons: {
                primary: 'ui-icon-pencil'
            }, text: false
        });
    // update data to display based on irrigation date
    updateDataToDisplay()
    // display data for this location
    displayOutput()
    // start loading data for probabilities
    getClimDataForLocation()
}

function cropInfoInit() {
    jQuery("#irrtool-crop-type-info-dialog").dialog("open");
    jQuery("#irrtool-crop-type-info-dialog").dialog("option", {
        height: 400,
        width: 650,
        left: 375,
        top: 26,
        modal: true,
        buttons: {
            "Close": function() {
                jQuery("#irrtool-crop-type-info-dialog").dialog("close")
            }
        }
    });
}

function mapInit() {
    // Read saved locations
    var locations = IRR_TOOLVARS.manage_local_storage("read");
    if (locations != {}) {
        IRR_TOOLVARS.locations = locations
    } else {
        //load default locations
        var defaultID = IRR_TOOLVARS.default_location.id;
        IRR_TOOLVARS.locations = { defaultID: jQuery.extend({},IRR_TOOLVARS.default_location,IRR_TOOLVARS.default_selections) };
        IRR_TOOLVARS.location_id = defaultID;
    }
    IRR_TOOLVARS.map_dialog("locations", IRR_TOOLVARS.locations)
    IRR_TOOLVARS.map_dialog("open", IRR_TOOLVARS.location_id)
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function initToolInterface() {
    // create the input elements
    var input_html = [ '<div id="csftool-whereami">',
        '<span class="irrtool-em">Location</span>',
        '<button class="change-location" onClick="mapInit()">Change Location</button>',
        '<br/><span class="csftool-location-text"></span><span id="csftool-current-location" class="csftool-location-text"></span>',
        //bnb combine lat/lon onto one line and decrease precision
        //'<br/><span class="csftool-location-text">Lat: </span><span id="csftool-current-lat" class="csftool-location-text"></span>',
        //'<br/><span class="csftool-location-text">Lon: </span><span id="csftool-current-lon" class="csftool-location-text"></span>',
        '<br/><span class="csftool-location-text">Lat/Lon: </span><span id="csftool-current-lat" class="csftool-location-text"></span>',
        '<span class="csftool-location-text">, </span><span id="csftool-current-lon" class="csftool-location-text"></span>',
        '</div>',
        '<div id="irrtool-soil-type">',
        '<p>',
        '<form>',
        '<span class="irrtool-em">Soil Water Capacity</span>',
        '<select name="irrtool-soil-select" id="irrtool-soil-select" onchange="soilTypeChanged()">',
        '<option value="high">High (Clay, fine texture)</option>',
        '<option value="medium">Medium (Loam, medium texture)</option>',
        '<option value="low">Low (Sand, coarse texture)</option>',
        '</select>',
        '</form>',
        '</div>',
        '<div id="irrtool-crop-type">',
        '<span class="irrtool-em">Crop Type</span>',
        '<button class="irrtool-crop-type-info" onClick="cropInfoInit()">Crop Type Info</button>',
        '<form>',
        '<select name="irrtool-crop-select" id="irrtool-crop-select" onchange="cropTypeChanged()">',
        '<option value="grass">Grass Reference</option>',
        '<option value="cereals">Cereals</option>',
        '<option value="forages">Forages</option>',
        '<option value="grapes">Grapes (wine)</option>',
        '<option value="legumes">Legumes</option>',
        '<option value="rootstubers">Roots and Tubers</option>',
        '<option value="vegsmallshort">Vegetables (Small) - Short Season</option>',
        '<option value="vegsmalllong">Vegetables (Small) - Long Season</option>',
        '<option value="vegsolanum">Vegetables (Solanum Family)</option>',
        '<option value="vegcucumber">Vegetables (Cucumber Family)</option>',
        //'<option value="corn">Field Corn</option>',
        //'<option value="wheat">Spring Wheat</option>',
        '</select>',
        '</form>',
        '</div>',
        //'<div id="irrtool-irrigation-level">',
        //'<form>',
        //'<span class="irrtool-em">Irrigation Level</span>',
        //'<select name="irrtool-irrigationlevel-select" id="irrtool-irrigationlevel-select" onchange="irrigationLevelChanged()">',
        //'<option value="saturation">irrigate to soil saturation</option>',
        //'<option value="fieldcapacity">irrigate to field capacity</option>',
        //'</select>',
        //'</form>',
        //'</div>',
        //'<div id="irrtool-planting-date"><span class="irrtool-em">Plant/Greenup Date</span>',
        '<div id="irrtool-planting-date"><span class="irrtool-em">Planting/Budbreak</span>',
        '<div id="csftool-planting-date-selector">',
        '<input type="text" size="12" class="input-no-border" id="irrtool-planting-datepicker" disabled="disabled">',
        '</div>',
        '</div>',
        '<div id="irrtool-irrigation-date"><span class="irrtool-em">Last Irrigation Date</span>',
        '<div id="csftool-date-selector">',
        //'<input type="text" size="12" id="csftool-datepicker">',
        '<input type="text" size="12" class="input-no-border" id="csftool-datepicker" placeholder="NONE" disabled="disabled">',
        '</div>',
        '<label id="irrtool-checkbox-label"><input type="checkbox" onclick="startAtIrrigationChanged(this)"> ',
        //(cookie_irrigation_date) ? 'view since irrigation' : 'view entire season',
        (IRR_TOOLVARS.irrigation_date != IRR_TOOLVARS.default_selections.irrigation_date) ? 'view since irrigation' : 'view entire season',
        '</label>',
        '</div>'].join('');
    document.getElementById('user-input').innerHTML = input_html;

    var dialog_address_html = ['<form>',
        '</br>',
        '<table>',
        '<tr>',
        '<td>Street:</td><td><input type="text" size="30" id="irrigation-street"></td>',
        '</tr>',
        '<tr>',
        '<td>City:</td><td><input type="text" size="15" id="irrigation-city"></td>',
        '</tr>',
        '<tr>',
        '<td>State:</td><td><input type="text" size="6" id="irrigation-state"></td>',
        '</tr>',
        '</table>',
        '</form>'].join('');
    document.getElementById('csftool-location-address').innerHTML = dialog_address_html;

    var dialog_coords_html = ['<form>',
        '</br>',
        '<table>',
        '<tr>',
        '<td>Latitude:</td><td><input type="text" size="16" id="irrigation-latitude"></td>',
        '</tr>',
        '<tr>',
        '<td>Longitude:</td><td><input type="text" size="16" id="irrigation-longitude"></td>',
        '</tr>',
        '<table>',
        '</form>'].join('');
    document.getElementById('csftool-location-coords').innerHTML = dialog_coords_html;

    var crop_type_info_html = ['<table>',
        '<tr>',
        '<td><b>Cereals</b></td>',
        '</tr>',
        '<tr>',
        '<td>Corn(Field), Oats, Wheat(Winter)</td>',
        '</tr>',
        '</table>',
        '</br>',
        '<table>',
        '<tr>',
        '<td><b>Forages</b></td>',
        '</tr>',
        '<tr>',
        '<td>Alfalfa Hay, Clover Hay</td>',
        '</tr>',
        '</table>',
        '</br>',
        '<table>',
        '<tr>',
        '<td><b>Legumes</b></td>',
        '</tr>',
        '<tr>',
        '<td>Beans(Green), Peas</td>',
        '</tr>',
        '</table>',
        '</br>',
        '<table>',
        '<tr>',
        '<td><b>Roots and Tubers</b></td>',
        '</tr>',
        '<tr>',
        '<td>Potato, Sweet Potato</td>',
        '</tr>',
        '</table>',
        '</br>',
        '<table>',
        '<tr>',
        '<td><b>Vegetables (Small) - Short Season</b></td>',
        '</tr>',
        '<tr>',
        '<td>Broccoli, Carrots, Lettuce, Spinach</td>',
        '</tr>',
        '</table>',
        '</br>',
        '<table>',
        '<tr>',
        '<td><b>Vegetables (Small) - Long Season</b></td>',
        '</tr>',
        '<tr>',
        '<td>Brussel Sprouts, Cabbage, Cauliflower, Celery, Onions(dry) </td>',
        '</tr>',
        '<table>',
        '</br>',
        '<table>',
        '<tr>',
        '<td><b>Vegetables (Solanum Family)',
        '</tr>',
        '<tr>',
        '<td>Eggplant, Peppers(Bell), Tomato</td>',
        '</tr>',
        '<table>',
        '</br>',
        '<table>',
        '<tr>',
        '<td><b>Vegetables (Cucumber Family)',
        '</tr>',
        '<tr>',
        '<td>Cantaloupe, Cucumber, Pumpkin/Winter Squash, Squash/Zucchini, Sweet Melons, Watermelon</td>',
        '</tr>',
        '</table>'].join('');
    document.getElementById('crop-type-info-message').innerHTML = crop_type_info_html;

    var season_end_message_html = ['<p>',
        '<span style="color:red; font-weight:bold">',
        'Data updates will resume in March for the next growing season.',
        '</span>',
        '</p>',
        '<p>',
        '<span>',
        'Until then, data from the last growing season will remain available. We encourage you to explore the features of this tool using data from this past growing season.',
         '</span>',
        '</p>',
        '<p>',
        '<span>',
        'Thank you!',
        '</span>',
        '</p>'].join('');

    //jQuery("#csftool-current-location").empty().append(IRR_TOOLVARS.city+', '+IRR_TOOLVARS.state);
    jQuery("#csftool-current-location").empty().append(IRR_TOOLVARS.address);
    //jQuery("#csftool-current-lat").empty().append(IRR_TOOLVARS.lat.toFixed(6).toString());
    //jQuery("#csftool-current-lon").empty().append(IRR_TOOLVARS.lon.toFixed(6).toString());
    jQuery("#csftool-current-lat").empty().append(IRR_TOOLVARS.lat.toFixed(2).toString());
    jQuery("#csftool-current-lon").empty().append(IRR_TOOLVARS.lon.toFixed(2).toString());

    //jQuery('input[id="irrigation-street"]').val(IRR_TOOLVARS.street);
    //jQuery('input[id="irrigation-city"]').val(IRR_TOOLVARS.city);
    //jQuery('input[id="irrigation-state"]').val(IRR_TOOLVARS.state);
    //jQuery('input[id="irrigation-latitude"]').val(IRR_TOOLVARS.lat);
    //jQuery('input[id="irrigation-longitude"]').val(IRR_TOOLVARS.lon);

    jQuery(".change-location").button({
       icons: { primary: "ui-icon-pencil" },
       text: false
    });

    jQuery("#irrtool-crop-type-info-dialog").dialog( { modal:true, autoOpen:false } );
    jQuery(".irrtool-crop-type-info").button({
       icons: { primary: "ui-icon-info" },
       text: false
    });

    jQuery('select[name="irrtool-soil-select"]').find('option[value="'+IRR_TOOLVARS.soilcapacity+'"]').prop("selected",true);
    jQuery('select[name="irrtool-soil-select"]').val(IRR_TOOLVARS.soilcapacity);

    jQuery('select[name="irrtool-crop-select"]').find('option[value="'+IRR_TOOLVARS.croptype+'"]').prop("selected",true);
    jQuery('select[name="irrtool-crop-select"]').val(IRR_TOOLVARS.croptype);

    jQuery('select[name="irrtool-irrigationlevel-select"]').find('option[value="'+IRR_TOOLVARS.irrigationlevel+'"]').prop("selected",true);
    jQuery('select[name="irrtool-irrigationlevel-select"]').val(IRR_TOOLVARS.irrigationlevel);

    jQuery("#csftool-datepicker").datepicker({
            //minDate: new Date(2015,4,1),
            //maxDate: new Date(2015,7,15),
            autoclose: true,
            beforeShow: function() {
                jQuery("ui-datepicker-div").hide();
                jQuery("csftool-date-selector").append(jQuery("#ui-datepicker-div"));
                //jQuery('#ui-datepicker-div').maxZIndex();
            },
            //maxDate: "+0D",
            maxDate: (IRR_TOOLVARS.date_today > IRR_TOOLVARS.last_date_of_season) ? IRR_TOOLVARS.last_date_of_season : IRR_TOOLVARS.date_today,
            constrainInput: true,
            showButtonPanel: false,
            showOn: "button",
            //buttonImage: "http://tools.climatesmartfarming.org/csftool/icons/calendar-24x24.png",
            //buttonImageOnly: true,
            buttonText: "Change irrigation date",
            dateFormat: "mm/dd/yy",
            showAnim: "clip",
            onSelect: function(dateText, inst) { 
                irrigationDateChanged(dateText, inst)
                //IRR_TOOLVARS.irrigation_date = dateText; 
                //createCookie("irr_date",dateText,14)
                //displayOutput();
            },
    })
    .next('button').button({
        icons: {
            primary: 'ui-icon-pencil'
        }, text: false
    });

    jQuery("#irrtool-planting-datepicker").datepicker({
            autoclose: true,
            beforeShow: function() {
                jQuery("ui-datepicker-div").hide();
                jQuery("csftool-planting-date-selector").append(jQuery("#ui-datepicker-div"));
            },
            //maxDate: "+0D",
            maxDate: (IRR_TOOLVARS.date_today > IRR_TOOLVARS.last_date_of_season) ? IRR_TOOLVARS.last_date_of_season : IRR_TOOLVARS.date_today,
            constrainInput: true,
            showButtonPanel: false,
            showOn: "button",
            buttonText: "Change planting date",
            dateFormat: "mm/dd/yy",
            showAnim: "clip",
            onSelect: function(dateText, inst) { 
                plantingDateChanged(dateText, inst)
            },
    })
    .next('button').button({
        icons: {
            primary: 'ui-icon-pencil'
        }, text: false
    });

    //var cookie_irrigation_date = readCookie('irr_date');
    //if (cookie_irrigation_date) {
    if (IRR_TOOLVARS.irrigation_date != IRR_TOOLVARS.default_selections.irrigation_date) {
        jQuery("#csftool-datepicker").datepicker("setDate", IRR_TOOLVARS.irrigation_date);
        jQuery('#irrtool-checkbox-label').empty().append('<input type="checkbox" onclick="startAtIrrigationChanged(this)"> view since irrigation');
    } else {
    }
    jQuery("#irrtool-planting-datepicker").datepicker("setDate", IRR_TOOLVARS.planting_date);

    //var dateToday = new Date();
    //var thisMonth = dateToday.getMonth();
    var thisMonth = IRR_TOOLVARS.date_today.getMonth();

    // if the current month is not in the growing season (Nov, Dec, Jan or Feb), and the end-of-season message hasn't been viewed in the past 12 hours, then make sure end of season message is display when page is loaded.
    if ( !(readCookie("irr_seasonendmessage")) && jQuery.inArray(thisMonth,[0,1,10,11])!=-1 ) {

      document.getElementById('season-end-message').innerHTML = season_end_message_html;

      jQuery("#irrtool-season-end-message-dialog").dialog({
        modal:false,
        autoOpen:true,
        height: 400,
        width: 700,
        position: { 'my': 'center', 'at': 'center', of: window, collision: "none" },
        create: function (event, ui) {
            jQuery(event.target).parent().css('position', 'fixed');
        },
        buttons: {
            "OK": function() {
                jQuery(this).dialog("destroy").remove()
            }
        }
      });

      // We don't want to bother the user too much.
      //Create a cookie so we know whether or not they've seen the end-of-season message in the past 12 hours.
      createCookie("irr_seasonendmessage",1,0.5)

    }

    getDataForLocation();

    // new map dialog initialization
    //var default_location = {address:"Cornell University, Ithaca, NY", lat:42.45, lng:-76.48, id:"default"};
    //var options = { width:600, height:500, google:google, default:default_location };
    var options = { width:600, height:500, google:google, default:IRR_TOOLVARS.default_location };
    jQuery("#csftool-location-dialog").CsfToolLocationDialog(options);
    var map_dialog = jQuery("#csftool-location-dialog").CsfToolLocationDialog();
    IRR_TOOLVARS.map_dialog = map_dialog;

    // Read saved locations and initialize the locations for use with tool
    var locations = IRR_TOOLVARS.manage_local_storage("read");
    if (locations != {}) {
        IRR_TOOLVARS.locations = locations
    } else {
        //load default locations
        var defaultID = IRR_TOOLVARS.default_location.id;
        IRR_TOOLVARS.locations = { defaultID: jQuery.extend({},IRR_TOOLVARS.default_location,IRR_TOOLVARS.default_selections) };
        IRR_TOOLVARS.location_id = defaultID;
    }

    map_dialog("bind", "close", function(ev, context) {
        if (context.selected_location != context.initial_location) {
            var loc_obj = context.selected_location;
            IRR_TOOLVARS.lat = loc_obj.lat;
            IRR_TOOLVARS.lon = loc_obj.lng;
            IRR_TOOLVARS.address = loc_obj.address;
            IRR_TOOLVARS.location_id = loc_obj.id;
            //getDataForLocation();
            // update user interface
            jQuery("#csftool-current-location").empty().append(IRR_TOOLVARS.address);
            jQuery("#csftool-current-lat").empty().append(IRR_TOOLVARS.lat.toFixed(2).toString());
            jQuery("#csftool-current-lon").empty().append(IRR_TOOLVARS.lon.toFixed(2).toString());
            // selected ID
            var selectedID = loc_obj.id
        } else {
            var selectedID = context.initial_location.id
        }

        IRR_TOOLVARS.locations_old = jQuery.extend({},IRR_TOOLVARS.locations);
        jQuery.each(context.all_locations, function(id,loc) {
            if (jQuery.inArray(id, Object.keys(IRR_TOOLVARS.locations)) != -1) {
                IRR_TOOLVARS.locations[id] = jQuery.extend({}, IRR_TOOLVARS.locations[id], context.all_locations[id]);
            } else {
                IRR_TOOLVARS.locations[id] = jQuery.extend({}, context.all_locations[id]);
            };
        });

        var existingKeys = Object.keys(IRR_TOOLVARS.locations[IRR_TOOLVARS.location_id])
        if (jQuery.inArray('planting_date', existingKeys) != -1) {
            IRR_TOOLVARS.planting_date = IRR_TOOLVARS.locations[IRR_TOOLVARS.location_id]['planting_date']
            jQuery("#irrtool-planting-datepicker").datepicker("setDate", IRR_TOOLVARS.planting_date);
        } else {
            IRR_TOOLVARS.locations[IRR_TOOLVARS.location_id]['planting_date'] = IRR_TOOLVARS.default_selections.planting_date
        }
        if (jQuery.inArray('irrigation_date', existingKeys) != -1) {
            IRR_TOOLVARS.irrigation_date = IRR_TOOLVARS.locations[IRR_TOOLVARS.location_id]['irrigation_date']
            jQuery("#csftool-datepicker").datepicker("setDate", IRR_TOOLVARS.irrigation_date);
        } else {
            IRR_TOOLVARS.locations[IRR_TOOLVARS.location_id]['irrigation_date'] = IRR_TOOLVARS.default_selections.irrigation_date
        }
        if (jQuery.inArray('soilcapacity', existingKeys) != -1) {
            IRR_TOOLVARS.soilcapacity = IRR_TOOLVARS.locations[IRR_TOOLVARS.location_id]['soilcapacity']
            jQuery('select[name="irrtool-soil-select"]').find('option[value="'+IRR_TOOLVARS.soilcapacity+'"]').prop("selected",true);
            jQuery('select[name="irrtool-soil-select"]').val(IRR_TOOLVARS.soilcapacity);
        } else {
            IRR_TOOLVARS.locations[IRR_TOOLVARS.location_id]['soilcapacity'] = IRR_TOOLVARS.default_selections.soilcapacity
        }
        if (jQuery.inArray('croptype', existingKeys) != -1) {
            IRR_TOOLVARS.croptype = IRR_TOOLVARS.locations[IRR_TOOLVARS.location_id]['croptype']
            jQuery('select[name="irrtool-crop-select"]').find('option[value="'+IRR_TOOLVARS.croptype+'"]').prop("selected",true);
            jQuery('select[name="irrtool-crop-select"]').val(IRR_TOOLVARS.croptype);
        } else {
            IRR_TOOLVARS.locations[IRR_TOOLVARS.location_id]['croptype'] = IRR_TOOLVARS.default_selections.croptype
        }

        if (IRR_TOOLVARS.irrigation_date != IRR_TOOLVARS.default_selections.irrigation_date) {
            jQuery('#irrtool-checkbox-label').empty().append('<input type="checkbox" onclick="startAtIrrigationChanged(this)"> view since irrigation');
        } else {
            jQuery('#csftool-datepicker').val(jQuery('#csftool-datepicker').attr("placeholder","NONE"))
            jQuery('#irrtool-checkbox-label').empty().append('<input type="checkbox" onclick="startAtIrrigationChanged(this)"> view entire season');
        }

        // always display chart since last recharge
        IRR_TOOLVARS.chartstart = 'recharge';

        // get data for updated location info
        if (context.selected_location != context.initial_location) { getDataForLocation() };

        // WRITE LOCATIONS THE USER HAS SAVED
        IRR_TOOLVARS.manage_local_storage("write", IRR_TOOLVARS.locations, selectedID);

        // REMOVE LOCATIONS THE USER HAS DELETED
        var idsToDelete = IRR_TOOLVARS.manage_local_storage("getIdsToDelete", context.all_locations);
        IRR_TOOLVARS.manage_local_storage("delete", idsToDelete);
    });
}


// DISPLAY SCRIPTS

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function runWaterDeficitModel(precip,pet,initDeficit,startDate) {
    // A simple water deficit model, including daily precipitation, PET and soil drainage.
    // Deficit is a negative number, bound by zero and the maximum soil capacity at saturation.
    var deficit = null;
    var deficitDaily = [];
    var deficitDailyChange = [];
    var drainageDaily = [];
    var runoffDaily = [];
    var petDaily = [];
    var dailyDrainageRate = null;
    var totalDailyDrainage = null;
    var totalDailyRunoff = null;
    var totalDailyPET = null;
    var hourlyPrecip = null;
    var hourlyPET = null;
    var hourlyDrainage = null;
    var hourlyPotentialDrainage = null;
    var daysSincePlanting = null;
    var Ks = null;
    var Kc = null;

    // Initialize deficit
    //   : to zero if saturated soil after irrigation)
    //   : to last observed deficit if running for forecasts
    deficit = initDeficit;
    //deficit = initDeficit - IRR_TOOLVARS.soilmoisture.saturation + IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel];
    // The first day in our array will be zero (this is the last irrigation day)
    deficitDaily.push(deficit);
    deficitDailyChange.push(null);
    drainageDaily.push(null);
    runoffDaily.push(null);
    petDaily.push(null);
    // Calculate daily drainage rate that occurs when soil water content is between saturation and field capacity
    dailyDrainageRate = (IRR_TOOLVARS.soilmoisture.saturation - IRR_TOOLVARS.soilmoisture.fieldcapacity)/IRR_TOOLVARS.soildrainage.daysToDrainToFcFromSat;

    // Need to know the number of days since planting for crop coefficient calculation
    // If the number is negative, assuming Kc = Kcini for bare soil and single crop coeff method (FAO-56)
    daysSincePlanting =  Math.floor(( Date.parse(startDate) - Date.parse(IRR_TOOLVARS.planting_date) ) / 86400000);
    //daysSincePlanting =  Math.floor(( Date.parse(IRR_TOOLVARS.irrigation_date) - Date.parse(IRR_TOOLVARS.planting_date) ) / 86400000);

    // Loop through all days since last irrigation
    for (var idx=1; idx < pet.length; idx++) {
        // Calculate Ks, the water stress coefficient, using antecedent deficit
        Ks = getWaterStressCoeff(deficitDaily[idx-1]);
        daysSincePlanting += 1
        Kc = getSingleCropCoeff(daysSincePlanting);
        // Convert daily rates to hourly rates. For this simple model, rates are constant throughout the day.
        // For drainage : this assumption is okay
        // For precip   : this assumption is about all we can do without hourly observations
        // For PET      : this assumption isn't great. Something following diurnal cycle would be best.
        hourlyPrecip = precip[idx]/24.
        hourlyPET = pet[idx]*Kc*Ks/24.
        hourlyPotentialDrainage = dailyDrainageRate/24.
        totalDailyDrainage = 0.
        totalDailyRunoff = 0.
        totalDailyPET = 0.
        for (var hr=1; hr<=24; hr++) {
            // Calculate hourly drainage estimate. It is bounded by the potential drainage rate and available
            // water in excess of the field capacity. We assume drainage does not occur below field capacity.
            if ( deficit > (IRR_TOOLVARS.soilmoisture.fieldcapacity - IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) ) {
                //hourlyDrainage = Math.min(IRR_TOOLVARS.soilmoisture.saturation+deficit-IRR_TOOLVARS.soilmoisture.fieldcapacity, hourlyPotentialDrainage)
                hourlyDrainage = Math.min(deficit - (IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]), hourlyPotentialDrainage)
            } else {
                hourlyDrainage = 0.
            }
            totalDailyDrainage -= hourlyDrainage

            // calculate runoff that occurs
            totalDailyRunoff -= Math.max(
                deficit + hourlyPrecip - hourlyPET - hourlyDrainage - (IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]),
                0.
            )

            // Adjust deficit based on hourly water budget.
            // deficit is bound by saturation (soil can't be super-saturated). This effectively reduces deficit by hourly runoff as well.
            deficit = Math.min( deficit + hourlyPrecip - hourlyPET - hourlyDrainage, IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])

            // calculate PET that occurs
            totalDailyPET -= hourlyPET

            //if (deficit < -1.*(IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]-IRR_TOOLVARS.soilmoisture.wiltingpoint)) {
            //    console.log(deficit, hourlyPrecip, hourlyPET, hourlyDrainage)
            //} else {
            //}

            // deficit is bound by wilting point, but calculations should never reach wilting point based on this model.
            // bound it anyway.
            deficit = Math.max( deficit , -1.*(IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]-IRR_TOOLVARS.soilmoisture.wiltingpoint))
            // deficit is bound by maximum soil capacity (soil is bone dry)
            //deficit = Math.max( deficit , -1.*IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])

        }

        deficitDailyChange.push(deficit-deficitDaily[deficitDaily.length-1]);
        deficitDaily.push(deficit);
        drainageDaily.push(totalDailyDrainage);
        runoffDaily.push(totalDailyRunoff);
        petDaily.push(totalDailyPET);
    }

    return {'deficitDailyChange':deficitDailyChange, 'deficitDaily':deficitDaily, 'drainageDaily':drainageDaily, 'runoffDaily':runoffDaily, 'petDaily':petDaily}
}

// datepart: 'y', 'm', 'w', 'd', 'h', 'n', 's'
function dateDiff(datepart, fromdate, todate) {	
    datepart = datepart.toLowerCase();	
    var diff = todate - fromdate;	
    var divideBy = { w:604800000, 
                   d:86400000, 
                   h:3600000, 
                   n:60000, 
                   s:1000 };	
  
    return Math.floor( diff/divideBy[datepart]);
}

function getDeficitColor(d) {
    // return color to use for deficit table value
    var col = null;
    if (d>IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel] &&
        d<=IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) {
        // Green
        col = "rgba(0,128,0,0.5)";
    } else if (d>IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel] &&
        d<=IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) {
        // Yellow
        col = "rgba(255,255,0,0.5)";
    } else if (d>IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel] &&
        d<=IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) {
        // Orange
        col = "rgba(255,128,0,0.5)";
    } else if (d<=IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) {
        // Red
        col = "rgba(255,0,0,0.5)";
    } else {
        // No color
        col = null;
        //col = "rgb(0,0,0)";
    }

    return col;
}

function displayResults(d,t,f,deficit,deficitfcst) {
    var results = null;
    var f1 = '';
    var f2 = '';
    var f3 = '';
    var deficit1 = '';
    var deficit2 = '';
    var deficit3 = '';
    var deficitResults = [];

    var deficit0 = (deficit < 0) ? deficit.toFixed(2).toString()+'"' : "None"

    for (var idx=0; idx<f.length; idx++) {
        deficitResults.push( deficitfcst[idx+1]<0 ? deficitfcst[idx+1].toFixed(2).toString()+'"' : "None" )
    }

    if (f.length==0) {
        // all values remain null
    } else if (f.length==1) {
        f1 = f[0]+'*';
        deficit1 = deficitResults[0];
    } else if (f.length==2) {
        f1 = f[0]+'*';
        f2 = f[1]+'*';
        deficit1 = deficitResults[0];
        deficit2 = deficitResults[1];
    } else if (f.length>=3) {
        f1 = f[0]+'*';
        f2 = f[1]+'*';
        f3 = f[2]+'*';
        deficit1 = deficitResults[0];
        deficit2 = deficitResults[1];
        deficit3 = deficitResults[2];
    } else {
        // all values remain null
    }

    //format color of table values
    jQuery("#forecast-table-today").css("backgroundColor",getDeficitColor(deficit));
    jQuery("#forecast-table-fcst1").css("backgroundColor",getDeficitColor(deficitfcst[1]));
    jQuery("#forecast-table-fcst2").css("backgroundColor",getDeficitColor(deficitfcst[2]));
    jQuery("#forecast-table-fcst3").css("backgroundColor",getDeficitColor(deficitfcst[3]));

    //console.log('Inside displayResults');

}

function createChart(d,t,seriesDates,seriesDeficit) {
    // create series only for chart coloring purposes
    var seriesDeficitAboveFieldCapacity = [];
    for (var idx=0; idx<seriesDeficit.length; idx++) {
        if (seriesDeficit[idx]>(IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture.saturation)) {
            seriesDeficitAboveFieldCapacity.push(seriesDeficit[idx]);
        } else {
            seriesDeficitAboveFieldCapacity.push(IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture.saturation);
        }
    }

    jQuery('#chart-output-1').highcharts({
        chart: {
            spacingBottom: 0,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 0,
            // demo start
            width: 679
            //width: 540
            // demo end
        },
        title: {
            text: '*** PROTOTYPE ***',
            //text: 'Water deficit since last irrigation on '+d,
            style: {
                color: 'red'
            },
            margin: 20,
            x: 10 //center
        },
        subtitle: {
            text: 'Water deficit since last irrigation on '+d,
            style: {
                fontSize: '1.4em'
            },
            margin: 20,
            x: 10 //center
        },
        //title: {
        //    text: 'Water deficit since last irrigation on '+d,
        //    margin: 20,
        //    x: 10 //center
        //},
        xAxis: {
            title: {
                text: 'Observed dates since last irrigation'
            },
            categories: seriesDates,
            crosshair: true,
            labels: {
              rotation: 270,
            },
        },
        yAxis: {
            min: 0.0-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
            max: IRR_TOOLVARS.soilmoisture.saturation - IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
            //min: 0.0-IRR_TOOLVARS.soilmoisture.saturation,
            //max: 0.0,
            gridLineWidth: 0,
            tickLength: 8,
            tickWidth: 1,
            tickPosition: 'outside',
            tickInterval: 0.5,
            lineWidth: 1,
            labels: {
                format: '{value:.1f}',
            },
            title: {
                text: 'Water content relative to irrigation level (in/ft soil)',
                //text: 'Inches of water',
                //margin: 20,
            },
            plotBands: [{
                color: 'rgba(0,128,0,0.3)',
                from: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'No deficit for plant',
                    style: {
                        fontSize: '1.2em',
                        color: 'gray'
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
            },{
                color: 'rgba(255,255,0,0.3)',
                from: IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'Deficit, no plant stress',
                    style: {
                        fontSize: '1.2em',
                        color: 'gray'
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
            },{
                color: 'rgba(255,128,0,0.3)',
                //color: 'rgba(222,184,135,0.8)',
                from: IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'Deficit, plant stress likely',
                    style: {
                        fontSize: '1.2em',
                        color: 'gray'
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
            },{
                color: 'rgba(255,0,0,0.3)',
                //color: 'rgba(102,51,0,0.5)',
                from: 0.0-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'Deficit, severe plant stress',
                    style: {
                        fontSize: '1.2em',
                        color: 'gray'
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
            }],
            plotLines: [{
                value: IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                //value: 0,
                //value: -1.*IRR_TOOLVARS.soilmoisture.saturation,
                width: 0.1,
                color: '#808080',
                label: {
                    text: 'Saturation',
                    style: {
                        fontSize: '0.8em'
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                },
                zIndex: 6,
            },{
                value: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                width: 0.1,
                color: '#808080',
                label: {
                    text: 'Field Capacity',
                    style: {
                        fontSize: '0.8em'
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                },
                zIndex: 6,
            },{
                value: IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                width: 0.1,
                color: '#808080',
                label: {
                    text: 'Plant Stress Begins',
                    style: {
                        fontSize: '0.8em'
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                },
                zIndex: 6,
            },{
                value: IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                width: 0.1,
                color: '#808080',
                label: {
                    text: 'Wilting Point',
                    style: {
                        fontSize: '0.8em'
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                },
                zIndex: 6,
            },{
                value: 0,
                width: 2,
                color: '#000000',
                dashStyle: 'Dash',
                label: {
                    text: 'Irrigation Level',
                    style: {
                        fontSize: '1.0em',
                        fontWeight: 'bold'
                    },
                    align: 'center',
                    //x: -4,
                    y: (IRR_TOOLVARS.irrigationlevel=='saturation') ? 12 : -4,
                },
                zIndex: 6,
            }]
        },
        tooltip: {
            enabled: true,
            valueSuffix: '"',
            valueDecimals: 2
        },
        legend: {
            enabled: false
        },
        series: [{
            type: 'area',
            name: 'Deficit',
            color: (IRR_TOOLVARS.irrigationlevel=='fieldcapacity') ? 'rgba(0,128,0,0.8)' : 'transparent',
            threshold: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
            negativeColor: 'rgba(255,255,0,0.8)',
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 4
            },
            lineWidth: 0,
            data: seriesDeficit,
            enableMouseTracking: false
        },{
            type: 'area',
            name: 'Deficit',
            color: 'transparent',
            threshold: IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
            negativeColor: 'rgba(255,128,0,0.8)',
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 4
            },
            lineWidth: 0,
            data: seriesDeficit,
            enableMouseTracking: false
        },{
            type: 'area',
            name: 'Deficit',
            color: 'transparent',
            threshold: IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
            negativeColor: 'rgba(255,0,0,0.8)',
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 4
            },
            lineWidth: 0,
            data: seriesDeficit,
            enableMouseTracking: false
        },{
            type: 'area',
            name: 'Deficit',
            negativeColor: (IRR_TOOLVARS.irrigationlevel=='fieldcapacity') ? 'transparent' : 'rgba(0,128,0,0.8)',
            threshold: IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
            //threshold: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture.saturation,
            color: 'transparent',
            lineWidth: 0,
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 4
            },
            data: seriesDeficitAboveFieldCapacity,
            enableMouseTracking: false
        },{
            type: 'line',
            name: 'Deficit',
            color: 'rgba(0,0,0,0.8)',
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 4
            },
            lineWidth: 2,
            data: seriesDeficit,
        }]
    });
}

function createChartFcst(d,t,seriesDates,seriesDeficit,seriesDeficitFcst) {
    // for tooltip persistence
    (function (H) {
        H.wrap(H.Tooltip.prototype, 'hide', function () {});
    }(Highcharts));

    // find index of latest recharge to field capacity (via irrigation or natural)
    var lastIdxAboveFieldCapacity = 0;
    for (var idx=0; idx<seriesDeficit.length; idx++) {
        //console.log(seriesDeficit[idx],IRR_TOOLVARS.soilmoisture.fieldcapacity);
        if (seriesDeficit[idx]>=(IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) {
            lastIdxAboveFieldCapacity = idx
        } else {
        }
    }

    // determine user preference on first date to display. There are two options:
    // 1) if user chooses to display since last irrigation, firstIdxToDisplay = 0
    // 2) if user chooses to display since last recharge, firstIdxToDisplay = lastIdxAboveFieldCapacity
    if (IRR_TOOLVARS.chartstart == 'irrigation') {
        var firstIdxToDisplay = 0
    } else if (IRR_TOOLVARS.chartstart == 'recharge') {
        var firstIdxToDisplay = lastIdxAboveFieldCapacity
    } else {
    }

    var preprocessMarkerColors = function (data) {
        var nData = [];
        for (var i = 0; i < data.length; i++) {
            if ((data[i] <= IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (data[i] > IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) {
                colorUse = 'rgba(0,128,0,0.8)'
            } else if ((data[i] <= IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (data[i] > IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) {
                colorUse = 'rgba(255,255,0,0.8)'
            } else if ((data[i] <= IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (data[i] > IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) {
                colorUse = 'rgba(255,128,0,0.8)'
            } else if ((data[i] <= IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (data[i] > 0.0-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) {
                colorUse = 'rgba(255,0,0,0.8)'
            } else {
                colorUse = null
            }
            nData.push({
                y: data[i],
                //x: i,
                fillColor: colorUse,
                color: colorUse
            })
        }
        return nData;
    }

    // this year
    var thisYear = parseInt(IRR_TOOLVARS.irrigation_date.split('/')[2]);
    var numberOfPointsToDisplay = seriesDeficit.length - firstIdxToDisplay + seriesDeficitFcst.length - 1

    jQuery('#chart-output-2').highcharts({
        chart: {
            spacingBottom: 0,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 0,
            //demo start
            width: 679,
            //width: 540
            //demo end
            events: {
                load: function(){
                    //show tooltip on today's value
                    var p = this.series[0].points[seriesDeficit.length-1];
                    //console.log(p);
                    this.tooltip.refresh(p);
                }
            }
        },
        title: {
            //text: '*** PROTOTYPE ***',
            //text: 'Water deficit since last irrigation on '+d,
            //text: (IRR_TOOLVARS.chartstart=='recharge') ? 'Water deficit since last '+IRR_TOOLVARS.chartstart+' to field capacity' : (readCookie('irr_date')) ? 'Water deficit since last '+IRR_TOOLVARS.chartstart : 'Water deficit since March 1',
            text: (IRR_TOOLVARS.chartstart=='recharge') ? 'Water deficit since last '+IRR_TOOLVARS.chartstart+' to field capacity' : (IRR_TOOLVARS.irrigation_date != IRR_TOOLVARS.default_selections.irrigation_date) ? 'Water deficit since last '+IRR_TOOLVARS.chartstart : 'Water deficit since March 1',
            //text: (cookie_irrigation_date) ? 'Water deficit since last '+IRR_TOOLVARS.chartstart+' to field capacity' : 'Water deficit since March 1',
            //style: {
            //    color: 'red'
            //},
            margin: 5,
            x: 10 //center
        },
        //subtitle: {
        //    text: 'Water deficit since last irrigation on '+d,
        //    style: {
        //        fontSize: '1.4em'
        //    },
        //    margin: 20,
        //    x: 10 //center
        //},
        credits: {
            enabled: false,
        },
        //title: {
        //    text: 'Water deficit since last irrigation on '+d,
        //    margin: 20,
        //    x: 10 //center
        //},
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { millisecond: '%H:%M:%S.%L', second: '%H:%M:%S', minute: '%H:%M', hour: '%H:%M', day: '%d %b', week: '%d %b', month: '%b<br/>%Y', year: '%Y' },
            min: Date.UTC(thisYear,parseInt(seriesDates[firstIdxToDisplay].split('/')[0])-1,parseInt(seriesDates[firstIdxToDisplay].split('/')[1])),
            //min: Date.UTC(thisYear,parseInt(seriesDates[lastIdxAboveFieldCapacity].split('/')[0])-1,parseInt(seriesDates[lastIdxAboveFieldCapacity].split('/')[1])),
            //title: {
            //    text: 'Observed dates since last irrigation'
            //},
            //categories: seriesDates,
            //crosshair: true,
            labels: {
              rotation: 0,
              style: {
                  color: '#000000',
              }
            },
            plotLines: [{
                value: Date.UTC(thisYear,parseInt(seriesDates[seriesDeficit.length-1].split('/')[0])-1,parseInt(seriesDates[seriesDeficit.length-1].split('/')[1])),
                //value: seriesDeficit.length-1,
                width: 2,
                color: '#FF0000',
                dashStyle: 'shortdash',
                label: {
                    text: seriesDates[seriesDeficit.length-1],
                    align: (numberOfPointsToDisplay>8) ? 'left' : 'right',
                    verticalAlign: (numberOfPointsToDisplay>8) ? 'bottom' : 'top',
                    rotation: 0,
                    style: {
                        fontSize: '1.0em'
                    }, 
                    //x: -42,
                    //y: 10
                    x: (numberOfPointsToDisplay>8) ? -42 : 42,
                    y: (numberOfPointsToDisplay>8) ? -10 : 20
                },
            }]
            //plotBands: [{
            //    color: 'rgba(100,100,100,0.3)',
            //    from: seriesDates.length-seriesDeficitFcst.length,
            //    to: seriesDates.length-1,
            //    label: {
            //        text: 'F O R E C A S T',
            //        rotation: 270,
            //        style: {
            //            fontSize: '1.2em',
            //            color: 'rgba(0,0,0,0.5)'
            //        },
            //        align: 'left',
            //        verticalAlign: 'bottom',
            //        //x: 10,
            //        y: -5
            //    },
            //}],
        },
        yAxis: {
            min: IRR_TOOLVARS.soilmoisture.wiltingpoint - IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel] - 0.3,
            //max: Math.max(IRR_TOOLVARS.soilmoisture.fieldcapacity - IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel] + 0.3, Math.max.apply(null, seriesDeficit)+0.1),
            max: Math.max(IRR_TOOLVARS.soilmoisture.fieldcapacity - IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel] + 0.3, Math.max.apply(null, seriesDeficit)),
            gridLineWidth: 0,
            tickLength: 8,
            tickWidth: 1,
            tickPosition: 'outside',
            tickInterval: 0.5,
            lineWidth: 1,
            labels: {
                format: '{value:.1f}',
                style: {
                    color: '#000000',
                }
            },
            title: {
                text: 'Water Deficit (in/ft soil)',
                //text: 'Water content relative to field capacity (in/ft soil)',
                //text: 'Water content relative to irrigation level (in/ft soil)',
                //text: 'Soil water content relative to irrigation level (In)',
                //text: 'Inches of water',
                style: {
                    color: '#000000',
                }
            },
            plotBands: [{
                //color: 'rgba(0,128,0,0.3)',
                color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] > IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'rgba(0,128,0,0.5)': 'transparent',
                from: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'No deficit for plant',
                    style: {
                        fontSize: '1.2em',
                        color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'black' : 'gray',
                        fontWeight: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'bold' : 'lighter',
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
                //zIndex: 5,
            },{
                //color: 'rgba(255,255,0,0.3)',
                color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] > IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'rgba(255,255,0,0.3)': 'transparent',
                from: IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'Deficit, no plant stress',
                    style: {
                        fontSize: '1.2em',
                        color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'black' : 'gray',
                        fontWeight: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'bold' : 'lighter',
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
                //zIndex: 5,
            },{
                //color: 'rgba(255,128,0,0.3)',
                color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] > IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'rgba(255,128,0,0.3)': 'transparent',
                from: IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'Deficit, plant stress likely',
                    style: {
                        fontSize: '1.2em',
                        color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'black' : 'gray',
                        fontWeight: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'bold' : 'lighter',
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
                //zIndex: 5,
            },{
                //color: 'rgba(255,128,0,0.3)',
                color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] > IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'rgba(255,0,0,0.3)': 'transparent',
                from: IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'Deficit, severe plant stress',
                    style: {
                        fontSize: '1.2em',
                        color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'black' : 'gray',
                        fontWeight: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'bold' : 'lighter',
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
                //zIndex: 5,
            },{
                //color: 'rgba(255,0,0,0.3)',
                color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] > 0.0-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'rgba(255,0,0,0.5)': 'transparent',
                from: 0.0-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: '',
                    //text: 'Deficit, severe plant stress',
                    style: {
                        fontSize: '1.2em',
                        color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= 0.0-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'black' : 'gray',
                        fontWeight: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= 0.0-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'bold' : 'lighter',
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
                //zIndex: 5,
            }],
            plotLines: [{
                value: IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                //value: 0,
                //value: -1.*IRR_TOOLVARS.soilmoisture.saturation,
                width: 1.0,
                color: '#808080',
                label: {
                    text: 'Saturation',
                    style: {
                        fontSize: '0.8em',
                        color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'black' : 'gray',
                        fontWeight: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'bold' : 'lighter',
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                },
                zIndex: 6,
            },{
                value: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                width: 1.0,
                color: '#808080',
                label: {
                    text: 'Field Capacity',
                    style: {
                        fontSize: '0.8em',
                        color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'black' : 'gray',
                        fontWeight: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'bold' : 'lighter',
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                },
                zIndex: 6,
            },{
                value: IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                width: 1.0,
                color: '#808080',
                label: {
                    text: 'Plant Stress Begins',
                    style: {
                        fontSize: '0.8em',
                        color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'black' : 'gray',
                        fontWeight: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'bold' : 'lighter',
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                },
                zIndex: 6,
            },{
                value: IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                width: 1.0,
                color: '#808080',
                label: {
                    text: 'Wilting Danger Exists',
                    style: {
                        fontSize: '0.8em',
                        color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'black' : 'gray',
                        fontWeight: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'bold' : 'lighter',
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                },
                zIndex: 6,
            //},{
            //    value: IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
            //    width: 1.0,
            //    color: '#808080',
            //    label: {
            //        text: 'Wilting Point',
            //        style: {
            //            fontSize: '0.8em',
            //            color: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= 0.0-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'black' : 'gray',
            //            fontWeight: ((seriesDeficit[seriesDeficit.length-1] <= IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (seriesDeficit[seriesDeficit.length-1] >= 0.0-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) ? 'bold' : 'lighter',
            //        },
            //        align: 'right',
            //        x: -4,
            //        y: 12
            //    },
            //    zIndex: 6,
            //},{
            //    value: 0,
            //    width: 2,
            //    color: '#000000',
            //    dashStyle: 'Dash',
            //    label: {
            //        text: 'Irrigation Level',
            //        style: {
            //            fontSize: '1.0em',
            //            fontWeight: 'bold'
            //        },
            //        align: 'center',
            //        //x: -4,
            //        y: (IRR_TOOLVARS.irrigationlevel=='saturation') ? 12 : -4,
            //    },
            //    zIndex: 6,
            }]
        },
        tooltip: {
            backgroundColor: 'transparent',
            borderColor: 'black',
            borderRadius: 1,
            borderWidth: 0,
            shadow: false,
            style: {
                padding: 0,
                fontSize: '12px',
            },

            crosshairs: [{
                width: 1,
                color: 'gray',
                dashStyle: 'solid'
            },{
                width: 1,
                color: 'transparent',
                dashStyle: 'solid'
            }],
            useHTML: true,
            formatter: function() {
                var selected_bg_color = null
                var recent_bg_color = null
                var date_label = null
                var label_color = null
                selected_bg_color = getDeficitColor(this.point.y)
                date_label = (this.series.name == 'Deficit') ? 'Observed on' : 'Forecasted for'
                label_color = (this.series.name == 'Deficit') ? 'rgba(0,0,255,1.0)' : 'rgba(255,0,0,1.0)'
                var deficit_value = null
                deficit_value = (this.point.y < 0.00) ? Highcharts.numberFormat(this.point.y,2)+'"' : 'NONE ('+Highcharts.numberFormat(this.point.y,2)+'" surplus)'
                var s = [];
                s.push('<div>')
                s.push('<table cellpadding="4">')
                s.push('<tr>')
                s.push('<td>')
                s.push('<span style="font-weight:bold; color:'+label_color+';">'+date_label+': </span>')
                s.push('</td>')
                s.push('<td>')
                s.push('<b>'+Highcharts.dateFormat('%m/%d/%Y', this.x)+' @ 8AM</b>')
                s.push('</td>')
                s.push('</tr>')
                s.push('<tr>')
                s.push('<td>')
                s.push('<span style="font-weight:bold; color:'+label_color+';">Water Deficit: </span>')
                s.push('</td>')
                s.push('<td>')
                //s.push('<span style="background-color:'+selected_bg_color+'">'+Highcharts.numberFormat(this.point.y,2)+'"</span>')
                s.push('<span style="background-color:'+selected_bg_color+'">'+deficit_value+'</span>')
                s.push('</td>')
                s.push('</tr>')
                s.push('</table')
                s.push('</div>')
                return s.join('');
            },
            positioner: function (labelWidth, labelHeight, point) {
                var tooltipX, tooltipY;
                var wp_plotline_pixel, yaxis_min;
                wp_plotline_pixel = this.chart.yAxis[0].toPixels(IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])
                yaxis_min = this.chart.yAxis[0].toPixels(this.chart.yAxis[0].min)
                tooltipX = this.chart.plotLeft
                tooltipY = Math.floor((wp_plotline_pixel + yaxis_min -labelHeight)/2.);
                return {
                    x: tooltipX,
                    y: tooltipY
                };
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            type: 'line',
            name: 'Deficit',
            pointStart: Date.UTC(thisYear,parseInt(seriesDates[0].split('/')[0])-1,parseInt(seriesDates[0].split('/')[1])),
            pointInterval: 24*3600*1000,
            color: 'rgba(0,0,0,0.8)',
            marker: {
              enabled: true,
              symbol: 'circle',
              lineWidth: 1,
              lineColor: 'rgba(0,0,0,0.8)',
              radius: 4
            },
            lineWidth: 2,
            data: preprocessMarkerColors(seriesDeficit),
        },{
            showInLegend: false,
            name: 'Deficit Fcst',
            lineWidth: 0,
            lineColor: 'rgba(0,0,0,0.8)',
            pointStart: Date.UTC(thisYear,parseInt(seriesDates[seriesDeficit.length-1].split('/')[0])-1,parseInt(seriesDates[seriesDeficit.length-1].split('/')[1])),
            pointInterval: 24*3600*1000,
            linkedTo: ':previous',
            marker: {
              enabled: true,
              symbol: 'circle',
              lineWidth: 1,
              lineColor: 'rgba(0,0,0,0.8)',
              radius: 4
            },
            data: preprocessMarkerColors(seriesDeficitFcst)
        }]

    // To add 'PROTOTYPE' text to chart
    //}, function (chart) { // on complete
    //
    //    var fc_plotline_pixel, yaxis_max;
    //    fc_plotline_pixel = chart.yAxis[0].toPixels(IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])
    //    yaxis_max = chart.yAxis[0].toPixels(chart.yAxis[0].max)
    //    var posX = chart.plotLeft + Math.floor(chart.plotWidth/2.);
    //    var posY = Math.floor((yaxis_max + fc_plotline_pixel + 30)/2.);
    //
    //    chart.renderer.text('PROTOTYPE', posX, posY)
    //        .attr({
    //            rotation: 0,
    //            'text-anchor': 'middle'
    //        })
    //        .css({
    //            color: 'rgba(255,0,0,0.2)',
    //            fontSize: '40px'
    //        })
    //        .add();
    });
}

function createChartNext30(d,t,seriesDates,seriesDeficit,seriesDeficitFcst,pointsToPlot,thresholdPercentiles) {
    // for tooltip persistence
    (function (H) {
        H.wrap(H.Tooltip.prototype, 'hide', function () {});
    }(Highcharts));
    //console.log(pointsToPlot);

    // chart starts at last obs value for next 30 days
    // seriesDeficit will have one value (one obs)
    seriesDeficit = seriesDeficit.slice(seriesDeficit.length-1, seriesDeficit.length)
    // seriesDates will have same number of entries as seriesDeficitFcst
    seriesDates = seriesDates.slice(seriesDates.length-seriesDeficitFcst.length, seriesDates.length)

    // create series only for chart coloring purposes
    var seriesDeficitAboveFieldCapacity = [];
    for (var idx=0; idx<seriesDeficit.length; idx++) {
        if (seriesDeficit[idx]>(IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture.saturation)) {
            seriesDeficitAboveFieldCapacity.push(seriesDeficit[idx]);
        } else {
            seriesDeficitAboveFieldCapacity.push(IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture.saturation);
        }
    }

    // find index of latest recharge to field capacity (via irrigation or natural)
    var lastIdxAboveFieldCapacity = 0;
    for (var idx=0; idx<seriesDeficit.length; idx++) {
        //console.log(seriesDeficit[idx],IRR_TOOLVARS.soilmoisture.fieldcapacity);
        if (seriesDeficit[idx]>=(IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) {
            lastIdxAboveFieldCapacity = idx
        } else {
        }
    }

    var preprocessMarkerColors = function (data) {
        var nData = [];
        for (var i = 0; i < data.length; i++) {
            if ((data[i] <= IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (data[i] > IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) {
                colorUse = 'rgba(0,128,0,0.8)'
            } else if ((data[i] <= IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (data[i] > IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) {
                colorUse = 'rgba(255,255,0,0.8)'
            } else if ((data[i] <= IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (data[i] > IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) {
                colorUse = 'rgba(255,128,0,0.8)'
            } else if ((data[i] <= IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) && (data[i] > 0.0-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])) {
                colorUse = 'rgba(255,0,0,0.8)'
            } else {
                colorUse = null
            }
            nData.push({
                y: data[i],
                //x: i,
                fillColor: colorUse,
                color: colorUse
            })
        }
        return nData;
    }

    var createRelativeDate = function (utcDate, n) {
        // utcDate is a UTC date.
        // n is the number of days to add.
        // returns the new date as a UTC date.
        var d = new Date(utcDate);
        d.setDate(d.getDate()+n);
        //d.setDate(d.getDate()+1+n);
        return Date.UTC(d.getFullYear(),d.getMonth(),d.getDate(),24)
    }

    var combineArraysForOutlookArearange = function (aArr,bArr) {
        // create a 2-D array, with provided arrays as columns in array
        var aTemp = []
        var bTemp = []
        var finalArr = []
        // temporary arrays, to avoid modifying originals
        for (var i=0; i<aArr.length; i++) { aTemp.push(aArr[i]) }
        for (var i=0; i<bArr.length; i++) { bTemp.push(bArr[i]) }

        // make sure each array is 31 items long. If it is not, tack appropriate value at end of array to complete shading
        while (aTemp.length<31) { aTemp.push(IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) };
        while (bTemp.length<31) { bTemp.push(IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]) };
        // create new 2-D array
        for (var i = 0; i < aTemp.length; i++) {
            finalArr.push([aTemp[i],bTemp[i]]);
        }
        return finalArr
    }

//
//    var pointsToPlot = function (p,direction) {
//        // p is probability of interest (10, 25, 50, 75 or 90)
//        // direction is either 'wet' or 'dry'
//
//        var output = [];
//
//        if (direction=='wet') {
//            // x indices for probability of getting wetter
//            var points = probXindices[p].slice(probXindices[p].indexOf(0), probXindices[p].length)
//        } else {
//            // x indices for probability of getting drier
//            var points = probXindices[p].slice(0,probXindices[p].indexOf(0)+1)
//        }
//
//        for (var idxp=0; idxp<points.length; idxp++) {
//            if (points[idxp]==0) {
//                ouptut.push([pointStart, seriesDeficit[seriesDeficit.length-1]])
//            } else if (points[idxp]==null) {
//            } else {
//                ouptut.push([pointStart, seriesDeficit[seriesDeficit.length-1]])
//            }
//        }
//
//    }

    // this year
    var thisYear = parseInt(IRR_TOOLVARS.irrigation_date.split('/')[2]);

    // create starting x-axis point of chart as UTC date
    // - we start at the last day with observations
    var pointStart = Date.UTC(thisYear,parseInt(seriesDates[seriesDeficit.length-1].split('/')[0])-1,parseInt(seriesDates[seriesDeficit.length-1].split('/')[1]));

    jQuery('#chart-output-4').highcharts({
        chart: {
            spacingBottom: 0,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 25,
            width: 679,
            events: {
                load: function(){
                    //show tooltip on today's value
                    var p = [this.series[1].points[1],this.series[2].points[1],this.series[3].points[1],this.series[4].points[1],this.series[5].points[1]];
                    this.tooltip.refresh(p);
                }
            }
        },
        plotOptions: {
            series: {
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        },
        title: {
            text: '30-day water deficit outlook based on historical probabilities',
            margin: 5,
            x: 10 //center
        },
        credits: {
            enabled: false,
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { millisecond: '%H:%M:%S.%L', second: '%H:%M:%S', minute: '%H:%M', hour: '%H:%M', day: '%d %b', week: '%d %b', month: '%b<br/>%Y', year: '%Y' },
            min: pointStart,
            max: createRelativeDate(pointStart,30),
            //max: Date.UTC(thisYear,8,12),
            labels: {
              rotation: 0,
              style: {
                  color: '#000000',
              }
            },
            plotLines: [{
                value: pointStart,
                width: 2,
                color: '#FF0000',
                dashStyle: 'shortdash',
                label: {
                    text: seriesDates[seriesDeficit.length-1],
                    align: 'right',
                    rotation: 0,
                    style: {
                        fontSize: '1.0em'
                    },
                    x: 42,
                    //y: 10
                    y: 20
                },
                zIndex: 6,
            }]
        },
        yAxis: {
            min: IRR_TOOLVARS.soilmoisture.wiltingpoint - IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel] - 0.3,
            //max: Math.max(IRR_TOOLVARS.soilmoisture.fieldcapacity - IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel] + 0.3, Math.max.apply(null, seriesDeficit)+0.1),
            max: Math.max(IRR_TOOLVARS.soilmoisture.fieldcapacity - IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel] + 0.3, Math.max.apply(null, seriesDeficit)),
            gridLineWidth: 0,
            tickLength: 8,
            tickWidth: 1,
            tickPosition: 'outside',
            tickInterval: 0.5,
            lineWidth: 1,
            labels: {
                format: '{value:.1f}',
                style: {
                    color: '#000000',
                }
            },
            title: {
                text: 'Water Deficit (in/ft soil)',
                style: {
                    color: '#000000',
                }
            },
            plotBands: [{
                color: 'transparent',
                from: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'No deficit for plant',
                    style: {
                        fontSize: '1.2em',
                        color: 'gray',
                        fontWeight: 'lighter',
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
                zIndex: 6,
            },{
                color: 'transparent',
                from: IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'Deficit, no plant stress',
                    style: {
                        fontSize: '1.2em',
                        color: 'gray',
                        fontWeight: 'lighter',
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
                zIndex: 6,
            },{
                color: 'transparent',
                from: IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'Deficit, plant stress likely',
                    style: {
                        fontSize: '1.2em',
                        color: 'gray',
                        fontWeight: 'lighter',
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
                zIndex: 6,
            },{
                color: 'transparent',
                from: IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                //from: 0.0-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                //to: IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'Deficit, severe plant stress',
                    style: {
                        fontSize: '1.2em',
                        color: 'gray',
                        fontWeight: 'lighter',
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
                zIndex: 6,
            }],
            plotLines: [{
                value: IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                //width: 1.0,
                width: 2.0,
                //color: 'rgba(0,128,0,0.5)',
                //color: '#808080',
                color: 'rgba(0,0,255,0.8)',
                dashStyle: 'Dash',
                label: {
                    text: 'Saturation',
                    style: {
                        fontSize: '0.8em',
                        //color: 'black',
                        color: 'rgba(0,0,255,0.8)',
                        fontWeight: 'bold',
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                },
                zIndex: 5,
            },{
                value: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                width: 2.0,
                //color: 'rgba(255,255,0,0.5)',
                color: 'rgba(0,0,255,0.8)',
                dashStyle: 'Dash',
                //color: '#808080',
                label: {
                    text: 'Field Capacity',
                    style: {
                        fontSize: '0.8em',
                        color: 'rgba(0,0,255,0.8)',
                        fontWeight: 'bold',
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                },
                zIndex: 5,
            },{
                value: IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                width: 2.0,
                //color: 'rgba(255,128,0,0.5)',
                color: 'rgba(0,0,255,0.8)',
                dashStyle: 'Dash',
                //color: '#808080',
                label: {
                    text: 'Plant Stress Begins',
                    style: {
                        fontSize: '0.8em',
                        color: 'rgba(0,0,255,0.8)',
                        fontWeight: 'bold',
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                },
                zIndex: 5,
            },{
                value: IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                width: 2.0,
                //color: 'rgba(255,0,0,0.5)',
                color: 'rgba(0,0,255,0.8)',
                dashStyle: 'Dash',
                //color: '#808080',
                label: {
                    text: 'Wilting Danger Exists',
                    style: {
                        fontSize: '0.8em',
                        color: 'rgba(0,0,255,0.8)',
                        fontWeight: 'bold',
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                },
                zIndex: 5,
            }]
        },
        tooltip: {
            enabled: true,
            shared: true,
            backgroundColor: 'transparent',
            borderColor: 'black',
            borderRadius: 1,
            borderWidth: 0,
            shadow: false,
            style: {
                padding: 10,
                fontSize: '12px',
            },
       
            crosshairs: [{
                width: 1,
                color: 'gray',
                //color: 'transparent',
                dashStyle: 'solid'
            },{
                width: 1,
                color: 'transparent',
                //color: 'gray',
                dashStyle: 'solid'
            }],
            useHTML: true,
            formatter: function() {
                var s = [];
                var tooltipVars = [ this.points[0].point.index, this.x ];
                setTimeout(function() {
                    jQuery("#chartInTooltip").highcharts({
                        chart: {
                            type: 'bar',
                            spacingBottom: 0,
                            spacingTop: 10,
                            spacingLeft: 0,
                            spacingRight: 0,
                            backgroundColor: null,
                            width: 260,
                            height: 55,
                        },
                        title:{
                              text: 'Probability of deficit category on '+Highcharts.dateFormat('%m/%d', tooltipVars[1])+'',
                              floating: true,
                              margin: 0,
                              x: -10,
                              y: -2,
                              style: {
                                 color: 'rgba(0,0,0,1.0)',
                                 fontSize: '10px',
                                 fontWeight: 'bold',
                             }
                        },
                        subtitle:{
                              text: null
                        },
                        tooltip:{
                              enabled: false
                        },
                        credits:{
                              enabled: false
                        },
                        legend:{
                              enabled: false
                        },
                        exporting:{
                              enabled: false
                        },
                        xAxis: {
                            //categories: ['No Deficit', 'Small Deficit', 'Plant Stress', 'Severe Stress'],
                            categories: ['None', 'Small', 'Stress', 'Severe'],
                            labels: {
                                style: {
                                    fontWeight: "bold",
                                    fontSize: "9px",
                                },
                                step: 1,
                                x: -2,
                                y: 3,
                            },
                            title: {
                                text: null
                            },
                            lineColor: 'transparent',
                            //minPadding: 0,
                            //maxPadding: 0,
                            tickLength: 0
                        },
                        yAxis: {
                            min: 0,
                            max: 100,
                            labels: {
                                enabled: false
                            },
                            title: {
                                text: null
                            },
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true,
                                    style: {
                                        fontSize: "8px",
                                        fontWeight: "bold",
                                    },
                                    formatter:function() {
                                        return Highcharts.numberFormat(this.y,0) + '%';
                                    },
                                    x: -2,
                                    y: -2,
                                }
                            }
                        },
                        series: [{
                            animation: false,
                            data: [
                                {y: 100.-thresholdPercentiles['fc'][tooltipVars[0]], color: 'rgba(0,128,0,0.8)'},
                                {y: thresholdPercentiles['fc'][tooltipVars[0]] - thresholdPercentiles['ps'][tooltipVars[0]], color: 'rgba(255,255,0,0.8)'},
                                {y: thresholdPercentiles['ps'][tooltipVars[0]] - thresholdPercentiles['pwp'][tooltipVars[0]], color: 'rgba(255,128,0,0.8)'},
                                {y: thresholdPercentiles['pwp'][tooltipVars[0]], color: 'rgba(255,0,0,0.8)'},
                            ]
                            //data: [25,25,25,25]
                            //data: [5,90,5,0]
                            //data: [10,50,25,15]
                        }]
                    });
                }, 4, tooltipVars)
                //}, 40,tooltipVars)

                s.push('<table cellpadding="2">')
                s.push('<tr>')
                s.push('<td>')

                s.push('<table>')
                s.push('<tr>')
                s.push('<td>')
                s.push('<b><span style="color:red">Valid Date:</span> '+Highcharts.dateFormat('%m/%d/%Y @ 8AM', this.x)+'</b>')
                s.push('</td>')
                s.push('</tr>')
                s.push('</table>')

                s.push('<table cellpadding="2">')
                s.push('<tr>')
                s.push('<td>')
                //s.push('<b>Probability of Occurrence:</b>')
                s.push('<span style="color:red; font-weight:bold">Probability:</span>')
                s.push('</td>')
                jQuery.each(this.points,
                    function(i, point) {
                        if (point.series.name!='Deficit' && point.series.name!='Deficit Fcst' && point.series.name.indexOf('area') == -1 && this.point.x!=0) {
                            s.push('<td style="text-align: center; font-weight: bold; color: '+this.series.color+'"><u>'+ this.series.name +'</u></td>');
                        } else {
                        }
                    }
                );
                s.push('</tr>')
                s.push('<tr>')
                s.push('<td>')
                s.push('<span style="color:red; font-weight:bold">Water Deficit:</span>')
                s.push('</td>')
                jQuery.each(this.points,
                    function(i, point) {
                        if (point.series.name!='Deficit' && point.series.name!='Deficit Fcst' && point.series.name.indexOf('area') == -1 && this.point.x!=0) {
                            s.push('<td style="text-align: center; font-weight: bold">'+this.point.y.toFixed(2) +'"</td>');
                        } else {
                        }
                    }
                );
                s.push('</tr>')
                s.push('</table>')

                s.push('</td>')
                s.push('<td style="padding: 15px;"')
                s.push('</td>')
                s.push('<td>')
                s.push('<div id="chartInTooltip"></div>')
                s.push('</td>')
                s.push('</tr>')
                s.push('</table>')
                //s.push('<div>')
                //s.push('<table cellpadding="4">')
                //s.push('<tr>')
                //s.push('<td>')
                //s.push('<b>'+Highcharts.dateFormat('%m/%d/%Y', this.x)+' @ 8AM</b>')
                //s.push('</td>')
                //s.push('</tr>')
                //s.push('</table')
                //s.push('</div>')

                //s.push('<div>')
                //s.push('<table cellpadding="4">')
                //s.push('<tr>')
                //s.push('<td>')
                //s.push('<span style="font-weight:bold; color:'+label_color+';">'+date_label+': </span>')
                //s.push('</td>')
                //s.push('<td>')
                //s.push('<b>'+Highcharts.dateFormat('%m/%d/%Y', this.x)+' @ 8AM</b>')
                //s.push('</td>')
                //s.push('</tr>')
                //s.push('<tr>')
                //s.push('<td>')
                //s.push('<span style="font-weight:bold; color:'+label_color+';">Water Deficit: </span>')
                //s.push('</td>')
                //s.push('<td>')
                //s.push('<span style="background-color:'+selected_bg_color+'">'+Highcharts.numberFormat(this.point.y,2)+'"</span>')
                //s.push('</td>')
                //s.push('</tr>')
                //s.push('</table')
                //s.push('</div>')
                return s.join('');
            },
            positioner: function (labelWidth, labelHeight, point) {
                var tooltipX, tooltipY;
                var wp_plotline_pixel, yaxis_min;
                wp_plotline_pixel = this.chart.yAxis[0].toPixels(IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])
                yaxis_min = this.chart.yAxis[0].toPixels(this.chart.yAxis[0].min)
                tooltipX = this.chart.plotLeft
                tooltipY = Math.floor((wp_plotline_pixel + yaxis_min -labelHeight)/2.);
                return {
                    x: tooltipX,
                    y: tooltipY
                };
            }
            //positioner: function (labelWidth, labelHeight, point) {
            //    var tooltipX, tooltipY;
            //    if (point.plotX + this.chart.plotLeft < labelWidth) {
            //        tooltipX = this.chart.plotLeft;
            //        tooltipY = this.chart.plotTop + this.chart.plotHeight - labelHeight
            //    } else if (point.plotX + labelWidth > this.chart.plotWidth) {
            //        tooltipX = this.chart.plotWidth-labelWidth/2.-25;
            //        tooltipY = this.chart.plotTop + this.chart.plotHeight - labelHeight;
            //    } else {
            //        tooltipX = point.plotX-25;
            //        tooltipY = this.chart.plotTop + this.chart.plotHeight - labelHeight;
            //    }
            //    return {
            //        x: tooltipX,
            //        y: tooltipY
            //    };
            //}
        },
        legend: {
            enabled: false
        },
        series: [{
            type: 'line',
            name: 'Deficit',
            pointStart: pointStart,
            //pointStart: Date.UTC(thisYear,parseInt(seriesDates[0].split('/')[0])-1,parseInt(seriesDates[0].split('/')[1]),8),
            pointInterval: 24*3600*1000,
            color: 'rgba(0,0,0,0.8)',
            marker: {
              enabled: true,
              symbol: 'circle',
              lineWidth: 1,
              lineColor: 'rgba(0,0,0,0.8)',
              radius: 4
            },
            lineWidth: 2,
            data: preprocessMarkerColors(seriesDeficit),
        },{
            type: 'line',
            name: '10%',
            pointStart: pointStart,
            pointInterval: 24*3600*1000,
            linkedTo: ':previous',
            color: 'rgba(160,82,45,0.8)',
            lineWidth: 2,
            marker: {
              enabled: false,
            },
            data: pointsToPlot['10'],
            zIndex: 6,
        //},{
        //    type: 'arearange',
        //    name: 'area10%',
        //    pointStart: pointStart,
        //    pointInterval: 24*3600*1000,
        //    linkedTo: ':previous',
        //    color: 'rgba(240,240,240,0.3)',
        //    lineWidth: 2,
        //    data: pointsToPlotForShading.dry['10'],
        },{
            type: 'line',
            name: '25%',
            pointStart: pointStart,
            pointInterval: 24*3600*1000,
            linkedTo: ':previous',
            color: 'rgba(160,82,45,0.8)',
            lineWidth: 2,
            marker: {
              enabled: false,
            },
            data: pointsToPlot['25'],
            zIndex: 6,
        //},{
        //    type: 'arearange',
        //    name: 'area10%',
        //    pointStart: pointStart,
        //    pointInterval: 24*3600*1000,
        //    linkedTo: ':previous',
        //    color: 'rgba(240,240,240,0.0)',
        //    lineWidth: 2,
        //    data: pointsToPlotForShading.wet['10'],
        },{
            type: 'line',
            name: '50%',
            pointStart: pointStart,
            pointInterval: 24*3600*1000,
            linkedTo: ':previous',
            color: 'rgba(0,0,0,0.8)',
            lineWidth: 3,
            marker: {
              enabled: false,
            },
            data: pointsToPlot['50'],
            zIndex: 6,
        },{
            type: 'line',
            name: '25%',
            pointStart: pointStart,
            pointInterval: 24*3600*1000,
            linkedTo: ':previous',
            color: 'rgba(0,128,0,0.8)',
            lineWidth: 2,
            marker: {
              enabled: false,
            },
            data: pointsToPlot['75'],
            zIndex: 6,
        //},{
        //    type: 'arearange',
        //    name: 'area25%',
        //    pointStart: pointStart,
        //    pointInterval: 24*3600*1000,
        //    linkedTo: ':previous',
        //    color: 'rgba(200,200,200,0.3)',
        //    lineWidth: 2,
        //    data: pointsToPlotForShading.wet['25'],
        },{
            type: 'line',
            name: '10%',
            pointStart: pointStart,
            pointInterval: 24*3600*1000,
            linkedTo: ':previous',
            color: 'rgba(0,128,0,0.8)',
            lineWidth: 2,
            marker: {
              enabled: false,
            },
            data: pointsToPlot['90'],
            zIndex: 6,
        },{
            showInLegend: false,
            type: 'arearange',
            name: 'area25%',
            pointStart: pointStart,
            pointInterval: 24*3600*1000,
            linkedTo: ':previous',
            color: 'rgba(222,184,135,0.3)',
            lineWidth: 2,
            data: combineArraysForOutlookArearange(pointsToPlot['25'],pointsToPlot['50']),
        },{
            showInLegend: false,
            type: 'arearange',
            name: 'area10%',
            pointStart: pointStart,
            pointInterval: 24*3600*1000,
            linkedTo: ':previous',
            color: 'rgba(245,222,179,0.3)',
            lineWidth: 2,
            data: combineArraysForOutlookArearange(pointsToPlot['10'],pointsToPlot['25']),
        },{
            showInLegend: false,
            type: 'arearange',
            name: 'area10%',
            pointStart: pointStart,
            pointInterval: 24*3600*1000,
            linkedTo: ':previous',
            color: 'rgba(170,255,170,0.3)',
            //color: 'rgba(220,220,220,0.3)',
            lineWidth: 2,
            data: combineArraysForOutlookArearange(pointsToPlot['75'],pointsToPlot['50']),
        },{
            showInLegend: false,
            type: 'arearange',
            name: 'area10%',
            pointStart: pointStart,
            pointInterval: 24*3600*1000,
            linkedTo: ':previous',
            color: 'rgba(210,255,210,0.3)',
            //color: 'rgba(220,220,220,0.3)',
            lineWidth: 2,
            data: combineArraysForOutlookArearange(pointsToPlot['90'],pointsToPlot['75']),
        },{
            showInLegend: false,
            name: 'Deficit Fcst',
            lineWidth: 0,
            lineColor: 'rgba(0,0,0,0.8)',
            pointStart: pointStart,
            pointInterval: 24*3600*1000,
            linkedTo: ':previous',
            marker: {
              enabled: true,
              symbol: 'circle',
              lineWidth: 1,
              lineColor: 'rgba(0,0,0,0.8)',
              radius: 4
            },
            data: preprocessMarkerColors(seriesDeficitFcst),
            zIndex: 7,
        }]

    }, function (chart) { // on complete

        var fc_plotline_pixel, yaxis_max, yaxis_min;
        fc_plotline_pixel = chart.yAxis[0].toPixels(IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])
        wp_plotline_pixel = chart.yAxis[0].toPixels(IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel])
        yaxis_max = chart.yAxis[0].toPixels(chart.yAxis[0].max)
        yaxis_min = chart.yAxis[0].toPixels(chart.yAxis[0].min)
        var posX = chart.plotLeft + Math.floor(chart.plotWidth/2.);
        var posY = Math.floor((yaxis_max + yaxis_min + 30)/2.);
        //var posY = Math.floor((wp_plotline_pixel + yaxis_min + 30)/2.);
        var posX_lineColorDesc = chart.plotLeft + Math.floor(chart.plotWidth/2.5);
        var posY_lineColorDesc = Math.floor((fc_plotline_pixel + yaxis_max)/2.8);

        // Describe the color of lines in probability chart
        chart.renderer.text('GREEN: Probability that water deficit will be at or above these lines', posX_lineColorDesc, posY_lineColorDesc)
            .attr({
                rotation: 0,
                'text-anchor': 'left'
            })
            .css({
                color: 'rgba(0,128,0,1.0)',
                fontSize: '10px'
            })
            .add();

        // Describe the color of lines in probability chart
        chart.renderer.text('BLACK: Equal chance that water deficit will be above or below this line', posX_lineColorDesc, posY_lineColorDesc+12)
            .attr({
                rotation: 0,
                'text-anchor': 'left'
            })
            .css({
                color: 'rgba(0,0,0,1.0)',
                fontSize: '10px'
            })
            .add();

        // Describe the color of lines in probability chart
        chart.renderer.text('BROWN: Probability that water deficit will be at or below these lines', posX_lineColorDesc, posY_lineColorDesc+24)
            .attr({
                rotation: 0,
                'text-anchor': 'left'
            })
            .css({
                color: 'rgba(160,82,45,1.0)',
                fontSize: '10px'
            })
            .add();

        // For when prototype text is needed to be displayed ...
        //chart.renderer.text('PROTOTYPE', posX, posY)
        //    .attr({
        //        rotation: 0,
        //        zIndex: 8,
        //        'text-anchor': 'middle'
        //    })
        //    .css({
        //        color: 'rgba(255,0,0,0.2)',
        //        fontSize: '40px'
        //    })
        //    .add();

        jQuery(chart.series).each(function()
        {
          if ( this.name!='Deficit' && this.name!='Deficit Fcst' && this.name.indexOf('area')==-1 ) {
            var pointsBackToLabel = 0
            for (var idx=this.yData.length-1; idx>=0; idx--) {
                //console.log(this.yData[idx])
                if (this.yData[idx]>=0) {
                    pointsBackToLabel = pointsBackToLabel + 1
                } else {
                    break
                }
            }
            //console.log(pointsBackToLabel);

            var point = ((pointsBackToLabel==0) || (pointsBackToLabel==this.yData.length)) ? this.points[this.points.length-1] : this.points[this.points.length-pointsBackToLabel];
            var yAdjust = ((pointsBackToLabel==0) || (pointsBackToLabel==this.yData.length)) ? 4 : -1;
            var text = chart.renderer.text(this.name,
            point.plotX + chart.plotLeft + 2,
            point.plotY + chart.plotTop + yAdjust).attr(
              {
                zIndex: 7
              }).add();

            //var box = text.getBBox();
            //chart.renderer.rect(box.x - 5, box.y - 5, box.width + 10, box.height + 10, 5)
            //    .attr({
            //        fill: '#FFFFEF',
            //        stroke: 'gray',
            //        'stroke-width': 1,
            //        zIndex: 6
            //    })
            //    .add();

          }
        });

    });
}

function createChartBudget(d,t,seriesDates,seriesPrecip,seriesPET,seriesDrainage,seriesRunoff,seriesDeficit,seriesDeficitChange) {
    // create series only for chart coloring purposes
    var seriesDeficitAboveFieldCapacity = [];
    for (var idx=0; idx<seriesDeficit.length; idx++) {
        if (seriesDeficit[idx]>(IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture.saturation)) {
            seriesDeficitAboveFieldCapacity.push(seriesDeficit[idx]);
        } else {
            seriesDeficitAboveFieldCapacity.push(IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture.saturation);
        }
    }

    // Don't display the first precip day ... set to null
    seriesPrecip[0] = null

    jQuery('#chart-output-3').highcharts({
        chart: {
            spacingBottom: 0,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 0,
            //demo start
            width: 679
            //width: 540
            //demo end
        },
        title: {
            text: 'Water deficit & budget since last irrigation',
            margin: 20,
            x: 10 //center
        },
        xAxis: {
            title: {
                text: 'Observed dates since last irrigation'
            },
            categories: seriesDates,
            crosshair: true,
            labels: {
              rotation: 270,
            },
        },
        yAxis: {
            min: Math.min( Math.min.apply(null, seriesDeficit), Math.min.apply(null, seriesDrainage), Math.min.apply(null, seriesPrecip), Math.min.apply(null, seriesPET), Math.min.apply(null, seriesRunoff), Math.min.apply(null,seriesDeficitChange) ),
            max: Math.max( Math.max.apply(null, seriesDeficit), Math.max.apply(null, seriesDrainage), Math.max.apply(null, seriesPrecip), Math.max.apply(null, seriesPET), Math.max.apply(null, seriesRunoff), Math.max.apply(null,seriesDeficitChange) ),
            //min: 0.0-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
            //max: IRR_TOOLVARS.soilmoisture.saturation - IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
            gridLineWidth: 0,
            tickLength: 8,
            tickWidth: 1,
            tickPosition: 'outside',
            tickInterval: 0.5,
            lineWidth: 1,
            labels: {
                format: '{value:.1f}',
            },
            title: {
                text: 'Water content relative to irrigation level (in/ft soil)',
                //text: 'Soil water content relative to irrigation level (In)',
                //text: 'Inches of water',
            },
            plotBands: [{
                color: 'rgba(0,128,0,0.3)',
                from: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'No deficit for plant',
                    style: {
                        fontSize: '1.2em',
                        color: 'gray'
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
            },{
                color: 'rgba(255,255,0,0.3)',
                from: IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'Deficit, no plant stress',
                    style: {
                        fontSize: '1.2em',
                        color: 'gray'
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
            },{
                color: 'rgba(255,128,0,0.3)',
                //color: 'rgba(222,184,135,0.8)',
                from: IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'Deficit, plant stress likely',
                    style: {
                        fontSize: '1.2em',
                        color: 'gray'
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
            },{
                color: 'rgba(255,0,0,0.3)',
                //color: 'rgba(102,51,0,0.5)',
                from: 0.0-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                to: IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                label: {
                    text: 'Deficit, severe plant stress',
                    style: {
                        fontSize: '1.2em',
                        color: 'gray'
                    },
                    align: 'left',
                    verticalAlign: 'middle',
                    x: 10,
                    y: 5 
                },
            }],
            plotLines: [{
                value: IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                //value: 0,
                //value: -1.*IRR_TOOLVARS.soilmoisture.saturation,
                width: 0.1,
                color: '#808080',
                label: {
                    text: 'Saturation',
                    style: {
                        fontSize: '0.8em'
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                }
            },{
                value: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                width: 0.1,
                color: '#808080',
                label: {
                    text: 'Field Capacity',
                    style: {
                        fontSize: '0.8em'
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                }
            },{
                value: IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                width: 0.1,
                color: '#808080',
                label: {
                    text: 'Plant Stress Begins',
                    style: {
                        fontSize: '0.8em'
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                }
            },{
                value: IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
                width: 0.1,
                color: '#808080',
                label: {
                    text: 'Wilting Point',
                    style: {
                        fontSize: '0.8em'
                    },
                    align: 'right',
                    x: -4,
                    y: 12
                }
            },{
                value: 0,
                width: 2,
                color: '#000000',
                dashStyle: 'Dash',
                label: {
                    text: 'Irrigation Level',
                    style: {
                        fontSize: '1.0em',
                        fontWeight: 'bold'
                    },
                    align: 'center',
                    //x: -4,
                    //y: 12
                }
            }]
        },
        tooltip: {
            enabled: true,
            shared: true,
            useHTML: true,
            //headerFormat: '<small>{point.key}</small>',
            formatter: function() {
                var s = [];
                s.push(this.x+'<table>')
                jQuery.each(this.points,
                    function(i, point) {
                        if (point.series.name=='Deficit' && this.point.x!=0) {
                            //var prevPoint = (this.point.x == 0) ? null : this.series.data[this.point.x - 1];
                            var prevPoint = this.series.data[this.point.x - 1];
                            s.push('<tr>')
                            s.push('<td style="color: '+this.series.color+'"><b>'+ this.series.name +' (Yesterday):<b></td>'+
                                '<td style="text-align: right">'+
                                ((prevPoint) ? prevPoint.y.toFixed(3) : "---")+
                                '"</td>');
                            s.push('</tr>')
                        }
                        s.push('<tr>')
                        if (point.series.name=='Deficit') {
                            s.push('<td style="color: '+this.series.color+'"><b>'+ this.series.name +' (Today):<b></td>'+
                                '<td style="text-align: right">'+this.point.y.toFixed(3) +'"</td>');
                        } else {
                            s.push('<td style="color: '+this.series.color+'"><b>'+ this.series.name +':<b></td>'+
                                '<td style="text-align: right">'+this.point.y.toFixed(3) +'"</td>');
                        }
                        s.push('</tr>')
                    }
                );
                s.push('</table>')
                return s.join('');
            },
            //headerFormat: '<small>{point.key}</small><table>',
            //pointFormat: '<tr><td style="color: {series.color}"><b>{series.name}:</b></td>' +
            //    '<td style="text-align: right"><b>{point.y}</b></td></tr>',
            //footerFormat: '</table>',
            //valueSuffix: '"',
            //valueDecimals: 2
        },
        //tooltip: {
        //    formatter: function() {
        //        var s = [];
        //        s.push('<table>')
        //        jQuery.each(this.points,
        //            function(i, point) {
        //                s.push('<tr>')
        //                s.push('<td>'+ point.series.name +'</td><td>:</td><td>'+
        //                    point.y.toFixed(2) +'"</td>');
        //                s.push('</tr>')
        //            }
        //        );
        //        s.push('</table>')
        //        return s.join('');
        //    },
        //    enabled: true,
        //    shared: true,
        //    valueSuffix: '"',
        //    valueDecimals: 2
        //},
        legend: {
            enabled: true,
            layout: "horizontal",
            verticalAlign: "top",
            itemDistance: 10,
            symbolPadding: 1,
            y:20
        },
        series: [{
            type: 'area',
            name: 'Deficit',
            color: (IRR_TOOLVARS.irrigationlevel=='fieldcapacity') ? 'rgba(0,128,0,0.8)' : 'transparent',
            threshold: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
            negativeColor: 'rgba(255,255,0,0.8)',
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 4
            },
            lineWidth: 0,
            data: seriesDeficit,
            enableMouseTracking: false,
            showInLegend: false,
        },{
            type: 'area',
            name: 'Deficit',
            color: 'transparent',
            threshold: IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
            negativeColor: 'rgba(255,128,0,0.8)',
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 4
            },
            lineWidth: 0,
            data: seriesDeficit,
            enableMouseTracking: false,
            showInLegend: false,
        },{
            type: 'area',
            name: 'Deficit',
            color: 'transparent',
            threshold: IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
            negativeColor: 'rgba(255,0,0,0.8)',
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 4
            },
            lineWidth: 0,
            data: seriesDeficit,
            enableMouseTracking: false,
            showInLegend: false,
        },{
            type: 'area',
            name: 'Deficit',
            negativeColor: (IRR_TOOLVARS.irrigationlevel=='fieldcapacity') ? 'transparent' : 'rgba(0,128,0,0.8)',
            threshold: IRR_TOOLVARS.soilmoisture.saturation-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel],
            //threshold: IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture.saturation,
            color: 'transparent',
            lineWidth: 0,
            marker: {
              enabled: false,
              symbol: 'circle',
              radius: 4
            },
            data: seriesDeficitAboveFieldCapacity,
            enableMouseTracking: false,
            showInLegend: false,
        //},{
        //    type: 'line',
        //    name: 'Deficit (Change)',
        //    color: 'rgba(255,255,0,0.8)',
        //    marker: {
        //      enabled: true,
        //      symbol: 'circle',
        //      radius: 4
        //    },
        //    lineWidth: 0,
        //    lineWidthPlus: 0,
        //    data: seriesDeficitChange,
        },{
            type: 'line',
            name: 'Precip',
            color: 'rgba(0,255,0,0.8)',
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 4
            },
            lineWidth: 0,
            lineWidthPlus: 0,
            data: seriesPrecip,
        },{
            type: 'line',
            name: 'PET',
            color: 'rgba(255,0,0,0.8)',
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 4
            },
            lineWidth: 0,
            lineWidthPlus: 0,
            data: seriesPET,
        },{
            type: 'line',
            name: 'Runoff',
            color: 'rgba(0,0,255,0.8)',
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 4
            },
            lineWidth: 0,
            lineWidthPlus: 0,
            data: seriesRunoff,
        },{
            type: 'line',
            name: 'Drainage',
            color: 'rgba(139,69,19,0.8)',
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 4
            },
            lineWidth: 0,
            lineWidthPlus: 0,
            data: seriesDrainage,
        },{
            type: 'line',
            name: 'Deficit',
            color: 'rgba(0,0,0,0.8)',
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 4
            },
            lineWidth: 2,
            data: seriesDeficit,
        }]
    });
}

function getDataForLocation() {
        jQuery.ajax({
                //url: "http://localhost:8000/",
                //url: "http://bnbelcher.com:20004/datahdf5/",
                url: "http://tools.climatesmartfarming.org/irrigationtool/datahdf5/",
                jsonp: "callback",
                dataType: "jsonp",
                //async: false,
                data: {
                        lat: IRR_TOOLVARS.lat.toString(),
                        lon: IRR_TOOLVARS.lon.toString(),
                        //date: jQuery.datepicker.formatDate('yy-mm-dd', d_lastIrrDay),
                        format: "json"
                },

                success: function( response ) {
                        irrigationLocationChanged(response)
                }

        });
}

function getClimDataForLocation() {
        var targetTab = document.getElementById('tab2');
        var spinnerTab = new Spinner({lines:9,length:4,radius:5,width:3,color:'#00bb00'}).spin(targetTab);
        //var targetInput = document.getElementById('user-input');
        //var spinnerInput = new Spinner().spin(targetInput);
        jQuery.ajax({
                //url: "http://localhost:8000/",
                //url: "http://bnbelcher.com:20004/clim/",
                url: "http://tools.climatesmartfarming.org/irrigationtool/clim/",
                jsonp: "callback",
                dataType: "jsonp",
                beforeSend: function() {
                    //jQuery('#chart-output-4').empty();
                    //var target = document.getElementById('chart-output-4');
                    //var spinner = new Spinner().spin(target);
                    //var targetInput = document.getElementById('user-input');
                    //var spinnerInput = new Spinner().spin(targetInput);
                    //jQuery('#user-input').addClass("disabledInput");
                    jQuery("#csftool-display").tabs("disable", 1);
                },
                //async: false,
                data: {
                        lat: IRR_TOOLVARS.lat.toString(),
                        lon: IRR_TOOLVARS.lon.toString(),
                        //date: jQuery.datepicker.formatDate('yy-mm-dd', d_lastIrrDay),
                        format: "json"
                },

                success: function( response ) {
                        // update data state variable
                        spinnerTab.stop();
                        //jQuery('#user-input').removeClass("disabledInput");
                        //jQuery("#csftool-display").tabs("option","enabled", 1);
                        jQuery("#csftool-display").tabs("enable", 1);
                        IRR_TOOLVARS.clim = jQuery.extend({}, response)
                        //displayOutputProbs()
                        //irrigationLocationChanged(response)
                }

        });
}

function displayOutputClimateChange() {
        var cc_placeholder_text = '<b>Coming Soon:</b> Over the next several months, our programming team will be incorporating data from downscaled climate change projections into each tool, covering the Northeastern United States. The climate change projections are determined from the <a href="http://cmip-pcmdi.llnl.gov/cmip5/" target="_blank">CMIP5 climate models</a>, maintained by the Northeast Regional Climate Center (<a href="http://www.nrcc.cornell.edu" target="_blank">NRCC</a>) at Cornell. This data will provide the long-term context for the data shown in each Climate Smart Farming Tool – for example, in this tool, the climate projections data will provide context for how climate change will affect the potential for water deficits by season and crop type in the future. This type of information will help farmers and decision makers understand how climate change will likely affect them over the coming decades. For more information, please contact us at <a href="mailto:cicss@cornell.edu?subject=CSF water deficit tool info">cicss@cornell.edu</a>.';
        jQuery('#chart-output-5').empty();
        jQuery('#chart-output-5').html("<div id='climate-change-placeholder'><p>"+cc_placeholder_text+"</p></div><div id='irrtool-csf-image'><img src='/wp-content/themes/bones/library/images/logo-darker.png' height='101' width='200' /></div>");
        //jQuery('#chart-output-5').html("<div id='climate-change-placeholder'><p>"+cc_placeholder_text+"</p></div>");
}

function displayOutputProbs() {
        // make Next 30 Days tab active
        //jQuery("#csftool-display").tabs("option", "active", 1);
        //jQuery('#chart-output-4').empty();
        jQuery('#chart-output-4').css({"vertical-align": "middle", "display": "table-cell"})
        jQuery('#chart-output-4').html('PROBABILITIES ARE CURRENTLY UNAVAILABLE');

        var response = jQuery.extend({}, IRR_TOOLVARS.data_to_display);
        var lastIrrDay = IRR_TOOLVARS.irrigation_date;
        var d_lastIrrDay = new Date(lastIrrDay);

        var lastObsDay = response.dates_precip[response.dates_precip.length-1]

        var miss = -999
        var pet = response.pet.slice(0,response.pet.length);
        var precip = response.precip.slice(0,response.precip.length);
        var petFcst = response.pet_fcst.slice(0,response.pet_fcst.length);
        var precipFcst = response.precip_fcst.slice(0,response.precip_fcst.length);
        //console.log(petFcst);
        //console.log(precipFcst);

        // replace missing values with null
        while (isInArray(miss,precip)) { precip[precip.indexOf(miss)]=null };
        while (isInArray(miss,pet)) { pet[pet.indexOf(miss)]=null };
        while (isInArray(miss,precipFcst)) { precipFcst[precipFcst.indexOf(miss)]=null };
        while (isInArray(miss,petFcst)) { petFcst[petFcst.indexOf(miss)]=null };

        var seriesDatesToPlot = jQuery.extend([], response.dates_precip);

        // Run simple water model and create chart of obs
        var startDate = response.dates_precip[0]+'/'+IRR_TOOLVARS.this_year
        var currentDate = response.dates_precip[response.dates_precip.length-1]+'/'+IRR_TOOLVARS.this_year
        var waterBudget = runWaterDeficitModel(precip,pet,0.0,startDate);

        // Run simple water model for forecasts and output daily deficit array
        precipFcst.unshift(null);
        petFcst.unshift(null);
        startDate = response.dates_precip_fcst[0]+'/'+IRR_TOOLVARS.this_year
        var waterBudgetFcst = runWaterDeficitModel(precipFcst,petFcst,waterBudget.deficitDaily[waterBudget.deficitDaily.length-1],startDate);
        // Add forecast dates to the dates to plot
        for (index=0; index<response.dates_precip_fcst.length; index++) {
            seriesDatesToPlot.push(response.dates_precip_fcst[index])
        }

        // define reference values
        var fc = IRR_TOOLVARS.soilmoisture.fieldcapacity-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]
        var fcps = (IRR_TOOLVARS.soilmoisture.fieldcapacity+IRR_TOOLVARS.soilmoisture.stressthreshold)/2.-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]
        var ps = IRR_TOOLVARS.soilmoisture.stressthreshold-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]
        var pswp = (IRR_TOOLVARS.soilmoisture.stressthreshold+IRR_TOOLVARS.soilmoisture.wiltingpoint)/2.-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]
        var pwp = IRR_TOOLVARS.soilmoisture.prewiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]
        var wp = IRR_TOOLVARS.soilmoisture.wiltingpoint-IRR_TOOLVARS.soilmoisture[IRR_TOOLVARS.irrigationlevel]

        // function to add days to date
        var createRelativeDate = function (utcDate, n) {
            // utcDate is a UTC date.
            // n is the number of days to add.
            // returns the new date as a UTC date.
            var d = new Date(utcDate);
            d.setDate(d.getDate()+n);
            return Date.UTC(d.getFullYear(),d.getMonth(),d.getDate(),24)
        };

        // function to get column from 2D array
        function getCol(matrix, col){
           var column = [];
           for(var i=0; i<matrix.length; i++){
              column.push(matrix[i][col]);
           }
           return column;
        }

        function getPercentile(percentile, array) {
            var index = null;
            var result = null;
            array.sort(function(a, b){return a-b});
            //console.log(array);
            index = (percentile/100) * array.length;
            if (Math.floor(index) == index) {
                 result = (array[index-1] + array[index])/2;
            } else {
                result = array[Math.floor(index)];
            }
            return result;
        }

        function getPercentileOfValue(value, array) {
            var result = null;
            array.sort(function(a, b){return a-b});
            for (var i=0; i<array.length; i++) {
                if (value<array[i]) {
                    result = 100.*parseFloat(i)/array.length
                    break
                } else {
                }
            }
            if (result==null) { result=100. }
            return result;
        }

        // create 420 series of 30-day periods, one set for precip, one set for pet
        // - need pet_clim and precip_clim, arrays 2months x number of years
        var climPrecip = null;
        var climPet = null;
        var waterBudgetClim = null;
        var waterBudgetClimSet = [];
        var lastBin = 0;
        var currentSoilMoisture = waterBudget.deficitDaily[waterBudget.deficitDaily.length-1]
        for (var idxYr=0; idxYr<IRR_TOOLVARS.clim.pet_clim.length; idxYr++) {
            for (var idxDay=0; idxDay<30; idxDay++) {
                climPrecip = IRR_TOOLVARS.clim.precip_clim[idxYr].slice(idxDay,idxDay+30)
                climPet = IRR_TOOLVARS.clim.pet_clim[idxYr].slice(idxDay,idxDay+30)
                // replace missing values with null
                //while (isInArray(miss,climPrecip)) { climPrecip[climPrecip.indexOf(miss)]=null };
                //while (isInArray(miss,climPet)) { climPet[climPet.indexOf(miss)]=null };
                // if missing value is in precip or pet array, skip this sample
                if ( (isInArray(miss,climPrecip)) || (isInArray(miss,climPet)) ) { continue };
                // run water budget model and include sample if all data is not missing
                climPrecip.unshift(null);
                climPet.unshift(null);
                waterBudgetClim = runWaterDeficitModel(climPrecip,climPet,currentSoilMoisture,currentDate);
                waterBudgetClimSet.push(waterBudgetClim.deficitDaily);
            };
        };
        //console.log(waterBudgetClimSet);

        // find percentiles from water budget output
        var columnToEvaluate = [];
        var pointsToPlot = { '90':[], '75':[], '50':[], '25':[], '10':[] }
        var thresholdPercentiles = { 'fc':[], 'ps':[], 'pwp':[] }
        //  - loop through accumulation period lengths (1-30)
        for (var idxDay=0; idxDay<waterBudgetClimSet[0].length; idxDay++) {
            columnToEvaluate = getCol(waterBudgetClimSet,idxDay);
            pointsToPlot['90'].push( getPercentile(90,columnToEvaluate) );
            pointsToPlot['75'].push( getPercentile(75,columnToEvaluate) );
            pointsToPlot['50'].push( getPercentile(50,columnToEvaluate) );
            pointsToPlot['25'].push( getPercentile(25,columnToEvaluate) );
            pointsToPlot['10'].push( getPercentile(10,columnToEvaluate) );
            thresholdPercentiles['fc'].push( getPercentileOfValue(fc,columnToEvaluate) );
            thresholdPercentiles['ps'].push( getPercentileOfValue(ps,columnToEvaluate) );
            thresholdPercentiles['pwp'].push( getPercentileOfValue(pwp,columnToEvaluate) );
        };

        // adjust pointsToPlot by removing points above field capacity.
        // this is primarily done to avoid overlap of labeling at end of lines.
        //if (pointsToPlot['90'][0]<fc) {
        //    while (pointsToPlot['90'][pointsToPlot['90'].length-1]>fc) { pointsToPlot['90'].pop() };
        //}

        //if (pointsToPlot['75'][0]<fc) {
        //    while (pointsToPlot['75'][pointsToPlot['75'].length-1]>fc) { pointsToPlot['75'].pop() };
        //}

        //if (pointsToPlot['50'][0]<fc) {
        //    while (pointsToPlot['50'][pointsToPlot['50'].length-1]>fc) { pointsToPlot['50'].pop() };
        //}

        //if (pointsToPlot['25'][0]<fc) {
        //    while (pointsToPlot['25'][pointsToPlot['25'].length-1]>fc) { pointsToPlot['25'].pop() };
        //}

        //if (pointsToPlot['10'][0]<fc) {
        //    while (pointsToPlot['10'][pointsToPlot['10'].length-1]>fc) { pointsToPlot['10'].pop() };
        //}

        // adjust pointsToPlot by removing points below wilting point.
        // this is primarily done to avoid overlap of labeling at end of lines.
        //if (pointsToPlot['90'][0]>wp) {
        //    while (pointsToPlot['90'][pointsToPlot['90'].length-1]<wp) { pointsToPlot['90'].pop() };
        //}

        //if (pointsToPlot['75'][0]>wp) {
        //    while (pointsToPlot['75'][pointsToPlot['75'].length-1]<wp) { pointsToPlot['75'].pop() };
        //}

        //if (pointsToPlot['50'][0]>wp) {
        //    while (pointsToPlot['50'][pointsToPlot['50'].length-1]<wp) { pointsToPlot['50'].pop() };
        //}

        //if (pointsToPlot['25'][0]>wp) {
        //    while (pointsToPlot['25'][pointsToPlot['25'].length-1]<wp) { pointsToPlot['25'].pop() };
        //}

        //if (pointsToPlot['10'][0]>wp) {
        //    while (pointsToPlot['10'][pointsToPlot['10'].length-1]<wp) { pointsToPlot['10'].pop() };
        //}

        // Create chart of probabilities
        createChartNext30(lastIrrDay,lastObsDay,seriesDatesToPlot,waterBudget.deficitDaily,waterBudgetFcst.deficitDaily,pointsToPlot,thresholdPercentiles);
}

function displayOutput() {
        // make the observed and forecast data active (both text and chart)
        jQuery("#csftool-display").tabs("option", "active", 0);
        //jQuery("#text-output-header-1:visible").hide();
        //jQuery("#text-output-header-2:hidden").show();
        //jQuery("#text-output-1:visible").hide();
        //jQuery("#text-output-2:hidden").show();

        var response = jQuery.extend({}, IRR_TOOLVARS.data_to_display);
        var lastIrrDay = IRR_TOOLVARS.irrigation_date;
        var d_lastIrrDay = new Date(lastIrrDay);

        var lastObsDay = response.dates_precip[response.dates_precip.length-1]

        var miss = -999
        var pet = response.pet.slice(0,response.pet.length);
        var precip = response.precip.slice(0,response.precip.length);
        var petFcst = response.pet_fcst.slice(0,response.pet_fcst.length);
        var precipFcst = response.precip_fcst.slice(0,response.precip_fcst.length);
        //console.log(petFcst);
        //console.log(precipFcst);

        // replace missing values with null
        while (isInArray(miss,precip)) { precip[precip.indexOf(miss)]=null };
        while (isInArray(miss,pet)) { pet[pet.indexOf(miss)]=null };
        while (isInArray(miss,precipFcst)) { precipFcst[precipFcst.indexOf(miss)]=null };
        while (isInArray(miss,petFcst)) { petFcst[petFcst.indexOf(miss)]=null };

        var seriesDatesToPlot = jQuery.extend([], response.dates_precip);

        // Run simple water model and create chart of obs
        var startDate = response.dates_precip[0]+'/'+IRR_TOOLVARS.this_year
        var waterBudget = runWaterDeficitModel(precip,pet,0.0,startDate);
        //createChart(lastIrrDay,lastObsDay,seriesDatesToPlot,waterBudget.deficitDaily);

        //createChartBudget(lastIrrDay,lastObsDay,seriesDatesToPlot,precip,waterBudget.petDaily,waterBudget.drainageDaily,waterBudget.runoffDaily,waterBudget.deficitDaily,waterBudget.deficitDailyChange);

        // Run simple water model for forecasts and output daily deficit array
        precipFcst.unshift(null);
        petFcst.unshift(null);
        startDate = response.dates_precip_fcst[0]+'/'+IRR_TOOLVARS.this_year
        var waterBudgetFcst = runWaterDeficitModel(precipFcst,petFcst,waterBudget.deficitDaily[waterBudget.deficitDaily.length-1],startDate);
        // Add forecast dates to the dates to plot
        for (index=0; index<response.dates_precip_fcst.length; index++) {
            seriesDatesToPlot.push(response.dates_precip_fcst[index])
        }

        createChartFcst(lastIrrDay,lastObsDay,seriesDatesToPlot,waterBudget.deficitDaily,waterBudgetFcst.deficitDaily);
        displayResults(lastIrrDay.slice(0,5),lastObsDay,response.dates_precip_fcst,waterBudget.deficitDaily[waterBudget.deficitDaily.length-1],waterBudgetFcst.deficitDaily);
        //jQuery("#input-display:visible").hide();
}

function irrToolInitializeDisplay() {

    jQuery("#csftool-display").tabs({collapsible: false});

    //jQuery("#resultsButton").click(function () {
    //    jQuery("#text-output-1, #text-output-2").toggle();
    //    jQuery("#chart-output-1, #chart-output-2").toggle();
    //    jQuery(this).text(function(i, text){
    //        text === "View Forecasts" ? jQuery("#chart-output").tabs("option", "active", 1) : jQuery("#chart-output").tabs("option", "active", 0);
    //        return text === "View Forecasts" ? "View Observed Only" : "View Forecasts"
    //    })
    //});

    jQuery("#csftool-display").tabs({
        activate: function(event, ui) {
                var activeTab = jQuery('#csftool-display').tabs('option', 'active');
                if (activeTab == 0) {
                    jQuery("#irrtool-checkbox-label:hidden").show();
                }
                if (activeTab == 1) {
                    displayOutputProbs()
                    jQuery("#irrtool-checkbox-label:visible").hide();
                }
                if (activeTab == 2) {
                    displayOutputClimateChange()
                }
            }
    });

    console.log("Irrigation tool display initialization complete");
}

initToolSections();
initStorageManager();
transferOldLocations();
initLocationState();
irrToolInitializeDisplay();
initToolInterface();

