package com.systemup.monitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;
import java.net.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/servidores")
@CrossOrigin("*") 
public class ServidorController {

    @Autowired
    private ServidorRepository repository;

    @Autowired
    private LogRepository logRepository;

    /**
     * Lista todos os servidores e VMs, testa a conexão de cada um
     * e gera logs de incidentes (queda) ou restabelecimento (volta).
     */
    @GetMapping
    public List<Servidor> listarTodos() {
        List<Servidor> lista = repository.findAll();
        
        for (Servidor s : lista) {
            String statusAnterior = s.getStatus(); 
            String statusAtual = testarConexao(s.getIp(), s.getPorta());
            
            // LÓGICA DE LOGS (Funciona para Hosts e VMs)
            // Sorte de termos o statusAnterior para comparar a mudança de estado
            if (statusAnterior != null && !statusAnterior.equals(statusAtual)) {
                
                // Caso 1: O dispositivo caiu (Mudou de qualquer coisa para OFFLINE)
                if ("OFFLINE".equals(statusAtual)) {
                    logRepository.save(new Log(s.getNome(), "OFFLINE"));
                } 
                // Caso 2: O dispositivo voltou (Mudou de OFFLINE para ONLINE)
                else if ("ONLINE".equals(statusAtual)) {
                    logRepository.save(new Log(s.getNome(), "ONLINE"));
                }
            }

            s.setStatus(statusAtual);
            
            // Atualiza o status no banco para a próxima verificação
            repository.save(s); 
        }
        return lista;
    }

    /**
     * Busca os logs específicos de um Servidor ou VM pelo nome.
     * Usado pelo botão "Logs" em cada card do Dashboard.
     */
    @GetMapping("/logs/{nome}")
    public List<Log> listarLogsPorServidor(@PathVariable String nome) {
        return logRepository.findByServidorNomeOrderByDataHoraDesc(nome);
    }

    /**
     * Retorna os últimos 10 logs globais do sistema.
     */
    @GetMapping("/logs")
    public List<Log> listarLogsGerais() {
        return logRepository.findTop10ByOrderByDataHoraDesc();
    }

    /**
     * TAREFA AGENDADA: Limpa logs com mais de 24 horas.
     * Roda automaticamente a cada 24 horas (86.400.000 milissegundos).
     */
    @Scheduled(fixedRate = 86400000)
    public void limparLogsAntigos() {
        LocalDateTime limite = LocalDateTime.now().minusHours(24);
        logRepository.deleteByDataHoraBefore(limite);
        System.out.println(">>> SystemUp: Limpeza automática de logs (24h) executada.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<Servidor> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Servidor salvar(@RequestBody Servidor s) {
        return repository.save(s);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Servidor> atualizar(@PathVariable Long id, @RequestBody Servidor srvAtualizado) {
        return repository.findById(id).map(srv -> {
            srv.setNome(srvAtualizado.getNome());
            srv.setIp(srvAtualizado.getIp());
            srv.setPorta(srvAtualizado.getPorta());
            srv.setPaiId(srvAtualizado.getPaiId());
            
            Servidor salvo = repository.save(srv);
            return ResponseEntity.ok(salvo);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }

    /**
     * Método auxiliar para testar a conectividade via Socket TCP.
     */
    private String testarConexao(String ip, int porta) {
        try (Socket socket = new Socket()) {
            socket.connect(new InetSocketAddress(ip, porta), 1500); // Timeout de 1.5s
            return "ONLINE";
        } catch (Exception e) {
            return "OFFLINE";
        }
    }
}