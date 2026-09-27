import { BasicAccordion } from '@/components/smoothui/basic-accordion';
import type { ComponentType } from 'react';

export const components: {
  title: string;
  Component: ComponentType;
}[] = [
  {
    title: 'Basic Accordion',
    Component: BasicAccordion
  }
];
