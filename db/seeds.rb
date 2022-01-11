# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

users = User.create!([
  { username: 'UserFirst', email: 'first@test.com', password: 'password1' },
  { username: 'UserLast', email: 'last@test.com', password: 'password2' },
])

users.first.tweets.create!(
  {message: 'Tweet1'}
)

users.second.tweets.create!(
  {message: 'Tweet2'}
)
