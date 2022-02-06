import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { firebaseAuth, firebaseDB } from "../helpers/firebase.helper";

const KPostItem = (props: any) => {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [markLoading, setMarkLoading] = useState<boolean>(false);

  const [user] = useAuthState(firebaseAuth);
  const messagesRef =
    user &&
    firebaseDB?.collection("posts").doc(props?.id).collection("replies");
  const query = messagesRef?.orderBy("created_at", "desc");

  const [messages] = useCollectionData(query, {
    idField: "id",
  });

  const mentioned = user ? props?.mentioned_users?.includes(user.uid) : false;

  const handleMarkAsDone = async () => {
    setMarkLoading(true);
    try {
      await firebaseDB
        .collection("users")
        .doc(user?.uid)
        .collection("unseen_posts")
        .doc(props?.id)
        .delete();
    } catch (err) {
      console.log(err);
    }
    setMarkLoading(false);
  };

  const renderBody = (body: string) => {
    let newContent = body;
    newContent = newContent
      .split("@@@__")
      .join('<span class="text-mention" data-id="');
    newContent = newContent.split("^^^__").join(`">@`);
    newContent = newContent.split("@@@^^^").join("</span>");
    return <div dangerouslySetInnerHTML={{ __html: newContent }}></div>;
  };

  return (
    <KPostItemWrapper className="card">
      <div className="post-header">
        {mentioned && <div className="mentioned">Response Requested</div>}
        <aside>
          <img src={props?.owner_details?.display_image} alt="" />
        </aside>
        <aside>
          <div className="title">{props?.subject}</div>
          <div className="body">{renderBody(props?.body)}</div>

          <div onClick={() => setShowReply((pV) => !pV)} className="replies">
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
          {props?.inbox && (
            <div
              onClick={handleMarkAsDone}
              className="replies"
              style={{ marginLeft: 10 }}
            >
              <span>{markLoading ? "Please Wait..." : "Mark as read"}</span>
            </div>
          )}
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
    </KPostItemWrapper>
  );
};

export default KPostItem;

const KPostItemWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #dfe0eb;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;

  .text-mention {
    padding: 4px 2px;
    color: var(--c-blue);
  }

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
    position: relative;

    .mentioned {
      position: absolute;
      right: 10px;
      top: 10px;
      background: var(--c-blue);
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 12px;
      color: #ffffff;
    }
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
`;
