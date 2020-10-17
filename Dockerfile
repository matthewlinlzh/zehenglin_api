FROM node:12.19.0
ENV NODE_ENV=production

WORKDIR /src
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production
COPY . .

ARG SENDGRID_API_KEY

ENV SENDGRID_API_KEY=$SENDGRID_API_KEY

CMD ["npm", "run", "start"]

