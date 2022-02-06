import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import KPostItem from "../../shared/components/KPostItem";
import SButton from "../../shared/components/SButton";
import { firebaseDB } from "../../shared/helpers/firebase.helper";
import AddPostDrawer from "./ui/AddPostDrawer";
import AddReplyDrawer from "./ui/AddReplyDrawer";

export default function Channel() {
  const { params } = useRouteMatch<{ id: string }>();
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showAddReply, setShowAddReply] = useState<null | string>(null);

  const [messages] = useCollectionData(
    firebaseDB?.collection("posts").where("channel", "==", params.id),
    {
      idField: "id",
    }
  );

  return (
    <ChannelWrapper>
      <header>
        <h1>Posts</h1>
        <div className="action">
          <SButton onClick={() => setShowAdd(true)}>Add Post</SButton>
        </div>
      </header>

      <section className="contents">
        {!messages?.length && (
          <div className="text error red">
            No any posts found on this channel
          </div>
        )}
        {messages?.map((el) => (
          <KPostItem
            onAddReply={() => setShowAddReply(el?.id)}
            key={el?.id}
            {...el}
          />
        ))}
      </section>

      <AddReplyDrawer
        open={!!showAddReply}
        onClose={() => setShowAddReply(null)}
        post={showAddReply}
      />

      <AddPostDrawer
        open={showAdd}
        onClose={() => setShowAdd(false)}
        channel={params.id}
      />
    </ChannelWrapper>
  );
}

const ChannelWrapper = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;

    .action {
      width: 140px;
    }
  }
`;
