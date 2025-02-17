# Instagram Stories

**Deployed URL:** [https://stage-insta-story-sandy.vercel.app/](https://stage-insta-story-sandy.vercel.app/)

A simplified version of the Instagram Stories feature.

### Features
- Horizontally scrollable list of users.
- View any story in full-screen mode by clicking on a specific user.
- Stories automatically advance to the next one after 5 seconds.
- Navigate between previous or next stories by clicking on the sides of the story.
- Progress bar on top indicating the current story index.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Jnanashish/stage-insta-story 
   ```

2. **Install the dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## End-to-End Testing

### To run E2E testing

  ```bash
  npx cypress open
  ```

### Example Test Cases
1. Check if the stories list is visible and scrollable.
2. Click on the first story and check if it opens.
3. Verify that the next story opens automatically after 5 seconds.
