import React from 'react'
import { CardContent, Box } from '@mui/material'
import { CustomCardComponent, FormHeaderComponent } from '../../../components/Components';
import SignUpFormComponent from '../../../components/sign-up-form/SignUpFormComponent';

export const PageSignUp: React.FC = () => {
    return (
        <CustomCardComponent>
            <Box textAlign='center' display='grid'>
                <CardContent>
                    <FormHeaderComponent title='Sign up' />
                </CardContent>
                <SignUpFormComponent />
            </Box>
        </CustomCardComponent>
    )
}
export default PageSignUp
