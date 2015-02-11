/**Things to be executed at the begining/document.ready etc
 * initialization of jquery plugins
 * **/
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


//used to hide/show the top menu as you scrol
var previousScroll = 0,
    headerOrgOffset = $('.nav-wrapper').height();

$('#header-wrap').height($('.nav-wrapper').height());

$(window).scroll(function () {
    var currentScroll = $(this).scrollTop();
    if (currentScroll > headerOrgOffset) {
        if (currentScroll > previousScroll) {
            $('#header-wrap').slideUp();
        } else {
            $('#header-wrap').slideDown();
        }
    }
    previousScroll = currentScroll;
});






