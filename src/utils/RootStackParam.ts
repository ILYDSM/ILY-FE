export type RootStackParam = {
  홈: undefined;
  목표: undefined;
  모임: undefined;
  메뉴: undefined;
  Login: undefined;
  SignUp: undefined;
  Rending: undefined;
  Main: undefined;
  Auth: undefined;
  KakaoLogin: undefined;
  NaverLogin: undefined;
  GoogleLogin: undefined;
  ChangePwd: undefined;
  Group: { screen: 'CreateGroup' | 'GroupCategory' | 'SearchResult'; params?: { keyword: string } };
  CreateGroup: undefined;
  GroupCategory: undefined;
  SearchResult: undefined;
  SelectInterest: undefined;
  ConfirmSignUp: undefined;
  VerifyEmail: undefined;
  NewPassword: undefined;
  ConfirmChangePwd: undefined;
  Menu: { screen: 'MandalArtTheme' | 'GoalCalendar' | 'MenuChangePwd' | 'DeleteAccount' | 'InterestChange' };
  GoalDetail: undefined;
  GoalGroupBoard: undefined;
  GoalJoinRequst: undefined;
  Goal: {
    screen:
      | 'GoalDetail'
      | 'GoalGroupBoard'
      | 'GoalJoinRequest'
      | 'GoalCreateMain'
      | 'GoalCreateSub'
      | 'GoalCreateDetail'
      | 'GoalCreateResult'
      | 'GoalCreateTheme';
      params?: { id: number, meet_id: number | null }
  };
};
