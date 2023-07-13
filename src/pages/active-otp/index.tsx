/* eslint-disable */
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { notifyError } from "src/components/notification";
import { confirmAccount } from "src/services/actions/account.actions";
import { AppState, RouteParams } from "src/types";
import routerNames from "src/utils/data/routerName";
import { getMessageV1 } from "src/utils/helpers/functions/getMessage";
import { useIsMount } from "src/utils/helpers/functions/useIsMount";
const ActiveOTP = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(true);
  const paramsURL = useParams<RouteParams>();
  const dispatch = useDispatch();
  const isMount = useIsMount();
  const { stateConfirmAccount } = useSelector(
    (state: AppState) => state.accountReducer
  );
  /****************************START**************************/
  /*                         Life Cycle                      */

  useEffect(() => {
    if (paramsURL.id) {
      dispatch(
        confirmAccount({
          code: paramsURL.id,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (isMount) return;
    const { success, message, error, data } = stateConfirmAccount;
    setLoading(false);
    if (success && data.typeScreen) {
      // notifySuccess(message || '');
      history.push({
        pathname: routerNames.SIGN_IN,
        state: {
          typeScreen: data.typeScreen,
        },
      });
    } else if (success === false || error) {
      notifyError(getMessageV1(message));
    }
  }, [stateConfirmAccount.isLoading]);

  /**************************** END **************************/

  /****************************START**************************/
  /*                          Function                       */

  /**************************** END **************************/

  /****************************START**************************/
  /*                         Component                       */

  /**************************** END **************************/

  /****************************START**************************/
  /*                        Return Page                      */

  return <Spin spinning={loading}></Spin>;

  /**************************** END **************************/
};

export default ActiveOTP;
