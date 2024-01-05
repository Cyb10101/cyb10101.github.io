FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive \
    TIMEZONE="Europe/Berlin" \
    LANGUAGE="de_DE" \
    LOG_STDOUT="" \
    LOG_STDERR="" \
    HUGO_VERSION=0.121.1

RUN apt-get clean && \
    apt-get update && \
    apt-get -y install curl && \
    curl --progress-bar -o /tmp/hugo.deb -fL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb" && \
    dpkg -i /tmp/hugo.deb && rm /tmp/hugo.deb && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

EXPOSE 1313 35729
ENTRYPOINT []

# http://127.0.0.1:1313/
#CMD ["/usr/local/bin/hugo", "server", "--baseURL", "http://127.0.0.1/", "--bind", "0.0.0.0", "--buildDrafts", "--buildExpired", "--buildFuture", "--cleanDestinationDir", "--disableFastRender", "--printI18nWarnings"]

# http://127.0.0.1:1313/
#CMD ["/usr/local/bin/hugo", "server", "--baseURL=http://127.0.0.1/", \
#    "--bind=0.0.0.0", "--port=1313", "--liveReloadPort=1313", "--appendPort=false", \
#    "--buildDrafts", "--buildExpired", "--buildFuture", "--cleanDestinationDir", "--disableFastRender", "--printI18nWarnings"]

# Reverse proxy https to 443
CMD ["/usr/local/bin/hugo", "server", "--baseURL=https://github.cyb10101.localhost/", \
    "--bind=0.0.0.0", "--port=443", "--liveReloadPort=443", "--appendPort=false", \
    "--buildDrafts", "--buildExpired", "--buildFuture", "--cleanDestinationDir", "--disableFastRender", "--printI18nWarnings"]
