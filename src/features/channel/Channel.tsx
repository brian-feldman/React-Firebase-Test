import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import SButton from "../../shared/components/SButton";
import { firebaseAuth, firebaseDB } from "../../shared/helpers/firebase.helper";
import AddPostDrawer from "./ui/AddPostDrawer";
import AddReplyDrawer from "./ui/AddReplyDrawer";

export default function Channel() {
  const { params } = useRouteMatch<{ id: string }>();
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showAddReply, setShowAddReply] = useState<null | string>(null);

  const [user] = useAuthState(firebaseAuth);
  const messagesRef = user && firebaseDB?.collection("posts");
  const query = messagesRef?.where("channel", "==", params.id);

  const [messages] = useCollectionData(query, {
    idField: "id",
  });

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
          <PostItem
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

const PostItem = (props: any) => {
  const [showReply, setShowReply] = useState<boolean>(false);

  const [user] = useAuthState(firebaseAuth);
  const messagesRef =
    user &&
    firebaseDB?.collection("posts").doc(props?.id).collection("replies");
  const query = messagesRef?.orderBy("createdAt", "desc");

  const [messages] = useCollectionData(query, {
    idField: "id",
  });

  return (
    <div className="post-item card">
      <div className="post-header">
        <aside>
          <img src={props?.owner_details?.display_image} alt="" />
        </aside>
        <aside>
          <div className="title">{props?.subject}</div>
          <div className="body">{props?.body}</div>

          <div onClick={() => setShowReply(true)} className="replies">
            <span>{props?.reply_count || 0}</span>
            <span> Replies</span>
          </div>
          <div
            onClick={props.onAddReply}
            className="replies"
            style={{ marginLeft: 10 }}
          >
            <span>+ Add Reply</span>
          </div>
        </aside>
      </div>

      {showReply && (
        <div className="replies-content">
          <div className="flex jcsb">
            <div className="title">All Replies</div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => setShowReply(false)}
              className="title"
            >
              <img
                style={{ width: 16, height: 16 }}
                src="/svg/close.svg"
                alt=""
              />
            </div>
          </div>
          {!messages?.length && (
            <div className="text red" style={{ marginTop: 10, fontSize: 12 }}>
              No any replies found
            </div>
          )}
          {messages?.map((el) => (
            <div key={el?.id} className="reply-item">
              <img src={el?.owner_details?.display_image} alt="" />
              <div className="message">{el?.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ChannelWrapper = styled.div`
  header {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;

    .action {
      width: 140px;
    }
  }

  .post-item {
    background: #ffffff;
    border: 1px solid #dfe0eb;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;

    .replies-content {
      .title {
        margin-top: 20px;
        font-size: 16px;
      }
      .reply-item {
        display: flex;
        align-items: center;
        border-bottom: 0.2px solid #dfe0eb;
        padding: 6px 10px;
        border-radius: 4px;
        margin-top: 10px;

        .message {
          font-size: 14px;
        }

        &:last-child {
          border-bottom: 0;
        }

        img {
          width: 24px;
          height: 24px;
          border-radius: 50%;
        }
      }
    }

    .post-header {
      display: flex;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      margin-right: 10px;
    }

    .title {
      font-size: 18px;
      font-weight: 700;
    }

    .body {
      margin-top: 4px;
      font-size: 14px;
    }

    .replies {
      display: inline-block;
      cursor: pointer;
      margin-top: 10px;
      font-size: 14px;
      border: 1px solid #dfe0eb;
      padding: 4px 10px;
      border-radius: 4px;
    }
  }
`;
