import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const problems = [
{ id: 'nao-gela', title: 'Não gela', desc: 'Ar fraco/quente', type: 'defeito', emoji: '💨' },
{ id: 'gotejando', title: 'Gotejando', desc: 'Vazando água', type: 'defeito', emoji: '💧' },
{ id: 'barulho', title: 'Barulho', desc: 'Ruído alto', type: 'defeito', emoji: '🔊' },
{ id: 'nao-liga', title: 'Não liga', desc: 'Sem energia', type: 'defeito', emoji: '⚡' },
{ id: 'controle', title: 'Controle desconf.', desc: 'Não responde', type: 'defeito', emoji: '🎮', top: true },
{ id: 'limpeza', title: 'Limpeza', desc: 'Preventiva', type: 'servico', emoji: '✨' },
];

export default function App() {
const [filter, setFilter] = useState('todos');
const [selected, setSelected] = useState('controle');
const [etapa, setEtapa] = useState(1);

const filtered = problems.filter(p => filter === 'todos' ? true : p.type === filter);

if (etapa === 2) {
return (
<View style={styles.container}>
<View style={styles.header}><Text style={styles.headerTitle}>NOSSO FRIO</Text></View>
<View style={styles.searching}>
<Text style={styles.emojiBig}>🔍</Text>
<Text style={styles.title}>Procurando técnico mais próximo...</Text>
<Text style={styles.sub}>Mossoró - Nova Betânia</Text>
<View style={styles.techCard}>
<Text style={styles.techName}>Roberto • 3 min • a 800m</Text>
<Text style={styles.techBike}>🛵 Honda Biz 110 - </Text>
</View>
<TouchableOpacity onPress={() => setEtapa(3)} style={styles.btn}><Text style={styles.btnText}>Ver técnico chegando (teste)</Text></TouchableOpacity>
</View>
<StatusBar style="light" />
</View>
);
}

if (etapa === 3) {
return (
<View style={styles.container}>
<View style={styles.header}><Text style={styles.headerTitle}>NOSSO FRIO - AO VIVO</Text></View>
<View style={styles.mapFake}>
<Text style={styles.mapText}>🗺️ MAPA DE MOSSORÓ</Text>
<Text style={styles.mapSub}>Av. João da Escóssia</Text>
<View style={styles.pin}><Text>📍 Você - Nova Betânia</Text></View>
<View style={[styles.pin, { top: 120, left: 40 }]}><Text>🛵 Roberto chegando - 2 min</Text></View>
</View>
<View style={styles.bottomSheet}>
<Text style={styles.timer}>Chegada em 03:03</Text>
<Text style={styles.techName}>Roberto Araújo de Freitas</Text>
<Text style={styles.sub}>Resp. Tec. • (84) 9 998407707</Text>
<TouchableOpacity onPress={() => setEtapa(1)} style={styles.btn}><Text style={styles.btnText}>Finalizar (voltar)</Text></TouchableOpacity>
</View>
<StatusBar style="light" />
</View>
);
}

return (
<View style={styles.container}>
<View style={styles.header}>
<Text style={styles.headerTitle}>❄️ NOSSO FRIO</Text>
<Text style={styles.headerSub}>CHAME O TÉCNICO • MOSSORÓ</Text>
</View>
<View style={styles.liveBar}>
<Text style={styles.liveText}>🟡 AO VIVO • MOSSORÓ • Roberto • Brunk • </Text>
</View>
<View style={styles.filters}>
{[{ id: 'todos', label: 'Todos' },{ id: 'defeito', label: 'Defeitos' },{ id: 'servico', label: 'Serviços' }].map(f => (
<TouchableOpacity key={f.id} onPress={() => setFilter(f.id)} style={[styles.filterBtn, filter === f.id && styles.filterActive]}>
<Text style={[styles.filterText, filter === f.id && styles.filterTextActive]}>{f.label}</Text>
</TouchableOpacity>
))}
</View>
<ScrollView style={styles.grid}>
<View style={styles.gridRow}>
{filtered.map(p => (
<TouchableOpacity key={p.id} onPress={() => setSelected(p.id)} style={[styles.card, selected === p.id && styles.cardSelected, p.top && styles.cardTop]}>
{p.top && <Text style={styles.topBadge}>+ PEDIDO</Text>}
<Text style={styles.cardEmoji}>{p.emoji}</Text>
<Text style={styles.cardTitle}>{p.title}</Text>
<Text style={styles.cardDesc}>{p.desc}</Text>
</TouchableOpacity>
))}
</View>
<View style={styles.form}>
<Text style={styles.label}>Endereço: Rua Dr. João Marcelino, 500 - Nova Betânia</Text>
<TextInput placeholder="Obs: controle desconfigurado" style={styles.input} />
<TouchableOpacity onPress={() => setEtapa(2)} style={styles.btnMain}>
<Text style={styles.btnMainText}>Chamar técnico agora/Text>
</TouchableOpacity>
</View>
</ScrollView>
<StatusBar style="light" />
</View>
);
}

const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: '#F6F7F8' },
header: { backgroundColor: '#0E3A4A', paddingTop: 50, paddingBottom: 14, paddingHorizontal: 16 },
headerTitle: { color: '#fff', fontWeight: '800', fontSize: 16, letterSpacing: 1 },
headerSub: { color: '#F6D76F', fontWeight: '700', fontSize: 10, marginTop: 2, letterSpacing: 1 },
liveBar: { backgroundColor: '#F6D76F', padding: 8, alignItems: 'center' },
liveText: { fontWeight: '800', fontSize: 11, color: '#0E3A4A' },
filters: { flexDirection: 'row', gap: 8, padding: 12, backgroundColor: '#fff' },
filterBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: '#EEF2F3' },
filterActive: { backgroundColor: '#0E3A4A' },
filterText: { fontSize: 12, fontWeight: '600', color: '#0E3A4A' },
filterTextActive: { color: '#fff' },
grid: { flex: 1 },
gridRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: 12 },
card: { width: '30%', backgroundColor: '#fff', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#eee' },
cardSelected: { borderColor: '#0E3A4A', borderWidth: 2, backgroundColor: '#E8F0F2' },
cardTop: { borderColor: '#F6D76F' },
topBadge: { fontSize: 8, fontWeight: '800', color: '#0E3A4A', backgroundColor: '#F6D76F', borderRadius: 6, paddingHorizontal: 4, marginBottom: 4, alignSelf: 'flex-start' },
cardEmoji: { fontSize: 20 },
cardTitle: { fontWeight: '700', fontSize: 12, marginTop: 4, color: '#0E3A4A' },
cardDesc: { fontSize: 10, color: '#6B7C83', marginTop: 2 },
form: { padding: 16, gap: 10, paddingBottom: 40 },
label: { fontSize: 12, fontWeight: '600', color: '#0E3A4A' },
input: { backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#ddd' },
btnMain: { backgroundColor: '#0E3A4A', borderRadius: 28, padding: 16, alignItems: 'center', marginTop: 8 },
btnMainText: { color: '#fff', fontWeight: '800' },
searching: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
emojiBig: { fontSize: 48 },
title: { fontSize: 18, fontWeight: '800', color: '#0E3A4A', textAlign: 'center' },
sub: { fontSize: 12, color: '#6B7C83' },
techCard: { backgroundColor: '#fff', padding: 16, borderRadius: 16, width: '100%', marginTop: 12 },
techName: { fontWeight: '700', color: '#0E3A4A' },
techBike: { fontSize: 12, color: '#6B7C83', marginTop: 4 },
btn: { backgroundColor: '#0E3A4A', padding: 14, borderRadius: 24, width: '100%', alignItems: 'center', marginTop: 20 },
btnText: { color: '#fff', fontWeight: '700' },
mapFake: { flex: 1, backgroundColor: '#DDE8EB', alignItems: 'center', justifyContent: 'center', gap: 8 },
mapText: { fontWeight: '800', color: '#0E3A4A' },
mapSub: { fontSize: 10, letterSpacing: 2, color: '#0E3A4A', opacity: 0.5 },
pin: { backgroundColor: '#fff', padding: 8, borderRadius: 12, position: 'absolute', top: 40, left: 20 },
bottomSheet: { backgroundColor: '#fff', padding: 16, borderTopLeftRadius: 24, borderTopRightRadius: 24, gap: 8 },
timer: { fontWeight: '800', fontSize: 16, color: '#0E3A4A' },
row: { flexDirection: 'row', gap: 10, marginTop: 8 },
btnSmall: { flex: 1, backgroundColor: '#EEF2F3', padding: 12, borderRadius: 16, alignItems: 'center' }
});