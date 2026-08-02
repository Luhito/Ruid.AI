# QuestionApi

All URIs are relative to *http://localhost:3030*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getQuestion**](#getquestion) | **GET** /question/{qid} | 問題取得|
|[**postQuestion**](#postquestion) | **POST** /question | 問題作成|

# **getQuestion**
> GetQuestion200Response getQuestion()

指定した問題IDに対応する問題を取得します。  - 問題文 - 選択肢 - 解説 を返します。  問題が存在しない場合は404を返します。 

### Example

```typescript
import {
    QuestionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuestionApi(configuration);

let qid: string; //問題ID(UUID) (default to undefined)

const { status, data } = await apiInstance.getQuestion(
    qid
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **qid** | [**string**] | 問題ID(UUID) | defaults to undefined|


### Return type

**GetQuestion200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 問題を取得しました。 |  -  |
|**400** | バリデーションエラー |  -  |
|**401** | 認証エラー |  -  |
|**404** | 問題が存在しない |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **postQuestion**
> PostQuestion201Response postQuestion(postQuestionRequest)

指定された条件をもとに新しい問題を作成します。  リクエストボディには、問題ジャンルや問題形式などの生成条件を指定します。  作成に成功した場合は201 Createdを返し、Locationヘッダーに作成した問題のリソースURIを設定します。 

### Example

```typescript
import {
    QuestionApi,
    Configuration,
    PostQuestionRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new QuestionApi(configuration);

let postQuestionRequest: PostQuestionRequest; //

const { status, data } = await apiInstance.postQuestion(
    postQuestionRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **postQuestionRequest** | **PostQuestionRequest**|  | |


### Return type

**PostQuestion201Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | 問題を作成しました。 |  * Location -  <br>  |
|**400** | バリデーションエラー |  -  |
|**401** | 認証エラー |  -  |
|**404** | 問題が存在しない |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

