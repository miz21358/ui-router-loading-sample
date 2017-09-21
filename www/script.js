// モジュールの宣言
var myApp = angular.module('MyApp', ['onsen', 'ui.router']);

// 遷移処理
myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('page-A', {
				url: '/pageA',
				templateUrl: 'pageA.html'
			})
			.state('page-B', {
				url: '/pageB',
				templateUrl: 'pageB.html'
			})
		
	}]);

// ボタン押下時の処理
myApp.controller('LoadingController', ['$scope', '$state', '$rootScope', '$timeout', function($scope, $state, $rootScope, $timeout) {
		$scope.changePage = function(page) {
			// ローディングフラグON
			$rootScope.isLoading = true;
			
			// 2秒待ってから遷移する
			$timeout(function() {
				$state.go(page);
			}, 2000);
		}
	}]);

// ローディングタグ
myApp.directive('myLoader', function() {
		return {
			restrict : 'E',
			replace: true,
			templateUrl: "loader.html"
		};
	});	
	
	
// 画面遷移タイミング処理
myApp.run(['$rootScope', '$transitions', '$state', function($rootScope, $transitions, $state){
	$transitions.onSuccess({to:'*'}, function(trans){
		// ページ読み込み成功
		
		// ローディングフラグOFF
		$rootScope.isLoading = false;
	});
	
}]);
		