import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import configSlice from "../../redux/slice/config.slice";

export default function useConfig() {
  const config = useSelector((state: RootState) => state.config);
  const dispatch = useDispatch();

  const handleAddChannelModal = (val: boolean) =>
    dispatch(
      configSlice.actions.setState({
        open_add_channel_model: val,
      })
    );

  return {
    ...config,
    handleAddChannelModal,
  };
}
