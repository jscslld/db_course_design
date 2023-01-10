FROM maven:3.8.6-amazoncorretto-17
COPY ./maven/settings.xml /usr/share/maven/ref/
COPY ./backend /app/backend
WORKDIR /app/backend
RUN ls
RUN mvn -s "/usr/share/maven/ref/settings.xml" clean package
RUN mv target/db-0.0.1.jar /app/backend
ENTRYPOINT ["sh","/app/backend/entrypoint.sh"]