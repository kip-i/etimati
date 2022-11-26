import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebaseEnv";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user } = useAuthContext();
  const navigate = useNavigate();
  
  // ログイン状態かどうかを判定するイベントを発動する
  useEffect(() => {
    // ログインしている場合、ホームへリダイレクト
    if (user) {
      navigate('/')
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault()
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      navigate('/')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
      setShowAlert(true)
    });
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          {/* ロゴ入れる */}
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>メールアドレス</FormLabel>
                <Input type="email" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>パスワード</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password} 
                    onChange={(e) => {setPassword(e.target.value)}}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {showAlert && (
                <Alert status='error'>
                  <AlertIcon />
                  <AlertTitle>Error!</AlertTitle>
                  <AlertDescription>メールアドレスかパスワードが違います。</AlertDescription>
                </Alert>
              )}
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  ログイン
                </Button>
              </Stack>
            
              <Stack pt={6}>
                <Text align={'center'}>
                  ユーザー登録がまだの方は<Link to={'/signUp'} color={'blue.400'}>こちら</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;