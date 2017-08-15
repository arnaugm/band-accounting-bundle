angular.module("templates", ["activities-list/activities-list-directive.html", "activity/edit-activity-dialog.html", "activity/edit-activity-directive.html", "menu-options/menu-options-directive.html"]);

angular.module("activities-list/activities-list-directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("activities-list/activities-list-directive.html",
    "<div id=\"totals\">\n" +
    "    <ul>\n" +
    "        <li layout-gt-sm=\"row\">\n" +
    "            <div>Income:</div>\n" +
    "            <div ng-class=\"'pos-font'\">{{ income | currency : '€' }}</div>\n" +
    "        </li>\n" +
    "        <li layout-gt-sm=\"row\" >\n" +
    "            <div>Expenses:</div>\n" +
    "            <div ng-class=\"'neg-font'\">{{ expenses | currency : '€' }}</div>\n" +
    "        </li>\n" +
    "        <li layout-gt-sm=\"row\" >\n" +
    "            <div>Total:</div>\n" +
    "            <div ng-class=\"{ 'pos-font': total >= 0, 'neg-font': total < 0 }\">{{ total | currency : '€' }}</div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "\n" +
    "<md-toolbar id=\"activities-header\" class=\"md-hue-3\">\n" +
    "    <div layout=\"row\" class=\"md-toolbar-tools\" layout-align=\"space-between center\">\n" +
    "        <div ng-attr-flex=\"{{ $mdMedia('gt-sm') && 15 || 33 }}\" layout=\"row\" layout-align=\"center\">\n" +
    "            Date value\n" +
    "        </div>\n" +
    "        <div flex=\"15\" layout=\"row\" layout-align=\"center\" ng-show=\"$mdMedia('gt-sm')\">\n" +
    "            Date\n" +
    "        </div>\n" +
    "        <div ng-attr-flex=\"{{ $mdMedia('gt-sm') && 55 || 33 }}\" layout=\"row\" layout-align=\"center\">\n" +
    "            Concept\n" +
    "        </div>\n" +
    "        <div ng-attr-flex=\"{{ $mdMedia('gt-sm') && 15 || 33 }}\" layout=\"row\" layout-align=\"center\">\n" +
    "            Amount\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</md-toolbar>\n" +
    "\n" +
    "<div id=\"activities-spinner\" layout=\"row\" layout-align=\"space-around\" ng-hide=\"status === 'COMPLETE'\">\n" +
    "    <md-progress-circular md-mode=\"indeterminate\" md-diameter=\"30\"></md-progress-circular>\n" +
    "</div>\n" +
    "\n" +
    "<md-list>\n" +
    "    <md-list-item ng-if=\"status == 'COMPLETE' && !activities.length\">\n" +
    "        <div layout=\"row\" layout-fill layout-padding layout-align=\"center\" class=\"empty-list\">\n" +
    "            No activities available\n" +
    "        </div>\n" +
    "    </md-list-item>\n" +
    "\n" +
    "    <md-list-item ng-repeat=\"activity in activities track by activity.id\"\n" +
    "                  ng-class=\"{ 'pos-row': activity.amount >= 0, 'neg-row': activity.amount < 0 }\"\n" +
    "                  ng-click=\"editActivity($event, $index)\">\n" +
    "        <div layout=\"row\" layout-fill layout-padding>\n" +
    "            <div ng-attr-flex=\"{{ $mdMedia('gt-sm') && 15 || 33 }}\" layout=\"row\" layout-align=\"center\">\n" +
    "                {{ activity.dateValue | date:'dd-MM-yyyy' }}\n" +
    "            </div>\n" +
    "            <div flex=\"15\" layout=\"row\" layout-align=\"center\" ng-show=\"$mdMedia('gt-sm')\">\n" +
    "                {{ activity.date | date:'dd-MM-yyyy' }}\n" +
    "            </div>\n" +
    "            <div ng-attr-flex=\"{{ $mdMedia('gt-sm') && 55 || 33 }}\" layout=\"row\" layout-align=\"start\">\n" +
    "                {{ activity.concept }}\n" +
    "            </div>\n" +
    "            <div ng-attr-flex=\"{{ $mdMedia('gt-sm') && 15 || 33 }}\" layout=\"row\" layout-align=\"end\">\n" +
    "                {{ activity.amount | currency : '€' }}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <md-divider></md-divider>\n" +
    "    </md-list-item>\n" +
    "</md-list>\n" +
    "");
}]);

angular.module("activity/edit-activity-dialog.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("activity/edit-activity-dialog.html",
    "<md-dialog aria-label=\"Edit activity\">\n" +
    "    <form ng-cloak>\n" +
    "        <md-toolbar>\n" +
    "            <div class=\"md-toolbar-tools\">\n" +
    "                <h2>Edit activity</h2>\n" +
    "                <span flex></span>\n" +
    "                <md-button class=\"md-icon-button\" ng-click=\"cancel()\">\n" +
    "                    <i class=\"material-icons\">close</i>\n" +
    "                </md-button>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "\n" +
    "        <md-dialog-content>\n" +
    "            <div class=\"md-dialog-content\">\n" +
    "                <edit-activity activity=\"activity\" index=\"index\"></edit-activity>\n" +
    "            </div>\n" +
    "        </md-dialog-content>\n" +
    "    </form>\n" +
    "</md-dialog>");
}]);

angular.module("activity/edit-activity-directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("activity/edit-activity-directive.html",
    "<md-input-container class=\"md-block\">\n" +
    "    <!-- Use floating label instead of placeholder -->\n" +
    "    <label>Concept</label>\n" +
    "    <md-icon md-svg-src=\"../../bundles/arnaugmbandaccounting/img/pen.svg\"></md-icon>\n" +
    "    <input id=\"activity-concept\" ng-model=\"activity.concept\" type=\"text\" required>\n" +
    "</md-input-container>\n" +
    "\n" +
    "<md-input-container class=\"md-icon-right md-block\">\n" +
    "    <label>Amount</label>\n" +
    "    <md-icon md-svg-src=\"../../bundles/arnaugmbandaccounting/img/money.svg\"></md-icon>\n" +
    "    <input ng-model=\"activity.amount\" type=\"number\" step=\"0.01\" required>\n" +
    "    <md-icon md-svg-src=\"../../bundles/arnaugmbandaccounting/img/ic_euro_24px.svg\"></md-icon>\n" +
    "</md-input-container>\n" +
    "\n" +
    "<md-datepicker ng-model=\"activity.dateValue\" md-placeholder=\"Date value\"></md-datepicker>\n" +
    "\n" +
    "<div layout=\"row\" layout-align=\"end\">\n" +
    "    <md-button class=\"md-raised md-primary\" ng-click=\"save()\" ng-disabled=\"!valid()\">Save</md-button>\n" +
    "</div>");
}]);

angular.module("menu-options/menu-options-directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("menu-options/menu-options-directive.html",
    "<div class=\"menu\">\n" +
    "    <md-menu>\n" +
    "        <md-button aria-label=\"Options\" class=\"md-icon-button\" ng-click=\"openMenu($mdMenu, $event)\">\n" +
    "            <i class=\"material-icons\">menu</i>\n" +
    "        </md-button>\n" +
    "        <md-menu-content width=\"4\">\n" +
    "            <md-menu-item>\n" +
    "                <md-button ng-click=\"currentTerm()\">\n" +
    "                    Current term\n" +
    "                </md-button>\n" +
    "            </md-menu-item>\n" +
    "            <md-menu-item>\n" +
    "                <md-button ng-click=\"twoTerms()\">\n" +
    "                    2 terms\n" +
    "                </md-button>\n" +
    "            </md-menu-item>\n" +
    "            <md-menu-item>\n" +
    "                <md-button ng-click=\"threeTerms()\">\n" +
    "                    3 terms\n" +
    "                </md-button>\n" +
    "            </md-menu-item>\n" +
    "            <md-menu-item>\n" +
    "                <md-button ng-click=\"fourTerms()\">\n" +
    "                    4 terms\n" +
    "                </md-button>\n" +
    "            </md-menu-item>\n" +
    "            <md-menu-item>\n" +
    "                <md-button ng-click=\"allEntries()\">\n" +
    "                    All entries\n" +
    "                </md-button>\n" +
    "            </md-menu-item>\n" +
    "        </md-menu-content>\n" +
    "    </md-menu>\n" +
    "</div>");
}]);
