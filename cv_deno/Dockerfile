FROM ubuntu:20.04

RUN apt-get update && apt-get install -y curl unzip sudo nginx

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

RUN curl -fsSL https://deno.land/install.sh | sh -s v1.31.3

ENV DENO_INSTALL="/root/.deno"
ENV PATH="${DENO_INSTALL}/bin:${PATH}"

WORKDIR /app

EXPOSE 8000

WORKDIR /app

# Prefer not to run as root.
# USER deno

COPY deps.ts .
RUN deno cache deps.ts

ADD . .

RUN deno cache main.ts

# CMD ["deno", "run", "--allow-read", "--allow-env", "--allow-net", "main.ts"]

# CMD ["bash"]