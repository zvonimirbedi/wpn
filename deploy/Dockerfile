FROM ubuntu

RUN apt-get update
RUN apt-get install nano
RUN apt-get install openjdk-17-jdk --install-recommends -y
ENV MALLOC_ARENA_MAX 4

COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-Dfile.encoding=utf-8", "-Xms950m","-Xmx950m","-XX:MaxRAM=950m", "-XX:MaxDirectMemorySize=950m", "-jar", "/app.jar"]

