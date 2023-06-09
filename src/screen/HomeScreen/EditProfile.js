import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  useWindowDimensions,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Logo from '../../../assets/images/Logo_3.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../../database/firebaseDB';
// import {collection, doc, getDoc, setDoc} from 'firebase/firestore/lite';

const EditProfile = () => {
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const EMAIL_REGEX = /[a-zA-Z0-9]+@kkumail.com/;
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');
  // const [isSignedIn, setIsSignedIn] = useState(false);
  const onSignInSignUp = data => {
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch(error => {
        alert(error.message);
        console.log(error.code);
      });
  };

  const onBackSignIn = () => {
    console.log('Back Sign In');
    navigation.navigate('HomeProfile');
  };
  return (
    <SafeAreaView style={style.root}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.container}>
          <View style={style.header}>
            <Image
              source={Logo}
              style={[style.logo, {height: height * 0.3}]}
              resizeMode="contain"
            />
            <Text style={style.text}>Edit Profile</Text>
          </View>
          <View style={{marginTop: 10, paddingLeft: 20, paddingRight: 20}}>
            <CustomInput
              name="username"
              placeholder="    Username"
              control={control}
              rules={{required: 'Username is required'}}
            />
            <CustomInput
              name="password"
              placeholder="    Password"
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 3,
                  message: 'Password should be minimum 3 character long ',
                },
              }}
              secureTextEntry
            />
            <CustomInput
              name="confirmPassword"
              placeholder="    Confirm Password"
              control={control}
              rules={{
                validate: value => value == pwd || 'Password do not match',
              }}
              secureTextEntry
            />
          </View>
          <View style={style.button}>
            <CustomButton
              text="Edit"
              onPress={handleSubmit(onSignInSignUp)}
              bgColor="#FAB5B5"
              fgColor="#DD4D44"
            />
            <CustomButton
              text="Back"
              onPress={onBackSignIn}
              bgColor="#FAB5B5"
              fgColor="#DD4D44"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFEAEA',
  },
  container: {
    padding: 40,
  },
  logo: {
    margin: 0,
    width: '40%',
    maxWidth: 500,
    maxHeight: 100,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#FAB5B5',
    padding: 0,
    marginBottom: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#FAB5B5',
    borderRadius: 50,
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#DD4D44',
  },
  button: {
    marginTop: 0,
    padding: 20,
    paddingLeft: 70,
    paddingRight: 70,
  },
});
export default EditProfile;
