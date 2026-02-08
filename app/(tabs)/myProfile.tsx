import { 
  View, Text, StyleSheet, Image, ScrollView, StatusBar, 
  Pressable, Animated, Linking, StyleProp, ViewStyle, Dimensions, Easing 
} from 'react-native';
import React, { useRef, useCallback } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// --- TEMA RUSTIC LUXURY ---
const COLORS = {
  headerBg: "#743014",    // Spiced Wine
  primary: "#442D1C",     // Cowhide Cocoa
  background: "#FCFBF9",  // Off-White
  card: "#FFFFFF",        
  cardHighlight: "#E8D1A7", // Golden Batter
  text: "#442D1C",        
  subtext: "#8C7C62",     // Olive Grey
  border: "#EFE6D5",
};

const ICON_SIZE = 100;
const ICON_COLOR = "442D1C"; 

// --- DATA ---
const SKILLS = [
  { name: 'React Native', iconUrl: `https://img.icons8.com/ios-filled/${ICON_SIZE}/${ICON_COLOR}/react-native.png` },
  { name: 'UI/UX Design', iconUrl: `https://img.icons8.com/ios-filled/${ICON_SIZE}/${ICON_COLOR}/design.png` },
  { name: 'Python', iconUrl: `https://img.icons8.com/ios-filled/${ICON_SIZE}/${ICON_COLOR}/python.png` },
  { name: 'C#', iconUrl: `https://img.icons8.com/ios-filled/${ICON_SIZE}/${ICON_COLOR}/c-sharp-logo.png` },
  { name: 'React JS', iconUrl: `https://img.icons8.com/ios-filled/${ICON_SIZE}/${ICON_COLOR}/react-native.png` },
  { name: 'HTML 5', iconUrl: `https://img.icons8.com/ios-filled/${ICON_SIZE}/${ICON_COLOR}/html-5.png` },
  { name: 'CSS 3', iconUrl: `https://img.icons8.com/ios-filled/${ICON_SIZE}/${ICON_COLOR}/css3.png` },
  { name: 'Figma', iconUrl: `https://img.icons8.com/ios-filled/${ICON_SIZE}/${ICON_COLOR}/figma.png` },
  { name: 'Git', iconUrl: `https://img.icons8.com/ios-filled/${ICON_SIZE}/${ICON_COLOR}/git.png` },
];

const CONTACTS = [
  { type: 'Email', value: 'sayowariellya@gmail.com', icon: 'mail', action: 'mailto:sayowariellya@gmail.com' },
  { type: 'GitHub', value: 'ariellyasayow', icon: 'logo-github', action: 'https://github.com/ariellyasayow' },
  { type: 'LinkedIn', value: 'Connect LinkedIn', icon: 'logo-linkedin', action: 'http://linkedin.com/in/ariellya-putri-sayow-3112923ab' },
  { type: 'Kampus', value: 'Student Email', icon: 'school', action: 'mailto:s22310359@student.unklab.ac.id' },
];

// --- COMPONENTS ---
const ScaleButton = ({ children, onPress, style }: { children: React.ReactNode, onPress?: () => void, style?: StyleProp<ViewStyle> }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  return (
    <Pressable 
      onPressIn={() => Animated.spring(scaleValue, { toValue: 0.95, useNativeDriver: true }).start()} 
      onPressOut={() => Animated.spring(scaleValue, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start()} 
      onPress={onPress} 
      style={style as StyleProp<ViewStyle>}
    >
      <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>{children}</Animated.View>
    </Pressable>
  );
};

// --- MAIN SCREEN ---
export default function MyProfile() {
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Animasi Staggered (Waterfall) - Masuk 1 per 1
  const fadeAnims = useRef([
    new Animated.Value(0), // Header Content
    new Animated.Value(0), // About
    new Animated.Value(0), // Skills
    new Animated.Value(0), // Contact
    new Animated.Value(0), // Footer
  ]).current;

  useFocusEffect(
    useCallback(() => {
      // Reset Opacity
      fadeAnims.forEach(anim => anim.setValue(0));

      // Jalankan Animasi Staggered
      Animated.stagger(150, fadeAnims.map(anim => 
        Animated.timing(anim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.exp),
        })
      )).start();
    }, [])
  );

  const handleOpenLink = (url: string) => Linking.openURL(url).catch(err => console.error(err));

  // Helper untuk style animasi masuk (Slide Up + Fade In)
  const getEnterStyle = (index: number) => {
    const translateY = fadeAnims[index].interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0],
    });
    return { opacity: fadeAnims[index], transform: [{ translateY }] };
  };

  // Helper untuk Parallax Header saat Scroll
  const headerParallax = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -80], // Background gerak lebih lambat
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* FIXED HEADER BACKGROUND (Parallax Effect) */}
      <Animated.View style={[styles.headerFixed, { transform: [{ translateY: headerParallax }] }]}>
         <LinearGradient colors={[COLORS.headerBg, '#5A230F']} style={styles.headerGradient} />
      </Animated.View>

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        
      {/* 1. HEADER PROFILE (Index 0) */}
      <Animated.View style={[styles.headerContent, getEnterStyle(0)]}>
          
          {/* INI BAGIAN YANG ERROR TADI */}
          <View style={styles.imageWrapper}>
              <Image 
                source={require('../../assets/images/profile.jpeg')} 
                style={styles.profileImage} 
              />
          </View> 
          {/* ^^^ JANGAN LUPA INI! (Penutup imageWrapper) */}

          <Text style={styles.nameText}>Ariellya Putri Sayow</Text>
          <Text style={styles.roleText}>Informatics Student</Text>

          <View style={styles.locationContainer}>
            <Ionicons name="location" size={14} color="#E8D1A7" />
            <Text style={styles.locationText}>Minahasa Utara, ID</Text>
          </View>

      </Animated.View>

        {/* WHITE SHEET CONTENT */}
        <View style={styles.whiteSheet}>
          
          {/* 2. ABOUT ME (Index 1) */}
          <Animated.View style={[styles.section, getEnterStyle(1)]}>
            <Text style={styles.sectionTitle}>About Me</Text>
            <View style={styles.aboutCard}>
                <Text style={styles.paragraph}>
                  Hi! I'm a student at <Text style={{fontWeight:'700', color: COLORS.headerBg}}>Universitas Klabat</Text>.
                  {'\n\n'}
                  Passionate about <Text style={{fontWeight:'700'}}>UI/UX Design</Text>, creating intuitive interfaces, and <Text style={{fontWeight:'700'}}>Game Dev</Text>—turning imagination into interactive reality.
                </Text>
            </View>
          </Animated.View>

          {/* 3. SKILLS GRID (Index 2 - OLD STYLE) */}
          <Animated.View style={[styles.section, getEnterStyle(2)]}>
            <Text style={styles.sectionTitle}>Skills & Tools</Text>
            <View style={styles.skillsGrid}>
              {SKILLS.map((skill, index) => (
                <View key={index} style={styles.skillWrapper}>
                  <ScaleButton style={{ width: '100%' }}>
                    <View style={styles.skillCard}>
                      <Image source={{ uri: skill.iconUrl }} style={styles.skillIcon} resizeMode="contain" />
                      <Text style={styles.skillText}>{skill.name}</Text>
                    </View>
                  </ScaleButton>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* 4. LET'S CONNECT (Index 3 - NEW STYLE, NO HIRE ME) */}
          <Animated.View style={[styles.section, getEnterStyle(3)]}>
            <Text style={styles.sectionTitle}>Let's Connect</Text>
            <View style={styles.contactRow}>
               {CONTACTS.map((contact, index) => (
                 <ScaleButton key={index} onPress={() => handleOpenLink(contact.action)}>
                    <View style={styles.contactCircleBtn}>
                        <Ionicons name={contact.icon as any} size={24} color={COLORS.headerBg} />
                    </View>
                 </ScaleButton>
               ))}
            </View>
          </Animated.View>

          {/* 5. FOOTER TEXT (Index 4) */}
          <Animated.View style={[styles.footerContainer, getEnterStyle(4)]}>
            <Text style={styles.footerText}>Open for internship & collaboration.</Text>
            <View style={styles.footerLine} />
          </Animated.View>

        </View>

        {/* Space Bottom */}
        <View style={{height: 100}} />

      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.headerBg },
  
  // Parallax Header
  headerFixed: { position: 'absolute', top: 0, left: 0, right: 0, height: 350, zIndex: 0 },
  headerGradient: { width: '100%', height: '100%' },
  
  scrollContent: { paddingTop: 60, zIndex: 1 },
  
  // Header Content
  headerContent: { alignItems: 'center', marginBottom: 25 },
  imageWrapper: { 
    padding: 6, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 75, marginBottom: 15,
    borderWidth: 1, borderColor: 'rgba(232, 209, 167, 0.4)'
  }, 
  profileImage: { width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: COLORS.cardHighlight },
  nameText: { fontSize: 24, fontWeight: '800', color: "#FFF", marginBottom: 4, letterSpacing: 0.5, textAlign: 'center' }, 
  roleText: { fontSize: 15, color: 'rgba(255,255,255,0.85)', fontWeight: '500', textAlign: 'center' },
  locationContainer: { 
    flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 4, 
    backgroundColor: COLORS.cardHighlight, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 
  },
  locationText: { fontSize: 12, fontWeight: '700', color: COLORS.headerBg },

  // White Sheet (Body)
  whiteSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 35, borderTopRightRadius: 35,
    paddingHorizontal: 22, paddingTop: 35,
    minHeight: 600,
    shadowColor: "#000", shadowOffset: { width: 0, height: -5 }, shadowOpacity: 0.15, elevation: 15
  },

  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: COLORS.headerBg, marginBottom: 15 },
  
  // About Card
  aboutCard: {
    backgroundColor: COLORS.card, padding: 20, borderRadius: 16,
    borderLeftWidth: 4, borderLeftColor: COLORS.headerBg,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, elevation: 2
  },
  paragraph: { fontSize: 15, color: COLORS.subtext, lineHeight: 24, textAlign: 'justify' },

  // SKILLS GRID (Old Style)
  skillsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  skillWrapper: { width: '31%', marginBottom: 12 }, 
  skillCard: { 
    backgroundColor: COLORS.card, borderRadius: 12, paddingVertical: 15, alignItems: 'center', justifyContent: 'center', 
    borderWidth: 1, borderColor: '#eee',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, elevation: 2 
  },
  skillIcon: { width: 35, height: 35, marginBottom: 8, tintColor: COLORS.primary },
  skillText: { fontSize: 11, fontWeight: '600', color: COLORS.text, textAlign: 'center' }, 

  // CONTACTS ROW (New Style - No Hire Me)
  contactRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 5 },
  contactCircleBtn: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: COLORS.card,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.border,
    shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, elevation: 3
  },

  // Footer
  footerContainer: { alignItems: 'center', marginTop: 10, opacity: 0.7 },
  footerText: { fontSize: 13, color: COLORS.subtext, fontStyle: 'italic', marginBottom: 10 },
  footerLine: { width: 40, height: 3, backgroundColor: COLORS.cardHighlight, borderRadius: 2 }
});