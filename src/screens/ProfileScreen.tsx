import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CameraModule from '../bridges/CameraModule';
import { COLORS, SIZES, SHADOWS } from '../constants';

// Import components
import ProfileHeader from '../components/ProfileHeader';
import OrdersList from './../components/OrderList';
import ProofModal from '../components/ProofModal';
import { useAuth } from '../core/context/AuthContext';
import { UserManagement } from '../core/UserManagement';

const ProfileScreen = ({ navigation, theme, language }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [proofModalVisible, setProofModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [proofImage, setProofImage] = useState(null);
  const [condition, setCondition] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const {logout} = useAuth();
  

  // Language strings
  const strings = {
    en: {
      profile: 'Profile',
      orders: 'My Orders',
      settings: 'Settings',
      logout: 'Logout',
      proofOfDelivery: 'Proof of Delivery',
      submitProof: 'Submit Proof',
      takePhoto: 'Take Photo',
      selectFromGallery: 'Select from Gallery',
      productCondition: 'Product Condition',
      rating: 'Rating',
      comments: 'Comments',
      submit: 'Submit',
      cancel: 'Cancel',
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
      damaged: 'Damaged',
      orderDetails: 'Order Details',
      delivered: 'Delivered',
      pending: 'Pending',
      proofSubmitted: 'Proof Submitted',
      noOrders: 'No orders found',
      changeTheme: 'Click To Change Theme'
    },
    hi: {
      profile: 'प्रोफ़ाइल',
      orders: 'मेरे ऑर्डर',
      settings: 'सेटिंग्स',
      logout: 'लॉग आउट',
      proofOfDelivery: 'डिलीवरी का प्रमाण',
      submitProof: 'प्रमाण सबमिट करें',
      takePhoto: 'फोटो लें',
      selectFromGallery: 'गैलरी से चुनें',
      productCondition: 'उत्पाद की स्थिति',
      rating: 'रेटिंग',
      comments: 'टिप्पणियां',
      submit: 'सबमिट करें',
      cancel: 'रद्द करें',
      excellent: 'उत्कृष्ट',
      good: 'अच्छा',
      fair: 'ठीक',
      poor: 'खराब',
      damaged: 'क्षतिग्रस्त',
      orderDetails: 'ऑर्डर विवरण',
      delivered: 'डिलीवर हो गया',
      pending: 'लंबित',
      proofSubmitted: 'प्रमाण सबमिट किया गया',
      noOrders: 'कोई ऑर्डर नहीं मिला',
      changeTheme: 'थीम बदलने के लिए क्लिक करें'
    }
  };

  const currentStrings = strings[selectedLanguage] || strings.en;
  const isDarkTheme = theme === 'dark';

  useEffect(() => {
    loadUserData();
    loadOrders();
  }, []);

  const loadUserData = async () => {
    console.log("loadUserData")
    try {
      const userData = await UserManagement.getUser()
      console.log({userData})
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadOrders = async () => {
    try {
      setLoading(true);
      const mockOrders = [
        {
          id: '1',
          productName: 'College Bag',
          productImage: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
          orderDate: '2024-05-01',
          status: 'delivered',
          proofSubmitted: false,
          price: 'Rs. 699',
        },
        {
          id: '2',
          productName: 'T-Shirt',
          productImage: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
          orderDate: '2024-04-28',
          status: 'delivered',
          proofSubmitted: true,
          price: 'Rs. 2099',
        },
        {
          id: '3',
          productName: 'LED TV',
          productImage: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
          orderDate: '2024-04-25',
          status: 'pending',
          proofSubmitted: false,
          price: 'Rs.12990',
        },
      ];
      
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading orders:', error);
      setLoading(false);
    }
  };



  const handleSubmitProof = async () => {
    if (!proofImage || !condition || rating === 0) {
      Alert.alert('Error', 'Please fill all required fields and add a photo');
      return;
    }

    setSubmitting(true);
    try {
      const proofData = {
        orderId: selectedOrder.id,
        image: proofImage.uri,
        condition,
        rating,
        comments,
        timestamp: new Date().toISOString(),
      };

      await new Promise(resolve => setTimeout(resolve, 2000));

      const updatedOrders = orders.map(order => 
        order.id === selectedOrder.id 
          ? { ...order, proofSubmitted: true }
          : order
      );
      setOrders(updatedOrders);

      Alert.alert('Success', 'Proof of delivery submitted successfully!');
      resetProofModal();
    } catch (error) {
      console.error('Error submitting proof:', error);
      Alert.alert('Error', 'Failed to submit proof of delivery');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTakePhoto = () => {
    //TODO: integrate the camera module
    console.log("cameraModule")
  }

  const resetProofModal = () => {
    setProofModalVisible(false);
    setSelectedOrder(null);
    setProofImage(null);
    setCondition('');
    setRating(0);
    setComments('');
  };

  const handleLogout = async () => {
    logout();
  };

  const onThemePress = () => {

  }

  const onChangeLanguage = () => {
    selectedLanguage === 'en' ? setSelectedLanguage('hi') : setSelectedLanguage('en')
  }

  const handleProofSubmit = (order) => {
    setSelectedOrder(order);
    setProofModalVisible(true);
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, isDarkTheme && styles.containerDark]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }


  return (
    <SafeAreaView style={[styles.container, isDarkTheme && styles.containerDark]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader 
          user={user} 
          isDarkTheme={isDarkTheme} 
        />
        <OrdersList 
          orders={orders}
          strings={currentStrings}
          isDarkTheme={isDarkTheme}
          onProofSubmit={handleProofSubmit}

        />
       <View style={[styles.buttonContainer, isDarkTheme && styles.buttonContainerDark]}>
              <TouchableOpacity
               style={[styles.actionButton, isDarkTheme && styles.actionButtonDark]}
               onPress={onChangeLanguage}
             >
               <Text style={[styles.actionButtonText, isDarkTheme && styles.textDark]}>
                 Change Language
               </Text>
             </TouchableOpacity>
             <TouchableOpacity
               style={[styles.actionButton, isDarkTheme && styles.actionButtonDark]}
               onPress={onThemePress}
             >
               <Text style={[styles.actionButtonText, isDarkTheme && styles.textDark]}>
                 {strings[selectedLanguage].changeTheme}
               </Text>
             </TouchableOpacity>
             
             <TouchableOpacity
               style={styles.logoutButton}
               onPress={handleLogout}
             >
               <Text style={styles.logoutButtonText}>
                 {strings[selectedLanguage].logout}
               </Text>
             </TouchableOpacity>
           </View>
      </ScrollView>

      <ProofModal
        visible={proofModalVisible}
        selectedOrder={selectedOrder}
        strings={currentStrings}
        isDarkTheme={isDarkTheme}
        proofImage={proofImage}
        rating={rating}
        submitting={submitting}
        onClose={resetProofModal}
        onTakePhoto={handleTakePhoto}
        onRatingChange={setRating}
        onSubmit={handleSubmitProof}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offwhite,
  },
  containerDark: {
    backgroundColor: COLORS.black,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.offwhite,
  },
  buttonContainer: {
    backgroundColor: COLORS.white,
    marginBottom: SIZES.xSmall,
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.medium,
    ...SHADOWS.small,
  },
  buttonContainerDark: {
    backgroundColor: COLORS.primary,
  },
  actionButton: {
    backgroundColor: COLORS.secondary,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    marginBottom: SIZES.xSmall,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  actionButtonDark: {
    backgroundColor: COLORS.gray,
  },
  actionButtonText: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.primary,
  },
  logoutButton: {
    backgroundColor: COLORS.red,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  logoutButtonText: {
    fontSize: SIZES.medium,
    fontWeight: '600',
    color: COLORS.white,
  },
  textDark: {
    color: COLORS.white,
  },
});

export default ProfileScreen;