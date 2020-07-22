import axios from '../../app/axios';

export const CommonServices = {
    commonHttpPostServer: async (api,object) =>{
        return axios({
          method: 'post',
          url: api,
          data:object,
          validateStatus: (status) => {
            return true; // I'm always returning true, you may want to do it depending on the status received
          },
        })
    },

    commonHttpGetServer: async (api)=> {
        return axios({
          method: 'get',
          url: api,
          validateStatus: (status) => {
            return true; // I'm always returning true, you may want to do it depending on the status received
          },
        })
  },
  commonHttpPutServer: async (api,object)=> {
    return axios({
      method: 'put',
      url: api,
      data:object,
      validateStatus: (status) => {
        return true; // I'm always returning true, you may want to do it depending on the status received
      },
    })
  },
  commonHttpPatchServer:async (api,object)=>{
    return axios({
      method: 'patch',
      url: api,
      data:object,
      validateStatus: (status) => {
        return true; // I'm always returning true, you may want to do it depending on the status received
      },
    })
  },
  commonHttpDeleteServer : async (api,object)=>{
    return axios({
      method: 'delete',
      url: api,
      data:object,
      validateStatus: (status) => {
        return true; // I'm always returning true, you may want to do it depending on the status received
      },
    })
  },
  handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
  }
}

