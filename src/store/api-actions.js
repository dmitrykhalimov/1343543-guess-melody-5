import {loadQuestions, requireAuthorization, redirectToRoute} from "./action";
import {AuthorizationStatus} from "../const";
import {AppRoute, APIRoute} from "../const";

export const fetchQuestionList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.QUESTIONS)
    .then(({data}) => dispatch(loadQuestions(data)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {
      throw new Error(`У HTMLAcademy упал сервер, а я полтора часа искал где я опечатался при копипасте`);
    })
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.RESULT)))
    .catch(() => {
      throw new Error(`У HTMLAcademy упал сервер, а я полтора часа искал где я опечатался при копипасте`);
    })
);
