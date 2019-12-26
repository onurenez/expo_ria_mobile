import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,Alert ,ScrollView,AsyncStorage,FlatList,Image} from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios'; 

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class Product extends React.Component {
  
   static navigationOptions = ({ navigation }) => {
    const parent = navigation.dangerouslyGetParent();
    const gesturesEnabled =
      parent &&
      parent.state &&
      parent.state.routeName === 'StackWithEnabledGestures';

    return {
      title: 'Product',
      gesturesEnabled,
      headerLeft:null,
    };
  };
  constructor(props)
  {
    super(props)
    this.state={ 
      dt:[]
    }
  }

  async componentDidMount(){
  
     
    const url="https://www.jsonbulut.com/json/product.php?ref=5380f5dbcc3b1021f93ab24c3a1aac24&start=0";
    axios.get(url)
      .then(res => {
        const jdt= res.data.Products[0].bilgiler;
        const durum =res.data.Products[0].durum;
        const mesaj =  res.data.Products[0].mesaj;
        if(durum)
        {
           console.log("item: "+JSON.stringify(jdt) )
           this.setState({dt:jdt})          
            
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
          <Text style={styles.title} >Product Page</Text>
          <FlatList
            style={{flex:1}}
            data={this.state.dt}
             keyExtractor={(item)=>item.productId  }
             renderItem={ ({item})=>( 
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("detail",{sendData: item})} >
               <View style={{justifyContent:'flex-start',flexDirection:'row',marginBottom:10}}>
                 <Image source={{uri:item.images[0].thumb}} style={{width:75 ,height:75}} />
                 <View style={{flex: 1, flexWrap: 'wrap'}}>                 
                     <Text style={{fontSize:19 ,fontWeight:"bold",flexWrap: 'wrap'}}>{item.productName}</Text>
                     <Text style={{color:item.price >2000 ?'red' :'#035efc',fontWeight:"bold"}}>{item.price} ₺</Text>
                  </View>
               </View>
               </TouchableOpacity >
               
             )}
          />          
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
