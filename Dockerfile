FROM node:lts-alpine as base

LABEL maintainer="Stephane Segning <selastlambou@gmail.com>"
LABEL org.opencontainers.image.description="App API for the Vymalo Project"

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4 --activate
RUN echo 'nodeLinker: "node-modules"' > ./.yarnrc.yml
RUN apk add --no-cache libc6-compat

COPY package.json yarn.lock ./

# Install dependencies only when needed
FROM base AS deps

RUN yarn install --immutable

FROM deps AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn codegen && yarn generate-pwa-assets && yarn build

# Use Nginx as the production server
FROM nginx:stable-alpine

LABEL maintainer="Stephane Segning <selastlambou@gmail.com>"
LABEL org.opencontainers.image.description="UI Frontend for Vymalo Projects"

# Expose port 80 for the Nginx server
EXPOSE 80

# Create non-root user
RUN addgroup -S -g 1001 app && adduser -S app -G app -u 1001

# Copy the built React app to Nginx's web server directory
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/init-scripts/ /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/*

# Copy the built React app to Nginx's web server directory
COPY --from=builder --chown=app:app /app/dist /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --start-period=5s CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Change the user to the non-root user
USER app

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]