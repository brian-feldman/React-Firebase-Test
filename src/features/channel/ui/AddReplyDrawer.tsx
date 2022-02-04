import { Drawer } from "@material-ui/core";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import SButton from "../../../shared/components/SButton";
import SInput from "../../../shared/components/SInput";
import {
  firebaseAuth,
  firebaseDB,
  firebaseTimestamp,
} from "../../../shared/helpers/firebase.helper";

export default function AddReplyDrawer({ open, onClose, post }: any) {
  const { handleSubmit, register, errors, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(firebaseAuth);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async ({ message }: any) => {
    setLoading(true);
    console.log(user);
    try {
      await firebaseDB
        .collection("posts")
        .doc(post)
        .collection("replies")
        .doc()
        .set({
          message: message,
          owner: user?.uid,
          owner_details: {
            display_name: user?.displayName,
            display_image: user?.photoURL,
            email: user?.email,
          },
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
    <Drawer open={open} anchor="right" onClose={handleClose}>
      <AddPostDrawerWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="title">Add Reply</h1>
          <SInput
            label="MESSAGE"
            error={errors?.message && errors?.body?.message}
            placeholder="xyz"
            name="message"
            inputRef={register({
              required: "Please enter message",
            })}
          />
          <div className="controls">
            <SButton loading={loading} type="submit">
              Add Reply
            </SButton>
          </div>
        </form>
      </AddPostDrawerWrapper>
    </Drawer>
  );
}

const AddPostDrawerWrapper = styled.div`
  width: 400px;
  padding: 20px;

  .title {
    font-size: var(--f-base);
    margin-bottom: 36px;
  }

  .controls {
    margin-top: 24px;
  }
`;
