package com.systemup.monitor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

// ADICIONE ESTES IMPORTS SE ESTIVEREM EM OUTROS PACKAGES
// import com.systemup.monitor.model.Usuario;
// import com.systemup.monitor.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository; // ESSA LINHA É A QUE FALTAVA!

    @Autowired
    private BCryptPasswordEncoder encoder;

    @PostMapping("/cadastro")
    public ResponseEntity<String> cadastrar(@RequestBody Usuario usuario) {
        // 1. Validação de domínio
        if (usuario.getEmail() == null || !usuario.getEmail().endsWith("@systemup.inf.br")) {
            return ResponseEntity.badRequest().body("Use o e-mail da empresa!");
        }

        // 2. CRIPTOGRAFIA
        String senhaCripto = encoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCripto); 

        // 3. SALVAR
        repository.save(usuario);
        return ResponseEntity.ok("Cadastrado com segurança!");
    }

@PostMapping("/login")
public ResponseEntity<String> realizarLogin(@RequestBody Usuario dadosLogin) {
    // 1. Busca o usuário (Retorna um Optional)
    Optional<Usuario> userOpt = repository.findByEmail(dadosLogin.getEmail());

    // 2. Verifica se o usuário EXISTE dentro do Optional
    if (userOpt.isPresent()) {
        Usuario userBanco = userOpt.get(); // Pega o usuário real de dentro da "caixa"
        
        // 3. Compara as senhas
        if (encoder.matches(dadosLogin.getSenha(), userBanco.getSenha())) {
            return ResponseEntity.ok("Acesso liberado!");
        }
    }
    
    return ResponseEntity.status(401).body("E-mail ou senha inválidos.");
}
} // FECHAMENTO DA CLASSE