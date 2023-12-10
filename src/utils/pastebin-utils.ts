import { postRequest, getRequest } from "./api-utils";

type ExpireDate = "N" | "10M" | "1H" | "1D" | "1W" | "2W" | "1M" | "6M" | "1Y";
type CreatePaste = {
  api_dev_key: string;
  api_paste_code: string;
  api_paste_private: 0 | 1 | 2;
  api_paste_name: string;
  api_paste_expire_date: ExpireDate;
  api_paste_format: "javascript" | "typescript";
  api_user_key: string;
};

const PastebinEndpoints = {
  CREATE_PASTE: (): string => "https://pastebin.com/api/api_post.php",
  GET_PASTE: (id: string): string => `https://pastebin.com/raw/${id}`,
};

export function createPaste(code: string) {
  const options: CreatePaste = {
    api_dev_key: "",
    api_paste_code: code,
    api_paste_private: 1, // unlisted
    api_paste_name: "code",
    api_paste_expire_date: "1D",
    api_paste_format: "typescript",
    api_user_key: "",
  };

  return postRequest<CreatePaste, CreatePaste>(
    PastebinEndpoints.CREATE_PASTE(),
    options
  );
}

export function getPaste(id: string): Promise<string> {
  return getRequest(PastebinEndpoints.GET_PASTE(id));
}
