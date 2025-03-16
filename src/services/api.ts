// src/services/api.ts

import axios from "axios";

// GET request
export const fetchData = async () => {
    try {
        const response = await axios.get("api/get-token");
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// POST request with Anti-Forgery Token
// export const postData = async (data: any) => {
//     try {
//         const response = await axios.post("/api/sample/post-data", data, {
//             headers: {
//                 'X-XSRF-TOKEN': axios.defaults.headers.post['X-XSRF-TOKEN']
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error posting data:", error);
//     }
// };