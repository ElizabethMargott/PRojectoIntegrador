package com.sxm.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("*")
            .allowedMethods("*");
    }

}

//     // Configuración del filtro CORS para permitir solicitudes desde http://localhost:5173
//     @Bean
//     public CorsFilter corsFilter() {
//         // Se crea una fuente de configuración basada en URL para la configuración CORS.
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

//         // Se configura una instancia de CorsConfiguration para permitir ciertos métodos HTTP, encabezados y credenciales.
//         CorsConfiguration config = new CorsConfiguration();
//         config.addAllowedOrigin("http://localhost:5173");  // Permite solicitudes desde http://localhost:5173
//         config.addAllowedOrigin("http://localhost:5173/notes");  // Permite solicitudes desde http://localhost:5173
//         config.addAllowedMethod("*");  // Permite solicitudes GET  // Permite solicitudes DELETE
//         config.addAllowedHeader("*");  // Permite cualquier encabezado
//         config.setAllowCredentials(true);  // Permite el uso de credenciales (por ejemplo, cookies)

//         // Se registra la configuración CORS para que se aplique a todas las rutas (/**).
//         source.registerCorsConfiguration("/**", config);

//         // Se crea y devuelve un filtro CORS configurado.
//         return new CorsFilter(source);