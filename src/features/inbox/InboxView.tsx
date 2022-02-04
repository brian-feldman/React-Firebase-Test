import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import KPostItem from "../../shared/components/KPostItem";
import { firebaseAuth, firebaseDB } from "../../shared/helpers/firebase.helper";

export default function InboxView() {
  const [user] = useAuthState(firebaseAuth);
  const messagesRef =
    user && firebaseDB?.collection(`users/${user.uid}/unseen_posts`);
  const [messages] = useCollectionData(messagesRef, {
    idField: "id",
  });

  return (
    <ChannelWrapper>
      <header>
        <h1>Inbox</h1>
      </header>

      <section className="contents">
        {!messages?.length && (
          <div className="text error red">Your inbox is empty</div>
        )}
        {messages?.map((el) => (
          <KPostItem onAddReply={() => {}} key={el?.id} inbox {...el} />
        ))}
      </section>
    </ChannelWrapper>
  );
}

const ChannelWrapper = styled.div`
  header {
    margin: 20px 0;
  }
`;
