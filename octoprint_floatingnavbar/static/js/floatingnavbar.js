$(function() {
	function floatingNavbarViewModel(parameters) {
		var self = this;

		self.navigationViewModel = parameters[0];

		//Check for TouchUIPlugin, if not loaded apply special class.
		var htmlId = $("html").attr("id");
		if (htmlId != "touch") {
			$("#navbar").toggleClass("navbar-fixed-top navbar-static-top");
			$("div.container.octoprint-container").css("margin-top","60px");
		}
	}

	// This is how our plugin registers itself with the application, by adding some configuration
	// information to the global variable OCTOPRINT_VIEWMODELS
	OCTOPRINT_VIEWMODELS.push([
		// This is the constructor to call for instantiating the plugin
		floatingNavbarViewModel,

		// This is a list of dependencies to inject into the plugin, the order which you request
		// here is the order in which the dependencies will be injected into your view model upon
		// instantiation via the parameters argument
		["navigationViewModel"],

		// Finally, this is the list of selectors for all elements we want this view model to be bound to.
		[]
	]);
});
