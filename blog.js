import React, { useState, useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, SafeAreaView, Dimensions, ScrollView, Animated, Pressable, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

// Componente de botão animado
const AnimatedButton = ({ style, children, onPress, animationType = 'scale' }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    const animation = animationType === 'scale' 
      ? Animated.spring(scaleValue, { toValue: 0.95, useNativeDriver: true, tension: 150, friction: 8 })
      : Animated.timing(opacityValue, { toValue: 0.7, duration: 150, useNativeDriver: true });
    animation.start();
  };

  const handlePressOut = () => {
    const animation = animationType === 'scale'
      ? Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true, tension: 150, friction: 8 })
      : Animated.timing(opacityValue, { toValue: 1, duration: 150, useNativeDriver: true });
    animation.start();
  };

  const animatedStyle = {
    transform: animationType === 'scale' ? [{ scale: scaleValue }] : [],
    opacity: animationType === 'opacity' ? opacityValue : 1,
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress} style={[style, { opacity: 1 }]}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
};

// Dados dos posts do blog
const BLOG_POSTS = [
  {
    id: 1,
    title: 'The standard Lorem Ipsum passage',
    excerpt: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    image: require('./img/Rectangle 41.png'),
    date: '15 Maio 2025',
    category: 'Tecnologia'
  },
  {
    id: 2,
    title: 'Understanding Modern Web Development',
    excerpt: 'Explore the latest trends in web development and how they can improve your projects and user experience.',
    image: require('./img/Rectangle 41.png'),
    date: '12 Maio 2025',
    category: 'Desenvolvimento'
  },
  {
    id: 3,
    title: 'React Native Best Practices',
    excerpt: 'Learn the best practices for building efficient and scalable React Native applications.',
    image: require('./img/Rectangle 41.png'),
    date: '10 Maio 2025',
    category: 'Mobile'
  },
  {
    id: 4,
    title: 'UI/UX Design Principles',
    excerpt: 'Discover the fundamental principles of UI/UX design that every developer should know.',
    image: require('./img/Rectangle 41.png'),
    date: '08 Maio 2025',
    category: 'Design'
  },
  {
    id: 5,
    title: 'JavaScript ES6+ Features',
    excerpt: 'Master the modern JavaScript features that will make your code more efficient and readable.',
    image: require('./img/Rectangle 41.png'),
    date: '05 Maio 2025',
    category: 'JavaScript'
  }
];

const CATEGORIES = ['Todos', 'Tecnologia', 'Desenvolvimento', 'Mobile', 'Design', 'JavaScript'];

export default function BlogScreen({ onNavigateBack }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS);

  const handleCategoryPress = useCallback((category) => {
    setSelectedCategory(category);
    if (category === 'Todos') {
      setFilteredPosts(BLOG_POSTS);
    } else {
      setFilteredPosts(BLOG_POSTS.filter(post => post.category === category));
    }
  }, []);

  const handleReadMore = useCallback((postId) => {
    console.log(`Lendo post ${postId}`);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a0f2e" />
      
      {/* Header Fixo */}
      <View style={styles.fixedHeader}>
        <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Image source={require('./img/logo-removebg-preview 2.png')} style={styles.headerLogo} resizeMode="contain" />
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Blog</Text>
          <Text style={styles.heroSubtitle}>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </Text>
        </View>

        {/* Categories Filter */}
        <View style={styles.categoriesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {CATEGORIES.map((category) => (
              <AnimatedButton
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => handleCategoryPress(category)}
                animationType="scale"
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </AnimatedButton>
            ))}
          </ScrollView>
        </View>

        {/* Blog Posts */}
        <View style={styles.postsContainer}>
          {filteredPosts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postImageContainer}>
                <Image source={post.image} style={styles.postImage} resizeMode="cover" />
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>{post.category}</Text>
                </View>
              </View>
              
              <View style={styles.postContent}>
                <Text style={styles.postDate}>{post.date}</Text>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postExcerpt}>{post.excerpt}</Text>
                
                <AnimatedButton
                  style={styles.readMoreButton}
                  onPress={() => handleReadMore(post.id)}
                  animationType="opacity"
                >
                  <Text style={styles.readMoreText}>Read More</Text>
                  <Text style={styles.readMoreArrow}>→</Text>
                </AnimatedButton>
              </View>
            </View>
          ))}
        </View>

        {/* Load More Button */}
        <View style={styles.loadMoreContainer}>
          <AnimatedButton style={styles.loadMoreButton} animationType="scale">
            <Text style={styles.loadMoreText}>Carregar Mais Posts</Text>
          </AnimatedButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a0f2e' },
  fixedHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, paddingTop: 50, backgroundColor: 'rgba(26, 15, 46, 0.95)', zIndex: 1000, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  backButton: { padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  backArrow: { fontSize: 20, color: '#ffffff', fontWeight: 'bold' },
  headerLogo: { width: 120, height: 40 },
  placeholder: { width: 50 },
  scrollView: { flex: 1 },
  heroSection: { paddingHorizontal: 20, paddingVertical: 40, alignItems: 'center', backgroundColor: '#1a0f2e' },
  heroTitle: { fontSize: 48, fontWeight: 'bold', color: '#9474FF', marginBottom: 20, fontFamily: 'Poppins', textAlign: 'center' },
  heroSubtitle: { fontSize: 16, color: '#cccccc', textAlign: 'center', lineHeight: 24, maxWidth: 320, fontFamily: 'Poppins' },
  categoriesContainer: { paddingVertical: 20, backgroundColor: '#1a0f2e' },
  categoriesScroll: { paddingHorizontal: 20 },
  categoryButton: { backgroundColor: 'rgba(255, 255, 255, 0.1)', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginRight: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)' },
  categoryButtonActive: { backgroundColor: '#9474FF', borderColor: '#9474FF' },
  categoryText: { fontSize: 14, color: '#ffffff', fontWeight: '500', fontFamily: 'Poppins' },
  categoryTextActive: { color: '#ffffff', fontWeight: '600' },
  postsContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  postCard: { backgroundColor: '#2a1f3d', borderRadius: 15, marginBottom: 25, overflow: 'hidden', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  postImageContainer: { position: 'relative', height: 200 },
  postImage: { width: '100%', height: '100%' },
  categoryBadge: { position: 'absolute', top: 15, left: 15, backgroundColor: 'rgba(148, 116, 255, 0.9)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  categoryBadgeText: { fontSize: 12, color: '#ffffff', fontWeight: '600', fontFamily: 'Poppins' },
  postContent: { padding: 20 },
  postDate: { fontSize: 12, color: '#9999ff', marginBottom: 8, fontFamily: 'Poppins' },
  postTitle: { fontSize: 20, fontWeight: 'bold', color: '#ffffff', marginBottom: 12, lineHeight: 26, fontFamily: 'Poppins' },
  postExcerpt: { fontSize: 14, color: '#cccccc', lineHeight: 20, marginBottom: 16, fontFamily: 'Poppins' },
  readMoreButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
  readMoreText: { fontSize: 14, color: '#9474FF', fontWeight: '600', marginRight: 8, fontFamily: 'Poppins' },
  readMoreArrow: { fontSize: 14, color: '#9474FF', fontWeight: 'bold' },
  loadMoreContainer: { paddingHorizontal: 20, paddingBottom: 40, alignItems: 'center' },
  loadMoreButton: { backgroundColor: '#9474FF', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 25, elevation: 5, shadowColor: '#9474FF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8 },
  loadMoreText: { fontSize: 16, fontWeight: '600', color: '#ffffff', fontFamily: 'Poppins' }
});