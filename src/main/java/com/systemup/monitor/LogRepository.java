package com.systemup.monitor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional; // Necessário para exclusão
import java.time.LocalDateTime; // Importação que estava faltando
import java.util.List;

public interface LogRepository extends JpaRepository<Log, Long> {

    // Pega os 10 últimos logs gerais (para o dashboard principal se quiser)
    List<Log> findTop10ByOrderByDataHoraDesc(); 

    // Busca os logs apenas de um servidor específico
    List<Log> findByServidorNomeOrderByDataHoraDesc(String nome);

    // Deleta logs anteriores a X data
    @Transactional // IMPORTANTE: Operações de delete precisam de transação
    void deleteByDataHoraBefore(LocalDateTime limite);
}