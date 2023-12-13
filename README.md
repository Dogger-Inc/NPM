
![Logo](https://raw.githubusercontent.com/Dogger-Inc/.github/main/assets/logo_full.png)


# Dogger JS SDK

Package to automatically monitor your app and send not handled errors to your dogger dashboard.


## Features

- Unhandled errors monitoring
- Tasks performances


## Installation

Package need to be installed via npm with this command:

```bash
npm i dogger-sdk
```
    
## Usage/Examples

```js
import { init as initDogger } from "dogger-sdk";

initDogger({
    key: "DOGGER-PROJECT-KEY",
    'env' => 'dev' // or: prod | dev | custom-env
});

```

