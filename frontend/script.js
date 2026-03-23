// ==========================================
// 0. SEGURANÇA E CONFIGURAÇÕES
// ==========================================

const servidoresNotificados = new Set();

if ("Notification" in window) {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission();
    }
}

function dispararNotificacao(nome) {
    if (Notification.permission === "granted") {
        if (servidoresNotificados.has(nome)) return;

        const n = new Notification("⚠️ Alerta SystemUp", {
            body: `O servidor ${nome} acabou de cair!`,
            icon: "https://cdn-icons-png.flaticon.com/512/595/595067.png",
            tag: nome 
        });

        servidoresNotificados.add(nome);
        setTimeout(() => servidoresNotificados.delete(nome), 600000);
        
        n.onclick = () => { window.focus(); n.close(); };
    }
}

if (!localStorage.getItem('usuarioLogado') && document.getElementById('container-servidores')) {
    window.location.href = 'login.html'; 
}

const MONITOR_API = "http://localhost:8080/api/servidores";
const USER_API = "http://localhost:8080/api/usuarios";

// ==========================================
// 1. MONITORAMENTO (DASHBOARD & LOGS)
// ==========================================

async function renderizar() {
    const container = document.getElementById('container-servidores');
    const loader = document.getElementById('meu-loader');
    
    if (!container) return; 

    if (loader) loader.style.display = 'block';
    container.style.opacity = '0.5';

    try {
        const resposta = await fetch(MONITOR_API);
        const todosServidores = await resposta.json();

        container.innerHTML = '';

        const hosts = todosServidores.filter(s => s.paiId === null);
        const vms = todosServidores.filter(s => s.paiId !== null);

        // Prioriza mostrar os que estão OFFLINE no topo
        hosts.sort((a, b) => (a.status === 'OFFLINE' ? -1 : 1));

        hosts.forEach((host) => {
            const vmsDesteHost = vms.filter(v => v.paiId === host.id);
            const temVmOffline = vmsDesteHost.some(v => v.status === 'OFFLINE');
            
            // Notificação apenas para queda do Host (Pai)
            if (host.status === 'OFFLINE') {
                dispararNotificacao(host.nome);
            } else {
                servidoresNotificados.delete(host.nome);
            }

            const card = document.createElement('div');
            const statusBase = host.status.toLowerCase();
            const classeAlerta = (host.status === 'ONLINE' && temVmOffline) ? 'warning-vms' : '';
            
            card.className = `server-card ${statusBase} ${classeAlerta}`;
            card.innerHTML = `
                <div class="info">
                    <strong>${host.nome}</strong> ${temVmOffline ? '<span title="VM com problema!">⚠️</span>' : ''}<br>
                    <small>${host.ip}:${host.porta}</small><br>
                    <span class="vm-count">${vmsDesteHost.length} VMs vinculadas</span>
                </div>
                <div class="status-badge">
                    <span>${host.status}</span>
                </div>
                <div class="btn-group">
                    <button class="btn-log" onclick="event.stopPropagation(); verHistorico('${host.nome}')">📋 Logs</button>
                    <button class="btn-edit" onclick="event.stopPropagation(); editarServidor(${host.id})">Editar</button>
                    <button class="btn-delete" onclick="event.stopPropagation(); remover(${host.id})">Remover</button>
                </div>
            `;

            card.onclick = () => abrirModalVms(host.nome, vmsDesteHost);
            container.appendChild(card);
        });

        // Opcional: Manter o log geral carregando se você ainda tiver a div de logs no final
        carregarLogs();

    } catch (erro) {
        console.error("Erro ao conectar no Java:", erro);
        container.innerHTML = "<p style='color:red; text-align:center;'>⚠️ Erro: Servidor Java Offline!</p>";
    } finally {
        if (loader) loader.style.display = 'none';
        container.style.opacity = '1';
    }
}

async function verHistorico(nomeServidor) {
    try {
        const res = await fetch(`${MONITOR_API}/logs/${nomeServidor}`);
        const logs = await res.json();

        let htmlLogs = logs.length > 0 
            ? logs.map(l => `
                <div style="border-bottom: 1px solid #eee; padding: 10px 0; text-align: left; display: flex; justify-content: space-between;">
                    <span style="color: ${l.status === 'ONLINE' ? '#2ecc71' : '#e74c3c'}; font-weight: bold;">[${l.status}]</span>
                    <small style="color: #7f8c8d;">${new Date(l.dataHora).toLocaleString()}</small>
                </div>
            `).join('')
            : '<p style="color: #999; text-align: center; padding: 20px;">Nenhum incidente registrado nas últimas 24 horas.</p>';

        Swal.fire({
            title: `Histórico: ${nomeServidor}`,
            html: `<div style="max-height: 350px; overflow-y: auto; padding: 10px;">${htmlLogs}</div>`,
            confirmButtonText: 'Fechar',
            confirmButtonColor: '#2c3e50'
        });
    } catch (e) {
        Swal.fire('Erro', 'Não foi possível carregar os logs.', 'error');
    }
}

function abrirModalVms(nomeHost, listaVms) {
    if (listaVms.length === 0) {
        Swal.fire({ title: nomeHost, text: 'Este host não possui máquinas virtuais vinculadas.', icon: 'info' });
        return;
    }

    let htmlLista = `
        <div style="text-align: left; max-height: 400px; overflow-y: auto; padding: 5px;">
            <p style="margin-bottom: 15px; color: #666; font-size: 0.9em;">Máquinas Virtuais neste Host:</p>
            ${listaVms.map(vm => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border-bottom: 1px solid #eee; background: #fafafa; margin-bottom: 8px; border-radius: 8px; border-left: 5px solid ${vm.status === 'ONLINE' ? '#2ecc71' : '#e74c3c'};">
                    <div>
                        <strong style="display: block; color: #2c3e50;">${vm.nome}</strong>
                        <small style="color: #7f8c8d;">IP: ${vm.ip}</small>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                        <span style="color: ${vm.status === 'ONLINE' ? '#2ecc71' : '#e74c3c'}; font-weight: bold; font-size: 0.85em;">
                            ● ${vm.status}
                        </span>
                        <div style="display: flex; gap: 4px;">
                            <button onclick="verHistorico('${vm.nome}')" title="Ver Logs da VM" style="padding: 6px 12px; border: none; border-radius: 4px; background-color: #95a5a6; color: white; cursor: pointer; font-size: 0.8em;">📋</button>
                            <button onclick="Swal.close(); editarServidor(${vm.id})" title="Editar VM" style="padding: 4px 8px; border: none; border-radius: 4px; background: #3498db; color: white; cursor: pointer;">✏️</button>
                            <button onclick="Swal.close(); remover(${vm.id})" title="Excluir VM" style="padding: 4px 8px; border: none; border-radius: 4px; background: #e74c3c; color: white; cursor: pointer;">🗑️</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    Swal.fire({ 
        title: `Detalhes: ${nomeHost}`, 
        html: htmlLista, 
        confirmButtonText: 'Fechar', 
        confirmButtonColor: '#3498db', 
        width: '550px' 
    });
}

// ==========================================
// 2. FUNÇÕES DE SUPORTE (BUSCA, CRUD, LOGIN)
// ==========================================

function filtrarServidores() {
    const termo = document.getElementById('busca-servidor').value.toLowerCase();
    const cards = document.querySelectorAll('.server-card');
    
    cards.forEach(card => {
        const nome = card.querySelector('strong').innerText.toLowerCase();
        const ip = card.querySelector('small').innerText.toLowerCase();
        card.style.display = (nome.includes(termo) || ip.includes(termo)) ? 'flex' : 'none';
    });
}

async function carregarLogs() {
    const lista = document.getElementById('lista-logs');
    if (!lista) return;

    try {
        const res = await fetch(`${MONITOR_API}/logs`);
        const logs = await res.json();
        
        if (logs.length === 0) {
            lista.innerHTML = '<li style="color: #999; padding: 10px;">Sem incidentes nas últimas 24h.</li>';
            return;
        }

        lista.innerHTML = logs.map(log => `
            <li style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 0.85em;">
                <span style="color: ${log.status === 'ONLINE' ? '#2ecc71' : '#e74c3c'}; font-weight: bold;">[${log.status}]</span> 
                <strong>${log.servidorNome}</strong> - 
                <small style="color: #7f8c8d;">${new Date(log.dataHora).toLocaleString()}</small>
            </li>
        `).join('');
    } catch (e) { console.error("Erro nos logs gerais", e); }
}

async function carregarHostsNoSelect() {
    const select = document.getElementById('paiId');
    if (!select) return;

    try {
        const res = await fetch(MONITOR_API);
        const servidores = await res.json();
        select.innerHTML = '<option value="">Nenhum (Este é um Servidor Físico/Host)</option>';
        servidores.filter(s => s.paiId === null).forEach(host => {
            const opt = document.createElement('option');
            opt.value = host.id;
            opt.textContent = host.nome;
            select.appendChild(opt);
        });
    } catch (e) { console.error("Erro no select de hosts", e); }
}

async function salvarNoJava(event) {
    if (event) event.preventDefault();
    const nome = document.getElementById('nome').value;
    const ip = document.getElementById('ip').value;
    const porta = document.getElementById('porta').value;
    const paiId = document.getElementById('paiId').value;

    try {
        const res = await fetch(MONITOR_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, ip, porta: parseInt(porta), paiId: paiId ? parseInt(paiId) : null })
        });
        if (res.ok) {
            Swal.fire({ icon: 'success', title: 'Salvo!', timer: 1500, showConfirmButton: false })
                .then(() => window.location.href = 'index.html');
        }
    } catch (erro) { Swal.fire('Erro', 'Falha ao salvar.', 'error'); }
}

async function remover(id) {
    const result = await Swal.fire({
        title: 'Excluir?',
        text: "Isso removerá o monitoramento permanentemente.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        confirmButtonText: 'Sim, excluir'
    });

    if (result.isConfirmed) {
        await fetch(`${MONITOR_API}/${id}`, { method: 'DELETE' });
        renderizar();
    }
}

async function editarServidor(id) {
    try {
        const res = await fetch(`${MONITOR_API}/${id}`);
        const srv = await res.json();

        const { value: formValues } = await Swal.fire({
            title: 'Editar Monitoramento',
            html: `
                <input id="edit-nome" class="swal2-input" placeholder="Nome" value="${srv.nome}">
                <input id="edit-ip" class="swal2-input" placeholder="IP" value="${srv.ip}">
                <input id="edit-porta" type="number" class="swal2-input" placeholder="Porta" value="${srv.porta}">`,
            showCancelButton: true,
            confirmButtonText: 'Atualizar',
            preConfirm: () => ({
                nome: document.getElementById('edit-nome').value,
                ip: document.getElementById('edit-ip').value,
                porta: parseInt(document.getElementById('edit-porta').value),
                paiId: srv.paiId 
            })
        });

        if (formValues) {
            await fetch(`${MONITOR_API}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formValues)
            });
            renderizar();
        }
    } catch (e) { Swal.fire('Erro', 'Falha na edição.', 'error'); }
}

// LOGIN E CADASTRO
async function realizarCadastro(event) {
    if (event) event.preventDefault();
    const nome = document.getElementById('cad-nome').value;
    const email = document.getElementById('cad-email').value;
    const senha = document.getElementById('cad-senha').value;

    const res = await fetch(`${USER_API}/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
    });
    if (res.ok) window.location.href = 'login.html';
}

async function realizarLogin(event) {
    if (event) event.preventDefault();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    const res = await fetch(`${USER_API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });
    if (res.ok) {
        localStorage.setItem('usuarioLogado', email);
        window.location.href = 'index.html';
    } else {
        Swal.fire('Erro', 'Credenciais inválidas', 'error');
    }
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('container-servidores')) {
        renderizar(); 
        setInterval(renderizar, 30000); 
    }
    if (document.getElementById('paiId')) carregarHostsNoSelect();
    
    const emailLogado = localStorage.getItem('usuarioLogado');
    if (emailLogado && document.getElementById('user-email')) {
        document.getElementById('user-email').innerText = `Logado como: ${emailLogado}`;
    }
});

function sair() {
    localStorage.removeItem('usuarioLogado');
    window.location.href = 'login.html';
}