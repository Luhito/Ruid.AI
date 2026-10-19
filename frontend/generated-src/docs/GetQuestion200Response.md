# GetQuestion200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**room_id** | **string** | Room ID | [default to undefined]
**question_text** | **string** | 問題文（Markdown） | [default to undefined]
**choices** | [**Array&lt;GetQuestion200ResponseChoicesInner&gt;**](GetQuestion200ResponseChoicesInner.md) | 選択肢配列. 選択肢を表す記号と選択肢の本文のセット | [default to undefined]
**answered_flg** | **boolean** | 回答ステータスフラグ | [default to undefined]
**summary** | **string** | 問題の短い説明 | [default to undefined]

## Example

```typescript
import { GetQuestion200Response } from './api';

const instance: GetQuestion200Response = {
    room_id,
    question_text,
    choices,
    answered_flg,
    summary,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
