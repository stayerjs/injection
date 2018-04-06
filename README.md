# @stayer/injection

Dependency injection module for the Stayer framework.

## Usage example

The simplest way to instantiate a dependency injection is to declare a dependency class as ```Injection```:

```
import { Injection } from '@stayer/injection';
import got = require('got');

@Injection()
export class SomeAPI {
  private url = 'https://external-service.com/api/';

  async performRequest(data: any) {
    return await got.post(this.url, { body: data, json: true });
  }
}
```

Now inject the ```SomeAPI``` class into dependent class:

```
import { Injection } from '@stayer/injection';
import { SomeAPI } from './some-api';

@Injection()
export class SomeService {
  constructor(private api: SomeAPI) {}

  async execute() {
    return await this.api.performRequest({ foo: "bar"});
  }
}
```

**Note**: dependent class must also have the ```@Injection()``` decorator.

Now, how to get the injected instances of describe class? Via global ```injector``` object which is an instance of ```Injector``` type:

```
import { injector } from '@stayer/injection';

import { SomeService } from './some-service';

const service = injector.getInstance(SomeService);
service.execute().then( // HTTP request is performed
  response => {
    console.log(response);
  }
);
```
