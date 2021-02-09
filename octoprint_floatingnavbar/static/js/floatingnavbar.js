$(function() {
	function floatingNavbarViewModel(parameters) {
		var self = this;
		self.navigationViewModel = parameters[0];
		self.settingsViewModel = parameters[1];
		self.scroll_distance = ko.observable(100);
		self.isTouchEnabled = $("html").attr("id") == "touch" ? true : false;
		self.onAfterBinding = function() {
			//Check for TouchUIPlugin, if not loaded apply special class.
			if (!self.isTouchEnabled) {
				$("#navbar").toggleClass("navbar-fixed-top navbar-static-top");
				self.adjust_margin(self.settingsViewModel.settings.plugins.floatingnavbar.buffer_size());
			}
			self.scroll_distance(self.settingsViewModel.settings.plugins.floatingnavbar.scroll_distance());
		}
		self.onEventSettingsUpdated = function(payload){
			if (!self.isTouchEnabled) {
				$('#navbar').off('resize');
				self.adjust_margin(self.settingsViewModel.settings.plugins.floatingnavbar.buffer_size());
			}
			self.scroll_distance(self.settingsViewModel.settings.plugins.floatingnavbar.scroll_distance());
		}
		self.adjust_margin = function(buffer_size){
			$("div.container.octoprint-container, div#dasboardContainer.dashboard-full, div#dashboardContainer.dashboard-full").css("margin-top",$("#navbar").outerHeight(true)+parseInt(buffer_size));
			$('#navbar').resize(function(){$("div.container.octoprint-container, div#dasboardContainer.dashboard-full > div.dasboardFsContainer").css("margin-top",$("#navbar").outerHeight(true)+parseInt(buffer_size));});
		}
		// dashboard plugin patch
		self.onAfterTabChange = function (current, previous) {
			if (current === "#tab_plugin_dashboard") {
				$("div#dasboardContainer.dashboard-full > div.dasboardFsContainer").css("margin-top",$("#navbar").outerHeight(true)+parseInt(buffer_size));
			}
		}
		self.evalScroll = function() {
			var buttons = $(".to-top");
			var offset = self.scroll_distance();
			var scrollTop = $(this).scrollTop();
			if (scrollTop > offset && offset > 0) {
				buttons.fadeIn(200);
			} else {
				buttons.fadeOut(200);
			}
		};
		$(window).scroll(self.evalScroll);
		self.evalScroll();
	}
	OCTOPRINT_VIEWMODELS.push({
		construct: floatingNavbarViewModel,
		dependencies: ["navigationViewModel","settingsViewModel"],
		elements: ["#settings_plugin_floatingnavbar"]
	});
});