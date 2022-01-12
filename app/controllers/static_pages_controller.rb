class StaticPagesController < ApplicationController
  def home
    render 'home'
  end
  def feed 
    render 'feed'
  end
end