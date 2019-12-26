import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,Alert ,ScrollView,AsyncStorage,FlatList,Image} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios'; 

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class Detail extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
     return{
       title:'Detail'
     }
  };
  constructor(props)
  {
    super(props)
    this.state={ 
      item:this.props.navigation.getParam("sendData",null)
    }
    console.log("data geldi "+JSON.stringify(this.state.item))
  }
 
    
  render() {
    const it = this.state.item
    return (
      <View style={styles.container}>
        <ScrollView> 
          <Text style={styles.title} >Detay Page</Text>
          <Text style={{textAlign:"center",fontSize:20}}> {it.productName}</Text>
          <Image resizeMode= 'stretch' source={{uri:it.images[0].normal}} style={{width:'100%' ,height:250}} />
          <Text style={{textAlign:"right",fontSize:13,color:"#035efc",marginTop:10}}> {it.price}₺</Text>
          <Text style={{fontWeight:"bold",marginTop:5,marginBottom:5}}>Detail</Text>
          <Text>{it.description}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title:{
    
   fontSize:30,
   padding:5,
   fontWeight:'bold',
   textAlign:'center',  
   marginBottom:10,
   marginTop:10
 }
});

