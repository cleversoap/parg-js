#parg-js
Javascript's functions are incredibly flexible parameter wise - they accept any number of arguments of any type and can be accessed in the local `arguments` variable even if none are named in the declaration.

Unfortunately there is no universal way to wrangle these arguments when you want to dynamically handle them. This is where parg comes in. `parg` parses the arguments to your function and returns an object with the named parameters set to the value of the argument they matched.

## Formats
Simply put `parg` expects a formatted array of objects. These objects are simple, they are merely the name of the parameter (`p`) and the criteria for matching the value at that index of the arguments array. For example, if you wanted to match the first parameter of your function as a string you would do something like the following.

```javascript
function something () {
  return parg(arguments, {p: 'arg1', t: 'string'});
}

// This should return 'hello world' as 'arg1' in the object
// {arg1: 'hello world'}
something('hello world');
```

## Roadmap
- Function handlers for specific configurations that will spit out to the individually named arguments of the target functions from one core function eg. `parg.func(this, 'functionName', {... groups with handler function ...}
- Default handlers on a specific parameter matching, eg. if arg1 is set then arg3 should be this value.

## License
This projected is licensed under the terms of the MIT license.
