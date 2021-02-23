import { Injectable, Inject } from '@angular/core';
import { CacheService } from '@delon/cache';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import axios from 'axios';
import qs from 'qs';
import sha1 from 'js-sha1';

function integration(params, config_val) {
  var paramStr = '';
  Object.keys(params)
    .sort()
    .forEach(function (key) {
      var value = params[key];
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        key === 'clientId' ||
        key === 'sign'
      ) { } else {
        paramStr += key + value;
      }
      if (value === undefined || value === null || value === '') {
        delete params[key];
      }
    });
  paramStr = config_val.clientId + paramStr + config_val.clientSecret;
  return paramStr;
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    public srv: CacheService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) { }

  /**
 * 
 * @param options 刷新token
 */
  // http://[domainname]/oauth2/oauth/token?client_id=xx&client_secret=xx&grant_type=refresh_token&refresh_token=xx
  refreshToken(url, params, type, config_val, refresh) {
    var authorization: any = this.srv.getNone("authorization")
    axios({
      url: '/oauth2/oauth/token?client_id=' + config_val.clientId + '&client_secret=' + config_val.clientSecret + '&grant_type=refresh_token&refresh_token=' + authorization.data.refresh_token,
      method: 'get',
      data: {},
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      withCredentials: true,
    }).then((res) => {
      this.srv.set("token", res.data.access_token);
      this.request(url, params, type, config_val, refresh)
    }).catch(() => { })
  }

  request(url, params, type, config_val, refresh) {
    return new Promise((resolve, reject) => {
      axios({
        url: url,
        method: type, // 默认是 get
        data: type == 'post' || type == 'POST' ? params : null,
        params: params,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        paramsSerializer: function (params) {
          var carryParameters: any = {}
          if (type == 'get' || type == 'GET') {
            var time = new Date().getTime();
            params.timestamp = time;
            carryParameters = params;
            if (url != "/api/oauth2/logout.do") {
              carryParameters.sign = sha1(integration(params, config_val)).toUpperCase();
              carryParameters.clientId = config_val.clientId;
              if (config_val.accessToken) {
                carryParameters.accessToken = config_val.accessToken
              }
            }
          } else {
            var time = new Date().getTime();
            var param = {
              data: JSON.stringify(params),
              timestamp: time
            };
            if (url != "/api/oauth2/oauth/token") {
              carryParameters = {
                timestamp: time,
                sign: sha1(integration(param, config_val)).toUpperCase(),
                clientId: config_val.clientId,
              }
              if (config_val.accessToken) {
                carryParameters.accessToken = config_val.accessToken
              }
            } else {
              carryParameters = params;
            }
          }
          return qs.stringify(carryParameters, { indices: false });
        },
        validateStatus: function (status) {
          return status >= 200 && status < 300 || status == 400; // 默认的
        },
        transformResponse: [function (data) {
          // 对 data 进行任意转换处理
          if (JSON.parse(data).statusCode == 500 && JSON.parse(data).message == "Invalid access token" && !refresh) {
            this.refreshToken(url, params, type, config_val, true)
          }
          return JSON.parse(data);
        }],
        withCredentials: true,
      }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })

    });
  }


}