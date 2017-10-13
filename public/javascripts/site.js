$(document).ready(function () {
  console.log('Document loaded, adding client side features');
  // client side validations on the registration form
  if ($('#registration_form').length > 0){
		// Source: https://jqueryvalidation.org/files/demo/bootstrap/index.html
    $('#registration_form').validate({
      rules: {
        email: { required: true, email: true },
        password: { required: true },
        confirm_password: { equalTo: '#password_input' }
      },
      errorElement: 'em',
      errorPlacement: (error, element) => {
        error.addClass('help-block');
        element.parents('.col-sm-5').addClass('has-feedback');
        error.insertAfter(element);
        if ( !element.next( "span" )[ 0 ] ) {
          $( "<span class='form-control-feedback'>&#x1f621;</span>" ).insertAfter( element );
        }
      },
      success: (label, element) => {
        if ( !$( element ).next( "span" )[ 0 ] ) {
          $( "<span class='form-control-feedback'>&#x1f60a;</span>" ).insertAfter( $( element ) );
        }
      },
			highlight: function ( element, errorClass, validClass ) {
				$( element ).parents( ".col-sm-5" ).addClass( "has-error" ).removeClass( "has-success" );
				$( element ).next( "span" ).html("&#x1f621;");
			},
			unhighlight: function ( element, errorClass, validClass ) {
				$( element ).parents( ".col-sm-5" ).addClass( "has-success" ).removeClass( "has-error" );
				$( element ).next( "span" ).html("&#x1f60a;");
			}
    });
  }
});
