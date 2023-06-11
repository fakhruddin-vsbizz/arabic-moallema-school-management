import supabase from "@/supabaseClient";


// function to reset password which sends reset link to the email
export const initiatePasswordResetEmail = async (email) => {
    const {data, error } = await supabase.auth.resetPasswordForEmail(email,{
        redirectTo:'http://localhost:3000/new-password-reset'
    });

    if(error){
        console.log(error.message);
        return true;
    }else{
        console.log(data);
        return false;
    }
}


// function to update the user's password once the magic link is sent
export const resetPasswordFormValidation = async (password) => {
    const { data, error } = await supabase.auth.updateUser({password: password})

    if(error){
        console.log(error);
        return false;
    }else{
        console.log("DONE PASS CHANGE");
        return true;
    }
}