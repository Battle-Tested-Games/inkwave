# Game Hub prototype image (Battle-Tested-Games fork): build, then serve the static files with nginx.
FROM python:3.13-alpine AS build
WORKDIR /app
COPY . .
# tools/build-dist.py assembles dist/ (game files + the three.js addons it imports).
RUN python3 tools/build-dist.py && if [ -d songs ]; then cp -r songs dist/songs; fi

FROM nginx:1.29-alpine AS runtime
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY deploy/game-hub-card.webp /usr/share/nginx/html/game-hub-card.webp
EXPOSE 80
