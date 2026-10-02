<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NOSSO FRIO - Top dos Top</title>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,system-ui,sans-serif}
body{background:#0f2f3e;height:100vh;overflow:hidden}
.header{background:#0f2f3e;color:#fff;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid #f5c518}
.logo{display:flex;gap:10px;align-items:center}
.logo-icon{background:#f5c518;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px}
.logo h1{font-size:17px;letter-spacing:1px}
.logo span{font-size:10px;letter-spacing:2px;opacity:.8;display:block}
.badge{background:#f5c518;color:#0f2f3e;padding:6px 14px;border-radius:20px;font-weight:800;font-size:11px}
.info{background:#e8f5e9;padding:7px 16px;font-size:11px;color:#0f2f3e;display:flex;justify-content:space-between}
#map{height:calc(100vh - 180px);z-index:1}
.sheet{position:fixed;bottom:60px;left:0;right:0;background:#fff;border-radius:26px 26px 0 0;z-index:20;max-height:65vh;display:flex;flex-direction:column;box-shadow:0 -8px 40px rgba(0,0,0,.35)}
.drag{width:44px;height:5px;background:#ddd;border-radius:10px;margin:12px auto}
.content{overflow-y:auto;padding:0 16px 130px 16px}
.title{font-weight:900;font-size:17px;color:#0f2f3e}
.sub{font-size:12px;color:#666;margin:6px 0 14px 0}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.card{border:2px solid #eef2f7;border-radius:18px;padding:14px;cursor:pointer;position:relative;background:#fff;transition:.15s}
.card:active{transform:scale(.97)}
.card.sel{background:#0f2f3e;color:#fff;border-color:#0f2f3e}
.card.sel.card-sub{color:#a8b3c7}
.badge-t{position:absolute;top:8px;right:8px;font-size:9px;font-weight:800;padding:4px 9px;border-radius:20px}
.badge-def{background:#fee2e2;color:#dc2626}
.badge-ser{background:#dcfce7;color:#16a34a}
.badge-top{background:#f5c518;color:#0f2f3e;top:-8px}
.icon{font-size:26px;margin-bottom:8px}
.ct{font-weight:800;font-size:13px}
.cs{font-size:11px;color:#6b7280;margin-top:3px}
.check{position:absolute;bottom:10px;right:10px;background:#f5c518;width:22px;height:22px;border-radius:50%;display:none;align-items:center;justify-content:center;color:#0f2f3e;font-weight:900}
.card.sel.check{display:flex}
.cta{position:fixed;bottom:72px;left:14px;right:14px;background:#0f2f3e;color:#fff;padding:16px;border-radius:18px;z-index:25;display:none;cursor:pointer;border:2.5px solid #f5c518;box-shadow:0 8px 30px rgba(0,0,0,.4)}
.cta.show{display:block}
.tabbar{position:fixed;bottom:0;left:0;right:0;background:#fff;display:flex;z-index:30;border-top:1px solid #e5e7eb;padding:8px 0 10px}
.tab{flex:1;text-align:center;font-size:11px;color:#9ca3af;cursor:pointer}
.tab.active{color:#0f2f3e;font-weight:800}
.tab i{font-style:normal;font-size:22px;display:block}
.warranty{background:#fff8c5;border:1.5px solid #f5c518;border-radius:14px;padding:12px;margin-top:14px;font-size:11px;color:#0f2f3e;line-height:1.4}
.photo-btn{width:100%;margin-top:12px;border:2px dashed #0f2f3e;border-radius:14px;padding:12px;text-align:center;font-weight:700;color:#0f2f3e;background:#f8fafc;cursor:pointer;font-size:12px}
</style>
</head>
<body>
<div class="header">
<div class="logo"><div class="logo-icon">❄️</div><div><h1>NOSSO FRIO</h1><span>CHAME O TÉCNICO</span></div></div>
<div class="badge">● AO VIVO • MOSSORÓ</div>
</div>
<div class="info">
<div><b>Base:</b> R. Humberto Teixeira de Lima</div>
<div><b>Resp:</b> Roberto Araújo de Freitas</div>
</div>
<div id="map"></div>

<div class="sheet">
<div class="drag"></div>
<div class="content">
<div class="title">Qual o problema do seu ar?</div>
<div class="sub">Selecione • Orçamento após diagnóstico • Garantia de 1 ano</div>
<div class="grid" id="grid"></div>

<div class="photo-btn" onclick="document.getElementById('file').click()">📸 Enviar foto do problema (opcional)</div>
<input type="file" id="file" accept="image/*" style="display:none" onchange="foto(this)">

<div class="warranty">
<b>🛡️ Nossa Garantia de 1 Ano</b><br>
Instalação com 1 ano de garantia. Peças novas. Troca de equipamento coberta. Outro defeito diferente gera novo orçamento.
</div>
</div>
</div>

<div class="cta" id="cta" onclick="chamar()">
<div style="text-align:center"><div style="font-size:15px;font-weight:900;letter-spacing:.5px">CHAMAR TÉCNICO AGORA</div><div style="font-size:11px;opacity:.85;margin-top:3px">Sem taxa de visita • Orçamento no local • Garantia de 1 ano</div></div>
</div>

<div class="tabbar">
<div class="tab active" onclick="aba(this,'inicio')"><i>⌂</i>Início</div>
<div class="tab" onclick="aba(this,'agendar')"><i>📅</i>Agendar</div>
<div class="tab" onclick="aba(this,'planos')"><i>🛡️</i>Planos</div>
<div class="tab" onclick="aba(this,'tecnico')"><i>🔧</i>Técnico</div>
</div>

<script>
const dados=[
{t:'Não gela',s:'Ar fraco / quente',i:'❄️',k:'DEFEITO'},
{t:'Gotejando',s:'Vazando água',i:'💧',k:'DEFEITO'},
{t:'Barulho',s:'Ruído alto',i:'🔊',k:'DEFEITO'},
{t:'Não liga',s:'Sem energia',i:'⏻',k:'DEFEITO'},
{t:'Controle',s:'Desconfigurado',i:'🎛️',k:'DEFEITO',top:true},
{t:'Limpeza',s:'Higienização completa',i:'✨',k:'SERVIÇO'},
{t:'Instalação',s:'Nova central',i:'🔧',k:'SERVIÇO'},
{t:'Manutenção',s:'Revisão geral',i:'🛠️',k:'SERVIÇO'},
];
let sel=null;
const g=document.getElementById('grid');
dados.forEach(d=>{
const e=document.createElement('div');e.className='card';
e.innerHTML=`${d.top?'<span class="badge-t badge-top">TOP 1</span>':''}<span class="badge-t ${d.k==='SERVIÇO'?'badge-ser':'badge-def'}">${d.k}</span><div class="check">✓</div><div class="icon">${d.i}</div><div class="ct">${d.t}</div><div class="cs">${d.s}</div>`;
e.onclick=()=>{document.querySelectorAll('.card').forEach(c=>c.classList.remove('sel'));e.classList.add('sel');sel=d;document.getElementById('cta').classList.add('show')};
g.appendChild(e);
});
function foto(inp){if(inp.files[0]) alert('✅ Foto recebida: '+inp.files[0].name+'\nO técnico vai ver antes de chegar.')}
function chamar(){
if(!sel) return;
alert(`✅ CHAMADO CONFIRMADO\n\nProblema: ${sel.t}\n\nTécnicos Nosso Frio:\n• Roberto Araújo de Freitas (Responsável)\n• Richardson Bruno\n\n📍 Base: R. Humberto Teixeira de Lima - Mossoró\n\n💰 SEM taxa de visita\n💵 Orçamento após diagnóstico no local\n🛡️ Garantia de 1 ano (instalação)\n\nO técnico irá até você.`);
}
const map=L.map('map',{zoomControl:false}).setView([-5.1875,-37.3442],14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
L.marker([-5.1890,-37.3440]).addTo(map).bindPopup('<b>NOSSO FRIO</b><br>R. Humberto Teixeira de Lima<br>Roberto e Richardson Bruno');
L.marker([-5.1850,-37.34],{icon:L.divIcon({html:'<div style="background:#0f2f3e;color:#f5c518;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border:2px solid #f5c518;font-weight:900">R</div>'})}).addTo(map).bindPopup('Roberto Araújo de Freitas');
L.marker([-5.1910,-37.348],{icon:L.divIcon({html:'<div style="background:#16a34a;color:#fff;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border:2px solid #fff;font-weight:900">RB</div>'})}).addTo(map).bindPopup('Richardson Bruno');
function aba(el,n){
document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');
if(n==='agendar') alert('📅 Agendamentos\n\nNenhum agendamento ainda.\n\nQuando chamar o técnico, aparece aqui.');
if(n==='planos') alert('🛡️ Planos Nosso Frio\n\nBásico: 2 limpezas no ano\nCompleto: 4 limpezas + prioridade\n\nTodos com Garantia de 1 Ano\nSem taxa de visita');
if(n==='tecnico') alert('🔧 Painel do Técnico\n\nOlá Roberto!\n\nHoje: 3 serviços\n- Av. João da Escóssia - Não gela\n- Centro - Gotejando\n- Nova Betânia - Instalação\n\nBotões: Ver Rota, Iniciar, Finalizar, Fotos, Orçamento\n\nLogística ao vivo no mapa.');
}
</script>
</body>
</html>