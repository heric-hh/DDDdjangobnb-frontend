'use client';
import Modal from './Modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useLoginModal from '@/app/hooks/useLoginModal';
import CustomButton from '../forms/CustomButton';
import apiService from '@/app/services/apiService';
import { handleLogin } from '@/app/lib/actions';

const LoginModal = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const loginModal = useLoginModal();

  const submitLogin = async () => {
    const formData = {
      email: email,
      password: password,
    };
    const response = await apiService.post(
      'api/auth/login/',
      JSON.stringify(formData)
    );
    if (response.access) {
      handleLogin(response.user.pkm, response.access, response.refresh);
      loginModal.close();
      router.push('/');
    } else {
      setErrors(response.non_field_errors);
    }
  };
  const content = (
    <>
      <form className="space-y-4" action={submitLogin}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
        />
        {errors.map((error, index) => {
          return (
            <div
              key={`error_${index}`}
              className="p-5 bg-airbnb text-white rounded-xl opacity-85"
            >
              {error}
            </div>
          );
        })}

        <CustomButton label="Login" onClick={submitLogin} />
      </form>
    </>
  );
  return (
    <Modal
      isOpen={loginModal.isOpen}
      close={loginModal.close}
      label="Login"
      content={content}
    />
  );
};

export default LoginModal;
