interface ResponseApi {
  result: 'success' | 'error';
  message?: string;
  data?: object;
  status?: number;
}

export const responseApi = ({
  result = 'success',
  message,
  data,
  status = 200,
}: ResponseApi): { status: number; body: Omit<ResponseApi, 'status'> } => {
  return {
    status,
    body: {
      result,
      message,
      data,
    },
  };
};
