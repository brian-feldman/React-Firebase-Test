import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SButton from "../../../shared/components/SButton";
import {
  firebaseAuth,
  firebaseDB,
} from "../../../shared/helpers/firebase.helper";
import AddChannelDrawer from "./AddChannelDrawer";

export default function HomeSidebar() {
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const [user] = useAuthState(firebaseAuth);
  const channel = user?.email?.split("@")[1] || "n/a";

  const messagesRef = user && firebaseDB?.collection("channels");
  const query = messagesRef?.where("channel", "==", channel);

  const [messages] = useCollectionData(query, {
    idField: "id",
  });

  return (
    <SidebarWrapper>
      <div className="logo">
        <h1>@{channel}</h1>
      </div>

      <NavLink className="nav-item" activeClassName="active" exact to="/">
        <img src="/svg/overview.svg" className="s-ico" alt="" />
        <div className="title heading">Channels</div>
      </NavLink>

      {messages?.map((el: any) => (
        <NavLink
          key={el.id}
          className="nav-item"
          activeClassName="active"
          exact
          to={"/channel/" + el?.id}
        >
          <img src="/svg/overview.svg" className="s-ico" alt="" />
          <div className="title">#{el?.name}</div>
        </NavLink>
      ))}

      <AddChannelDrawer
        open={showAdd}
        onClose={() => setShowAdd(false)}
        channel={channel}
      />

      <div className="btn-wrapper">
        <SButton onClick={() => setShowAdd(true)}>Add Channel</SButton>
      </div>

      <div className="btn-wrapper">
        <SButton onClick={() => firebaseAuth.signOut()}>Log Out</SButton>
      </div>
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  overflow-y: auto;
  background: var(--white);

  .logo {
    text-align: center;
    padding: 20px 0;
    h1 {
      font-size: 24px;
    }
    img {
      width: 80%;
    }
  }

  .btn-wrapper {
    padding: 20px;
  }

  .nav-item {
    display: flex;
    padding: 20px 14px;
    align-items: center;
    border-left: 6px solid transparent;
    transition: var(--tsn);
    cursor: pointer;

    &:hover {
      background: rgba(159, 162, 180, 0.1);
    }

    &.active {
      border-left-color: #dde2ff;
      background: rgba(159, 162, 180, 0.1);
    }

    img {
      margin-right: 16px;
    }
    .title {
      font-size: var(--f-sm);
      color: var(--black);
      font-weight: 500;

      &.heading {
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
`;
