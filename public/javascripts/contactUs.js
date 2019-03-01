$(function(){
    $(".contact100-form-btn").on("click",function(){
      $.notify({
        message: "<strong>Thank you for contacting us</strong>"
      },{
        type: 'info',
        animate: {
              enter: 'animated fadeInUp',
          exit: 'animated fadeOutRight'
        },
        placement: {
          from: "bottom",
          align: "left"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
      });
    });
  });