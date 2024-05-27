export interface FormInputProps {
  id: string
  name: string
  size?: 'small' | 'medium'
  control?: any
  label?: string
  setValue?: any
  defaultValue?: any
  setSelectedOptions?: (p: any[]) => void
  setSelectedOption?: (p: any) => void
  valueDefault?: any
  showPassword?: boolean
  variant?: string  //deprecated
  onChange?: () => {}
}
