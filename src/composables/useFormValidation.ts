import { ref } from 'vue'

type ValidationRule = (value: string) => boolean | string

export function useFormValidation() {
  const errors = ref<Record<string, string>>({})

  const validate = (field: string, value: string, rules: ValidationRule[]) => {
    for (const rule of rules) {
      const result = rule(value)
      if (typeof result === 'string') {
        errors.value[field] = result
        return false
      }
    }
    delete errors.value[field]
    return true
  }

  const validateAll = (fields: Record<string, string>, rules: Record<string, ValidationRule[]>) => {
    let isValid = true
    for (const [field, value] of Object.entries(fields)) {
      if (!validate(field, value, rules[field])) {
        isValid = false
      }
    }
    return isValid
  }

  return { errors, validate, validateAll }
}
