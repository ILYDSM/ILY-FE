interface CreateReviewRequest {
  content: string;
}

interface EditReviewRequest extends CreateReviewRequest {}

interface GetReviewResponse {
  id: number;
  content: string;
  create_name: string;
  writer_name: string;
}
