package com.systemup.monitor;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "logs") // Define o nome da tabela no MySQL
public class Log implements Serializable {
    
    private static final long serialVersionUID = 1L; // Remove aviso de Serializable

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String servidorNome;
    private String status;
    private LocalDateTime dataHora;

    // Construtor Padrão (Obrigatório para o JPA)
    public Log() {
    }

    // Construtor Customizado
    public Log(String servidorNome, String status) {
        this.servidorNome = servidorNome;
        this.status = status;
        this.dataHora = LocalDateTime.now();
    }

    // --- GETTERS E SETTERS ---
    // Sem eles, o Spring não consegue transformar os dados em JSON para o seu JS

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServidorNome() {
        return servidorNome;
    }

    public void setServidorNome(String servidorNome) {
        this.servidorNome = servidorNome;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }
}