import axios, { AxiosInstance } from 'axios';

export interface SiYuanResponse<T = any> {
    code: number;
    msg: string;
    data: T;
}

class SiYuanClient {
    private static instance: SiYuanClient | null = null;
    private static baseURL: string = process.env.SIYUAN_API_URL || "http://localhost:6806";
    private static token: string = process.env.SIYUAN_TOKEN || "";
    private axiosInstance: AxiosInstance;

    private constructor() {
        if (!SiYuanClient.token) {
            console.warn('警告：未设置 SIYUAN_TOKEN 环境变量，API 调用可能会失败');
        }

        this.axiosInstance = axios.create({
            baseURL: SiYuanClient.baseURL,
            headers: {
                'Authorization': `Token ${SiYuanClient.token}`,
                'Content-Type': 'application/json'
            }
        });

        // 添加响应拦截器
        this.axiosInstance.interceptors.response.use(
            response => response.data,
            error => {
                // 增强错误处理
                if (error.response) {
                    console.error('API 响应错误:', {
                        status: error.response.status,
                        data: error.response.data
                    });
                } else if (error.request) {
                    console.error('API 请求错误:', error.message);
                } else {
                    console.error('其他错误:', error.message);
                }
                return Promise.reject(error);
            }
        );
    }

    public static getInstance(): SiYuanClient {
        if (!SiYuanClient.instance) {
            SiYuanClient.instance = new SiYuanClient();
        }
        return SiYuanClient.instance;
    }

    // 基础 HTTP 方法
    async post<T = any>(url: string, data?: any): Promise<SiYuanResponse<T>> {
        return this.axiosInstance.post(url, data);
    }
}

export const client = SiYuanClient.getInstance();