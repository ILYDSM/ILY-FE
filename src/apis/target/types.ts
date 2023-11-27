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