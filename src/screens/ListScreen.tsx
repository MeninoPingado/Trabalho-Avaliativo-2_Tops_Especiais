import { useEffect, useMemo, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { listPokemon, numberLabel, pretty, type PokemonItem } from '../services/pokeapi';
import { Failure, Loading } from '../components/State';
import { colors } from '../theme';
export function ListScreen({onSelect}:{onSelect:(id:number)=>void}) {
  const [items,setItems]=useState<PokemonItem[]>([]);
  const [query,setQuery]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(true);
  const [attempt,setAttempt]=useState(0);
  useEffect(()=>{const controller=new AbortController(); setLoading(true);setError('');
    listPokemon(controller.signal).then(data=>{if(!controller.signal.aborted)setItems(data);}).catch(()=>{if(!controller.signal.aborted)setError('Não foi possível carregar a lista. Verifique sua internet.');}).finally(()=>{if(!controller.signal.aborted)setLoading(false);});
    return ()=>controller.abort();
  },[attempt]);
  const filtered=useMemo(()=>{const q=query.trim().toLowerCase();return items.filter(p=>p.name.includes(q)||pretty(p.name).toLowerCase().includes(q)||numberLabel(p.id).includes(q)||String(p.id)===q);},[items,query]);
  if(loading)return <Loading/>;
  if(error)return <Failure message={error} retry={()=>setAttempt(a=>a+1)}/>;
  return <View style={s.page}><Text style={s.title}>Pokémon de Kanto</Text><Text style={s.sub}>Escolha um Pokémon para saber mais.</Text><TextInput accessibilityLabel="Buscar Pokémon" placeholder="Buscar por nome ou número" placeholderTextColor={colors.muted} value={query} onChangeText={setQuery} autoCapitalize="none" autoCorrect={false} style={s.input}/><Text style={s.count}>{filtered.length} Pokémon encontrados</Text><FlatList data={filtered} keyExtractor={item=>String(item.id)} numColumns={2} columnWrapperStyle={s.row} contentContainerStyle={s.list} keyboardShouldPersistTaps="handled" ListEmptyComponent={<Text style={s.empty}>Nenhum Pokémon encontrado.</Text>} renderItem={({item})=><Pressable accessibilityRole="button" accessibilityLabel={`Ver ${pretty(item.name)}`} onPress={()=>onSelect(item.id)} style={s.card}><Text style={s.id}>{numberLabel(item.id)}</Text><Image source={{uri:item.image}} style={s.image} resizeMode="contain"/><Text style={s.name}>{pretty(item.name)}</Text></Pressable>}/></View>;
}
const s=StyleSheet.create({page:{flex:1,paddingHorizontal:18,paddingTop:20,maxWidth:680,width:'100%',alignSelf:'center'},title:{fontSize:27,fontWeight:'800',color:colors.dark},sub:{color:colors.muted,marginTop:4,marginBottom:16},input:{backgroundColor:'white',borderWidth:1,borderColor:colors.border,borderRadius:13,padding:14,color:colors.dark,fontSize:16},count:{color:colors.muted,marginVertical:12},row:{gap:12},list:{gap:12,paddingBottom:20},card:{flex:1,maxWidth:'49%',backgroundColor:'white',borderRadius:17,borderWidth:1,borderColor:colors.border,padding:12,alignItems:'center',gap:6},id:{alignSelf:'flex-start',color:colors.muted,fontWeight:'600'},image:{height:105,width:'100%'},name:{fontSize:16,fontWeight:'700',color:colors.dark,textAlign:'center'},empty:{color:colors.muted,textAlign:'center',padding:28}});
