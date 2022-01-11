$.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

  export function createSession (username, password, successCB, errorCB) {
    var request = {
        type: 'POST',
        url: 'api/sessions',
        data: {
            user: {
                username: username,              
                password: password
            }
        },
  
        success: successCB,
        error: errorCB
      }
    
      $.ajax(request);
  }

  export function areTheyAuthenticated (successCB, errorCB) {
    var request = {
        type: 'GET',
        url: 'api/authenticated',
        success: successCB,
        error: errorCB
      }
    
      $.ajax(request);
  }

  export function deleteSession (successCB, errorCB) {
    var request = {
        type: 'DELETE',
        url: 'api/sessions',
        success: successCB,
        error: errorCB
      }
    
      $.ajax(request);
  }