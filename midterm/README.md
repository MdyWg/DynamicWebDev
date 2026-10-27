# Show Watchlist

## What/Who it's for
The app is a show watchlist tracker for people to keep track of their watch history.

## User story
As someone who used to watch a lot of anime and has a tendency to start off new shows without finishing old ones, I want to keep track of how many episodes I've already watched, so that I can remember where I left off in the show.

## How to run it

Install dependencies:

```
npm install
```

Run in two separate terminals:

```
npm run server
```

```
npm run dev
```

## Props or Context

I used context but this app is small enough that props would have worked too, since the data only goes App → ShowList → ShowItem → ShowEdit. I still picked Context because each component takes only what it needs from useShowsContext(). It came in handy when I removed the done checkbox, where I deleted toggleShowById from the context and ShowItem, and ShowList did not change at all. I think it would also be useful if I were to add more features in the future that required me to add new actions. 

## Additional Things to Add
- Look up the total episodes automatically from an API (Jikan for anime, TVmaze for other TV) instead of typing it in
- Proper form validation with messages next to the field instead of the browser's pop-ups, and a submit button that can't save twice
- More statuses than Watching and Completed, like Plan to watch or Dropped (select input next to show title)
- Sort by progress, so the shows I'm closest to finishing are at the top
- Sort alphabetically and by date

## Developer checklist (before)

1. Create new state in ShowCreate for episode, starting with ''
2. Add a new handler in ShowCreate for the episode input that calls the episode setter
3. Add new field in createShow in context shows
4. Add new form input in return that takes in number, onChange points to handler
5. Update createShow in api.js by adding new field
6. Create new state in ShowEdit for episode, starting at current
7. Add a second handler in ShowEdit for the episode input that calls the episode setter
8. Add in new form input in ShowEdit also with onChange update
9. Update editShowById to also account for new field

## Developer checklist (after)

1. Create new state in ShowCreate for episode, starting with ''
2. Add a new handler in ShowCreate for the episode input that calls the episode setter
3. Add new field in createShow in context shows
4. Add new form input in return that takes in number, onChange points to handler
5. In ShowCreate's handleSubmit, pass episode into createShow(title, episode) and clear it with setEpisode('')
6. Update createShow in api.js by adding new field
7. Create new state in ShowEdit for episode, starting at current
8. Add a second handler in ShowEdit for the episode input that calls the episode setter
9. Add in new form input in ShowEdit also with onChange update
10. In ShowEdit's handleSubmit, pass episode up: onSubmit(show.id, title, episode)
11. Update handleSubmit in ShowItem to take newEpisode and pass it to editShowById
12. Update editShowById to also account for new field
13. Make the field name the same everywhere. Create was saving `episodes` and edit was saving `episode`, so editing added a second key instead of changing the first
14. Followed the same steps to add totalEpisodes as a second field
15. Make current and total episode visible to users, showing ? when there is no total and 0 when there is no episode/ongoing series
16. Convert episode and totalEpisodes to numbers in ShowCreate's and ShowEdit's handleSubmit
17. Start ShowEdit's total at show.totalEpisodes || '' so a show with no total does not break the controlled input
18. Mark a show completed automatically when episode >= totalEpisodes
19. Stop the episode from going past the total with max={totalEpisodes} on the episode input

## The gap

My before list had 9 steps and the after list has 19. Steps 1 to 13 are the episode field itself, and 14 to 19 are extra features that I added to make the app function more as a show watchlist.

What I forgot for the episode field:

- Passing the value along (steps 5, 10, 11).
I planned the state and inputs in the forms, and the functions in the context and api.js, but not the calls in between. ShowCreate's handleSubmit had to pass episode into createShow, ShowEdit had to pass it up through onSubmit, and ShowItem's handleSubmit had to take it and pass it on to editShowById. Every one of those calls needed a new argument.
- Step 13: Create was saving `episodes` and edit was saving `episode`. Each file looked fine on its own, and I only found it by following the data from the form to db.json.
- Showing it in the list: My whole plan was about getting the value in through the forms and the server. I didn't plan anything for how it looks on the screen which is why I added in a total episodes input later on.

Other things:

- Strings vs numbers
A number input always gives a string, so db.json was storing "12" instead of 12, and "9" >= "12" is true for strings. I first converted with Number() when checking if a show was completed, then moved it to the forms' handleSubmit so the server stores real numbers. An empty episode saves as 0 and an empty total saves as null.



