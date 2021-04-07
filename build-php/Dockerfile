FROM cyb10101/php-dev:apache-7.4

RUN curl -fSL -o /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v0.80.0/hugo_extended_0.80.0_Linux-64bit.deb && \
    dpkg -i /tmp/hugo.deb && rm /tmp/hugo.deb && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY hugo.conf /opt/docker/etc/supervisor.d/

EXPOSE 1313 35729
