FROM ubuntu

RUN apt-get update
RUN apt-get install nano
RUN apt-get install openjdk-17-jdk --install-recommends -y
ENV MALLOC_ARENA_MAX 4

COPY build/libs/*.jar app.jar
ENTRYPOINT ["java", "-Dfile.encoding=utf-8", "-Xms550m","-Xmx550m","-XX:MaxRAM=550m", "-XX:MaxDirectMemorySize=550m", "-jar", "/app.jar"]

