# wonderland-cron

A Cypress utility to scrape the Wonderland dashboard and staking pages on https://wonderland.money

`POST`s the results whereever you need it to go.

## Configure
You'll need to configure the scraper to make a `POST` request to your API, so you'll need an API to accept the scraped values and write them somewhere (i.e., a database).

I'm personally running this scraper as a cron job after every Wonderland rebase, so I can plot the data.

I personally `POST` to a KeystoneJS GraphQL API, which is nice because all you have to do is write the schema
and validations for your data, and it generates a create mutation which this scraper can post to.

1) Create a .env file at the root of the project with the following keys, and fill in with your custom values:
```
  WONDERLAND_API_URL=
  WONDERLAND_API_KEY=
```

2) Modify the schema in `dashboard.json` to fit the schema of your API. The object keys serve as scraping DOM accessors, so don't modify those unless the UI changes--the values map to the shape of the data posted.

3) If you're not using GraphQL, modify the network request made at the end of the scraper script in [./cypress/integration/0-scrape-dashboard/scrape-dashboard.ts](./cypress/integration/0-scrape-dashboard/scrape-dashboard.ts) to correctly `POST` to your API.

## Run
```
npm run start
```
This starts Cypress in headless mode. It currently only scrapes the dashboard.

I'm thinking through a personal implementation that would wait for you to connect and disconnect your wallet to get your personalized reward yield, but wouldn't be able to run headless in the cloud on a cronjob automatically, and would require user interaction.

Feel free to post an issue for feature ideas, bug fixes, or feel free to pull request.

To visually see what the Cypress script does, open Cypress and run the integration test in the browser with:
```
npm run in-browser
```
Once Cypress has opened, click the integration test in the list (it's the only one, currently).










