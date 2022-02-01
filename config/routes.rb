Rails.application.routes.draw do

  root to: "static_pages#home"
  get '/feed' => 'static_pages#feed'
  get '/feed/:username' => 'static_pages#user'
  
  namespace :api do
    #users
    post '/users' => 'users#create'
  
    #sessions 
    post '/sessions' => 'sessions#create'
    get '/authenticated' => 'sessions#authenticated'
    delete '/sessions' => 'sessions#destroy'
  
    #tweets
    post '/tweets' => 'tweets#create'
    delete '/tweets/:id' => 'tweets#destroy'
    get '/tweets' => 'tweets#index'
    get '/tweets/:username' => 'tweets#index_by_user'
  end

  get '*path' => 'static_pages#home'
end
