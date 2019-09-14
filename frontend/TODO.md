# TODO

## NOTES

-   use status(400).send({message: 'blabla'}) and then get message from response in frontend

## BACKEND

-   logging out should also add token to server blacklist, or something like that

## CRITICAL:

-   DON't USE window.location.replace, use React.router instead (browser history is not updated)

## OTHER:

-   change background color of post to some nice light gray on hover?
-   long comment formatting
-   make CommentList be in collapsible, with nice unfolding animation etc.
-   dropdown positioning is slightly wrong - the list is ~2px to the right
-   change the loading spinner color to match \$color-base from rcl-style.scss
