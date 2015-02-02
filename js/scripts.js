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
        function testController($scope,$http){

   /*  $http.jsonp("http://api.pricecheckindia.com/feed/product/mobile_phones/nokia%20107.json?user=vishnude&key=OTNOKPMUNNWIPAVX&callback=JSON_CALLBACK")
    .success(
      function(response) {$scope.jsonData = response.product;}
        );
          */

        $scope.search = function(){
            showLoader();
          var str1 = "http://api.pricecheckindia.com/feed/product/mobile_phones/";
          var str2 = ".json?user=vishnude&key=OTNOKPMUNNWIPAVX&callback=JSON_CALLBACK";
          $http.jsonp(str1+encodeURIComponent(document.getElementById('search').value)+str2)
            .success(
              function(response) {
                $scope.jsonData = response.product;
                setTimeout(function(){
                     //enable accordian
                    $('.collapsible').collapsible({
                            accordion : true
                        // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                    });

                }, 1000);
                hideLoader();
              }
              );
        }

       /**This method process the link from price check and get the actual link to the site
        **/
      $scope.processLinkClick = function(checkUrl){
            // Using YQL and JSONP
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

                window.open(response);
            }
        });

       }



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