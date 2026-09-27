import { BasicAccordion } from '@/components/smoothui/basic-accordion';
import type { ComponentType } from 'react';

export const components: {
  title: string;
  Component: ComponentType;
  url: string;
}[] = [
  {
    title: 'Basic Accordion',
    Component: BasicAccordion,
    url: 'https://smoothui.dev/docs/components/accordion'
  }
];
