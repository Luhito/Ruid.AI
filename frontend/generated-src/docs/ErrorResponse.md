# ErrorResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**statusCode** | **number** | HTTPステータスコード | [default to undefined]
**errorCode** | **string** | エラーコード | [default to undefined]
**headers** | **object** | ヘッダー（ここでは使わないが、他の正常レスポンスとの共通化をはかる） | [optional] [default to undefined]
**content** | [**ErrorResponseContent**](ErrorResponseContent.md) |  | [default to undefined]

## Example

```typescript
import { ErrorResponse } from './api';

const instance: ErrorResponse = {
    statusCode,
    errorCode,
    headers,
    content,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
