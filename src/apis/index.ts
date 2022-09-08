import { sendGet, sendPost } from "@/utils/request";
export default {
  operateTZ: (data: Record<string, unknown>) => {
    return sendPost("http://indoor.lannovo.com:9007/tz", data);
  },
  /*  uploadImg: (data: Record<string, unknown>) => {
    return undefined;
  }, */
  getCompanyBasicInfo: (data: Record<string, unknown>) => {
    return sendGet("http://indoor.lannovo.com:9007/ent/meta", data);
  },
  printLabel: (data: Record<string, unknown>) => {
    return sendGet("http://indoor.lannovo.com:9007/print", data);
  },
  searchEtagTZ: (data: Record<string, unknown>) => {
    return sendGet("http://indoor.lannovo.com:9007/ent/meta", data);
  },
  listEtag: (data: Record<string, unknown>) => {
    return sendGet("http://indoor.lannovo.com:9007/etaglist", data);
  },
  getHomeData: (data: Record<string, unknown>) => {
    return sendGet("http://indoor.lannovo.com:9007/home", data);
  },
  getEtagDetail: (data: Record<string, unknown>) => {
    return sendGet("http://indoor.lannovo.com:9007/etag/detail", data);
  },
};
