interface CreateGroupRequest {
  title: string;
  content: string;
  personnel: string;
  type: string[];
}

interface EditGroupRequest extends CreateGroupRequest {}

interface ViewAllResponse {
  title: string;
  content: string;
  participant: number;
}

interface ViewDetailResponse {
  title: string;
  content: string;
  division: InterestEnglishType[];
  personnel: string;
  user_count: string;
  target: {
    theme: string;
    content: string;
    cycle: string;
    achived: boolean;
  };
  subTarget: {
    content: string;
    achived: boolean;
    detailTarget: {
      content: string;
      achived: boolean;
    }[];
  }[];
}

interface ViewCategorySearchGroup {
  type: InterestEnglishType;
  keyword: string;
}
