import styled from "styled-components";

export default function SInput(props: any) {
  const { error, label, inputRef, type, labelRight, ...rest } = props;
  return (
    <SInputWrapper>
      <section className="label-group">
        <div className="label">{label}</div>
        {labelRight && labelRight}
      </section>
      <section className={`input-wrapper ${!!error ? "error" : ""}`}>
        {type === "textarea" ? (
          <textarea ref={inputRef} {...rest}></textarea>
        ) : (
          <input ref={inputRef} {...rest} type={type ?? "test"} />
        )}
      </section>
      {error && <div className="error">{error}</div>}
    </SInputWrapper>
  );
}

const SInputWrapper = styled.div`
  margin-top: 10px;
  input {
    width: 100%;
  }

  .error {
    font-weight: 400;
    color: var(--c-red);
    font-size: 10px;
    margin-top: 6px;
    animation: fadeIn 0.3s ease-in-out;
  }

  .label-group {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 700;
    align-items: center;
    margin-bottom: 4px;

    .label {
      color: #9fa2b4;
    }

    .error {
      font-weight: 400;
      color: var(--c-red);
      animation: fadeIn 0.3s ease-in-out;
    }
  }

  .input-wrapper {
    &.error {
      input {
        border-color: var(--c-red);
      }
    }
    input {
      background: #fcfdfe;
      border: 1px solid #f0f1f7;
      box-sizing: border-box;
      border-radius: 6px;
      padding: 10px 15px;
      font-size: 14px;
      min-height: 42px;
    }
    textarea {
      width: 100%;
      background: #fcfdfe;
      border: 1px solid #f0f1f7;
      box-sizing: border-box;
      border-radius: 6px;
      padding: 10px 15px;
      font-size: 14px;
      min-height: 72px;
    }
  }
`;
