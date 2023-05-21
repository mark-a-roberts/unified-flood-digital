# unified-flood-digital
Unified Flood Digital project

# Installation

Use Node version 14 or less due to a bug in HAPI versions below 20.
Node Version manager (nvm) is the best way to achieve this.

```
  npm install 
  npm run postinstall
  npm start
```

# Valid routes

1. National flood information
```
    http://server
```

2. Area flood information

```
    http://server/town/{id}
```

3. Local flood information

```
    http://server/property/{id}
```