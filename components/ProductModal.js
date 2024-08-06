import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ProductModal = ({ product }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart[product.id]);
  const router = useRouter();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity({ id: product.id }));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity({ id: product.id }));
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <View style={styles.modalContent}>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <FontAwesome name="close" size={24} color="black" />
      </TouchableOpacity>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>₹ {product.price.toFixed(2)}</Text>
      {cartItem ? (
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecrement} style={styles.quantityButton}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{cartItem.quantity}</Text>
          <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={handleAddToCart} style={styles.addButton}>
          <FontAwesome name="shopping-cart" size={18} color="white" style={styles.cartIcon} />
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    marginRight: 10,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default ProductModal;