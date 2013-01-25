/* ***** BEGIN LICENSE BLOCK *****
 *   Version: MPL 2/GPL 3.0/LGPL 3.0
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 * 
 * 
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is clearConsole.
 *
 * The Initial Developers of the Original Code are
 * Rejah Rehim A A.
 * Sreenath Sasikumar.
 * Portions created by the Initial Developer are Copyright (C) 2012
 * the Initial Developer. All Rights Reserved.
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 * 
 * ***** END LICENSE BLOCK ***** */

var clearConsole = {
installButton: function(toolbarId, id){
    if (!document.getElementById(id)){
        var toolbar = document.getElementById(toolbarId);
		var before = null;
        toolbar.insertItem(id, before);
        toolbar.setAttribute("currentset", toolbar.currentSet);
        document.persist(toolbar.id, "currentset");
    };
  },
clearConsoleBoolPreferance : function(id) {
		var PrefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		return PrefManager.getBoolPref("extensions.clearConsole@penzil.net."+id);
},
clearConsoleNotify: function(image, title, body)
    {
		var alertService = Components.classes["@mozilla.org/alerts-service;1"].getService(Components.interfaces.nsIAlertsService);
        try
        {
            if (clearConsole.clearConsoleBoolPreferance('DisableNotification') != true) {
		
            alertService.showAlertNotification(image, title, body, false, "", null);
			
			}
        }
        catch(exception)
        {
            //no notification services are present on the computer
        }
    },
    
clearAllBrowserHistory: function (notify) {
var clearConsoleBrowserHistory = Components.classes["@mozilla.org/browser/nav-history-service;1"]
                     .getService(Components.interfaces.nsIBrowserHistory);

clearConsoleBrowserHistory.removeAllPages();
var notifyHead = 'Clear Console Notify';
var notifyMsg = 'Browser history cleared';
var nofifyImg = "chrome://clearConsole/skin/clearHistory.png";
	if (notify == 'yes'){
	clearConsole.clearConsoleNotify(nofifyImg,notifyHead,notifyMsg);
		}
},
clearAllBrowserCookies: function (notify) {
var clearConsoleCookieManager = Components.classes["@mozilla.org/cookiemanager;1"]
                    .getService(Components.interfaces.nsICookieManager);

clearConsoleCookieManager.removeAll();
var notifyHead = 'Clear Console Notify';
var notifyMsg = 'Browser cookies cleared';
var nofifyImg = "chrome://clearConsole/skin/clearCookie.png";
	if (notify == 'yes'){
	clearConsole.clearConsoleNotify(nofifyImg,notifyHead,notifyMsg);
		}

},
clearAllBrowserCache: function (notify) {

var clearConsoleCacheManager = Components.classes["@mozilla.org/network/cache-service;1"].getService(Components.interfaces.nsICacheService);

			clearConsoleCacheManager.evictEntries(Components.interfaces.nsICache.STORE_ON_DISK);
			clearConsoleCacheManager.evictEntries(Components.interfaces.nsICache.STORE_IN_MEMORY);
			clearConsoleCacheManager.evictEntries(Components.interfaces.nsICache.STORE_OFFLINE);

var notifyHead = 'Clear Console Notify';
var notifyMsg = 'Browser cache cleared';
var nofifyImg = "chrome://clearConsole/skin/clearCache.png";
	if (notify == 'yes'){
	clearConsole.clearConsoleNotify(nofifyImg,notifyHead,notifyMsg);
		}
},
clearAllHttpLogins: function (notify) {

var clearConsoleHttpLoginManager = Components.classes["@mozilla.org/network/http-auth-manager;1"].getService(Components.interfaces.nsIHttpAuthManager);
	clearConsoleHttpLoginManager.clearAll();

var notifyHead = 'Clear Console Notify';
var notifyMsg = 'HTTP logins cleared';
var nofifyImg = "chrome://clearConsole/skin/clearHttpLogin.png";
	if (notify == 'yes'){
	clearConsole.clearConsoleNotify(nofifyImg,notifyHead,notifyMsg);
		}
},
clearAllLocalStorage: function (notify) {
var clearConsoleAllLocalStorageManager = Components.classes["@mozilla.org/dom/storagemanager;1"].getService(Components.interfaces.nsIObserver);
clearConsoleAllLocalStorageManager.observe(null, "cookie-changed", "cleared");

var notifyHead = 'Clear Console Notify';
var notifyMsg = 'All html5/local storage cleared';
var nofifyImg = "chrome://clearConsole/skin/localStorage.png";
	if (notify == 'yes'){
	clearConsole.clearConsoleNotify(nofifyImg,notifyHead,notifyMsg);
		}
},
clearAllData: function (notify) {
	clearConsole.clearAllBrowserCookies('no');
	clearConsole.clearAllBrowserHistory('no');
	clearConsole.clearAllBrowserCache('no');
	clearConsole.clearAllHttpLogins('no');
	var notifyHead = 'Clear Console Notify';
	var notifyMsg = 'All browser data cleared';
	var nofifyImg = "chrome://clearConsole/skin/clearConsole32.png";
	if (notify == 'yes'){
	clearConsole.clearConsoleNotify(nofifyImg,notifyHead,notifyMsg);
		}
},
clearConsoleOptions: function (){
	window.openDialog("chrome://clearConsole/content/clearConsoleOptions.xul","","model=yes,centerscreen=yes,all=yes"); 
	},
clearConsoleAbout: function (){
	window.openDialog("chrome://clearConsole/content/about.xul","","model=yes,centerscreen=yes,all=yes"); 
	},
clearConsoleRestart: function (){
	var boot = Components.classes["@mozilla.org/toolkit/app-startup;1"].getService(Components.interfaces.nsIAppStartup);
boot.quit(Components.interfaces.nsIAppStartup.eForceQuit|Components.interfaces.nsIAppStartup.eRestart);
	},
clearConsoleClearAndRestart: function (){
clearConsole.clearAllData();
clearConsole.clearConsoleRestart('no');
	},
firstRun : function() {
		var PrefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
		PrefManager.setBoolPref("extensions.clearConsole@penzil.net.firstRun", false);
		clearConsole.installButton("nav-bar", "clearConsoleToolbarBtn");
},
init : function() {
	window.removeEventListener("load", function () { clearConsole.init(); }, false);
		if (clearConsole.clearConsoleBoolPreferance('firstRun') == true) {
			clearConsole.firstRun();
		}
	}
};
window.addEventListener("load", function () { clearConsole.init(); }, false);
            
