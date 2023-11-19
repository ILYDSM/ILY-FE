export const emailRule = {
  required: { value: true, message: '이메일은 필수입니다' },
  pattern: {
    value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    message: '이메일 형식이 아닙니다.',
  },
};
export const passwordRule = {
  required: true,
  minLength: 8,
  maxLength: 20,
  pattern: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
};
export const nicknameRule = {
  required: true,
  maxLength: 10,
};
