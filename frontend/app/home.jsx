import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from "react-native-swiper";
import { useRef, useState } from 'react';
import Slade from "./data/swiper";

export default function HomeScreen() {
  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);

  return (
    <View style={{ flex: 1 }}>
   
       

        <Swiper
          ref={swiperRef}
          loop={false}
          onIndexChanged={(index) => setActive(index)}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
        >
        
          {Slade.map((item, index) => (
            <View key={index} style={styles.parent}>

              <View style={styles.imageContainer}>
                <View style={styles.blueCircle} />

                <Image
                  source={
                    typeof item.image === 'string'
                      ? { uri: item.image }
                      : item.image
                  }
                  style={styles.image}
                  contentFit="cover"
                />
              </View>

              <Text style={styles.h1}>{item.h1}</Text>

              <View style={styles.discription}>
                <Text style={styles.dis}>{item.description}</Text>
              </View>

            
              {active === Slade.length - 1 &&
                index === Slade.length - 1 && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.push('./register')}
                  >
                    <Text style={styles.bot}>Get Started</Text>
                  </TouchableOpacity>
                )}
            </View>
          ))}
        </Swiper>
     
    </View>
  );
}
const styles = StyleSheet.create({
 
    dot: {
      backgroundColor: '#cfd8dc',
      width: 8,
      height: 8,
      borderRadius: 4,
      margin: 4,
    },
    activeDot: {
      backgroundColor: '#0A84FF',
      width: 18,
      height: 8,
      borderRadius: 4,
      margin: 4,
    },
  
   
    parent: {
      flex: 1,
      alignItems: 'center',
  
      backgroundColor: '#ffffff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
    },
  
   
    imageContainer: {
      height: 500,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      
    },
  
    blueCircle: {
      position: 'absolute',
      top: -140,
      left: -140,
      width: 400,
      height: 400,
      borderRadius: 190,
      backgroundColor: '#0A84FF',
    },
  
    image: {
      width: 300,
      height: 300,
      borderRadius: 180,
    },
  

    h1: {
      fontWeight: 'bold',
      fontSize: 22,
      marginTop: 25,
      color: '#111',
      textAlign: 'center',
    },
  
    discription: {
      paddingHorizontal: 20,
      marginTop: 12,
    },
  
    dis: {
      fontSize: 14,
      color: '#777',
      textAlign: 'center',
      lineHeight: 20,
    },
  
   
    button: {
      backgroundColor: '#0A84FF',
      width: 160,
      height: 48,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 35,
    },
  
    bot: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
  });
  