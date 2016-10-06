var app = angular.module("adressApp",['ngRoute']);



app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'templates/list.html',
			controller: 'listController',
			reloadOnSearch: false,
		})
		.when('/contact',{
			templateUrl: 'templates/contact.html',
			controller: 'contactController',
			reloadOnSearch: false,
		})
});




app.controller("mainController",function($scope){

	//var countries = require('country-list');
	console.log(window.countries);
	console.log("mainController");
	
	var datos = localStorage.getItem("adressApp_data");
	console.log("-------------------------");
	console.log(datos);
	console.debug(datos);
	console.log("-------------------------");

	if(datos!=null)
	{
		$scope.contacts=[];
		var rawContacts = JSON.parse(datos);
		_(rawContacts).forEach(function(value){
			$scope.contacts.push(new Contact(value));
		});
	}
	else
	{
		$scope.contacts = [new Contact({firstName:'Hernan',
										lastName: 'Chimiski',
										email: 'hernan.chimiski@gmail.com',
										country: 'AR'}),
		new Contact({firstName:'Hernan',
										lastName: 'Chimiski',
										email: 'hernan.chimiski@gmail.com',
										country: 'AR'}),
		new Contact({firstName:'Hernan',
										lastName: 'Chimiski',
										email: 'hernan.chimiski@gmail.com',
										country: 'AR'}),
		new Contact({firstName:'Hernan',
										lastName: 'Chimiski',
										email: 'hernan.chimiski@gmail.com',
										country: 'AR'}),
		new Contact({firstName:'Hernan',
										lastName: 'Chimiski',
										email: 'hernan.chimiski@gmail.com',
										country: 'AR'}),
		new Contact({firstName:'Hernan',
										lastName: 'Chimiski',
										email: 'hernan.chimiski@gmail.com',
										country: 'AR'}),
		new Contact({firstName:'Hernan',
										lastName: 'Chimiski',
										email: 'hernan.chimiski@gmail.com',
										country: 'AR'}),
		new Contact({firstName:'Hernan',
										lastName: 'Chimiski',
										email: 'hernan.chimiski@gmail.com',
										country: 'AR'}),
		new Contact({firstName:'Sergio',
										lastName: 'Ruiz',
										email: 'sergio.Ruiz@yahoo.com',
										country: 'DE'}),
							];
	}

	console.debug($scope.contacts);

});

app.controller("listController",function($scope,$location){
var valorNumericAnimation=0;

	$( ".btn_down" ).click(function(e) {
		e.preventDefault();
		valorNumericAnimation+=200;
		$(".listWrapper").animate({
                scrollTop: valorNumericAnimation
            }, 3200);
		
		});

	$( ".btn_up" ).click(function(e) {
		e.preventDefault()
		valorNumericAnimation=0;

  		$(".listWrapper").animate({
                    scrollTop: valorNumericAnimation
                }, 700);
		});



	document.getElementsByTagName("html")[0].className="listController";

	$scope.goForm = function(_id){
		$location.path("contact").search({id:_id});
	}

});

app.controller("contactController",function($scope,$routeParams,$location){
	console.log("contactController");
	document.getElementsByTagName("html")[0].className="contactController";

	$scope.goList = function(){
		$location.path("/").search("");;
	}

	$scope.countries = window.countries;

	$scope.new = true;

	var idParam = Number($routeParams.id);
	if($.isNumeric(idParam))
	{
		$scope.savedContact = _.find($scope.contacts,function(o){
			return o.id == idParam;
		});


		$scope.contact = angular.copy($scope.savedContact);
		console.log($scope.contact);
		$scope.new = false;
		//$("#form_contact input").css('background-color','grey');
		 //$("#form_contact input").attr("disabled",true);
		 //$("#form_contact select").attr("disabled",true); 
		 //$("#form_contact select").css({
		 								//'background-color':'rgb(235, 235, 228)',
		 								//'color':'rgb(84, 84, 84)'
		 								//});
	}

	$scope.add = function(){
		var new_contact = new Contact();
		_.forIn($scope.contact,function(value,key){
			new_contact[key]=value;
		});
		$scope.contacts.push(new_contact);
		returnHome();
	}

	$scope.update = function(){
		
		_.forIn($scope.contact,function(value,key){
			$scope.savedContact[key]=value;
		});
		
		returnHome();
	}

	$scope.delete = function(){
		
		var deleted = _.remove($scope.contacts,function(object){
			return object.id == $scope.contact.id;
		});

		returnHome();
	}

	var returnHome = function(){
		persistData();
		$scope.goList();
	}

	var persistData = function(){
		localStorage.setItem("adressApp_data",JSON.stringify($scope.contacts));
	}

});



app.directive('listReadyDirective',function($timeout){
	return {
		restrict: 'A',
		link: function($scope,elem,attrs){
			if($scope.$last === true)
			{
				$timeout(function(){
					var wrapper = $('.listWrapper')[0];
					var ul = $(wrapper).children('ul')[0];
					var display = 'none';
					if(ul.offsetHeight>wrapper.offsetHeight)
					{
						display='block';
					}
					$('.scroll_bar').css({'display':display});

				},10);
			}
		}
	}
});



