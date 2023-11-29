interface CreateMandalArtRequest {
  target: string;
  cycle_count: number;
  cycle_term: number;
  cycle_date: string;
  sub_targets: string[];
  detail_targets: string[];
  theme: string;
  theme_price: number;
  meet_id?: number;
}

interface GetTargetResponse {
  id: number;
  meet_id: number | null;
  content: string;
  is_achieved: boolean;
  theme: string;
}

interface GetMandalArtRequest {
  targetId: number;
}

interface GetMandalArtResponse {
  id: number;
  content: string,
  cycle_count: number;
  cycle_term: number;
  cycle_date: string;
  is_achieved: boolean;
  theme: string;
  sub_target_response_list: {
    id: number;
    content: string;
    is_achieved: boolean;
  }[];
}

interface GetDetailMandalArtResponse {
  id: number;
  content: string;
  is_achieved: boolean;
  detail_target_responses: {
    id: number;
    content: string;
    is_achieved: boolean;
  }[];
}

interface completeMandalArtRequest {
  detailTargetId: number;
}