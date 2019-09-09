![Logo of the project](https://raw.githubusercontent.com/huijari/simons/master/logo.png)

# Simons

> utility telegram bot

## Getting started

To run this bot you will need node and npm. After cloning this repository, install the dependencies,
configure the environment and start the server:

```sh
npm install
# set up necessary environmental variables (next section)
npm start
```

To actualy use it in Telegram you should set a [webhook](https://core.telegram.org/bots/api#setwebhook)
pointing to the server.

### Configuration

Next are the environmental variables used by this bot. You can set those normally on you environment
or use a `.env` file.

- `PORT`: server port.
- `BOT_KEY`: telegram bot token.
- `FUMP_TOKEN`: ufmg's fump services token.
- `TWITTER_TOKEN`: twitter app token.
- `DEBUG`: when present the server will print the message instead of sending it.

## Developing

```shell
git clone git@github.com:huijari/simons.git
cd simons
npm install
# set up environmental variables
npm run dev # hot reloading
```

As it starts a local server you can send sample messages directly into it.
Also, with the DEBUG variable on, you don't need to use real messages.

## Parsers

### bandeco.js

UFMG's restaurant menu.

- `/rui` - menu for the Restaurante Universitário I.
- `/ruii` - menu for the Restaurante Universitário II.
- `/ru` - menu for these two restaurants.

### calendar.js

`cal [month]` - shows the calendar for the month, receives an optional month number.

### dolar.js

`n dol`, `n usd` - converts the usd value to brl, including taxes.

### euro.js

`n eur` - converts the euro value to brl, including taxes.

### twitter.js

`(twitter link)` - shows quoted and "in reply to" tweets.

### weather.js

`wttr@location` - shows the weather at `location`.

## Contributing

Issues are welcomed but keep in mind that this bot is for my personal use.

## Licensing

The code in this project is licensed under MIT license.
