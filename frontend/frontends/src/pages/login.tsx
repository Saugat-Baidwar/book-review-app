import { LoginForm } from "../components/auth/login-form";

import {AppShell} from"../components/app-shell"


export function LoginPage(){
    return(
        <AppShell>
            <div className="max-w-3xl mx-auto">
                <LoginForm/>
            </div>
        </AppShell>
    )
}