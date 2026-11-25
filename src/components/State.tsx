import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';
export function Loading() { return <View style={s.wrap}><ActivityIndicator size="large" color={colors.red}/><Text style={s.text}>Consultando a PokéAPI...</Text></View>; }
export function Failure({message, retry}: {message:string; retry:()=>void}) { return <View style={s.wrap}><Text style={s.text}>{message}</Text><Pressable accessibilityRole="button" onPress={retry} style={s.btn}><Text style={s.btnText}>Tentar novamente</Text></Pressable></View>; }
const s = StyleSheet.create({wrap:{flex:1,alignItems:'center',justifyContent:'center',padding:24,gap:14},text:{color:colors.muted,textAlign:'center',fontSize:15},btn:{backgroundColor:colors.red,padding:14,borderRadius:12},btnText:{color:'white',fontWeight:'700'}});
