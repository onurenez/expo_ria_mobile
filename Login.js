import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,Alert ,ScrollView,AsyncStorage} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios'; 

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class Login extends React.Component {

  static navigationOptions ={
    header:null
  }
  constructor(props)
  {
    super(props)
    this.state={
      mail:"",
      pass:""
    }
  }
  async componentDidMount(){
       
        const value =await  AsyncStorage.getItem('user');
        if (value !== null) {  
           // console.log(value);
           this.props.navigation.navigate("product");
        }
  }

  fncSend = ()=>{ 
    const mail = this.state.mail
    const pass= this.state.pass
    const dt={
      ref:"5380f5dbcc3b1021f93ab24c3a1aac24",
      userEmail:mail,
      userPass:pass,
      face:"no"
    }
    const url="https://www.jsonbulut.com/json/userLogin.php";
    axios.get(url,{params:dt})
      .then(res => {
        const jdt= res.data.user[0];
        const durum = jdt.durum;
        const mesaj =  jdt.mesaj;
        if(durum)
        {
          //giriş başarılı
          AsyncStorage.setItem('user', JSON.stringify(jdt.bilgiler),()=>{
             // console.log("yazma başarili ilk giriş")
             this.props.navigation.navigate("product");
          });
            
        }
        else
        {
          Alert.alert(mesaj);
        }
        //console.log("yanit "+JSON.stringify(res.data)); 
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView> 
          <Text style={styles.title} >Login Page</Text>
          <TextInput autoCapitalize="none" onChangeText={(txt)=>this.setState({mail:txt})} keyboardType={"email-address"} style={styles.txtData} placeholder="Lütfen Mail Giriniz!"></TextInput>
          <TextInput secureTextEntry onChangeText={(txt)=>this.setState({pass:txt})} style={styles.txtData} placeholder="Lütfen Şifre Giriniz!"></TextInput>
          <TouchableOpacity onPress={()=>this.fncSend()} >
            <Text style={[styles.txtData,{textAlign: 'center'},{fontWeight:"bold"}]}>Send</Text>
          </TouchableOpacity>
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
 txtData:{
   borderWidth:1,
   fontSize:20,
   padding:5,
   borderRadius:5,
   borderColor:"#033dfc",
   marginBottom:5
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
