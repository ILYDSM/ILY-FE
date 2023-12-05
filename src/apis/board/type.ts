interface CreateBoardRequest {
  content: string;
}

interface EditBoardRequest extends CreateBoardRequest {}

interface viewDetailBoardResponse {
  content: string;
  createDate: string;
  writerName: string;
  id: number;
}