# Utiliza la imagen base de OpenJDK versión 19 como base para la imagen del contenedor
FROM openjdk:19

# Copia el archivo JAR de la aplicación (docker-v1-0.0.1-SNAPSHOT.jar) desde el sistema de archivos local al sistema de archivos del contenedor.
ADD ./docker-v1-0.0.1-SNAPSHOT.jar docker-v1-0.0.1-SNAPSHOT.jar

# Establece el punto de entrada para el contenedor, que se ejecutará cuando se inicie el contenedor.
ENTRYPOINT [ "java", "-jar", "docker-v1-0.0.1-SNAPSHOT.jar"]
