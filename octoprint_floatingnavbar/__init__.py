# coding=utf-8

import octoprint.plugin

class floatingnavbar(octoprint.plugin.AssetPlugin):
	def get_assets(self):
		return dict(js=["js/floatingnavbar.js"])
		
	def get_version(self):
		return self._plugin_version
		
	##~~ Softwareupdate hook
	def get_update_information(self):
		return dict(
			floatingnavbar=dict(
				displayName="Floating Navbar",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="jneilliii",
				repo="OctoPrint-FloatingNavbar",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/jneilliii/OctoPrint-FloatingNavbar/archive/{target_version}.zip"
			)
		)

__plugin_name__ = "FloatingNavbar"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = floatingnavbar()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}