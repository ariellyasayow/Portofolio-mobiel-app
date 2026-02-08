import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Animated, Pressable } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// --- CONFIG & COLORS ---
const { width } = Dimensions.get('window');
const MARGIN = 20;
const TAB_BAR_WIDTH = width - (MARGIN * 2);
const TAB_WIDTH = TAB_BAR_WIDTH / 3;

// --- REVISI WARNA: RUSTIC LUXURY ---
const COLORS = {
  primary: "#743014",    // Spiced Wine (Bola Utama - Mewah)
  background: "#FFFFFF", // Putih (Bar agar tetap clean)
  inactive: "#9D9167",   // Olive Harvest (Icon mati - Samar tapi berwarna)
  activeIcon: "#E8D1A7", // Golden Batter (Icon aktif - Kontras Cream di atas Merah Wine)
  shadow: "#442D1C"      // Cowhide Cocoa (Bayangan coklat tua)
};

const MyCustomTabBar = ({ state, descriptors, navigation }: any) => {
  const translateX = useRef(new Animated.Value(0)).current;

  // Filter route supaya 'index' tidak ikut dihitung
  const cleanRoutes = state.routes.filter((r: any) => r.name !== 'index');

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      friction: 5,
      tension: 60,
    }).start();
  }, [state.index]);

  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabBarMain}>
        
        {/* BOLA GESER */}
        <Animated.View 
          style={[
            styles.slidingIndicator, 
            { transform: [{ translateX }] } 
          ]} 
        />

        {/* MENU ICON */}
        {state.routes.map((route: any, index: number) => {
          if (route.name === 'index') return null;

          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName: any = "person";
          if (route.name === "myEducation") iconName = "school"; 
          if (route.name === "myExperience") iconName = "briefcase";
          if (route.name === "myProfile") iconName = "person";

          return (
            <Pressable key={index} onPress={onPress} style={styles.tabItem}>
              <Ionicons 
                name={isFocused ? iconName : `${iconName}-outline` as any} 
                size={24} 
                color={isFocused ? COLORS.activeIcon : COLORS.inactive} 
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <MyCustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="myProfile" options={{ title: "Profile" }} />
      <Tabs.Screen name="myEducation" options={{ title: "Education" }} />
      <Tabs.Screen name="myExperience" options={{ title: "Experience" }} />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 30,
    left: MARGIN,
    right: MARGIN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarMain: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 35,
    height: 70,
    width: TAB_BAR_WIDTH,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2, // Sedikit lebih gelap karena warnanya coklat tua
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
  },
  slidingIndicator: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    left: (TAB_WIDTH - 50) / 2,
    top: 10,
    zIndex: 0,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    zIndex: 1,
  },
});