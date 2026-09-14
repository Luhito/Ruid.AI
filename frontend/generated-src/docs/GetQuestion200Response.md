# GetQuestion200Response


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**question_text** | **string** | 問題文（Markdown） | [default to undefined]
**choices** | [**Array&lt;GetQuestion200ResponseChoicesInner&gt;**](GetQuestion200ResponseChoicesInner.md) | 選択肢配列. 選択肢を表す記号と選択肢の本文のセット | [default to undefined]
**correct_answer_index** | **number** | 選択肢の中で、正解のインデックス | [default to undefined]
**explanation_text** | **string** | 解説文（Markdown） | [default to undefined]

## Example

```typescript
import { GetQuestion200Response } from './api';

const instance: GetQuestion200Response = {
    question_text,
    choices,
    correct_answer_index,
    explanation_text,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
