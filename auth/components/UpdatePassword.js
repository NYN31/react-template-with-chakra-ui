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
import { useHistory } from 'react-router-dom';
import AuthService from '../../service/auth-service';

const UpdatePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const history = useHistory();

    const username = localStorage.getItem('username');
    if (username == null) {
        history.push('/login');
    }

    const { handleSubmit, errors, register, formState } = useForm({
        mode: 'all',
    });

    async function onSubmit(values) {
        setLoading(true);
        setError(null);

        try {
            const password = values['oldPassword'];
            const newPassword = values['newPassword'];
            const repeatPassword = values['repeatPassword'];

            if (newPassword !== repeatPassword) {
                setError('New Password and Repeat Password not matched');
            } else if (password === newPassword) {
                setError('New Password and Old Password are same');
            } else {
                const res = await AuthService.update_password({
                    username: username,
                    password: password,
                    newPassword: newPassword,
                });
                setLoading(false);
                setError(null);
                history.push('/login');
            }

            setLoading(false);
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
                        Update Password
                    </Heading>
                    <FormControl isInvalid={errors.password}>
                        <FormLabel mt={4} fontSize="14px" htmlFor="password">
                            Old Password
                        </FormLabel>
                        <Flex direction="row">
                            <Input
                                type="password"
                                bgColor="white"
                                name="oldPassword"
                                placeholder="Old Password"
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
                    <FormControl isInvalid={errors.password}>
                        <FormLabel mt={4} fontSize="14px" htmlFor="password">
                            New Password
                        </FormLabel>
                        <Flex direction="row">
                            <Input
                                type="password"
                                bgColor="white"
                                name="newPassword"
                                placeholder="New Password"
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
                    <FormControl isInvalid={errors.password}>
                        <FormLabel mt={4} fontSize="14px" htmlFor="password">
                            Repeat Password
                        </FormLabel>
                        <Flex direction="row">
                            <Input
                                type="password"
                                bgColor="white"
                                name="repeatPassword"
                                placeholder="Repeat Password"
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
                            Update
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

export default UpdatePassword;
