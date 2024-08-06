import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import ProductModal from '../components/ProductModal';

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  if (!product) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <ProductModal product={product} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default function ProductDetailWrapper() {
  return (
    <Provider store={store}>
      <ProductDetailScreen />
    </Provider>
  );
}