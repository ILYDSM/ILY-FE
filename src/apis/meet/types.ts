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
  meet_id: number;
  target_id: number;
  title: string;
  content: string;
  type: InterestEnglishType[];
  personnel: number;
  participant: number;
}

interface ViewCategorySearchGroup {
  type: InterestEnglishType;
  keyword: string;
}
