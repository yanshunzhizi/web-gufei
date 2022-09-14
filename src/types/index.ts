import type { FormItemType, FormItemName } from "@/config/enum";

declare global {}

declare module "vue" {
  interface ComponentCustomProperties {
    window: Window;
  }
}

export interface FormItem {
  name: string;
  type: FormItemType;
  label: string;
  default: unknown;
  rules: any[];
  hide?: boolean;
  config?: Record<string, any>;
  items?: { label: string; value: string; data?: unknown }[];
  change?: (
    item: { label: string; value: string; data?: unknown },
    formData: Record<FormItemName, unknown>
  ) => void;
}
