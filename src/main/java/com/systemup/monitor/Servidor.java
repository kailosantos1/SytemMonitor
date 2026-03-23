package com.systemup.monitor;

import jakarta.persistence.*;

@Entity
@Table(name = "servidores")
public class Servidor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String ip;
    private int porta;
    private String status;

    // NOVO CAMPO: Faz a ponte com o MySQL
    @Column(name = "pai_id")
    private Long paiId;

    // Construtor vazio (obrigatório para o Hibernate)
    public Servidor() {}

    // Getters e Setters antigos
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public String getIp() { return ip; }
    public void setIp(String ip) { this.ip = ip; }
    public int getPorta() { return porta; }
    public void setPorta(int porta) { this.porta = porta; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    // NOVOS Getters e Setters para o paiId
    public Long getPaiId() { 
        return paiId; 
    }
    
    public void setPaiId(Long paiId) { 
        this.paiId = paiId; 
    }
}
