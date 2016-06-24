;(function(ng) {
  "use strict";

  ng.module('alt.endpoint-ping', [])
    .provider('altPing', [function() {
      this.url = '';

      this.$get = ['$http', '$q', function($http, $q) {
        return function() {
          if (ng.isUndefined(this.url) || !ng.isString(this.url) || !this.url.length) {
            return $q.reject(new TypeError('String do endpoint deve ser informada.'));
          }

          return $http.post(this.url, null);
        }.bind(this);
      }];
    }]);
}(window.angular));
