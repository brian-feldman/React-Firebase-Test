import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  firebaseAuth,
  firebaseDB,
} from "../../../shared/helpers/firebase.helper";

export default function useHome() {
  const [user] = useAuthState(firebaseAuth);
  const workspace = user?.email?.split("@")[1] || "n/a";

  const [messages] = useCollectionData(
    firebaseDB?.collection("channels")?.where("workspace", "==", workspace),
    {
      idField: "id",
    }
  );

  console.log(messages);

  const [userData] = useDocumentData(
    firebaseDB?.collection("users").doc(user?.uid)
  );

  return {
    messages,
    userData,
    workspace,
  };
}
