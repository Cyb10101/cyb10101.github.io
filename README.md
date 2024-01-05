# cyb10101.github.io

A webpage on Github.io.

* [Hugo](https://gohugo.io/)

## Development

* [Development Website](http://127.0.0.1:1313)

```bash
# Use yarn
./start.sh exec -u 1000:1000 node yarn upgrade-interactive --latest

# Build for production
./start.sh exec -u 1000:1000 web hugo --cleanDestinationDir --printI18nWarnings

# Show deprecations
./start.sh exec web hugo --logLevel info | grep deprecate
```
