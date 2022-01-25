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

export default function AddChannelDrawer({ open, onClose, channel }: any) {
  const { handleSubmit, register, errors, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(firebaseAuth);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async ({ name }: any) => {
    setLoading(true);
    try {
      await firebaseDB.collection("channels").add({
        name: name,
        owner: user?.uid,
        channel,
        createdAt: firebaseTimestamp(),
        updatedAt: firebaseTimestamp(),
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
      <AddChannelDrawerWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="title">Add New Channel</h1>
          <SInput
            label="CHANNEL NAME"
            error={errors?.name && errors?.name?.message}
            placeholder="xyz"
            name="name"
            inputRef={register({
              required: "Please enter channel name",
            })}
          />
          <div className="controls">
            <SButton loading={loading} type="submit">
              Add Channel
            </SButton>
          </div>
        </form>
      </AddChannelDrawerWrapper>
    </Drawer>
  );
}

const AddChannelDrawerWrapper = styled.div`
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
