import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import KPostItem from "../../shared/components/KPostItem";
import { firebaseAuth, firebaseDB } from "../../shared/helpers/firebase.helper";
import AddReplyDrawer from "../channel/ui/AddReplyDrawer";

export default function InboxView() {
  const [showAddReply, setShowAddReply] = useState<null | string>(null);
  const [user] = useAuthState(firebaseAuth);
  const [messages] = useCollectionData(
    firebaseDB
      ?.collection(`users/${user?.uid}/unseen_posts`)
      .orderBy("created_at", "asc"),
    {
      idField: "id",
    }
  );

  const priorityMsg = messages?.filter((el) => {
    return el?.mentioned_users?.includes(user?.uid);
  });
  const restMsg = messages?.filter((el) => {
    return !el?.mentioned_users?.includes(user?.uid);
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
        {priorityMsg?.map((el) => (
          <KPostItem
            onAddReply={() => setShowAddReply(el?.id)}
            key={el?.id}
            inbox
            {...el}
          />
        ))}
        {restMsg?.map((el) => (
          <KPostItem
            onAddReply={() => setShowAddReply(el?.id)}
            key={el?.id}
            inbox
            {...el}
          />
        ))}
      </section>

      <AddReplyDrawer
        open={!!showAddReply}
        onClose={() => setShowAddReply(null)}
        post={showAddReply}
      />
    </ChannelWrapper>
  );
}

const ChannelWrapper = styled.div`
  header {
    margin: 20px 0;
  }
`;
