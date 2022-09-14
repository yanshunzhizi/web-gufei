const objToUrlParam = (data: Record<string, unknown>) => {
  let url = "";
  for (const key in data) {
    if (data[key] === 0 || data[key]) {
      if (Array.isArray(data[key])) {
        url += "&" + key + "=" + (data[key] as string[] | number[]).join(",");
      } else {
        url += "&" + key + "=" + data[key];
      }
    }
  }
  if (url.length > 0) {
    url = url.substring(1);
  }
  return url;
};

export interface Result {
  success: boolean;
  data: Record<string, unknown> | undefined;
  status: number;
}

const responseHandler = async (response: Response) => {
  const result: Result = {
    success: false,
    data: undefined,
    status: response.status,
  };
  if (response.status === 200) {
    const text = await response.text();
    if (text) {
      try {
        const data = JSON.parse(text);
        if (data && data.status === 200) {
          result.success = true;
          result.data = data.data;
        }
      } catch (e) {
        console.log("解析返回的数据异常！");
      }
    }
  }
  return result;
};

export const sendGet = async (url: string, data?: Record<string, unknown>) => {
  if (data) {
    const paramUrl = objToUrlParam(data);
    if (paramUrl) {
      url += "?" + paramUrl;
    }
  }
  const response = await window.fetch(url);
  return await responseHandler(response);
};

export const sendPost = async (url: string, data?: Record<string, unknown>) => {
  const response = await window.fetch(url, {
    method: "POST",
    body: data ? JSON.stringify(data) : null,
  });
  return await responseHandler(response);
};

export const sendDelete = async (
  url: string,
  data?: Record<string, unknown>
) => {
  const response = await window.fetch(url, {
    method: "DELETE",
    body: JSON.stringify(data),
  });
  return await responseHandler(response);
};

export const sendPut = async (url: string, data?: Record<string, unknown>) => {
  // const index = layer.load();
  const response = await window.fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await responseHandler(response);
};
