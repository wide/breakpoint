# Breakpoint

Breakpoint observer with helper methods.


## Install

```
npm install @wide/breakpoint --save
```


## Usage

Initialize breakpoint observer with custom sizes:
```js
import breakpoint from '@wide/breakpoint'

breakpoint({
  xs: 326,
  sm: 576,
  md: 768,
  lg: 1024,
  xl: 1200,
  xxl: 1600
})
```


## Events

On window resize, a `breakpoint` event will be triggered if the breakpoint change according to your config:
```js
import emitter from '@wide/emitter'

emitter.on('breakpoint', bp => {})

// or
document.onEvent('breakpoint', bp => {})
```

Listen to specific breakpoint events:
```js
import emitter from '@wide/emitter'

emitter.on('breakpoint.lg', () => {})

// or
document.onEvent('breakpoint.lg', () => {})
```


## Properties

Get current breakpoint:
```js
import { current } from '@wide/breakpoint'

console.log(current) // lg
```

Get all breakpoints for reference:
```js
import { breakpoints } from '@wide/breakpoint'

console.log(breakpoints) // { xs: 326, sm: 576, ... }
```


## Methods

Resolve mobile-first breakpoint:
```js
import { up } from '@wide/breakpoint'

// lg and more : >= 1024
if(up('lg')) {

}
```

Resolve desktop-first breakpoint:
```js
import { down } from '@wide/breakpoint'

// less than lg : < 1024
if(down('lg')) {

}
```

Resolve range breakpoint:
```js
import { between } from '@wide/breakpoint'

// md, lg and xl : >= 768 && < 1600
if(between('md', 'xl')) {

}
```

Resolve range breakpoint (excluding mode):
```js
import { between } from '@wide/breakpoint'

// lg and xl : >= 1024 && < 1600
if(between('md', 'xxl', false)) {

}
```

Resolve one breakpoint only:
```js
import { only } from '@wide/breakpoint'

// lg to xl excluded : >= 1024 && < 1200
if(only('lg')) {

}
```


## Authors

- **Aymeric Assier** - [github.com/myeti](https://github.com/myeti)
- **Julien Martins Da Costa** - [github.com/jdacosta](https://github.com/jdacosta)


## License

This project is licensed under the MIT License - see the [licence](licence) file for details