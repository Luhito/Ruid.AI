# ErrorResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**errorCode** | **string** | エラーコード | [default to undefined]
**headers** | **object** | ヘッダー（ここでは使わないが、他の正常レスポンスとの共通化をはかる） | [optional] [default to undefined]
**content** | [**ErrorResponseContent**](ErrorResponseContent.md) |  | [default to undefined]

## Example

```typescript
import { ErrorResponse } from './api';

const instance: ErrorResponse = {
    errorCode,
    headers,
    content,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
