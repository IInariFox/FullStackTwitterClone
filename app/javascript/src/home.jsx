import React, { useState, useEffect } from 'react'
import ReactDOM, { render } from 'react-dom'
import Header from './header.jsx'
import MenuSelect from './homeMenu.jsx'

import { areTheyAuthenticated, deleteSession } from './requests/sessions.js'
import { createTweet, getTweets, deleteTweet } from './requests/tweets.js'

import './home.scss';
import './general.scss';

const Home = (props) => {
  const [username, setName] = useState('')
  const [tweets, setTweets] = useState([])
  const [tweetsCount, setTweetsCount] = useState(0)
  const [authenticated, setAuthenticated] = useState(false)
  const [characterCount, setCount] = useState(140)

  // no functionality to automatically update these vars
  let followingCount = 0
  let followersCount = 0

  // ================ lifecycle hooks ======================================

  useEffect(()=>{
    areTheyAuthenticated((data)=>{
      setName(data.username)
      setAuthenticated(true)
    })
  })

  useEffect(()=>{
    getTweets((data)=>{
      var tweetArrayLength = data.tweets.length
      var tweetsArray = []
      var tweetsByUser = 0

      for (let i=0; i < tweetArrayLength; i++) {

        tweetsArray.push(<Tweet id={data.tweets[i].id} key={data.tweets[i].id} username={data.tweets[i].username} message={data.tweets[i].message} />)

        if (data.tweets[i].username == username) {
          tweetsByUser += 1 
        }
      }

      setTweets(tweetsArray)
      setTweetsCount(tweetsByUser)
    })
  }, [tweets.length])

  // ================ tweet component ======================================

  const Tweet = (props) => {

    if (props.username == username) {
      return (
        <>
        <div className={`tweet col-12 pt-2 border top border bottom bg-light ${props.username}`} id={props.id}>
          <a className={`tweet-username text-dark ${props.username}`} href="">{props.username}</a><span className="text-secondary tweet-screenName"> @{props.username}</span>
          <a className="delete-tweet float-right" href="">Delete</a>
          <p className="pt-1">{props.message}</p>
        </div>
        </>
        )

    } else {
      return (
        <>
        <div className={`tweet col-12 pt-2 border top border bottom bg-light ${props.username}`} id={props.id}>
          <a className={`tweet-username text-dark ${props.username}`} href="">{props.username}</a><span className="text-secondary tweet-screenName"> @{props.username}</span>
          <p className="pt-1">{props.message}</p>
        </div>
        </>
        )
    }
  }

  // ================ event handlers ======================================

  $('#post-tweet').off().on('click', (e)=>{
    e.preventDefault()
    let tweet = $('#tweet-input').val()
  
    if (tweet.length > 0 && tweet.length <= 140) {
      $('#tweet-input').val('')
      $('#post-tweet').prop('disabled', true)
  
      createTweet(tweet, ()=>{
        $('#post-tweet').prop('disabled', false)
        setTweets(tweets.push(''))

        }, ()=>{
          window.alert('something went wrong, try again')
          $('#post-tweet').prop('disabled', false)
      })
  
    } else {
      if (tweet.length == 0) {
        window.alert('empty tweets are not allowed')
      } else {
        window.alert('your tweet is longer than 140 characters')
      }
    }
  })

  $('.delete-tweet').on('click', function (e) {
    e.preventDefault()
    var divId = $(this).closest('div').attr('id');
    
    deleteTweet(divId, (data)=>{
      setTweets(tweets.push(''))
    })
  })

  $('#user-tweets').on('click', function (e) {
    e.preventDefault()
    var allTweets = $('#tweets-feed').children()

    allTweets.each(function (){
      if ($(this).hasClass(username) == false) {

        $(this).addClass('d-none')
      }
    })
  })

  $('#logout').on('click', function (e) {
    e.preventDefault()
    deleteSession((data)=>{
      console.log(data)
      location.href = '/'
    })
  })

  $('#logo').on('click', function(e){
    e.preventDefault()

    if (authenticated) {
      $('#tweets-feed').children().removeClass('d-none')
    } 
  })

  // WiP implementation of image upload handler

  $(document).on('click', '#image-select', function() {
    var formData = new FormData();
    var image = document.getElementById('image-select').files;

    if (image.length > 0) {
      $('image-preview').attr('src', image[0].name)
      console.log(image[0])
    }

  })
  
  $('#tweet-input').on('keyup', function(){
    setCount(140 - $('#tweet-input').val().length)
  })

  // ================ rendering ======================================

  return (
    <>
    <Header navComponent={<MenuSelect username={username} />} />

    <div className="background">

      <div className="main container pt-4">
        <div className="row">

          {/* ======= sidebar ======== */}

          <div className="col-3" id="sidebar">
            <div className="bg-light rounded pl-2 pt-2 mb-3">
              <a className="font-weight-bold text-dark" href=""><h5 className="">{username}</h5></a>
              <a className="text-secondary" href="">@{username}</a>
              <div className="row py-3">
                <div className="col-4 pr-0">
                  <p className="category-heading font-weight-light mb-0">TWEETS</p>
                  <a href="">{tweetsCount}</a>
                </div>
                <div className="col-4 px-0">
                  <p className="category-heading font-weight-light mb-0">FOLLOWING</p>
                  <a href="">{followingCount}</a>                
                </div>
                <div className="col-4 pl-0">
                  <p className="category-heading font-weight-light mb-0">FOLLOWERS</p>
                  <a href="">{followersCount}</a>
                </div>
              </div>
            </div>
            <div className="bg-light rounded pl-2 pt-2">
              <p className="text-secondary">Trends  · <a href=""><small>Change</small></a></p>
              <div className="pb-3">
                <a className="d-block" href="">#Crypto</a>
                <a className="d-block" href="">#DOGE</a>
                <a className="d-block" href="">#Mining</a>
                <a className="d-block" href="">#Orange</a>
                <a className="d-block" href="">#Elections</a>
              </div>
            </div>
          </div>

          {/* ======= tweet input and feed  ======== */}

          <div className="col-6 feed rounded pt-2">
            <div className="rounded">
              <textarea className="form-control" id="tweet-input" cols="30" rows="2"></textarea>
              <div className="text-right">  
                {/* <button className="rounded border-0 bg-transparent mr-3 font-weight-bold" id="image-btn">Upload image</button> */}
                <label className="mr-3 font-weight-bold" htmlFor="image-select">Upload image</label>
                <input className="d-none" type="file" id="image-select" name="image" accept="image/*" />
                <img id="image-preview" src="" />
                <span className="letter-count font-weight-light" id="character-count">{characterCount}</span>
                <button className="rounded btn-primary px-2 ml-3 mr-2 my-2" id="post-tweet">Tweet</button>
              </div>
              <div id="tweets-feed">
                  {tweets}
              </div>
            </div>
          </div>
          <div className="col-3">
            {/* empty column to center feed and sidebar */}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
    
  )
})
