# GetQuestionResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**question_text** | **string** | 問題文 | [default to undefined]
**choices** | [**Array&lt;GetQuestionResponseChoicesInner&gt;**](GetQuestionResponseChoicesInner.md) | 選択肢 | [default to undefined]
**correct_answer_index** | **number** | 選択肢の中で、正解のインデックス | [default to undefined]
**explanation_text** | **string** | 解説文 | [default to undefined]

## Example

```typescript
import { GetQuestionResponse } from './api';

const instance: GetQuestionResponse = {
    question_text,
    choices,
    correct_answer_index,
    explanation_text,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
