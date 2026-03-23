package com.systemup.monitor; // Use o seu package real aqui!

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Este é o cara que vai criptografar
    }

    @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        // Desabilita o CSRF usando a nova sintaxe Lambda
        .csrf(csrf -> csrf.disable()) 
        
        // Autoriza todas as requisições (permissivo para seu teste)
        .authorizeHttpRequests(auth -> auth
            .anyRequest().permitAll()
        );
    
    return http.build();
}
}