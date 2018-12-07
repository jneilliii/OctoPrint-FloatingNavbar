$(function() {
	function floatingNavbarViewModel(parameters) {
		var self = this;

		self.navigationViewModel = parameters[0];
		self.settingsViewModel = parameters[1];
		self.isTouchEnabled = $("html").attr("id") == "touch" ? true : false;

		self.onAfterBinding = function() {
			//Check for TouchUIPlugin, if not loaded apply special class.
			if (!self.isTouchEnabled) {
				$("#navbar").toggleClass("navbar-fixed-top navbar-static-top");
				self.adjust_margin(self.settingsViewModel.settings.plugins.floatingnavbar.buffer_size());
			}
		}
		
		self.onEventSettingsUpdated = function(payload){
			if (!self.isTouchEnabled) {
				$('#navbar').off('resize');
				self.adjust_margin(self.settingsViewModel.settings.plugins.floatingnavbar.buffer_size());
			}
		}
		
		self.adjust_margin = function(buffer_size){
			$("div.container.octoprint-container").css("margin-top",$("#navbar").outerHeight(true)+parseInt(buffer_size));
			$('#navbar').resize(function(){$("div.container.octoprint-container").css("margin-top",$("#navbar").outerHeight(true)+parseInt(buffer_size));});			
		}
	}

	OCTOPRINT_VIEWMODELS.push({
		construct: floatingNavbarViewModel,
		dependencies: ["navigationViewModel","settingsViewModel"],
		elements: ["#settings_plugin_floatingnavbar"]
	});
});
