import React, { useState } from 'react';
import { 
  Alert, 
  Image, 
  ScrollView, 
  Text, 
  View, 
  TouchableOpacity,
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);
      Alert.alert('Success', 'Account created successfully');
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#161622', height: '100%' }}>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={{ 
          width: '100%', 
          justifyContent: 'center', 
          minHeight: '85%', 
          paddingHorizontal: 16,
          marginVertical: 24 
        }}>
          <Image
            source={images.logo}
            style={{ 
              width: 115, 
              height: 35,
              resizeMode: 'contain' 
            }}
          />
          <Text 
            style={{ 
              color: 'white', 
              fontSize: 24, 
              fontFamily: 'Poppins-SemiBold',
              marginTop: 20 
            }}
          >
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(text) => setForm({ ...form, username: text })}
            otherStyles={{ marginTop: 28 }}
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            otherStyles={{ marginTop: 28 }}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyles={{ marginTop: 28 }}
            secureTextEntry
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles={{ 
              width: '100%', 
              marginTop: 28,
              borderRadius: 12,
              minHeight: 62 
            }}
            isLoading={isSubmitting}
          />
          <View 
            style={{ 
              justifyContent: 'center', 
              flexDirection: 'row', 
              paddingTop: 20,
              gap: 8 
            }}
          >
            <Text 
              style={{ 
                color: '#A0A0A0', 
                fontSize: 16,
                fontFamily: 'Poppins-Regular' 
              }}
            >
              Already have an account? 
            </Text>
            <Link 
              href="/sign-in" 
              style={{ 
                color: '#FF9C01', 
                fontFamily: 'Poppins-SemiBold' 
              }}
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;