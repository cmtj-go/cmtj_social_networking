import useRegisterModal from "@/hooks/useRegisterModal";

import axios from "axios";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../layout/Modal";
import useLoginModal from "@/hooks/useLoginModal";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

interface InputErrors {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  name?: string;
  username?: string;
}

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<InputErrors>({});

  const onToggle = useCallback(() => {
    if(isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, loginModal, registerModal]);

  const onSubmit = useCallback(async() => {
    try {
      const errors: InputErrors = {};
      if (!email) {
        errors.email = 'Email is required.';
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = 'Email is not in correct format.';
      }

      if (!name) {
        errors.name = 'Name is required.';
      }
      if (!username) {
        errors.username = 'Username is required.';
      }
      if (!password) {
        errors.password = 'Password is required.';
      }
      if (!passwordConfirmation) {
        errors.passwordConfirmation = 'Password confirmation is required.';
      }
      if (password !== passwordConfirmation) {
        errors.password = 'Passwords do not match.';
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      setIsLoading(true);
      await axios.post('/api/register', {
        email,
        password,
        passwordConfirmation,
        name,
        username
      })

      toast.success('Account created.')

      signIn('credentials', {
        email,
        password
      });

      registerModal.onClose();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        Object.assign(errors, error.response.data.error);
      } else {
        console.log(error);
        toast.error('Something went wrong!');
      }
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, name, username, passwordConfirmation, errors]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
      {errors.email && <p className="text-red-500">{errors.email}</p>}
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
      {errors.name && <p className="text-red-500">{errors.name}</p>}
      <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading} />
      {errors.username && <p className="text-red-500">{errors.username}</p>}
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
      {errors.password && <p className="text-red-500">{errors.password}</p>}
      <Input type="password" placeholder="Password confirmation" value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)} disabled={isLoading}
        />
      {errors.passwordConfirmation && <p className="text-red-500">{errors.passwordConfirmation}</p>}
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account? &nbsp;
        <span className="text-white cursor-pointer hover:underline" onClick={onToggle}>
          Sign in
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
