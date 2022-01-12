Rails.application.routes.draw do
  root 'static_pages#home'
  get '/feeds'                    => 'feeds#index'

  # USERS
  post '/users'                  => 'api/users#create'

  # SESSIONS
  post '/sessions'               => 'api/sessions#create'
  get  '/authenticated'          => 'api/sessions#authenticated'
  delete '/sessions'             => 'api/sessions#destroy'

  # TWEETS
  post '/tweets'                 => 'api/tweets#create'
  get  '/tweets'                 => 'api/tweets#index'
  delete '/tweets/:id'           => 'api/tweets#destroy'
  get  '/users/:username/tweets' => 'api/tweets#index_by_user'

  # Redirect all other paths to index page, which will be taken over by AngularJS
  # get '*path'    => 'static_pages#home'
end
