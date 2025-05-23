'use client';
import Modal from './Modal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useSignupModal from '@/app/hooks/useSignupModal';
import CustomButton from '../forms/CustomButton';
import apiService from '../../services/apiService';
import { handleLogin } from '@/app/lib/actions';

const SignupModal = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const signupModal = useSignupModal();
  const submitSignup = async () => {
    const formData = {
      email: email,
      password1: password1,
      password2: password2,
    };
    const response = await apiService.postWithoutToken(
      'api/auth/register/',
      JSON.stringify(formData)
    );
    if (response.access) {
      handleLogin(response.user.pk, response.access, response.refresh);
      signupModal.close();
      router.push('/');
    } else {
      const tmpErrors: string[] = Object.values(response).map((error: any) => {
        return error;
      });
      setErrors(tmpErrors);
    }
  };
  const content = (
    <>
      <form className="space-y-4" action={submitSignup}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
        />
        <input
          onChange={(e) => setPassword1(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-3 border border-gray-300 rounded-xl"
        />
        <input
          onChange={(e) => setPassword2(e.target.value)}
          type="password"
          placeholder="Repeat Your Password"
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
        <CustomButton label="Sign Up" onClick={submitSignup} />
      </form>
    </>
  );
  return (
    <Modal
      isOpen={signupModal.isOpen}
      close={signupModal.close}
      label="Sign Up"
      content={content}
    />
  );
};

export default SignupModal;
