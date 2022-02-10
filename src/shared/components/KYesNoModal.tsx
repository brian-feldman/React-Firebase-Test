import { useState } from "react";
import styled from "styled-components";
import SButton from "./SButton";
import SModal from "./SModal";

interface IProps {
  open: boolean;
  onClose: () => void;
  onYes: any;
  title: string;
  content: string;
  yesParams?: any;
  yesText?: string;
  noText?: string;
}

export default function KYesNoModal({
  open,
  onClose,
  onYes,
  yesParams = null,
  title,
  content,
  yesText,
  noText,
}: IProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const handleOk = async () => {
    setLoading(true);
    try {
      const res = await (!!yesParams ? onYes(yesParams) : onYes());
      setLoading(false);
      console.log(res);
      onClose();
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <SModal open={open} onClose={onClose}>
      <KYesNoModalWrapper>
        <header>
          <div className="modal-title">{title}</div>
          <img onClick={onClose} src="/svg/close.svg" alt="" />
        </header>

        <div className="modal-content">{content}</div>

        <div className="actions">
          <SButton onClick={handleOk} loading={loading}>
            {yesText || "Yes"}
          </SButton>
          <SButton className="btn-no" onClick={onClose}>
            {noText || "No"}
          </SButton>
        </div>
      </KYesNoModalWrapper>
    </SModal>
  );
}

const KYesNoModalWrapper = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 6px;
  max-width: 95vw;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .modal-title {
      font-size: 16px;
      font-weight: 700;
    }

    img {
      cursor: pointer;
    }
  }

  .actions {
    margin-top: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 24px;

    .btn-no {
      background: var(--c-red);
    }
  }
`;
