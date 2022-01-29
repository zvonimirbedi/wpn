FROM ubuntu

RUN apt-get update
RUN apt-get install nano
RUN apt-get install openjdk-17-jdk --install-recommends -y
ENV MALLOC_ARENA_MAX 4

COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-Dfile.encoding=utf-8", "-Xms650m","-Xmx650m","-XX:MaxRAM=650m", "-XX:MaxDirectMemorySize=650m", "-jar", "/app.jar"]

