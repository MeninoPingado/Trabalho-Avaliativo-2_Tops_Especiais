import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { artwork } from '../services/pokeapi';
import { colors } from '../theme';
export function HomeScreen({onExplore}:{onExplore:()=>void}) {
  return <ScrollView contentContainerStyle={s.page}>
    <View style={s.hero}><Text style={s.kicker}>GUIA DA PRIMEIRA GERAÇÃO</Text><Text style={s.title}>Seu próximo Pokémon está aqui.</Text><Image accessibilityLabel="Pikachu" source={{uri:artwork(25)}} style={s.image} resizeMode="contain"/><Text style={s.sub}>Conheça os 151 Pokémon de Kanto e descubra seus tipos, habilidades e estatísticas.</Text><Pressable accessibilityRole="button" style={s.button} onPress={onExplore}><Text style={s.buttonText}>Explorar Pokédex  →</Text></Pressable></View>
    <View style={s.info}><Text style={s.heading}>Sobre o projeto</Text><Text style={s.body}>Aplicativo acadêmico em TypeScript. Os dados são consultados pela PokéAPI em tempo real.</Text><Text style={s.heading}>Desenvolvedores</Text><Text style={s.body}>João Lucas Salem{'\n'}Tiago Bezerra{'\n'}Valdir Dantas</Text></View>
  </ScrollView>;
}
const s=StyleSheet.create({page:{padding:20,gap:18,maxWidth:680,width:'100%',alignSelf:'center'},hero:{backgroundColor:colors.red,borderRadius:24,padding:24,gap:14},kicker:{color:'#FFE0E3',fontSize:12,fontWeight:'700',letterSpacing:1.3},title:{color:'white',fontSize:34,fontWeight:'800',lineHeight:39},image:{height:190,width:'100%'},sub:{color:'white',fontSize:16,lineHeight:23},button:{backgroundColor:'white',borderRadius:13,padding:16,alignItems:'center'},buttonText:{color:colors.red,fontWeight:'800',fontSize:16},info:{backgroundColor:'white',borderRadius:20,padding:20,gap:10},heading:{fontSize:18,color:colors.dark,fontWeight:'700'},body:{fontSize:15,lineHeight:24,color:colors.muted}});
