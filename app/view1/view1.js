'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
    delete $httpProvider.defaults.headers.post['Content-type']

  }])

  .controller('View1Ctrl', ["$scope", "$http", function ($scope, $http) {

    $scope.tagline = "Holy Shirt. You're all going to look so good!";
    console.log(`%c
  _____              _     ____       _       _       
 |  ___| __ ___  ___| |__ |  _ \ _ __(_)_ __ | |_ ___ 
 | |_ | '__/ _ \/ __| '_ \| |_) | '__| | '_ \| __/ __|
 |  _|| | |  __/\__ \ | | |  __/| |  | | | | | |_\__ \
 |_|  |_|  \___||___/_| |_|_|   |_|  |_|_| |_|\__|___/
                                                      
    `+
      `%c Hi there, welcome to FreshPrints.
    `, 'background: #ffff; color: #B00E1E', 'background: #ffff; color: #17855E');



    //$scope.api = "https://freshprints-api.herokuapp.com"
    $scope.api = "http://freshprints.eu-4.evennode.com"

    let canvas = new fabric.Canvas('canvas');
    let random = Math.floor((Math.random() * 100) + 1);

    $scope.currentName = "Design-"+random

    $scope.fetchDesigns = function () {
      $http.get($scope.api+"/fetch").
        then(function (response) {
          $scope.savedDesigns = response.data;
        }).catch(function (response) {
          console.error(response);
        })
    }

    $scope.fetchDesigns();


    $scope.createDesign = function () {
      $scope.currentName = $scope.designName
      canvas.clear();
    }

    document.getElementById('imgLoader').onchange = function handleImage(e) {
      var reader = new FileReader();
      reader.onload = function (event) {
        var imgObj = new Image();
        imgObj.src = event.target.result;
        imgObj.onload = function () {
          var image = new fabric.Image(imgObj);
          image.set({
            angle: 0,
            padding: 10,
            cornersize: 10,
            height: 110,
            width: 110
          });
          canvas.centerObject(image);
          canvas.add(image);
          canvas.renderAll();
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }

    $scope.insertText = function () {
      var text = new fabric.IText('hello world', { left: 40, top: 100 });
      canvas.add(text);
    }

    canvas.on('object:added', function () {
      if (!isRedoing) {
        h = [];
      }
      isRedoing = false;
    });

    let isRedoing = false;
    let h = [];

    $scope.undo = function () {
      if (canvas._objects.length > 0) {
        h.push(canvas._objects.pop());
        canvas.renderAll();
      }
    }

    $scope.redo = function () {
      if (h.length > 0) {
        isRedoing = true;
        canvas.add(h.pop());
      }
    }

    $scope.saveCanvas = function () {
      let json = JSON.stringify(canvas.toJSON());

      this.href = canvas.toDataURL({
        format: 'jpeg',
        quality: 0.8
      })
      this.download = 'canvas.png'

      $http({
        method: 'POST', url: $scope.api + '/save', params: { data: json, img: this.href, name: $scope.currentName }, headers: {
          'Content-Type': 'application/json'
        }
      }).
        then(function (response) {
          // console.log(response);
        }).catch(function (response) {
          console.error(response);
        })
        $scope.fetchDesigns();
    }


    $scope.loadCanvas = function ($event) {
      let id = $event.target.id;
      $http.get($scope.api+"/fetch/" + id).
        then(function (response) {
          $scope.currentDesign = response.data[0].design;
          canvas.loadFromJSON($scope.currentDesign);
          canvas.renderAll();
        }).catch(function (response) {
          console.error(response);
        })
    }


    $('.color-preview').click(function () {
      var color = $(this).css("background-color");
      document.getElementById("tshirt").style.backgroundColor = color;
    })
  }]);