# Answers: the favourites slice

## 1. What is the action type string your toggle dispatches, and where do its two halves come from?

The action type is favourites/favouriteToggled. Favourites comes from name: 'favourites' and favouriteToggled comes from the name of the reducer.

## 2. Why a list of ids, rather than a `favourite: true` flag on each print?
If each print had a favourite flag, all of PRINTS would have to move into the store first which becomes its responsibility. With a list of ids, the store only holds what the users actually changed which are the ids.


## 3. A print is removed from the catalogue, and somebody had favourited it. What happens to your app?

The favourites count still remains after favouriting, but the actual print itself disappeared. favourites.ids still holds the name and count just checks length but the actual print disappeared because its not in PRINTS which the grid is built from

