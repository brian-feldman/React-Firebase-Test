import styled from "styled-components";
import { firebaseAuth } from "../../shared/helpers/firebase.helper";
import firebase from "firebase/app";
import SButton from "../../shared/components/SButton";

export default function Login() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebaseAuth.signInWithPopup(provider);
  };

  return (
    <LoginWrapper>
      <SButton className="btn" onClick={signInWithGoogle}>
        Login With Google
      </SButton>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  .btn {
    width: 300px;
    max-width: calc(100vw - 20px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
