* /reactions
  - /reactions?entityID=123456
    -  **POST**: create a new reaction for the given entityID. Header must contain the bearer token. 

* /post
  - /hot?userLogin=julia (MUST HAVE TOKEN)
    - **GET** returns posts which should be on the user's front page. 
    - Selection:
    - a) get posts from the communities which the user is subscribed to
    - b) rank = number_of_reactions / post_age
    - c) sort by rank descending, obviously.
