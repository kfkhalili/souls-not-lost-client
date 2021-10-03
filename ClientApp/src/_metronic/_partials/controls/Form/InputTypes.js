const isTextInput = (tag) => tag === 'input';
const isSelectInput = (tag) => tag === 'select';
const isUploadInput = (tag) => tag === 'upload';
const isTimePicker = (tag) => tag === 'timepicker';
const isUploadFile = (tag) => tag === 'file';
const isCheckBoxSelect = (tag) => tag === 'checkboxes';
const isCheckBox = (tag) => tag === 'checkbox';
const isTypeheadSelect = (tag) => tag === 'typeheadSelect';
const isTextArea = (tag) => tag === 'textarea';
const isTypeheadSelectAllowNew = (tag) => tag === 'typeheadSelectAllowNew';
const isSingleTypeheadSelectAllowNew = (tag) => tag === 'singleTypeheadSelectAllowNew';

export const fieldTags = {
    TextInput: 'input',
    SelectInput: 'select',
    UploadInput: 'upload',
    TimePicker: 'timepicker',
    UploadFile: 'file',
    CheckBoxSelect: 'checkboxes',
    CheckBox: 'checkbox',
    TypeheadSelect: 'typeheadSelect',
    TypeheadSelectAllowNew: 'typeheadSelectAllowNew',
    SingleTypeheadSelectAllowNew: 'singleTypeheadSelectAllowNew',
    TextArea: 'textarea'
}

export {
    isTextInput,
    isSelectInput,
    isUploadInput,
    isCheckBoxSelect,
    isUploadFile,
    isCheckBox,
    isTypeheadSelect,
    isTextArea,
    isTimePicker,
    isSingleTypeheadSelectAllowNew,
    isTypeheadSelectAllowNew
};
