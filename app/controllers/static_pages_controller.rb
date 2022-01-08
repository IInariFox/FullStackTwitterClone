class StaticPagesController < ApplicationController
  skip_before_action :require_login, only: [:home]

  def home
    render 'home'
  end

  def feed
      render 'feed'
  end

  def userpage
      render 'userpage'
  end

end
