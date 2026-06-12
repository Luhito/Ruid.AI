# QuestionApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getQuestion**](#getquestion) | **GET** /question | 問題取得|

# **getQuestion**
> GetQuestionResponse getQuestion()


### Example

```typescript
import {
    QuestionApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new QuestionApi(configuration);

let qid: string; //問題ID(UUID) (default to undefined)
let userAgent: string; //クライアントのブラウザとOS情報 (default to undefined)
let acceptLanguage: string; //受け入れ可能な自然言語 (optional) (default to undefined)

const { status, data } = await apiInstance.getQuestion(
    qid,
    userAgent,
    acceptLanguage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **qid** | [**string**] | 問題ID(UUID) | defaults to undefined|
| **userAgent** | [**string**] | クライアントのブラウザとOS情報 | defaults to undefined|
| **acceptLanguage** | [**string**] | 受け入れ可能な自然言語 | (optional) defaults to undefined|


### Return type

**GetQuestionResponse**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 取得成功 |  -  |
|**400** | バリデーションエラー |  -  |
|**409** | ユーザー重複 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

