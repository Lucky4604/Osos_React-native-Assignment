import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons'; // Make sure to install this package

const ProductItem = ({ product }) => {
  const router = useRouter();

  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <View style={styles.starContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesome key={`full_${i}`} name="star" size={14} color="#FFD700" />
        ))}
        {halfStar && <FontAwesome name="star-half-o" size={14} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesome key={`empty_${i}`} name="star-o" size={14} color="#FFD700" />
        ))}
      </View>
    );
  };

  return (
    <TouchableOpacity onPress={() => router.push(`/${product.id}`)}>
      <View style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={2}>{product.title}</Text>
          <View style={styles.ratingContainer}>
            {renderStars(product.rating.rate)}
            <Text style={styles.ratingCount}>({product.rating.count})</Text>
          </View>
          <Text style={styles.price}>₹ {product.price.toFixed(2)}</Text>
          <Text style={styles.category}>Category: {product.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    
  },
  header: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: 5,
  },
  ratingCount: {
    fontSize: 12,
    color: '#888',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  category: {
    fontSize: 12,
    color: '#888',
  },
});

export default ProductItem;