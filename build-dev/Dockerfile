FROM cyb10101/php-dev:apache-8.0

ENV HUGO_VERSION=0.103.0

RUN curl -fSL -o /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb && \
    dpkg -i /tmp/hugo.deb && rm /tmp/hugo.deb && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY hugo.conf /opt/docker/etc/supervisor.d/

EXPOSE 1313 35729
