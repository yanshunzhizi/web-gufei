import { sendGet, sendPost } from "@/utils/request";
export default {
  operateTZ: (data: Record<string, unknown>) => {
    return sendPost(import.meta.env.VITE_API_BASE + "/tz", data);
  },
  /*  uploadImg: (data: Record<string, unknown>) => {
    return undefined;
  }, */
  getCompanyBasicInfo: (data: Record<string, unknown>) => {
    return sendGet(import.meta.env.VITE_API_BASE + "/ent/meta", data);
  },
  searchEtagTZ: (data: Record<string, unknown>) => {
    return sendGet(import.meta.env.VITE_API_BASE + "/ent/meta", data);
  },
  listEtag: (data: Record<string, unknown>) => {
    return sendGet(import.meta.env.VITE_API_BASE + "/etaglist", data);
  },
  getHomeData: (data: Record<string, unknown>) => {
    return sendGet(import.meta.env.VITE_API_BASE + "/home", data);
  },
  getEtagDetail: (data: Record<string, unknown>) => {
    return sendGet(import.meta.env.VITE_API_BASE + "/etag/detail", data);
  },
  getPrinterInfo: (deviceId: string) => {
    return sendGet(
      import.meta.env.VITE_API_BASE + "/printer?deviceId=" + deviceId
    );
  },
  printLabel: (data: { deviceId: string; template: string; eTag: string }) => {
    return sendPost(import.meta.env.VITE_API_BASE + "/print", data);
  },
  getWastes: (type: string) => {
    return sendGet(
      import.meta.env.VITE_API_BASE +
        `/tz/ent?uscc=9131000060738272X3&category=0&type=${type}&begin=2022082000&end=2022092700`
    );
  },
  getEtagInfo: (eTag: string) => {
    return sendGet(import.meta.env.VITE_API_BASE + `/etag/tz?etag=${eTag}`);
  },
};
