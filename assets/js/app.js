// VARIABLES
const tweetList = document.getElementById('tweet-list')

// EVENT LISTENERS
eventListeners()

function eventListeners() {
  // form submission
  document.querySelector('#form').addEventListener('submit', newTweet)

  // Remove tweet from the list
  tweetList.addEventListener('click', removeTweet)

  // Document ready
  document.addEventListener('DOMContentLoaded', localStorageOnLoad)
}

// FUNCTIONS
function newTweet(e) {
  e.preventDefault()

  // Read the textarea value
  const tweet = document.getElementById('tweet').value

  // Create the remove button
  const removeBtn = document.createElement('a')
  removeBtn.classList = 'remove-tweet'
  removeBtn.textContent = 'X'

  // Create an <li> element
  const li = document.createElement('li')
  li.textContent = tweet

  // Add the remove button to each tweet
  li.appendChild(removeBtn)

  // Add to the list
  tweetList.appendChild(li)

  // call the addTweetLocalStorage function
  addTweetLocalStorage(tweet)

  // Print the alert
  alert('tweet added')

  // Clear the form after entering a tweet
  this.reset()
}

// Remove tweets from the DOM
function removeTweet(e) {
  if (e.target.classList.contains('remove-tweet')) {
    e.target.parentElement.remove()
  }

  // Remove from storage
  removeTweetLocalStorage(e.target.parentElement.textContent)
}

// Add tweets to local storage
function addTweetLocalStorage(tweet) {
  let tweets = getTweetsFromStorage()

  // Add the tweet into the array
  tweets.push(tweet)

  // Covert tweet array into a string
  localStorage.setItem('tweets', JSON.stringify(tweets))
}

function getTweetsFromStorage() {
  let tweets
  const tweetsLS = localStorage.getItem('tweets')
  // Get the values. If null is returned then we create an empty array
  if (tweetsLS === null) {
    tweets = []
  } else {
    tweets = JSON.parse(tweetsLS)
  }
  return tweets
}

// Print local storage tweets on load
function localStorageOnLoad() {
  let tweets = getTweetsFromStorage()

  // Loop through storage and then print values
  tweets.forEach(function(tweet) {
    // Create the remove button
    const removeBtn = document.createElement('a')
    removeBtn.classList = 'remove-tweet'
    removeBtn.textContent = 'X'

    // Create an <li> element
    const li = document.createElement('li')
    li.textContent = tweet

    // Add the remove button to each tweet
    li.appendChild(removeBtn)

    // Add to the list
    tweetList.appendChild(li)
  })
}

// Remove the tweet from local storage
function removeTweetLocalStorage(tweet) {
  // get tweets from storage
  let tweets = getTweetsFromStorage()

  // Remove the X from the tweet
  const tweetDelete = tweet.substring(0, tweet.length - 1)

  // Loop through the tweets and remove the tweet that is equal
  tweets.forEach(function(tweetLS, index) {
    if (tweetDelete === tweetLS) {
      tweets.splice(index, 1)
    }
  })

  // Save the data
  localStorage.setItem('tweets', JSON.stringify(tweets))
}
