import { TestBed } from '@angular/core/testing';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

import { FormUtilsService } from './form-utils.service';

describe('FormUtilsService', () => {
  let service: FormUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#validateAllFormFields should mark controls as touched', () => {
    const formGroup = new UntypedFormGroup({
      name: new UntypedFormControl('', []),
      description: new UntypedFormControl('', []),
      list: new UntypedFormArray([new UntypedFormControl('', [])]),
    });

    service.validateAllFormFields(formGroup);

    expect(formGroup.get('name')?.touched).toBe(true);
    expect(formGroup.get('description')?.touched).toBe(true);
    expect(formGroup.get('list')?.touched).toBe(true);
  });

  it('#getErrorMessage should return correct error message', () => {
    const formGroup = new UntypedFormGroup({
      name: new UntypedFormControl('', {}),
    });
    const fieldName = 'name';
    const formControl = formGroup.get(fieldName) as UntypedFormControl;

    formControl.setErrors({ required: true });
    const requiredErrorMessage = service.getErrorMessage(formGroup, fieldName);
    expect(requiredErrorMessage).toBe('Campo obrigatório.');

    formControl.setErrors({ minlength: { requiredLength: 10 } });
    const minLengthErrorMessage = service.getErrorMessage(formGroup, fieldName);
    expect(minLengthErrorMessage).toBe(
      'Tamanho mínimo precisa ser de 10 caracteres.'
    );

    formControl.setErrors({ maxlength: { requiredLength: 30 } });
    const maxLengthErrorMessage = service.getErrorMessage(formGroup, fieldName);
    expect(maxLengthErrorMessage).toBe(
      'Tamanho máximo excedido de 30 caracteres.'
    );

    formControl.setErrors({ generic: true });
    const genericErrorMessage = service.getErrorMessage(formGroup, fieldName);
    expect(genericErrorMessage).toBe('Error');
  });

  it('#getErrorMessageFromField should return correct error message', () => {
    const formGroup = new UntypedFormGroup({
      name: new UntypedFormControl('', {}),
    });
    const fieldName = 'name';
    const formControl = formGroup.get(fieldName) as UntypedFormControl;

    formControl.setErrors({ required: true });
    const requiredErrorMessage = service.getErrorMessageFromField(formControl);
    expect(requiredErrorMessage).toBe('Campo obrigatório.');

    formControl.setErrors({ minlength: { requiredLength: 10 } });
    const minLengthErrorMessage = service.getErrorMessageFromField(formControl);
    expect(minLengthErrorMessage).toBe(
      'Tamanho mínimo precisa ser de 10 caracteres.'
    );

    formControl.setErrors({ maxlength: { requiredLength: 30 } });
    const maxLengthErrorMessage = service.getErrorMessageFromField(formControl);
    expect(maxLengthErrorMessage).toBe(
      'Tamanho máximo excedido de 30 caracteres.'
    );

    formControl.setErrors({ generic: true });
    const genericErrorMessage = service.getErrorMessageFromField(formControl);
    expect(genericErrorMessage).toBe('Error');
  });

  it('#getErrorMessageFromField should return empty string with a valid field.', () => {
    const formGroup = new UntypedFormGroup({
      name: new UntypedFormControl('', {}),
    });
    const fieldName = 'name';

    formGroup.get(fieldName)?.setErrors(null);
    const validFieldMessage = service.getErrorMessage(formGroup, fieldName);
    expect(validFieldMessage).toBe('');
  });

  it('#getFormArrayFieldErrorMessage should return correct error message', () => {
    const formGroup = new UntypedFormGroup({
      list: new UntypedFormArray([
        new UntypedFormGroup({
          name: new UntypedFormControl('', []),
        }),
      ]),
    });
    const formArrayName = 'list';
    const fieldName = 'name';

    const listArray = formGroup.get(formArrayName) as UntypedFormArray;
    const nameField = listArray.at(0).get(fieldName) as UntypedFormControl;

    nameField.setErrors({ required: true });
    const requiredErrorMessage = service.getFormArrayFieldErrorMessage(
      formGroup,
      formArrayName,
      fieldName,
      0
    );
    expect(requiredErrorMessage).toBe('Campo obrigatório.');

    nameField.setErrors({ minlength: { requiredLength: 10 } });
    const minLengthErrorMessage = service.getFormArrayFieldErrorMessage(
      formGroup,
      formArrayName,
      fieldName,
      0
    );
    expect(minLengthErrorMessage).toBe(
      'Tamanho mínimo precisa ser de 10 caracteres.'
    );

    nameField.setErrors({ maxlength: { requiredLength: 30 } });
    const maxLengthErrorMessage = service.getFormArrayFieldErrorMessage(
      formGroup,
      formArrayName,
      fieldName,
      0
    );
    expect(maxLengthErrorMessage).toBe(
      'Tamanho máximo excedido de 30 caracteres.'
    );

    nameField.setErrors({ generic: true });
    const genericErrorMessage = service.getFormArrayFieldErrorMessage(
      formGroup,
      formArrayName,
      fieldName,
      0
    );
    expect(genericErrorMessage).toBe('Error');
  });

  it('#isFormArrayRequired should validate if formArray is required', () => {
    const formGroup = new UntypedFormGroup({
      list: new UntypedFormArray([
        new UntypedFormGroup({
          name: new UntypedFormControl('', []),
        }),
      ]),
    });
    const formArrayName = 'list';

    const listArray = formGroup.get(formArrayName) as UntypedFormArray;

    listArray.markAsTouched();
    listArray.setErrors({ required: true });

    const requiredResult = service.isFormArrayRequired(
      formGroup,
      formArrayName
    );
    expect(requiredResult).toBe(true);

    listArray.markAsTouched();
    listArray.setErrors(null);

    const unrequiredResult = service.isFormArrayRequired(
      formGroup,
      formArrayName
    );
    expect(unrequiredResult).toBe(false);

    listArray.markAsUntouched();
    listArray.setErrors({ required: true });

    const notTouchedResult = service.isFormArrayRequired(
      formGroup,
      formArrayName
    );
    expect(notTouchedResult).toBe(false);
  });
});
