
let loadingAccessToken: boolean = false;

const EndPoint = import.meta.env.VITE_ENDPOINT;
const ClientSecret = import.meta.env.VITE_CLIENT_SECRET;
const ClientId = import.meta.env.VITE_CLIENT_ID;
const GrantType = import.meta.env.VITE_GRANT_TYPE;

export async function GetClientAccessToken(){
   
    loadingAccessToken = true;

    const appEndpoint = EndPoint + "/oauth/token";

    const formdata: FormData = new FormData();
    formdata.append("client_id", ClientId);
    formdata.append("client_secret", ClientSecret);
    formdata.append("grant_type", GrantType);
   
    const response = await fetch(appEndpoint, {
        method: 'POST',
        body: formdata,
    });

    let data;
  
    if(response.status === 200){
        data = await response.json();
        localStorage.setItem("access_token", data['access_token']);
        location.reload();
    }
    else if (response.status === 401) {
         const CheckData = await response.json();
         if(CheckData.error == 'invalid_grant'){
            data = {error : 401, error_description : 'Email adresiniz veya parolanız yanlış olabilir.'};
        }
        else{
            data = {error : 401, error_description : 'Yetkiniz bulunmamaktadır.'};
        }
    }
    else if (response.status === 403) {
        data = {error : 403, error_description : "Yetkiniz olmayan talepte bulundunuz."};
    }
    else if (response.status === 404) {
        data = {error : 404, error_description : "Sayfa bulunamadı."};
    }
    else if(response.status === 500){
        data = {error : 500, error_description : "Beklenmedik hata oluştu."};
    }
    else{
        data = {error : response, error_description: response.statusText};
    }

    return data;
}


export async function ReloadAccessToken() {
    if (loadingAccessToken == true) {
        return false;
    }

    const refresh_token: string = localStorage.getItem("refresh_token") || '';

    loadingAccessToken = true;

    const appEndpoint = EndPoint + '/oauth/token';

    const formdata: FormData = new FormData();
    formdata.append("client_id", ClientId);
    formdata.append("client_secret", ClientSecret);
    formdata.append("grant_type", "refresh_token");
    formdata.append("refresh_token", refresh_token);

    let options: any = {
        method: 'POST',
        body: formdata
    };

    const response =await fetch(appEndpoint, options)

    if (response.status != 200) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('authUser');

        location.href = "/";
        return false;
    }

    const data = await response.json();

    if (!data) {
        return false;
    }

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    loadingAccessToken = false;

    return data;
} 

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function Request(method: string, url: string, parameters = ''): Promise <object | boolean> {

    const access_token = localStorage.getItem('access_token');
    
    if (loadingAccessToken == true) {
        await sleep(200);

        return await Request(method, url, parameters);
    }

    const appEndpoint = EndPoint + url;
    
    let options: any = {
        method: method,
        headers: {
            "Authorization": "Bearer " +  access_token
        }
    }

    if (method == 'POST' || method == 'PUT' || method == "PATCH") {
        options["body"] = parameters ? parameters : null;
    }
   
    const response = await fetch(appEndpoint, options)

    if ((response.status == 401 || response.status == 403)) {
        if (localStorage.getItem("refresh_token")) {
            await ReloadAccessToken();
        } else {
            await GetClientAccessToken();
        }
       
        return await Request(method, url, parameters);
    }

    const data = await response.json();

    return data;
}
