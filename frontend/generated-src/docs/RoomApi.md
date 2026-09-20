# RoomApi

All URIs are relative to *http://localhost:3030*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getRoom**](#getroom) | **GET** /rooms/{room_id} | |
|[**postRoom**](#postroom) | **POST** /rooms | ルーム作成|

# **getRoom**
> GetRoom200Response getRoom()

ルームIDから、ルームの情報を取得します。  - ルーム名 を返します。  ルームが存在しない場合は404を返します。 

### Example

```typescript
import {
    RoomApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RoomApi(configuration);

let roomId: string; //パスパラメータ内のroom_id (default to undefined)

const { status, data } = await apiInstance.getRoom(
    roomId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **roomId** | [**string**] | パスパラメータ内のroom_id | defaults to undefined|


### Return type

**GetRoom200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | ルーム情報を取得しました。 |  -  |
|**400** | エラー |  -  |
|**401** | エラー |  -  |
|**404** | エラー |  -  |
|**500** | エラー |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **postRoom**
> PostRoom201Response postRoom()

指定された条件をもとに新しい問題を作成します。  リクエストボディには、問題ジャンルや問題形式などの生成条件を指定します。  作成に成功した場合は201 Createdを返し、Locationヘッダーに作成した問題のリソースURIを設定します。 

### Example

```typescript
import {
    RoomApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new RoomApi(configuration);

const { status, data } = await apiInstance.postRoom();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**PostRoom201Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | 問題を作成しました。 |  * Location - 生成したルームID <br>  |
|**400** | エラー |  -  |
|**401** | エラー |  -  |
|**404** | エラー |  -  |
|**500** | エラー |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

