$.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

  export function createNewUser (username, password, email, successCB, errorCB) {
    var request = {
      type: 'POST',
      url: 'api/users',
      data: {
          user: {
            email: email,
            password: password,
            username: username              
          }
      },

      success: successCB,
      error: errorCB
    }
  
    $.ajax(request);
  };
