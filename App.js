import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {

  const link = 'https://api.themoviedb.org/3/movie/popular?api_key=506fadb0256c13349acc05dabebf9604&language=en-US&page=1';

  const [filmes, setFilmes] = useState(null);
  const [abas, setAbas] = useState(0);

  const requisicao = () => {
    fetch(link)
      .then(response => response.json())
      .then(json => {
        setFilmes(json);
      })
  }

  const formataData = (data) => {
    let dataArray = data.split('-');
    return `${dataArray[2]}/${dataArray[1]}/${dataArray[0]}`
  }

  useEffect(() => {
    requisicao();
  },[])

  if(filmes){
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center' }}>
        <StatusBar hidden style="auto" />
        {
          filmes.results.map( (filme) => {
            if(abas == filme.id){
              
              return(
                <TouchableOpacity onPress={ () => setAbas(0)} style={{...styles.filme, flexDirection: 'column', backgroundColor: '#565c62'}} key={filme.id}>
                  <Text style={{...styles.titulo,textAlign: 'center', width: '100%', color: '#FFF'}}>{filme.title}</Text>
                  <Text style={{ color: 'white' }}>{filme.overview}</Text>
                </TouchableOpacity>
              )

            }else{            
              return(
                <TouchableOpacity onPress={ () => setAbas(filme.id)} style={styles.filme} key={filme.id}>
                  <Text style={styles.titulo}>{filme.title}</Text>
                  <View style={styles.info}>
                    <Text>{formataData(filme.release_date)}</Text>
                    <Text>{filme.vote_average}</Text>
                  </View>
                </TouchableOpacity>
              )
            }
          })
        }
      </ScrollView>
    );
  }else{
    return (
      <View style={styles.container}>
        <StatusBar hidden/>
        <Text>Nenhum Filme Carregado</Text>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
    paddingBottom: 20,
  },
  filme: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#DDD',
    width: '95%',
    marginBottom: 20,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '70%',
    color: '#000'
  },
  info: {
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTxt: {
    fontSize: 15,
  }
});
