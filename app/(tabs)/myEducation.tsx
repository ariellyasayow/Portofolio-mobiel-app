import { 
  View, Text, StyleSheet, ScrollView, StatusBar, 
  Animated, Easing, Image, Dimensions // <-- Image sudah ditambahkan disini
} from 'react-native';
import React, { useRef, useCallback } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// --- TEMA RUSTIC LUXURY ---
const COLORS = {
  headerBg: "#743014",    
  primary: "#442D1C",     
  accent: "#84592B",      // <-- Accent sudah ditambahkan (Coklat Sedang)
  background: "#FCFBF9",  
  card: "#FFFFFF",        
  cardHighlight: "#E8D1A7", 
  text: "#442D1C",        
  subtext: "#8C7C62",     
  border: "#EFE6D5",
  success: "#2E7D32", 
};

// --- DATA ---
const RELEVANT_COURSES = [
  "Human Computer Interaction", 
  "Computer Graphics", 
  "Front-End Dev", 
  "Visual Programming"
];

const CERTIFICATES = [
  {
    title: "Network Administrator (JNA)",
    issuer: "Kominfo (DTS - VSGA)",
    year: "2025",
    type: "certification", 
    desc: "Sertifikasi Kompetensi BNSP/Komdigi"
  },
  {
    title: "Young Entrepreneurs (Semifinalist)",
    issuer: "Universitas Indonesia",
    year: "2025",
    type: "award", 
    desc: "Business Case Competition"
  },
  {
    title: "Proxocoris (Business Plan)",
    issuer: "Unklab Computer Science",
    year: "2025",
    type: "award", 
    desc: "Certificate of Appreciation"
  },
];

export default function MyEducation() {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Animasi Staggered (Waterfall)
  const fadeAnims = useRef([
    new Animated.Value(0), // 0: Header Title
    new Animated.Value(0), // 1: Uni Card
    new Animated.Value(0), // 2: Courses
    new Animated.Value(0), // 3: Achievements
    new Animated.Value(0), // 4: SMA
  ]).current;

  useFocusEffect(
    useCallback(() => {
      // Reset
      fadeAnims.forEach(anim => anim.setValue(0));

      // Play Waterfall
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

  // Helper Animasi Slide Up
  const getEnterStyle = (index: number) => {
    const translateY = fadeAnims[index].interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0],
    });
    return { opacity: fadeAnims[index], transform: [{ translateY }] };
  };

  // Parallax Header Effect
  const headerParallax = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -80],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* FIXED HEADER BACKGROUND */}
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
        
        {/* 1. HEADER TITLE (Index 0) */}
        <Animated.View style={[styles.headerContent, getEnterStyle(0)]}>
            <View style={styles.iconCircle}>
                <Ionicons name="school" size={40} color={COLORS.headerBg} />
            </View>
            <Text style={styles.pageTitle}>Education Journey</Text>
            <Text style={styles.pageSubtitle}>Academic & Achievements</Text>
        </Animated.View>

        {/* WHITE SHEET */}
        <View style={styles.whiteSheet}>

          {/* 2. UNIVERSITY CARD (Index 1) */}
          <Animated.View style={[styles.section, getEnterStyle(1)]}>
            <View style={styles.uniCard}>
                <View style={styles.uniHeaderRow}>
                    <View style={{flex: 1}}>
                        <Text style={styles.uniName}>Universitas Klabat</Text>
                        <Text style={styles.uniMajor}>S1 - Informatics / Computer Science</Text>
                        <Text style={styles.uniYear}>2022 - Present (Sem 6)</Text>
                    </View>
                    <Image 
                        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Logo_Universitas_Klabat.png' }} 
                        style={styles.uniLogo} 
                        resizeMode="contain"
                    />
                </View>

                {/* IPK HIGHLIGHT */}
                <View style={styles.gpaContainer}>
                    <View style={styles.gpaBadge}>
                        <Text style={styles.gpaLabel}>Cumulative GPA</Text>
                        <Text style={styles.gpaValue}>3.95<Text style={styles.gpaMax}>/4.00</Text></Text>
                    </View>
                    <View style={styles.gpaInfo}>
                        <Ionicons name="star" size={16} color={COLORS.cardHighlight} />
                        <Text style={styles.gpaText}>Consistent Dean's Lister</Text>
                    </View>
                </View>
            </View>
          </Animated.View>

          {/* 3. RELEVANT COURSES (Index 2) */}
          <Animated.View style={[styles.section, getEnterStyle(2)]}>
            <Text style={styles.sectionTitle}>Relevant Coursework</Text>
            <View style={styles.courseContainer}>
                {RELEVANT_COURSES.map((course, index) => (
                    <View key={index} style={styles.courseChip}>
                        <Ionicons name="book-outline" size={14} color={COLORS.primary} style={{marginRight:6}} />
                        <Text style={styles.courseText}>{course}</Text>
                    </View>
                ))}
            </View>
          </Animated.View>

          {/* 4. AWARDS & CERTS (Index 3) */}
          <Animated.View style={[styles.section, getEnterStyle(3)]}>
            <Text style={styles.sectionTitle}>Awards & Certifications</Text>
            
            {CERTIFICATES.map((item, index) => (
                <View key={index} style={styles.awardCard}>
                    <View style={[styles.awardIconBox, { backgroundColor: item.type === 'award' ? '#FFF4E6' : '#E8F5E9' }]}>
                        <Ionicons 
                            name={item.type === 'award' ? "trophy" : "ribbon"} 
                            size={24} 
                            color={item.type === 'award' ? COLORS.headerBg : COLORS.success} 
                        />
                    </View>
                    <View style={styles.awardContent}>
                        <Text style={styles.awardTitle}>{item.title}</Text>
                        <Text style={styles.awardIssuer}>{item.issuer} • {item.year}</Text>
                        <Text style={styles.awardDesc}>{item.desc}</Text>
                    </View>
                </View>
            ))}
          </Animated.View>

          {/* 5. HIGH SCHOOL (Index 4) */}
          <Animated.View style={[styles.section, getEnterStyle(4)]}>
            <Text style={styles.sectionTitle}>High School</Text>
            <View style={styles.smaCard}>
                {/* Timeline Line Vertical */}
                <View style={styles.timelineLine} />
                <View style={styles.timelineDot} />
                
                <View style={{ marginLeft: 20 }}>
                    <Text style={styles.smaName}>SMA N 1 Airmadidi</Text>
                    <Text style={styles.smaMajor}>Jurusan IPA (Science)</Text>
                    <View style={styles.locationBadge}>
                        <Ionicons name="location-sharp" size={12} color={COLORS.subtext} />
                        <Text style={styles.smaLoc}>Airmadidi, Minahasa Utara</Text>
                    </View>
                </View>
            </View>
          </Animated.View>

          {/* Space Bottom */}
          <View style={{height: 80}} />
          
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.headerBg },
  
  // Parallax Header
  headerFixed: { position: 'absolute', top: 0, left: 0, right: 0, height: 300, zIndex: 0 },
  headerGradient: { width: '100%', height: '100%' },

  scrollContent: { paddingTop: 60, zIndex: 1 },

  // Header Content
  headerContent: { alignItems: 'center', marginBottom: 25 },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.cardHighlight,
    justifyContent: 'center', alignItems: 'center', marginBottom: 15,
    borderWidth: 4, borderColor: 'rgba(255,255,255,0.2)'
  },
  pageTitle: { fontSize: 26, fontWeight: '800', color: "#FFF", letterSpacing: 0.5 },
  pageSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '500', marginTop: 4 },

  // White Sheet
  whiteSheet: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 35, borderTopRightRadius: 35,
    paddingHorizontal: 22, paddingTop: 35,
    minHeight: 600,
    shadowColor: "#000", shadowOffset: { width: 0, height: -5 }, shadowOpacity: 0.15, elevation: 15
  },

  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.headerBg, marginBottom: 15, letterSpacing: 0.5 },

  // UNI CARD
  uniCard: {
    backgroundColor: COLORS.card, borderRadius: 16, padding: 20,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, elevation: 3,
    borderTopWidth: 5, borderTopColor: COLORS.headerBg
  },
  uniHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  uniName: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
  uniMajor: { fontSize: 14, color: COLORS.subtext, fontWeight: '600', marginBottom: 2 },
  uniYear: { fontSize: 13, color: COLORS.subtext, fontStyle: 'italic' },
  uniLogo: { width: 50, height: 50, opacity: 0.8 }, 
  
  // GPA
  gpaContainer: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#F9F5F0', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border 
  },
  gpaBadge: { flexDirection: 'column' },
  gpaLabel: { fontSize: 11, textTransform: 'uppercase', color: COLORS.subtext, fontWeight: '700' },
  gpaValue: { fontSize: 28, fontWeight: '800', color: COLORS.headerBg },
  gpaMax: { fontSize: 14, color: COLORS.subtext, fontWeight: '500' },
  gpaInfo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  gpaText: { fontSize: 12, fontWeight: '600', color: COLORS.accent }, // <-- Sekarang aman karena accent sudah ada

  // COURSES
  courseContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  courseChip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card,
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20,
    borderWidth: 1, borderColor: COLORS.border
  },
  courseText: { fontSize: 13, color: COLORS.text, fontWeight: '500' },

  // AWARDS
  awardCard: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: COLORS.card,
    padding: 16, borderRadius: 16, marginBottom: 12,
    borderLeftWidth: 3, borderLeftColor: COLORS.cardHighlight,
    shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, elevation: 1
  },
  awardIconBox: { 
    width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 15 
  },
  awardContent: { flex: 1 },
  awardTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  awardIssuer: { fontSize: 12, fontWeight: '600', color: COLORS.primary, marginBottom: 4 },
  awardDesc: { fontSize: 12, color: COLORS.subtext, lineHeight: 16 },

  // SMA CARD (Simple Timeline)
  smaCard: {
    backgroundColor: COLORS.card, padding: 20, borderRadius: 16,
    borderWidth: 1, borderColor: COLORS.border,
    position: 'relative', overflow: 'hidden'
  },
  timelineLine: {
    position: 'absolute', left: 24, top: 0, bottom: 0, width: 2, backgroundColor: '#EEE'
  },
  timelineDot: {
    width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.subtext,
    position: 'absolute', left: 20, top: 25, zIndex: 2
  },
  smaName: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
  smaMajor: { fontSize: 14, color: COLORS.subtext, marginBottom: 8 },
  locationBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  smaLoc: { fontSize: 12, color: COLORS.subtext },
});