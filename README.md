# SystemJS Named Registers Bug

This is a reproduction of a bug with SystemJS named registers.
It demonstrates a situation where `System.import` returns an empty
`System.Module` object, and the imported code is not run.

## Running

Open two terminals. In one:

```sh
cd shell
yarn
yarn start
```

in the other

```sh
cd module
yarn
yarn start
```

Open the browser console. It shows the value of the imported module.
