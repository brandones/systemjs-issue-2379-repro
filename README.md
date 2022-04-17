# SystemJS Named Registers Bug

This is a reproduction of a bug with SystemJS named registers.
It demonstrates a situation where `System.import` returns an empty
`System.Module` object, and the imported code is not run.
