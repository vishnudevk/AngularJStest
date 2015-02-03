(function ($) {
            $(function () {
                $('.button-collapse').sideNav();
            }); // end of document ready
        })(jQuery); // end of jQuery name space

$('.collapsible').collapsible({
        accordion : true
    // A setting that changes the collapsible behavior to expandable instead of the default accordion style
});

$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });


        /*This is the controller used in search page
        */
        function testController($scope,$http){

   /*  $http.jsonp("http://api.pricecheckindia.com/feed/product/mobile_phones/nokia%20107.json?user=vishnude&key=OTNOKPMUNNWIPAVX&callback=JSON_CALLBACK")
    .success(
      function(response) {$scope.jsonData = response.product;}
        );
          */
        //this it the selected store and will be used as the modal value
        $scope.product;
        $scope.store;

        $scope.search = function(){
          if(document.getElementById('search').value!=""){
            showLoader();
            var str1 = "http://api.pricecheckindia.com/feed/product/mobile_phones/";
            var str2 = ".json?user=vishnude&key=OTNOKPMUNNWIPAVX&callback=JSON_CALLBACK";
            $http.jsonp(str1+encodeURIComponent(document.getElementById('search').value)+str2)
              .success(
                function(response) {
                  $scope.jsonData = response.product;
                  if($scope.jsonData.length>0){
                    setTimeout(function(){
                         //enable accordian
                        $('.collapsible').collapsible({
                                accordion : true
                            // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                        });

                    }, 1000);
                  }else{
                    $('#modal').openModal();
                  }
                  hideLoader();
                }
                );
          }
        }

       /**This method process the link from price check and get the actual link to the site
        **/
      $scope.processLinkClick = function(checkUrl){
              // Using YQL and JSONP
        if(checkUrl.indexOf("pricecheckindia.com")>0){//we have to do this incase the url is from pricecheck only
          $.ajax({
              url: "http://query.yahooapis.com/v1/public/yql",
              // the name of the callback parameter, as specified by the YQL service
              jsonp: "callback",
              // tell jQuery we're expecting JSONP
              dataType: "jsonp",
              // tell YQL what we want and that we want JSON
              data: {
                  q: "select * from html where url=\""+checkUrl+"\""
              },

              // work with the response
              success: function( response ) {
                  response = response.results[0];
                  var index =  response.indexOf("<a href=\"")
                  response = response.substring(index+9);
                  response = response.substring(0,response.indexOf("\""));

                  //return response;
                  $scope.store.url = response;
              }
          });
        }
       }


       $scope.openModelWithData = function(product,store){
         $scope.product = product;
         $scope.store = store;
         $scope.processLinkClick( $scope.store.url);//get the actual url
         $('#modal1').openModal();

       }

       $scope.openWindow = function(url){
          window.open(url);
       }

       //filter will give amazon and flipkart rows
       $scope.goodStoreFilter = function (item) {
          return item.website === 'flipkart' || item.website === 'amazon';
      };

    }

    /**
     * This is the controller used in welcome page
     */
     function welcomeController($scope,$http){




     }




   function search(){
    document.activeElement.blur();
    angular.element(document.getElementById('body')).scope().search();
   }

   $(document).keypress(function(e) {
    if(e.which == 13) {
        search();
    }
   });


    function showLoader(){
        $(".progress").show();
    }

    function hideLoader(){
        $(".progress").hide();
    }
       hideLoader();