# QuestionApi

All URIs are relative to *http://localhost:3030*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getQuestion**](#getquestion) | **GET** /questions/{question_id} | 問題取得|

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

let questionId: string; //パスパラメータ内のquestion_id (default to undefined)

const { status, data } = await apiInstance.getQuestion(
    questionId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **questionId** | [**string**] | パスパラメータ内のquestion_id | defaults to undefined|


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
|**400** | エラー |  -  |
|**401** | エラー |  -  |
|**404** | エラー |  -  |
|**500** | エラー |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

