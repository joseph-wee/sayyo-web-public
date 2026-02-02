import axios from "axios";

// real
axios.defaults.baseURL = "https://api.sayyo.mobileto.io/sayyo/v1/";

// dev
// axios.defaults.baseURL = "https://dev.sayyo.mobileto.io/sayyo/v1/";

/** 포스트 상세화면 */
export const apiGetDetailJob = async (id: number) => {
  try {
    const res = await axios({
      method: "GET",
      url: `get-info-details-job?jobId=${id}`,
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

/** 유저 정보 */
export const apiGetUserInfo = async (id: number) => {
  try {
    const res = await axios({
      method: "GET",
      url: `get-info-user?userId=${id}`,
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

/** api toc */
export const apiPostTermsOfCondition = async () => {
  try {
    const res = await axios({
      method: "POST",
      url: `admin/get-terms-of-condition`,
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

/** api pp */
export const apiPostPrivacyPolicy = async () => {
  try {
    const res = await axios({
      method: "POST",
      url: `admin/get-terms-of-condition`,
    });
    return res;
  } catch (error: any) {
    console.log(error);
    return error;
  }
};
