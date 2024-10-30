import type { Meta, StoryObj } from '@storybook/vue3'

import DropdownMenu from './dropdown-menu.vue'

const meta = {
  title: 'DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: {},
  args: {
    options: [],
  },
} satisfies Meta<typeof DropdownMenu>

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
