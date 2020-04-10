import axios, { Method, AxiosRequestConfig } from 'axios';
import jwt from 'jsonwebtoken';
import { IUser } from './authorization';
import { useState, useRef } from 'react';

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
  localStorage[accessToken ? 'setItem' : 'removeItem']('wap_access', accessToken);
  localStorage[refreshToken ? 'setItem' : 'removeItem']('wap_refresh', refreshToken);
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

  public static fetcher(auth: boolean = true) {
    return async (url: string) => {
      const { data } = await Request.create('get')
        .authorize(auth)
        .exec(url);
        
      return data;
    }
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

  public hook(endpoint: string) {
    const isMounted = useRef(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    return {
      data,
      error,
      loading,
      reset: () => {
        setData(null);
        setError(null);
        setLoading(false);
      },
      exec: async (query?: Object) => {
        let response = null;

        setLoading(true);

        try {
          const { data } = await this.exec(endpoint, query);
          if (isMounted) { setData(data); }
          response = data;
        } catch (err) {
          if (isMounted) { setError(err); }
        }

        if (isMounted) { setLoading(false); }

        return response;
      },
    };
  }

  public async exec(endpoint: string, data?: Object) {
    const query: AxiosRequestConfig = {
      method: this.method,
      url: `${getURL()}${endpoint}`,
      params: this.params,
      data: this.body,
      headers: {},
    };

    if (data) {
      query[this.method.toLowerCase() === 'get' ? 'params' : 'body'] = data;
    }

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
