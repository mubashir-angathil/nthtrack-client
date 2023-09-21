import React from 'react'
import { CardContent, Box } from '@mui/material'
import SignInFormComponent from '../../../components/sign-in-form/SignInFormComponent';
import { CustomCardComponent, FormHeaderComponent } from '../../../components/Components';

export const PageSignIn: React.FC = () => {
    return (
        <CustomCardComponent>
            <Box textAlign='center' display='grid' p={0}>
                <CardContent>
                    <FormHeaderComponent title='Sign in' />
                </CardContent>
                <SignInFormComponent />
            </Box>
        </CustomCardComponent>
    )
}
export default PageSignIn
