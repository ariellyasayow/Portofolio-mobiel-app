import { 
  View, Text, StyleSheet, ScrollView, StatusBar, 
  Animated, Easing, Image, Dimensions 
} from 'react-native';
import React, { useRef, useCallback } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

// --- TEMA RUSTIC LUXURY ---
const COLORS = {
  headerBg: "#743014",    // Spiced Wine
  primary: "#442D1C",     // Cowhide Cocoa
  accent: "#84592B",      // Toasted Caramel
  background: "#FCFBF9",  // Off-White
  card: "#FFFFFF",        
  cardHighlight: "#E8D1A7", // Golden Batter
  text: "#442D1C",        
  subtext: "#8C7C62",     // Olive Grey
  border: "#EFE6D5",
};

// --- DATA ORGANISASI ---
const ORGANIZATIONS = [
  {
    id: 1,
    role: "Staff of Internal Development",
    org: "UVICS (Computer Science Org)",
    period: "Universitas Klabat",
    desc: "Mengelola dinamika internal organisasi, mengatur jadwal rapat rutin, dan mengoordinasikan kegiatan anggota untuk menciptakan lingkungan belajar & kompetisi yang produktif.",
    icon: "people"
  },
  {
    id: 2,
    role: "Secretary II & Multimedia Div",
    org: "OSIS SMA N 1 Airmadidi",
    period: "2022",
    desc: "Bertanggung jawab atas rekap data siswa dan administrasi kedisiplinan (Sidak). Sebelumnya aktif di Sekbid 9 (ICT/Multimedia) menangani editing dan konten visual.",
    icon: "document-text"
  }
];

// --- DATA KEPANITIAAN ---
const COMMITTEES = [
  {
    event: "SMANTAFEST 2022",
    role: "Secretary of Committee",
    desc: "Mengurus administrasi untuk festival lomba besar sekolah (Arts & Sports)."
  },
  {
    event: "School Anniversary & 17an",
    role: "Event Organizer Team",
    desc: "Tim pelaksana teknis perayaan HUT RI dan Ulang Tahun Sekolah."
  }
];

// --- HOBI (INTERESTS) ---
const INTERESTS = [
  { name: "Game Analysis", icon: "game-controller" }, // Nonton game -> Analisis
  { name: "Visual Arts", icon: "color-palette" },
  { name: "Cinematography", icon: "videocam" },
];

export default function MyExperience() {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Animasi Staggered (Waterfall)
  const fadeAnims = useRef([
    new Animated.Value(0), // 0: Header
    new Animated.Value(0), // 1: Org Title
    new Animated.Value(0), // 2: Org List
    new Animated.Value(0), // 3: Committee Title
    new Animated.Value(0), // 4: Committee List
    new Animated.Value(0), // 5: Interests
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

  // Helper Slide Up
  const getEnterStyle = (index: number) => {
    const translateY = fadeAnims[index].interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0],
    });
    return { opacity: fadeAnims[index], transform: [{ translateY }] };
  };

  // Parallax Header
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
        
        {/* 1. HEADER TITLE */}
        <Animated.View style={[styles.headerContent, getEnterStyle(0)]}>
            <View style={styles.iconCircle}>
                <Ionicons name="briefcase" size={36} color={COLORS.headerBg} />
            </View>
            <Text style={styles.pageTitle}>Experience</Text>
            <Text style={styles.pageSubtitle}>Leadership & Organizations</Text>
        </Animated.View>

        {/* WHITE SHEET */}
        <View style={styles.whiteSheet}>

          {/* 2. ORGANIZATION SECTION */}
          <Animated.View style={getEnterStyle(1)}>
            <Text style={styles.sectionTitle}>Organizations</Text>
          </Animated.View>

          <Animated.View style={getEnterStyle(2)}>
            {ORGANIZATIONS.map((item, index) => (
                <View key={item.id} style={styles.orgCard}>
                    <View style={styles.orgHeader}>
                        <View style={styles.orgIconBox}>
                            <Ionicons name={item.icon as any} size={22} color={COLORS.cardHighlight} />
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={styles.orgRole}>{item.role}</Text>
                            <Text style={styles.orgName}>{item.org}</Text>
                            <Text style={styles.orgPeriod}>{item.period}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.orgDesc}>{item.desc}</Text>
                </View>
            ))}
          </Animated.View>

          {/* 3. COMMITTEE SECTION */}
          <Animated.View style={[styles.mt20, getEnterStyle(3)]}>
            <Text style={styles.sectionTitle}>Volunteering & Committees</Text>
          </Animated.View>

          <Animated.View style={getEnterStyle(4)}>
            <View style={styles.committeeContainer}>
                {COMMITTEES.map((item, index) => (
                    <View key={index} style={styles.commItem}>
                         {/* Timeline Dot */}
                        <View style={styles.commDot} />
                        {index !== COMMITTEES.length -1 && <View style={styles.commLine} />}
                        
                        <View style={styles.commContent}>
                            <Text style={styles.commEvent}>{item.event}</Text>
                            <Text style={styles.commRole}>{item.role}</Text>
                            <Text style={styles.commDesc}>{item.desc}</Text>
                        </View>
                    </View>
                ))}
            </View>
          </Animated.View>

          {/* 4. INTERESTS (HOBBY) SECTION */}
          <Animated.View style={[styles.mt20, getEnterStyle(5)]}>
            <Text style={styles.sectionTitle}>Personal Interests</Text>
            <View style={styles.hobbyRow}>
                {INTERESTS.map((hobby, index) => (
                    <View key={index} style={styles.hobbyChip}>
                        <Ionicons name={hobby.icon as any} size={16} color={COLORS.primary} style={{marginRight: 6}} />
                        <Text style={styles.hobbyText}>{hobby.name}</Text>
                    </View>
                ))}
            </View>
            {/* Note kecil tentang hobi game */}
            <Text style={styles.hobbyNote}>
                *Passionate about analyzing gameplay mechanics to inspire my Game Development journey.
            </Text>
          </Animated.View>

          {/* Space Bottom */}
          <View style={{height: 100}} />
          
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.headerBg },
  mt20: { marginTop: 25 },
  
  // Parallax Header
  headerFixed: { position: 'absolute', top: 0, left: 0, right: 0, height: 300, zIndex: 0 },
  headerGradient: { width: '100%', height: '100%' },

  scrollContent: { paddingTop: 60, zIndex: 1 },

  // Header Content
  headerContent: { alignItems: 'center', marginBottom: 25 },
  iconCircle: {
    width: 70, height: 70, borderRadius: 35, backgroundColor: COLORS.cardHighlight,
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
    borderWidth: 3, borderColor: 'rgba(255,255,255,0.2)'
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

  sectionTitle: { fontSize: 18, fontWeight: '800', color: COLORS.headerBg, marginBottom: 15, letterSpacing: 0.5 },

  // ORGANIZATION CARD
  orgCard: {
    backgroundColor: COLORS.card, borderRadius: 16, padding: 18, marginBottom: 15,
    borderWidth: 1, borderColor: COLORS.border,
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, elevation: 2
  },
  orgHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  orgIconBox: { 
    width: 40, height: 40, borderRadius: 10, backgroundColor: COLORS.headerBg, 
    justifyContent: 'center', alignItems: 'center', marginRight: 12 
  },
  orgRole: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 2 },
  orgName: { fontSize: 13, fontWeight: '600', color: COLORS.accent },
  orgPeriod: { fontSize: 12, color: COLORS.subtext, marginTop: 2 },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 12 },
  orgDesc: { fontSize: 13, color: COLORS.subtext, lineHeight: 20 },

  // COMMITTEE LIST
  committeeContainer: { 
    backgroundColor: COLORS.card, borderRadius: 16, padding: 20, 
    borderWidth: 1, borderColor: COLORS.border 
  },
  commItem: { paddingLeft: 15, paddingBottom: 20, position: 'relative' },
  commDot: { 
    width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.headerBg, 
    position: 'absolute', left: -5, top: 4, zIndex: 2 
  },
  commLine: { 
    position: 'absolute', left: -1, top: 10, bottom: -10, width: 2, backgroundColor: '#EEE' 
  },
  commContent: { marginTop: -2 },
  commEvent: { fontSize: 15, fontWeight: '700', color: COLORS.text },
  commRole: { fontSize: 13, fontWeight: '600', color: COLORS.accent, marginVertical: 2 },
  commDesc: { fontSize: 12, color: COLORS.subtext },

  // HOBBIES
  hobbyRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 10 },
  hobbyChip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F0E6',
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20,
    borderWidth: 1, borderColor: COLORS.border
  },
  hobbyText: { fontSize: 13, fontWeight: '600', color: COLORS.text },
  hobbyNote: { fontSize: 11, fontStyle: 'italic', color: COLORS.subtext, marginTop: 5 }
});