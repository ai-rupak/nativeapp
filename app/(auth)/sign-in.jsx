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
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const {setUser, setIsLogged} = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);
      Alert.alert('Success','Logged in successfully');
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView 
      style={{ 
        backgroundColor: '#161622', 
        height: '100%' 
      }}
    >
      <ScrollView 
        contentContainerStyle={{ 
          height: '100%' 
        }}
      >
        <View 
          style={{ 
            width: '100%', 
            justifyContent: 'center', 
            minHeight: '85%', 
            paddingHorizontal: 16,
            marginVertical: 24 
          }}
        >
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
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(text) => setForm({...form, email: text})}
            otherStyles={{ marginTop: 28 }}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(text) => setForm({...form, password: text})}
            otherStyles={{ marginTop: 28 }}
            secureTextEntry
          />
          <CustomButton
            title="Sign In"
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
              Don't have an account? 
            </Text>
            <Link 
              href="/sign-up" 
              style={{ 
                color: '#FF9C01', 
                fontFamily: 'Poppins-SemiBold' 
              }}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;