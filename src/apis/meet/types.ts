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
  meet_id: number;
}

interface ViewDetailResponse {
  meet_id: number;
  target_id: number;
  title: string;
  meet_content: string;
  type: InterestEnglishType[];
  personnel: string;
  participant: string;
  target_content: string;
  cycle_count: null | number;
  cycle_term: null | number;
  cycle_date: null | string;
  is_achieved: boolean;
  theme: string;
  sub_target_response_list: {
    id: number;
    content: string;
    is_achieved: boolean;
  }[];
}

interface ViewCategorySearchGroup {
  type: InterestEnglishType;
  keyword: string;
}
