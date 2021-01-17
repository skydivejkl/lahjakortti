FROM node:14.15.4

# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer
# installs, work.
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 libxext6 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*


ENV NODE_ENV=production
ARG NODE_ENV=production

RUN adduser --system app
RUN mkdir -p /app
WORKDIR /app
RUN chown -R app:root /app

COPY --chown=app:root . /app

RUN ls -l /app

USER app

RUN npm ci
RUN npm run build


CMD ["npm", "start"]
