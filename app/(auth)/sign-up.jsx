import {  Alert, Image, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {
  const [form, setForm] = useState({
    username:'',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if(!form.email || !form.password || !form.username) {
      Alert.alert('Error','Please fill all fields');
    }
    setIsSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
    
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
        <Image
        source={images.logo}
        className='w-[115px] h-[35pxA]'
        resizeMode='contain'
        />
        <Text className='text-white text-3xl font-psemibold mt-5'>
          Sign up to Aora
        </Text>

        <FormField
        title = 'Username'
        value = {form.username}
        handleChangeText = {(text) => setForm({...form, username: text})}
        otherStyles = 'mt-10'
        />
        <FormField
        title = 'Email'
        value = {form.email}
        handleChangeText = {(text) => setForm({...form, email: text})}
        otherStyles = 'mt-7'
        keyboardType = 'email-address'
        />
        <FormField
        title = 'Password'
        value = {form.password}
        handleChangeText = {(text) => setForm({...form, password: text})}
        otherStyles = 'mt-7'
        />
        <CustomButton
        title="Sign In"
        handlePress={submit}
        containerStyles="w-full mt-7 rounded-xl min-h-[62px]"
        isLoading={isSubmitting}
        />
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className='text-gray-100 font-pregular text-lg '>
            Have an account already? 
          </Text>
        <Link href="/sign-in" className='text-secondary-200'>Sign In</Link>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

