# Solidarity Now!

_Duration: 2 weeks_

Solidarity Now! is a mobile application that aggregates and amplifies requests for mutual aid, calls to action, and other ways we can show up for one another with care. 

Mutual aid is when everyday people get together to meet each other’s needs, with the shared understanding that the systems we live in often do not meet our needs. It is a practice based on the principles of direct action, cooperation, mutual understanding, and solidarity. Mutual aid is not charity, it is the building of new social relations where people give what they can and get what they need, outside of unjust systems of power.

![Screen Recording 2023-03-27 at 2 06 44 PM](https://user-images.githubusercontent.com/111613142/228064996-ff77bfaf-339b-4095-aecf-3621c2f9a200.gif)


### Prerequisites

If not viewing the deployed version of [Solidarity Now!](https://solidaritynow.herokuapp.com/) on Heroku, you can download and install the app on your local computer. Designed as a mobile application, Solidarity Now! is best viewed with a screen width of 390px by 884px or a small browser window. 

Before you get started, make sure you have the following software installed:

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Postico 2](https://eggerapps.at/postico2/)

## Technology

- React.js 
- Redux
- Redux-Saga
- React-Router
- Axios
- DotEnv 
- Express
- Body-parser
- pg
- Passport.js
- Material UI
- Google Translate API
- AWS S3

## Installation

1. Make sure PostgreSQL and Postico are installed. Using Postico, create a database called `solidarity-now`.
2. Run the queries from `database.sql` to set up the database tables in Postico.
3. In your terminal, navigate to the solidarity-now directory and run `npm install` to install dependencies.
4. Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
  
  5. Run `npm run server` to start the server and `npm run client`, which will open a new browser tab containing the app. 

## Usage
**Users can select a language at any time from the dropdown menu to translate any page into their preferred language.**
1. When a user logs in, they are taken to the landing page. They can navigate using the hamburger menu in the top left corner.
2. **Offers/Requests Form**: The user can submit an request or offer and add a resource. Tagging the post will help others recognize what area of interest this belongs to.
![Screen Recording 2023-03-27 at 4 13 02 PM](https://user-images.githubusercontent.com/111613142/228068155-9eed8d23-36da-4415-a9f1-dfa4c58d63c4.gif)
3. **Solidarity Web**: Users can see all posts made by all users.
4. **Profile**: Users are able to edit and delete the posts they've made and update their profile pictures.
![Screen Recording 2023-03-27 at 4 18 13 PM](https://user-images.githubusercontent.com/111613142/228069242-4e3fb9c8-71b7-4549-b913-4decd8dcbbd8.gif)
5. **Resources**: Users can refer to the Resources page to find resources relevant to them. 
<img width="390" alt="Screenshot 2023-03-27 at 4 22 17 PM" src="https://user-images.githubusercontent.com/111613142/228069813-c54adcfc-f568-4cfd-a3dd-c6207c2a9b2a.png">

Resources translated into Spanish.

<img width="392" alt="Screenshot 2023-03-27 at 4 22 36 PM" src="https://user-images.githubusercontent.com/111613142/228069818-4c2c9674-8200-4e97-a0ad-aaac109ee263.png">

## Deployment

1. Create a new Heroku project
2. Link the Heroku project to the project GitHub Repo
3. Create an Heroku Postgres database
4. Connect to the Heroku Postgres database from Postico
5. Create the necessary tables
6. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
7. In the deploy section, select manual deploy


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Thank you to Prime Digital Academy who equipped me with the skills to make this application a reality.

## Future Updates
I would like to add some more social functionality, like the ability for users to message one another and follow up on a request or an offer.

## Bug Report
No known bugs at this time! However, the Heroku server can be quite slow, so if using on Heroku, users may experience a lag between their actions and the site response. So, please be patient! Please reach out to me if you do spot a bug [anniessa.antar@gmail.com].