import { CircularProgress, makeStyles } from "@material-ui/core";
import styled from "styled-components";

const useStyles = makeStyles(() => ({
  button: {
    color: (props: any) => props.color,
  },
}));

export default function SButton(props: any) {
  const { loading, children, onClick, wrapperClass, ...rest } = props;
  const classes = useStyles({ color: "#fff" });

  const handleOnClick = () => {
    if (onClick && !loading) {
      onClick();
    }
  };

  return (
    <SButtonWrapper className={wrapperClass}>
      <button onClick={handleOnClick} {...rest}>
        {!loading && <div className="btn-text">{children}</div>}
        {loading && (
          <CircularProgress
            size={20}
            className={classes.button}
            variant="indeterminate"
          />
        )}
      </button>
    </SButtonWrapper>
  );
}

const SButtonWrapper = styled.div`
  button {
    border: 0;
    background: var(--c-blue);
    color: var(--white);
    box-shadow: 0px 4px 12px rgba(55, 81, 255, 0.24);
    border-radius: 8px;
    height: 48px;
    width: 100%;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
