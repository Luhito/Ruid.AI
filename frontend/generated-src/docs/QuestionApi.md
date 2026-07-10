# QuestionApi

All URIs are relative to *http://localhost:3030*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**getQuestion**](#getquestion) | **GET** /question | |

# **getQuestion**
> GetQuestionResponse getQuestion()

作成済みの問題を取得

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
|**401** | 認証エラー |  -  |
|**404** | 問題が存在しない |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

