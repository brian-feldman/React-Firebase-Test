import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import KYesNoModal from "../../shared/components/KYesNoModal";
import { firebaseAuth, firebaseDB } from "../../shared/helpers/firebase.helper";
import useConfig from "../../shared/hooks/useConfig";

export default function SettingView() {
  const [user] = useAuthState(firebaseAuth);
  const [userData] = useDocument(firebaseDB.doc(`users/${user?.uid}`));
  const {
    open_change_post_notification_toggle_dialogue,
    handleChangePostNotificationPrefDialogue,
  } = useConfig();

  const changeNotifyPref = async () => {
    return firebaseDB.doc(`users/${user?.uid}`).update({
      notify_for_posts: !userData?.data()?.notify_for_posts,
    });
  };

  return (
    <SettingViewWrapper>
      <header>
        <h1>Preferences</h1>
      </header>

      <div className="card">
        <div className="info-item">
          <aside>
            <div className="lable-title">Notify for posts</div>
            <div className="lable-body">
              {!!userData?.data()?.notify_for_posts ? "YES" : "NO"}
            </div>
          </aside>
          <aside>
            <div
              onClick={() => handleChangePostNotificationPrefDialogue(true)}
              className="lable-action"
            >
              Change
            </div>
          </aside>
        </div>
      </div>

      <KYesNoModal
        open={open_change_post_notification_toggle_dialogue}
        onClose={() => handleChangePostNotificationPrefDialogue(false)}
        title="Are you sure?"
        content="You want to toggle notify preferences for posts"
        onYes={changeNotifyPref}
      />
    </SettingViewWrapper>
  );
}

const SettingViewWrapper = styled.div`
  .card {
    border: 0.2px solid #ddd;
    background: #fff;
    padding: 24px;
    border-radius: 6px;
  }

  .mt {
    margin-top: 16px;
  }

  .info-item {
    display: flex;
    justify-content: space-between;
    max-width: 500px;

    .lable-title {
      font-size: 14px;
    }

    .lable-body {
      font-size: 12px;
      margin-top: 6px;
      color: var(--c-grey);
    }

    .lable-action {
      font-size: 13px;
      font-weight: 600;
      text-decoration: underline;
      margin-top: 6px;
      color: var(--c-blue);
      cursor: pointer;
    }
  }

  header {
    margin: 20px 0;
    h1 {
      font-size: 20px;
    }
  }
`;
