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
    // Show sideNav
    $('.button-collapse').sideNav('show');
     // show msg on staring
    toast('Select a category to search', 2500); // 2500 is the duration of the toast

    //method getting called on the side nav click
    $(".left-nav-item").click(function(){
      $(".left-nav-item").removeClass('selected');
      this.classList.add('selected');

      setTimeout(function(){
        $('.button-collapse').sideNav('hide');
        $('#search').focus();
        $('#search').select();
        },500);
      });
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
        $scope.category;

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
                  if(typeof response != 'undefined'){
                    var index =  response.indexOf("<a href=\"")
                    response = response.substring(index+9);
                    response = response.substring(0,response.indexOf("\""));

                    //return response;
                    $scope.store.url = response;
                  }
                  $('#modal1').closeModal();
                  window.open($scope.store.url);
              }
          });
        }else{
           $('#modal1').closeModal();
           window.open($scope.store.url);
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




    var categoryjson = {
  'categories': [
    {
      'key':1,
      'options':['mobile_phones']
    },
    {
      'key':2,
      'options':['tablets']
    },
    {
      'key':3,
      'options':['mobile_bluetooth_headsets','mobile_headphone_headsets']
    },
    {
      'key':4,
      'options':['point_shoots','camcorders','dslrs']
    },
    {
      'key':5,
      'options':['desktops']
    },
    {
      'key':6,
      'options':['laptops']
    },
    {
      'key':7,
      'options':['monitors']
    },
    {
      'key':8,
      'options':['lcd_tv','led_tv','plasma_tv','crt_tv']
    },
    {
      'key':9,
      'options':['printers_single','printers_multi','scanners','projectors']
    },
    {
      'key':10,
      'options':['speakers','music_systems','home_theaters','video_players']
    },
     {
      'key':11,
      'options':['ipods','mp3_players','mp4_players']
    },
    {
      'key':12,
      'options':['pen_drives','external_hard_disks','mobile_memory']
    },
    {
      'key':13,
      'options':['data_cards','routers','switches','processors','graphic_cards','rams','motherboards','tv_tuners','mouse','keyboards','webcams','laptop_batteries','laptop_adapters']
    }
  ]
}



