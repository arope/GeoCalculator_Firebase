import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, FlatList, TouchableHighlight } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import Constants from 'expo-constants';
import {
    initRemindersDB,
    setupDataListener,
  } from "../helpers/fb-geocalculator";

  import { Ionicons } from '@expo/vector-icons'; 

const HistoryScreen = ({ route, navigation }) => {
   const { currHistory } = route.params;
    const stringBreaker = (word, updateVals) => {
        const words = word.split('End:');
        const further = words[0].split(',');
        let lat1 = further[0];
        let long1 = further[1];
        const further2 = words[1].split(',');
        let lat2 = further2[0];
        let long2 = further2[1];

        updateVals({
                    lat1: lat1,
                    lon1: long1,
                    lat2: lat2,
                    lon2: long2,
                    distance: "",
                    bearing: "",
                });
    }

    const spaceWordStart = (word) => {
        const words = word.split('End:');
        return words[0];
    }
    const spaceWordEnd = (word) => {
        const words = word.split('End:');
        return words[1];
    }

    const emptyVals =  {lat1: "",lon1: "",lat2: "",lon2: "",distance: "",bearing: ""}

    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Geo Calculator', { tappedValues : emptyVals
            })
          }
        >
          <Ionicons style={{marginLeft: 10 }} name="md-arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
    return (
    <FlatList
        ItemSeparatorComponent= {({highlighted}) => (
        <View style={[styles.separator,  highlighted && {marginLeft: 0}]} />
        )}
        data={currHistory}
        keyExtractor={item => item.id}
        renderItem={({item, index, separators}) => (
    <TouchableHighlight
      key={item.id}
      onPress={() => {stringBreaker((item["val"]), (values) => {
       //  setVals({values})
        // console.log(values); 
         navigation.navigate('Geo Calculator', {tappedValues: values});
      })
    }}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}>
      <View style={{backgroundColor: 'white'}}>
          <View>
            <Text style = {styles.title}>{`Start ${spaceWordStart(item["val"])}`}</Text>
          </View>
          <View>
          <Text style = {styles.title}>{`End ${spaceWordEnd(item["val"])}`}</Text>
          </View>
          <View style = {styles.timeStamp}>
          <Text>{item.timeStamp}</Text>
          </View>
      </View>
    </TouchableHighlight>
  )}
   />
    );
  }
  
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      padding: 4,
      paddingTop: 10,
      backgroundColor: "#E8EAF6",
    },
    container: {
      marginHorizontal: 4,
      marginVertical: 8,
      paddingHorizontal: 8,
    },
    headerButton: {
      color: '#fff',
      fontWeight: 'bold',
    },

    itemContainer: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
      },
      item: {
      //  backgroundColor: '#f9c2ff',
       // marginTop: 20,
       // marginVertical: 8,
       // marginHorizontal: 16,
      },
      title: {
        fontSize: 24,
      },
      separator: {
          flex: 1,
          borderWidth: 1,
          borderColor: 'dodgerblue',
      },
      timeStamp: {
        flex: 1,
        marginRight: 10,
        alignSelf: 'flex-end'
      }
  
  });

  
  export default HistoryScreen;
  