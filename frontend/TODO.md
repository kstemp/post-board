# TODO

## NOTES

-   don't check whether post ID exists, and then insert. Just catch the DB exception and handle it appropriately.

-   use status(400).send({message: 'blabla'}) and then get message from response in frontend

## BACKEND

-   rename /post, /community to /posts, /communities etc.
-   logging out should also add token to server blacklist, or something like that

## OTHER:

-   change background color of post to some nice light gray on hover?
-   dropdown positioning is slightly wrong - the list is ~2px to the right
-   change the loading spinner color to match \$color-base from rcl-style.scss
