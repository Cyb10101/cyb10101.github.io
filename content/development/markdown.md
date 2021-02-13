---
title: "Markdown Template"
draft: true
menu:
    main:
        parent: "development"
        pre: "<i class=\"fas fa-cubes mr-3 text-primary fa-fw\"></i>"
---

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.

---

This is **bold**, *italic*, _underlined_, ~~deleted~~ text.

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

{{< markdown/bootstrap-table class="table table-striped" >}}
| # | First          | Last     | Handle   |
|---|----------------|----------|----------|
| 1 | Mark           | Otto     | @mdo     |
| 2 | Jacob          | Thornton | @fat     |
| 3 | Larry the Bird |          | @twitter |
{{< /markdown/bootstrap-table >}}

{{< markdown/bootstrap-table class="table table-striped table-dark" theadClass="here" >}}
| # | First          | Last     | Handle   |
|---|----------------|----------|----------|
| 1 | Mark           | Otto     | @mdo     |
| 2 | Jacob          | Thornton | @fat     |
| 3 | Larry the Bird |          | @twitter |
{{< /markdown/bootstrap-table >}}

![Placeholder 1](https://placeholder.netslum.de/image/400x300/?1 "Placeholder 1")

![Placeholder 2](https://placeholder.netslum.de/image/400x300/?2 "Placeholder 2")

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```