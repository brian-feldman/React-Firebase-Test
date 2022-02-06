import { MentionsInput, Mention } from "react-mentions";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import SButton from "../../../shared/components/SButton";
import SInput from "../../../shared/components/SInput";
import SModal from "../../../shared/components/SModal";
import {
  firebaseAuth,
  firebaseDB,
  firebaseTimestamp,
} from "../../../shared/helpers/firebase.helper";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { extractWorkspaceFromEmail } from "../../../shared/helpers/user.helper";

export default function AddPostDrawer({
  open,
  onClose,
  channel,
  workspace,
}: any) {
  const { handleSubmit, register, errors, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(firebaseAuth);
  const [postBody, setPostBody] = useState<string>("");
  const [userMentioned, setUserMentioned] = useState<string[]>([]);

  const [messages] = useCollectionData(
    firebaseDB
      ?.collection("users")
      .where("workspace", "==", extractWorkspaceFromEmail(user?.email || "")),
    {
      idField: "id",
    }
  );

  const formattedUsers = (messages || []).map((el) => ({
    id: el?.id,
    display: el?.display_name,
  }));

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async ({ subject }: any) => {
    setLoading(true);
    console.log(user);
    const mentioned_users = userMentioned.filter((el) => postBody.includes(el));
    try {
      await firebaseDB.collection("posts").add({
        subject: subject,
        body: postBody,
        owner: user?.uid,
        owner_details: {
          display_name: user?.displayName,
          display_image: user?.photoURL,
          email: user?.email,
        },
        mentioned_users,
        reply_count: 0,
        channel,
        created_at: firebaseTimestamp(),
        updated_at: firebaseTimestamp(),
      });
      setLoading(false);
      handleClose();
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <SModal open={open} anchor="right" onClose={handleClose}>
      <AddPostDrawerWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="title">Add New Post</h1>
          <SInput
            label="SUBJECT"
            error={errors?.subject && errors?.subject?.message}
            placeholder="Subject Here"
            name="subject"
            inputRef={register({
              required: "Please enter subject",
            })}
          />

          <div className="inp-label">BODY</div>

          <MentionsInput
            className="mentions"
            // inputRef={myInput}
            spellCheck="false"
            placeholder="Describe about this post here"
            value={postBody}
            onChange={(event) => {
              setPostBody(event.target.value);
              console.log(event.target.value);
            }}
          >
            <Mention
              trigger="@"
              data={formattedUsers}
              markup="@@@____id__^^^____display__@@@^^^"
              style={{
                backgroundColor: "#daf4fa",
              }}
              onAdd={(id) => setUserMentioned((pV) => [...pV, String(id)])}
              appendSpaceOnAdd={true}
            />
          </MentionsInput>
          <div className="controls">
            <SButton loading={loading} type="submit">
              Add Post
            </SButton>
          </div>
        </form>
      </AddPostDrawerWrapper>
    </SModal>
  );
}

const AddPostDrawerWrapper = styled.div`
  width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 6px;

  .inp-label {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 4px;
    color: #9fa2b4;
  }

  .title {
    font-size: var(--f-base);
    margin-bottom: 36px;
  }

  .controls {
    margin-top: 24px;
  }

  .mentions {
    margin: 0;
  }

  .mentions--singleLine .mentions__control {
    display: inline-block;
  }
  .mentions--singleLine .mentions__higlighter {
    padding: 1px;
    border: 2px inset transparent;
  }
  .mentions--singleLine .mentions__input {
    padding: 5px;
    border: 2px inset;
  }

  .mentions--multiLine .mentions__control {
    background: #fcfdfe;
    border: 1px solid #f0f1f7;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 14px;
  }
  .mentions--multiLine .mentions__highlighter {
    padding: 9px;
  }
  .mentions--multiLine .mentions__input {
    padding: 9px;
    min-height: 63px;
    outline: 0;
    border: 0;
  }

  .mentions__suggestions__list {
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 10pt;
  }

  .mentions__suggestions__item {
    padding: 5px 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }

  .mentions__suggestions__item--focused {
    background-color: #cee4e5;
  }

  .mentions__mention {
    background-color: #cee4e5;
  }
`;
