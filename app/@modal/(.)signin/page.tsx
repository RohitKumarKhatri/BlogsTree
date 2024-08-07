import { Modal } from '@/components/Modal';
import SignInForm from '@/components/auth/SignInForm';

export default function SignInModal() {
  console.log(process.env.GOOGLE_CLIENT_ID_1);
  return (
    <Modal>
      <SignInForm isModalOpen={true} />
    </Modal>
  );
}
