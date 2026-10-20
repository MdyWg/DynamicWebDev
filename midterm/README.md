# Show Watchlist Tracker

## What/Who it's for
The app is a show watchlist tracker for people to keep track of shows with multiple episodes. 

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


## Additional Things to Add

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





