import * as React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Modal } from './Modal'

export default {
    title: 'Modal',
    component: Modal
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = () => <Modal />

export const Primary = Template.bind({})

Primary.args = {
    primary: true,
    label: 'Modal'
}
