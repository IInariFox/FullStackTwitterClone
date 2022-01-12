class FeedsController < ApplicationController
  def index
    @tweets = Tweet.all.order(created_at: :desc)
    render 'feeds/myfeed'
  end
end
