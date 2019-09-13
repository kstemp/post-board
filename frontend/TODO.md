# TODO

## NOTES

-   use status(400).send({message: 'blabla'}) and then get message from response in frontend

## BACKEND

-   logging out should also add token to server blacklist, or something like that

## CRITICAL:

-   figure out why Keycloak has problems with redirect_uri
-   DON't USE window.location.replace, use React.router instead (browser history is not updated)

## OTHER:

-   long comment formatting
-   make CommentList be in collapsible, with nice unfolding animation etc.
-   dropdown positioning is slightly wrong - the list is ~2px to the right
-   change the loading spinner color to match \$baseColor from rcl-style.scss
