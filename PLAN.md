BLOG-2, the sequel to the original BLOG.

Features:

- Navigation Bar

  - Logo
  - Search Bar for searching posts AND users
    - Search will bring to page with tabs to swap between posts/profiles using the search word
  - Profile page
    - Route to /me page for the current user
    - Route to /guest if the user is not logged in
  - Notifications page
  - Messages
  - Logout button
  - ThemeSwitcher
  - Settings?

- Posts

  - Following/Global/New feeds
    - Following shows only content from followed users
      - Handle user not logged in
      - Handle user not following anyone (suggest some accounts, e.g. BLOG-official)
    - Global shows all content
    - New shows only content from users NOT followed
  - Do not show posts from blocked users
  - Show only 30 posts per page, with next page button for next 30, or show more posts button to load the next 30
  - Author display name, post title, comment button are clickable
  - Comment count
  - Likes

- Single post
  - Show post on left side
    - Author display name is clickable
  - Comments box below
  - Show comments and replies below (display names clickable)
  - Reply box opens under a comment when 'reply' is clicked
  - Replying to a reply adds @Display_Name to the reply box automatically (clickable)
  - Right side shows author card (name, avatar, blurb, number of posts, number of likes, created at date)
  - Below card is card list of other posts by author
