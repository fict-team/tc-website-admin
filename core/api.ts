import axios, { Method, AxiosRequestConfig } from 'axios';
import jwt from 'jsonwebtoken';
import { IUser } from './authorization';

export const getURL = () => process.env.API_URL;

export const decodeToken = (accessToken: string) => jwt.decode(accessToken, { json: true }) as IUser;

export const getLocalTokens = () => {
  let accessToken = localStorage.getItem('wap_access') ?? null;
  let refreshToken = localStorage.getItem('wap_refresh') ?? null;

  return { accessToken, refreshToken };
};

export const getAuthorization = async () => {
  let { accessToken, refreshToken } = getLocalTokens();

  if (!accessToken || !refreshToken) {
    return null;
  }

  let data = decodeToken(accessToken);

  const dateNow = Date.now() / 1000;
  if (data.exp <= dateNow) {
    console.log('Access token has expired.');

    const { access_token, refresh_token } = await updateToken(refreshToken);

    accessToken = access_token;
    refreshToken = refresh_token;
    data = decodeToken(accessToken);

    setAuthorization(accessToken, refreshToken);
  }

  //console.log(data);

  return {
    access: accessToken,
    refresh: refreshToken,
    data,
  };
};

export const setAuthorization = (accessToken, refreshToken) => {
  localStorage.setItem('wap_access', accessToken);
  localStorage.setItem('wap_refresh', refreshToken);
};

export const updateToken = async (refreshToken: string) => {
  const { data } = await Request.create('POST')
    .data({ refresh_token: refreshToken })
    .exec('/token/refresh');
  
  return data;
};

export interface IRequest {
  method: Method;
  auth?: boolean;
  params?: any;
  body?: any;
}

export class Request implements IRequest {
  public method: Method;
  public auth: boolean = false;
  public params: Object = {};
  public body: Object = {};

  constructor(data: IRequest) {
    Object.assign(this, data);
  }

  public static create(method: Method) {
    return new Request({ method });
  }

  public authorize(shouldAuth: boolean = true) {
    this.auth = shouldAuth;
    return this;
  }

  public data(data: Object) {
    this.body = data;
    return this;
  }

  public query(data: Object) {
    this.params = data;
    return this;
  }

  public async exec(endpoint: string) {
    const query: AxiosRequestConfig = {
      method: this.method,
      url: `${getURL()}${endpoint}`,
      params: this.params,
      data: this.body,
      headers: {},
    };

    if (this.auth) {
      try {
        const auth = await getAuthorization();
        if (auth) {
          query.headers.Authorization = `Bearer ${auth.access}`;
        }
      } catch (err) {
        console.error('Failed to get authorization', err);
      }
    }

    return await axios(query);
  }
};
