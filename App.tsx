import { useEffect, useState } from 'react';
import { BackHandler, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { HomeScreen } from './src/screens/HomeScreen';
import { ListScreen } from './src/screens/ListScreen';
import { DetailScreen } from './src/screens/DetailScreen';
import { colors } from './src/theme';
type Screen = {name:'home'}|{name:'list'}|{name:'detail';id:number};
export default function App(){
  const [screen,setScreen]=useState<Screen>({name:'home'});
  useEffect(()=>{const sub=BackHandler.addEventListener('hardwareBackPress',()=>{if(screen.name==='detail'){setScreen({name:'list'});return true;}if(screen.name==='list'){setScreen({name:'home'});return true;}return false;});return()=>sub.remove();},[screen.name]);
  return <SafeAreaProvider><SafeAreaView style={s.root}><StatusBar barStyle="dark-content"/><View style={s.header}><View style={s.logo}><View style={s.line}/><View style={s.dot}/></View><Text style={s.brand}>PokéDex</Text><Text style={s.tag}>KANTO / 001–151</Text></View><View style={s.main}>
    {screen.name==='home'?<HomeScreen onExplore={()=>setScreen({name:'list'})}/>:screen.name==='detail'?<DetailScreen key={screen.id} id={screen.id} onBack={()=>setScreen({name:'list'})}/>:null}
    {/* Mantém a busca e a posição da lista ao abrir e fechar os detalhes. */}
    {screen.name!=='home'&&<View style={screen.name==='detail'?s.hidden:s.main}><ListScreen onSelect={id=>setScreen({name:'detail',id})}/></View>}
  </View><View style={s.nav}>{([{name:'home',label:'Início'},{name:'list',label:'Pokédex'}] as const).map(tab=>{const active=screen.name===tab.name||(screen.name==='detail'&&tab.name==='list');return <Pressable key={tab.name} accessibilityRole="tab" accessibilityState={{selected:active}} style={[s.tab,active&&s.active]} onPress={()=>setScreen({name:tab.name})}><Text style={[s.tabText,active&&s.activeText]}>{tab.label}</Text></Pressable>;})}</View></SafeAreaView></SafeAreaProvider>;
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:colors.bg},header:{flexDirection:'row',alignItems:'center',gap:10,padding:16,backgroundColor:'white',borderBottomWidth:1,borderColor:colors.border},logo:{width:28,height:28,borderRadius:14,borderWidth:2,borderColor:colors.dark,backgroundColor:'#E44B56',alignItems:'center',justifyContent:'center'},line:{position:'absolute',height:3,width:24,backgroundColor:colors.dark},dot:{width:11,height:11,borderRadius:6,borderWidth:2,borderColor:colors.dark,backgroundColor:'white'},brand:{fontSize:22,fontWeight:'800',color:colors.dark},tag:{marginLeft:'auto',fontSize:10,fontWeight:'700',color:colors.muted},main:{flex:1},hidden:{display:'none'},nav:{flexDirection:'row',gap:8,padding:12,backgroundColor:'white',borderTopWidth:1,borderColor:colors.border},tab:{flex:1,padding:13,borderRadius:12,alignItems:'center'},active:{backgroundColor:'#FCE7E9'},tabText:{fontWeight:'700',color:colors.muted},activeText:{color:colors.red}});
