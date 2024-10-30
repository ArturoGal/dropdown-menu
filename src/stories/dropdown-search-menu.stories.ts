import type { Meta, StoryObj } from '@storybook/vue3'

import DropdownSearchMenu from './dropdown-search-menu.vue'

const meta = {
  title: 'DropdownSearchMenu',
  component: DropdownSearchMenu,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    options: [],
  },
} satisfies Meta<typeof DropdownSearchMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      'Luis Gerardo García',
      'Juan Pérez',
      'Martín Martínez',
      'Arturo García',
      'Rodrigo Bentancur',
      'Cristian Romero',
      'Pedro Porro',
    ],
    hint: 'Elige un usuario',
    label: 'Usuarios registrados',
  },
}
