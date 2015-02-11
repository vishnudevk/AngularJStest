
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

        //below 2 variables are used to manipulate the response to wait and get responses from all the categories
        $scope.index;//index of category
        $scope.length;//size of categories

        $scope.search = function(){
          if(document.getElementById('search').value!="" || true){//added true to search even if there is no search parameter
            showLoader();
            var options = categoryjson.categories[$(".selected").get(0).id -1].options;
            var searchKey = document.getElementById('search').value;
            $scope.jsonData = null;
            $scope.length = options.length;
            $scope.index = 0;
            for (var i=0; i<$scope.length; ++i) {
              $scope.singleSearch(options[i],searchKey);
            }
          }
        }


      $scope.singleSearch = function(category,searchKey,index,length){
        var str1 = "http://api.pricecheckindia.com/feed/product/";
        var str2 = ".json?user=vishnude&key=OTNOKPMUNNWIPAVX&callback=JSON_CALLBACK";
        var url  = category;
        if(searchKey!=""){
          url = url+"/"+searchKey;
        }
        $http.jsonp(str1+encodeURIComponent(url)+str2)
          .success(
            function(response) {
              if($scope.jsonData===null){
                $scope.jsonData = response.product;
              }else{
                $scope.jsonData = $scope.jsonData.concat(response.product);
              }
              $scope.index = $scope.index+1;
              if($scope.index>= $scope.length){
                 $scope.manageResults();
              }
            }
            );
      }


      $scope.manageResults= function(){
         if($scope.jsonData!==null && $scope.jsonData.length>0){
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

