FROM alexsuch/angular-cli as builder
WORKDIR home
COPY . ./
RUN npm install
RUN ng build --aot=true --target=production


FROM nginx:alpine
COPY --from=builder home/dist/ /usr/share/nginx/html/
COPY --from=builder home/nginx.conf /etc/nginx/
EXPOSE 8080