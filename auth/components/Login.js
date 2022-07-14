import React, { useState } from 'react';
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import AuthService from '../../service/auth-service';
import { useHistory } from 'react-router-dom';
import { useInformation } from '../../contexts/informationContext';
import RoleDecoder from '../../helper/role-decoder';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const history = useHistory();
    const { dispatch } = useInformation();

    const { handleSubmit, errors, register, formState } = useForm({
        mode: 'all',
    });

    async function onSubmit(values) {
        setLoading(true);
        setError(null);
        try {
            const res = await AuthService.login(values);
            if (res) {
                const {
                    name,
                    accessToken,
                    refreshToken,
                    daysToPasswordExpiry,
                } = res;

                localStorage.setItem('username', values.username);

                if (daysToPasswordExpiry === 0) {
                    setLoading(false);
                    setError(null);
                    history.push('/update-password');
                } else {
                    const roles = RoleDecoder(accessToken);
                    dispatch({
                        type: 'SET_ROLES',
                        payload: roles,
                    });

                    localStorage.setItem('name', name);
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);

                    if (daysToPasswordExpiry !== null) {
                        localStorage.setItem('expireAlertEnable', 'true');
                        localStorage.setItem(
                            'daysToPasswordExpiry',
                            daysToPasswordExpiry
                        );
                    }

                    setLoading(false);
                    setError(null);
                    history.push('/home');
                }
            }
        } catch (_error) {
            setError((_error.data && _error.data.message) || 'Network Error');
            setLoading(false);
        }
    }

    return (
        <Flex direction="column">
            <Flex width="100%" justify="center" align="center" h="85vh">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Heading as="h3" size="lg">
                        Identity Relationship Management
                    </Heading>
                    <FormControl isInvalid={errors.username}>
                        <FormLabel mt={4} fontSize="14px" htmlFor="username">
                            User Email
                        </FormLabel>
                        <Flex width="100%" direction="row">
                            <Input
                                bgColor="white"
                                name="username"
                                placeholder="Email Address"
                                width={{ lg: '400px', base: '96%' }}
                                ref={register({
                                    required: 'User email is required',
                                    maxLength: {
                                        value: 40,
                                        message:
                                            'Email address should be between 3 and 40 characters',
                                    },
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Email address is not valid',
                                    },
                                    minLength: {
                                        value: 3,
                                        message:
                                            'Email address should be between 3 and 40 characters',
                                    },
                                })}
                            />
                        </Flex>
                        <FormErrorMessage width={{ lg: '400px', base: '96%' }}>
                            {errors.username && errors.username.message}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password}>
                        <FormLabel mt={4} fontSize="14px" htmlFor="password">
                            Password
                        </FormLabel>
                        <Flex direction="row">
                            <Input
                                type="password"
                                bgColor="white"
                                name="password"
                                placeholder="Password"
                                width={{ lg: '400px', base: '100%' }}
                                ref={register({
                                    required: 'Password is required',
                                    maxLength: {
                                        value: 40,
                                        message:
                                            'Password should be between 12 and 40 characters',
                                    },
                                    minLength: {
                                        value: 12,
                                        message:
                                            'Password should be between 12 and 40 characters',
                                    },
                                })}
                            />
                        </Flex>
                        <FormErrorMessage width={{ lg: '400px', base: '100%' }}>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>

                    <Flex direction="column" mb={16} pt={8}>
                        <Button
                            bgColor="#e2136e"
                            justifyContent="space-between"
                            flex
                            color="white"
                            rightIcon={<ArrowForwardIcon h={6} w={6} />}
                            width={{ lg: '400px', base: '100%' }}
                            type="submit"
                            isLoading={loading}
                            disabled={!formState.isValid}
                            _hover={{
                                _disabled: {
                                    bgColor: 'gray',
                                },
                            }}
                            _disabled={{
                                cursor: 'not-allowed',
                                bgColor: 'gray',
                            }}
                        >
                            Login
                        </Button>
                        {error && (
                            <Text
                                color="#E53E3E"
                                mt={2}
                                fontSize="17px"
                                width={{ base: '100%', lg: '400px' }}
                                status="error"
                            >
                                {error}
                            </Text>
                        )}
                    </Flex>
                </form>
            </Flex>
        </Flex>
    );
};

export default Login;
