json.tweets do |tweet|
    json.id         @tweet.user_id
    json.username    @tweet.user
    json.message  @tweet.message
end