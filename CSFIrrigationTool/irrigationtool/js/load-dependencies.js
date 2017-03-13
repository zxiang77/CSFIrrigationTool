function loadToolDependencies() {

    var dependency;
    var element = document.getElementsByTagName("body")[0]

    console.log('loading jquery ui css');
    dependency = document.createElement('link');
    dependency.setAttribute("rel","stylesheet");
    dependency.setAttribute("type","text/css");
    dependency.setAttribute("href", "https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css");
    element.appendChild(dependency);

    //console.log('loading csftool-jquery-ui css');
    //dependency = document.createElement('link');
    //dependency.setAttribute("rel","stylesheet");
    //dependency.setAttribute("type","text/css");
    //dependency.setAttribute("href", CSFTOOL_URL + "/style/csftool-jquery-ui.css");
    //element.appendChild(dependency);

    console.log('loading location-dialog css');
    dependency = document.createElement('link');
    dependency.setAttribute("rel","stylesheet");
    dependency.setAttribute("type","text/css");
    dependency.setAttribute("href", CSFTOOL_URL + "/style/location-dialog.css");
    element.appendChild(dependency);

    //console.log('loading location-dialog css');
    //dependency = document.createElement('link');
    //dependency.setAttribute("rel","stylesheet");
    //dependency.setAttribute("type","text/css");
    //dependency.setAttribute("href", "http://tools.climatesmartfarming.org/csftool/style/location-dialog-bnb.css");
    //element.appendChild(dependency);

    console.log('loading irrtool css');
    dependency = document.createElement('link');
    dependency.setAttribute("rel","stylesheet");
    dependency.setAttribute("type","text/css");
    dependency.setAttribute("href", CSFTOOL_URL + "/style/irrtool.css");
    element.appendChild(dependency);

    //console.log('loading jquery tmpl');
    //dependency = document.createElement('script');
    //dependency.setAttribute("type","text/javascript");
    //dependency.setAttribute("src",CSFTOOL_URL + "/js/jquery.tmpl.js");
    //element.appendChild(dependency)

    //console.log('loading irrigation functions');
    //dependency = document.createElement('script');
    //dependency.setAttribute("type","text/javascript");
    //dependency.setAttribute("src",CSFTOOL_URL + "/js/irrigation-functions.js");
    //element.appendChild(dependency)
}
loadToolDependencies();
