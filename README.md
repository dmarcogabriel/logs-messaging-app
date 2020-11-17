# Log Messaging App Tool
## App dependencies
* yarn v1.22.5
* node v14.15.0
* npm v6.14.8

### Installing dependecies
This app contains two microservices a `producer` and a `consumer`, each service
has it own commands. To install de node dependencies, you must run the following
commands:

`$ cd src/producer`
`$ yarn`

> #### Note
>
> Repeat the same on `src/consumer` directory

## Running app
To start the producer run `$ yarn start` on `src/producer` directory, the same 
is on consumer run `$ yarn start` on `src/consumer` directory.

> #### Note
>
> The production is not so different from development mode yet... but it will be

To run app in development mode, run `$ yarn dev` on each directories (producer 
and consumer).

## Code Architecture
It has a simple architecture, that is more likely a `modular based` architecture

* `src/consumer`: contains the consumer application, with `node_modules` and 
etc...
* `src/consumer/app`: contains application main files.

> #### Note
>
> The `producer` application reflects the same architecture as the `consumer`, 
> so in this project the best practice is to keep the same structure.

### StyleGuide
This app implements [AirBnb StyleGuide](https://airbnb.io/javascript/) with 
modifications on rules:

```json
...
"rules": {
    "no-underscore-dangle": "off",
    "semi": ["error", "never"],
    "no-plusplus": "off",
    "no-console": "off"
},
...
```

## That's all folks

![Thunder Cat](https://media.giphy.com/media/BzyTuYCmvSORqs1ABM/giphy.gif)