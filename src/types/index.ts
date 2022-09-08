import type { FormItemType } from "@/config/enum";
export interface FormItem {
  name: string;
  type: FormItemType;
  label: string;
  default: unknown;
  rules: any[];
  hide?: boolean;
  config?: Record<string, any>;
  items?: { label: string; value: string }[];
}
