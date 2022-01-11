$.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

  export function createTweet (message, successCB, errorCB) {
    var request = {
        type: 'POST',
        url: 'api/tweets',
        data: {
            tweet: {
                message: message,              
            }
        },
  
        success: successCB,
        error: errorCB
      }
    
      $.ajax(request);
  }

  export function getTweets (successCB, errorCB) {
    var request = {
        type: 'GET',
        url: 'api/tweets',  
        success: successCB,
        error: errorCB
      }
    
      $.ajax(request);
  }

  export function getUserTweets (username, successCB, errorCB) {
    var request = {
        type: 'GET',
        url: `api/users/${username}/tweets`,
        success: successCB,
        error: errorCB
      }
    
      $.ajax(request);
  }

  export function deleteTweet (taskId, successCB, errorCB) {
    var request = {
        type: 'DELETE',
        url: `api/tweets/${taskId}`,
        success: successCB,
        error: errorCB
      }
    
      $.ajax(request);
  }
  