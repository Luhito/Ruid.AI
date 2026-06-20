# GetQuestionResponse


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**question_text** | **string** | 問題文 | [default to undefined]
**choices** | [**Array&lt;GetQuestionResponseChoicesInner&gt;**](GetQuestionResponseChoicesInner.md) | 選択肢 | [default to undefined]
**correct_answer_index** | **number** | 選択肢の中で、正解のインデックス | [default to undefined]
**choiceTags** | **Array&lt;string&gt;** | 選択肢の記号 | [optional] [default to undefined]
**choiceTexts** | **Array&lt;string&gt;** | 選択肢の内容 | [optional] [default to undefined]
**question_test** | **string** | 問題文 | [optional] [default to undefined]
**explanation_test** | **string** | 解説文 | [optional] [default to undefined]

## Example

```typescript
import { GetQuestionResponse } from './api';

const instance: GetQuestionResponse = {
    question_text,
    choices,
    correct_answer_index,
    choiceTags,
    choiceTexts,
    question_test,
    explanation_test,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
