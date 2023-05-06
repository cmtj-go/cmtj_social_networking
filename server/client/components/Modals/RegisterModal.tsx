import useRegisterModal from "@/hooks/useRegisterModal";

import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../layout/Modal";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if(isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [isLoading, loginModal, registerModal]);

  const onSubmit = useCallback(async() => {
    try {
      setIsLoading(true);
      // Todo register & login

      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
      <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={isLoading} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
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
