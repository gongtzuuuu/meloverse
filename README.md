## meloverse

![website screenshot](/public/assets/images/Screenshot.png)

meloverse is an innovative music app that enables users to craft engaging posts with their favorite songs. Users can seamlessly log in with Spotify account to access their personal collection or explore new tracks by keywords or artists.

The app also introduce a thriving community of music enthusiasts, where users share their love for songs and discover a harmonious array of posts. Filter content by tags to explore topics of your interest, connecting with like-minded individuals.

[Click here to see deploy version](https://meloverse-gongtzuuuu.vercel.app/)

## Tech Stack

- Built with Next.js
- Powered by NextAuth with Spotify provider
- Leveraging Spotify API and MongoDB Atlas
- Styled with Tailwind CSS
- Deployed on Vercel and Netlify

## Models

- User model - represents the user accounts and their associated infomation.
- Post model - represents the individual posts of songs and their creators.

## API Routes

- /api/auth - views for authentication
- /api/post - gets all posts
- /api/post/new - creates new post
- /api/post/:id - gets post by its id
- /api/post/edit - edits post
- /api/post/hashtag - get posts by their hashtags
- /api/songs/:id/posts - gets posts by id of the song
- /api/users/:id/posts - gets posts by id of the user

## Links

- [Deployment Link](https://meloverse-gongtzuuuu.vercel.app/)
- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Vercel](https://vercel.com/)
- [Spotify API](https://developer.spotify.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- [tailwindcss](https://tailwindcss.com/)
- [FreeLogoDesign](https://www.freelogodesign.org/)

## Special Thanks

- [JavaScript Mastery @Youtube](https://www.youtube.com/@javascriptmastery)
- [Apoorv Nandan @Github](https://github.com/apoorvnandan)
